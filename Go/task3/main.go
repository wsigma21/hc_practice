package main

import (
	"fmt"
	"sort"
)

type MyIntSlice []int

func (m MyIntSlice) Unique() []int {
	store := map[int]bool{}
	for _, v := range m {
		// mapにない値はmapに格納していく
		if _, ok := store[v]; !ok {
			store[v] = true
		}
	}
	// mapのキーをスライスに格納する
	var storeArray []int
	for key, _ := range store {
		storeArray = append(storeArray, key)
	}
	// スライスをソートする
	sort.Slice(storeArray, func(i, j int) bool { return storeArray[i] < storeArray[j] })
	return storeArray
}

func main() {
	m := MyIntSlice{1, 2, 2, 3, 3, 3, 4, 5}
	fmt.Println(m.Unique()) // [1, 2, 3, 4, 5]
	// ソートされていないIntスライスの例
	m2 := MyIntSlice{5, 4, 4, 2, 6, 1, 3, 6}
	fmt.Println(m2.Unique()) // [1 2 3 4 5 6]
}
