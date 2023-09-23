# frozen_string_literal: true

# VendingMachine
class VendingMachine
  attr_reader :list

  def initialize(list)
    # 売上金額（外部に公開しないので書き換えられる心配なし）
    @sales = 0
    # 在庫一覧
    @list = list
    # 在庫
    @stocks = {}
    # 在庫追加処理
    @list.each do |name, info|
      @stocks[name] = []
      info[:stock].times do
        @stocks[name] << Juice.new(name, info[:price])
      end
    end
    # pp @stocks
  end

  # 販売処理
  def sell(suica, juice, num)
    # 購入本数より在庫が少ない場合
    raise '申し訳ありません、在庫がありません' if num > @stocks[juice].size

    # Suicaのチャージ残高を減らす
    total_value = num * @list[juice][:price]
    suica.pay(total_value)

    # 自動販売機はジュースの在庫を減らす
    substruct(juice, num)

    # 売上金額を増やして返す
    @sales += total_value
  end

  # 購入可能なドリンクのリストを返す
  def available_list
    @list.select do |name, info|
      name if info[:stock].positive?
    end
  end

  # 在庫補充処理
  def refill(name, num)
    # 在庫に追加
    num.times do
      @stocks[name] << Juice.new(name, @list[name][:price])
    end
    # 在庫一覧に追加
    @list[name][:stock] = @stocks[name].size
  end

  # 外から在庫を減らされないようにprivateメソッドにする
  private

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
end
