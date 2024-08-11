package main

import (
	"fmt"
	"os"

	"github.com/andust/shop_catalog_service/cmd/scripts/migrate"
	"github.com/andust/shop_catalog_service/core"
	"github.com/andust/shop_catalog_service/repository"
)

func main() {
	newCore := core.New()
	newCore.InfoLog.Println("enter scripts package")
	newCore.InitRepository()
	defer repository.CloseDB()

	args := os.Args
	if len(args) <= 1 {
		fmt.Println("please add command name")
	}
	scriptName := args[1]
	scripts := RegisterScript()
	cb, ok := scripts[scriptName]
	if !ok {
		newCore.ErrorLog.Println("script not found")
		os.Exit(1)
	}

	cb(newCore, args[2:]...)
}

func RegisterScript() map[string]func(c *core.Core, args ...string) {
	scripts := make(map[string]func(c *core.Core, args ...string))

	// development scripts
	if os.Getenv("ENV") == "development" {
		scripts["migrate-dev-data"] = migrate.MigrateDevData
	}

	// all env scripts
	scripts["migrate-up"] = migrate.MigrateUp

	return scripts
}
