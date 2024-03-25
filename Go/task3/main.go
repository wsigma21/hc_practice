package main

import "fmt"

type MyIntSlice []int

func (m MyIntSlice) Unique() []int {
	var store []int
	for _, v := range m {
		if len(store) == 0 || v != store[len(store)-1] {
			store = append(store, v)
		}
	}
	return store
}

func main() {
	m := MyIntSlice{1, 2, 2, 3, 3, 3, 4, 5}
	fmt.Println(m.Unique()) // [1, 2, 3, 4, 5]
}
