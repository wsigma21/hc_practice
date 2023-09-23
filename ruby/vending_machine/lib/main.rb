# frozen_string_literal: true

require_relative './vending_machine'
require_relative './suica'
require_relative './juice'

# リファクタリング中にここで確認した
# プルリク時、実行はtest/vending_machine_test.rbで行っていただいた

vm = VendingMachine.new({ pepsi: { price: 150, stock: 5 } })
puts vm.list
vm.substruct(:pepsi, 3)
puts vm.list
