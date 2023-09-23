# frozen_string_literal: true

require_relative './pokemon'
require_relative './pikachu'

poke = Pokemon.new(name: 'リザードン', type1: 'ほのお', type2: 'ひこう', hp: 100)
puts poke.name # リザードン
poke.attack # リザードンのこうげき!
puts poke.class # Pokemon

pika = Pikachu.new(name: 'ピカチュウ', type1: 'でんき', type2: '', hp: 70)
puts pika.name # ピカチュウ
pika.attack # ピカチュウのこうげき! と ピカチュウの10万ボルト！
puts pika.class # Pikachu
