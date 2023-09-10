# frozen_string_literal: true

members = %w[A B C D E F]

# グループの区切りを乱数で設定
num = rand(1..2)
# puts num + 1

# 配列の要素をシャッフルして配列に格納
shuffled_members = members.shuffle
# print shuffled_members

# 1グループ目をソートして出力
pp shuffled_members[0..num].sort

# 2グループ目をソートして出力
pp shuffled_members[num + 1..].sort
