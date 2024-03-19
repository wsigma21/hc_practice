package main

import (
	"fmt"
	"strconv"
)

func main() {
	slice := []interface{}{1, "2", 10, "11"}
	for _, v := range slice {
		switch v.(type) {
		case string:
			iv, _ := strconv.Atoi(v.(string))
			fmt.Printf("%02d\n", iv)
		case int:
			fmt.Printf("%02d\n", v)
		default:
			fmt.Println("それ以外")
		}
	}
}
