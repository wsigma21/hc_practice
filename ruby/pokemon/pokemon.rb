# frozen_string_literal: true

require_relative './name_service'

# Pokemon
module Pokemon
  include NameService

  def initialize(name:, type1:, type2:, hp:)
    @name = name
    @type1 = type1
    @type2 = type2
    @hp = hp
  end

  def attack
    puts "#{@name}のこうげき!"
  end
end
