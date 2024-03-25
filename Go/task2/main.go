package main

import (
	"fmt"
)

func findKeyByValue(m map[int]string, targetValue string) (int, error) {
	for key, value := range m {
		if value == targetValue {
			return key, nil
		}
	}
	return 0, fmt.Errorf("keyが見つかりません")
}

func main() {
	m := map[int]string{
		1: "01",
		2: "02",
		3: "03",
	}

	key, err := findKeyByValue(m, "03") // key→3, err→nil
	fmt.Printf("1. key: %v\n", key)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}

	key, err = findKeyByValue(m, "05") // key→0にすること(初期値なので), errはある
	fmt.Printf("2. key: %v\n", key)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
}
