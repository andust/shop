package main

import (
	"fmt"

	"github.com/andust/shop_catalog_service/core"
	"github.com/andust/shop_catalog_service/handlers"
	"github.com/andust/shop_catalog_service/repository"
	"github.com/labstack/echo/v4"
)

const webPort = "7007"

func main() {
	newCore := core.New()
	serve(newCore)
}

func serve(c *core.Core) {
	c.InfoLog.Println("start server")

	c.InitRepository()
	defer repository.CloseDB()

	e := echo.New()
	h := handlers.Handler{Core: c}
	h.Routes(e)

	c.ErrorLog.Fatal(e.Start(fmt.Sprintf(":%s", webPort)))
}
