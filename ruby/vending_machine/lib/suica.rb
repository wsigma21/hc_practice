# frozen_string_literal: true

# Suica
class Suica
  DEPOSIT = 500
  attr_accessor :balance

  # 残高が外部から書き換えられないようにする
  private :balance=

  def initialize
    @balance = DEPOSIT
  end

  # チャージ
  def charge(money)
    raise '100円未満はチャージできません' if money < 100

    @balance += money
  end

  # 支払い
  def pay(total_value)
    raise 'Suicaの残高が不足しています' if @balance < total_value

    @balance -= total_value
  end
end
