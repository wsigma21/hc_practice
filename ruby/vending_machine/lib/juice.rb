# frozen_string_literal: true

# Juice
class Juice
  attr_reader :name, :price

  # attr_writer :stock

  # private :stock=

  def initialize(name, price)
    @name = name
    @price = price
  end

  # def add(num)
  #   @stock += num
  # end

  # def substract(num)
  #   @stock -= num
  # end
end
