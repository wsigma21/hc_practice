# frozen_string_literal: true

# 要件
# 規定打数より多い場合
# ボギー:規定打数＋1打
# ダブルボギー:規定打数＋2打
# トリプルボギー:規定打数＋3打
# 規定打数以下の場合
# パー:規定打数ちょうど
# バーディ:規定打数−1打
# イーグル:規定打数−2打
# アルバトロス:規定打数−3打
# ただし規定打数4で1打の場合はホールインワンとする
# つまり規定打数5で2打の場合のみ該当
# コンドル:規定打数-4打
# 規定打数5で1打だった場合のみ該当(1打だが今回はホールインワンとはしない)
# ホールインワン:1打で入れた場合
# ダブルボギー以上の場合は2ボギー,3ボギーのようにオーバーした数をボギーの前につける（理論上はボギーに上限はなし）

# 標準入力から規定打数とプレイヤーの打数を受け取る
number_of_lines = 2
arrays = []
number_of_lines.times do
  array = gets.chomp.split(',')
  arrays << array
end

# 規定打数
reg_strokes = arrays[0]
# プレイヤーの打数
play_strokes = arrays[1]
# スコア
scores = { -4 => 'コンドル', -3 => 'アルバトロス', -2 => 'イーグル', -1 => 'バーディ', 0 => 'パー', 1 => 'ボギー' }

# 18ホースの結果を出力
18.times do |n|
  ply = play_strokes[n].to_i
  reg = reg_strokes[n].to_i
  result = ply - reg
  if ply == 1 && [3, 4].include?(reg)
    print 'ホールインワン'
  elsif result > 1
    print "#{result}ボギー"
  else
    print scores[result]
  end
  n != 17 ? (print ',') : (print "\n")
end
