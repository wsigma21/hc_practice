# frozen_string_literal: true

require_relative './pokemon'

# Pikachu
class Pikachu < Pokemon
  # サブクラスで変更しないならそもそもatter_readerやinitialize書かなくて良い
  # attr_reader :name

  # def initialize(name:, type1:, type2:, hp:)
  #   super
  # end

  # オーバーライド
  def attack
    # 親クラスのメソッドの呼び出し
    super
    # Pikachuクラスの独自メソッドの呼び出し
    puts "#{@name}の10万ボルト！"
  end
end
