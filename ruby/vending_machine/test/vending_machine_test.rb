# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/suica'
require_relative '../lib/juice'
require_relative '../lib/vending_machine'

# VendingMachineTest
class VendingMachineTest < Minitest::Test
  def setup
    # スイカ発行
    @suica = Suica.new
  end

  # ステップ1
  # デポジット金額の確認
  def test_suica_deposit
    assert_equal 500, @suica.balance
  end

  # スイカに200円チャージ
  def test_suica_charge
    assert_equal 700, @suica.charge(200)
  end

  # スイカに100円未満をチャージすると例外発生
  def test_suica_charge_exception
    assert_raises(RuntimeError, '100円未満はチャージできません') { @suica.charge(99) }
  end

  ## 100円チャージした後にスイカで現在のチャージ残高を取得
  def test_get_balance
    @suica.charge(100)
    assert_equal 600, @suica.balance
  end

  # ステップ2
  # ジュースは名前の情報を持つ
  def test_juice_name
    juice = Juice.new(:pepsi, 150)
    assert 'pepsi', juice.name
  end

  # ジュースは値段の情報を持つ
  def test_juice_price
    juice = Juice.new(:pepsi, 150)
    assert 150, juice.price
  end

  # 初期状態でペプシを5本格納
  def test_get_stocks
    vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
    assert_equal 5, vm.list[:pepsi][:stock]
  end

  # 在庫確認
  def test_vm_list
    vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
    assert_equal({ pepsi: { price: 150, stock: 5 } }, vm.list)
  end

  # ステップ3
  # 在庫不足のエラー
  def test_buy_pepsi_no_stock_exception
    vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
    assert_raises(RuntimeError, '申し訳ありません、在庫がありません') { vm.sell(@suica, :pepsi, 8) }
  end

  # Suica残高不足のエラー
  def test_buy_pepsi_no_money_exception
    vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
    assert_raises(RuntimeError, 'Suicaの残高が不足しています') { vm.sell(@suica, :pepsi, 4) }
  end

  # ペプシを購入する
  def test_buy_pepsi
    vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
    # 現在の売上を取得できる
    assert 450, vm.sell(@suica, :pepsi, 3)
  end

  # ステップ4
  # 初期在庫にモンスターといろはすを追加
  def test_add_kind
    list = {
      pepsi: { price: 150, stock: 5 },
      monster: { price: 230, stock: 5 },
      ilohas: { price: 120, stock: 5 }
    }
    vm = VendingMachine.new(list)
    assert_equal(list, vm.list)
  end

  # 自販機から購入可能なドリンクのリストを取得
  def test_get_available_list
    @suica.charge(3000)
    vm = VendingMachine.new(
      {
        pepsi: { price: 150, stock: 5 },
        monster: { price: 230, stock: 5 },
        ilohas: { price: 120, stock: 5 }
      }
    )
    # いろはすを全て購入した場合
    vm.sell(@suica, :ilohas, 5)
    assert_equal({ pepsi: { price: 150, stock: 5 },
                   monster: { price: 230, stock: 5 } }, vm.available_list)
  end

  # 自販機に在庫を補充する
  def test_refill
    vm = VendingMachine.new(
      {
        pepsi: { price: 150, stock: 5 },
        monster: { price: 230, stock: 5 },
        ilohas: { price: 120, stock: 5 }
      }
    )
    vm.refill(:pepsi, 5)
    vm.refill(:ilohas, 2)
    assert_equal({ pepsi: { price: 150, stock: 10 },
                   monster: { price: 230, stock: 5 },
                   ilohas: { price: 120, stock: 7 } }, vm.available_list)
  end

  # モンスターといろはすを購入する
  def test_buy_monster_and_ilohas
    vm = VendingMachine.new(
      {
        pepsi: { price: 150, stock: 5 },
        monster: { price: 230, stock: 5 },
        ilohas: { price: 120, stock: 5 }
      }
    )
    @suica.charge(430)
    vm.sell(@suica, :monster, 3)
    vm.sell(@suica, :ilohas, 2)
    assert_equal({ pepsi: { price: 150, stock: 5 },
                   monster: { price: 230, stock: 2 },
                   ilohas: { price: 120, stock: 3 } }, vm.available_list)
  end
end
