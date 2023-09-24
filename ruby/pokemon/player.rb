# frozen_string_literal: true

require_relative './name_service'

# Player
class Player
  include NameService

  def initialize(name:, age:)
    @name = name
    @age = age
  end
end
