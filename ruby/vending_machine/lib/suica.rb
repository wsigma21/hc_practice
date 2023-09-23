# frozen_string_literal: true

# Suica
class Suica
  DEPOSIT = 500
  attr_reader :balance
  attr_writer :balance

  # 残高が外部から書き換えられないようにする
  private :balance=

  def initialize
    @balance = DEPOSIT
  end

  def charge(money)
    raise '100円未満はチャージできません' if money < 100

    @balance += money
  end

  def buy(money)
    @balance -= money
  end
end
