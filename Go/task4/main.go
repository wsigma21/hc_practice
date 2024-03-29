package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func main() {
	users := []User{
		{"tarou", 33},
		{"zirou", 22},
		{"itirou", 11},
	}

	// 誤り
	// userはusers[i]のコピー
	for i, user := range users {
		fmt.Println(&users[i] == &user) // false -> コピーなのでアドレスが異なる
		// コピーを変更しても元のusersの値は変更されない
		user.Age = 44
	}

	fmt.Printf("%v\n", users) // [{tarou 33} {zirou 22} {itirou 11}]

	// 修正
	for i, _ := range users {
		// indexを使用してusersを直接変更する
		users[i].Age = 44
	}

	fmt.Printf("%v\n", users) // [{tarou 44} {zirou 44} {itirou 44}]
}
