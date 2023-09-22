# frozen_string_literal: true

# VendingMachine
class VendingMachine
  attr_reader :list

  # attr_writer :sales

  # 売上金額が外部から書き換えられないようにする
  # private :sales=

  def initialize(list)
    @list = list
    @sales = 0
    # ジュース1本で1インスタンスとする
    @stocks = {}
    # 在庫に追加
    @list.each do |name, info|
      @stocks[name] = []
      info[:stock].times do
        @stocks[name] << Juice.new(name, info[:price])
      end
    end
    # pp @stocks
  end

  def sell(suica, juice, num)
    # 購入本数より在庫が少ない場合
    # print "在庫数は#{@stocks[juice].size}"
    raise '申し訳ありません、在庫がありません' if num > @stocks[juice].size

    # 価格より残高が少ない場合
    # print "価格は#{@list[juice][:price]}"
    total_value = num * @list[juice][:price]
    raise 'Suicaの残高が不足しています' if total_value > suica.balance

    # 上記2条件をクリア
    # 自動販売機はジュースの在庫を減らす
    substruct(juice, num)
    # Suicaのチャージ残高を減らす
    suica.buy(total_value)
    # 売り上げ金額を増やす
    @sales += total_value
  end

  # 在庫を減らす
  def substruct(name, num)
    # 在庫から減らす
    num.times do
      @stocks[name].delete_at(@stocks[name].size - 1)
    end
    # 在庫一覧から減らす
    @list[name][:stock] = @stocks[name].size
    # pp @stocks
  end

  # 購入可能なドリンクのリストを返す
  def available_list
    @list.select do |name, info|
      name if info[:stock].positive?
    end
  end

  # 在庫補充
  # 数本以上補充できるように
  def refill(name, num)
    # puts @list
    # puts @list[name][:price]
    # puts "在庫は#{@stocks[name]}"
    # puts "在庫は#{@stocks[name].size}個"
    # 在庫に追加
    num.times do
      @stocks[name] << Juice.new(name, @list[name][:price])
    end
    # 在庫一覧に追加
    @list[name][:stock] = @stocks[name].size
    # puts "在庫は#{@stocks[name]}"
    # puts "在庫は#{@stocks[name].size}個"
  end
end
