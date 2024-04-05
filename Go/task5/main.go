package main

import "fmt"

var appConfig = &Config{Env: "test"} // &を追加して構造体のポインタに変更

type Config struct {
	Env string
}

func getConfig() *Config { // ポインタが指す値を返す
	return appConfig
}

func main() {
	c := getConfig()
	c.Env = "production"

	fmt.Println(c.Env)         // production
	fmt.Println(appConfig.Env) // testではなくproducionになる
}
