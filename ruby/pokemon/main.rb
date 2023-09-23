# frozen_string_literal: true

require_relative './pokemon'
require_relative './pikachu'
require_relative './player'

## PokemonはClassではなくModuleなのでインスタンスは作れない -------------------
# poke = Pokemon.new(name: 'リザードン', type1: 'ほのお', type2: 'ひこう', hp: 100)
# puts poke.name # リザードン
# poke.attack # リザードンのこうげき!
# puts poke.class # Pokemon

## Pikachuクラスのインスタンス作成 ----------------------------
pika = Pikachu.new(name: 'ピカチュウ', type1: 'でんき', type2: '', hp: 70)

# PikachuクラスはNameServiceモジュールをincludeしているので、名前取得可能
puts pika.name # ピカチュウ

# オーバーライドしたattackメソッドの呼び出し
pika.attack # ピカチュウのこうげき! と ピカチュウの10万ボルト！

# セッターがないのでレシーバでの名前変更は不可能
# pika.name = 'たかし' => エラーになる

# NameServiceモジュールのchange_nameメソッドで名前変更可能
pika.change_name(new_name: 'ライチュウ')
puts pika.name # ライチュウ

# 不適切な名前への変更は不可
pika.change_name(new_name: 'うんこ') # 不適切な名前です

## Playerクラスのインスタンス作成 ------------------------------
player = Player.new(name: 'サトシ', age: 10)

# PlayerクラスはNameServiceモジュールをincludeしているので、名前取得可能
puts player.name # サトシ

# セッターがないのでレシーバでの名前変更は不可能
# player.name = '伊右衛門' => エラーになる

# NameServiceモジュールのchange_nameメソッドで名前変更可能
player.change_name(new_name: 'リコ')
puts player.name # リコ

# 不適切な名前への変更は不可
player.change_name(new_name: 'うんこ') # 不適切な名前です
