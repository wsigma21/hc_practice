# frozen_string_literal: true

require 'date'
require 'optparse'

# デフォルトに今月を設定
month = Date.today.month

# 引数で月を受け取る処理
opt = OptionParser.new
opt.on('-m VAL', Integer) { |v| month = v.to_i }
opt.parse(ARGV)

# 負の数、ゼロ、12より大きい数が入力された場合のエラー処理
error_message = "#{month} is neither a month number (1..12) nor a name"
if month.negative? || month.zero? || month > 12
  puts error_message
  return
end

# ヘッダ出力
puts "      #{month}月 2023      "
puts '月 火 水 木 金 土 日'

# 月の開始日と最終日を設定
start_date = Date.new(2023, month, 1)
end_date = Date.new(2023, month, -1)

# 月の開始日までの空白の生成処理
row = []
start_wday = start_date.wday.zero? ? 7 : start_date.wday
(1..start_wday).each do |num|
  row[num - 1] = '  '
end

# 日付を出力処理
(start_date..end_date).each do |d|
  day = d.day
  week = d.wday
  week = 7 if week.zero?
  row[week - 1] = format('%2d', day)
  # 週末と月の最終日なら、日にちを出力して改行し、配列を初期化
  if week == 7 || d == end_date
    puts row.join(' ')
    row = []
  end
end
