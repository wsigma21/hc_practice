# frozen_string_literal: true

require_relative './pokemon'

# Pikachu
class Pikachu
  include Pokemon
  # 変更しないならそもそもinitialize書かなくて良い
  # def initialize(name:, type1:, type2:, hp:)
  #   super
  # end

  # オーバーライド
  def attack
    # Pokemonモジュールの同名メソッドの呼び出し
    super
    # Pikachuクラスの独自メソッドの呼び出し
    puts "#{@name}の10万ボルト!"
  end
end
