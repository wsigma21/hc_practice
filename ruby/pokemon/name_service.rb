# frozen_string_literal: true

# NameService
module NameService
  attr_reader :name

  # 名前の変更用メソッド
  # セッターはないので変更時はこのメソッドを使うしかない
  def change_name(new_name:)
    if new_name == 'うんこ'
      puts '不適切な名前です'
    else
      @name = new_name
    end
  end
end
