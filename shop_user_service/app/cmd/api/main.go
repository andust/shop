package main

import (
	"fmt"
	"os"

	"github.com/andust/shop_user_service/core"
	"github.com/andust/shop_user_service/handlers"
	"github.com/andust/shop_user_service/repository"
	"github.com/labstack/echo/v4"
)

func main() {
	newCore := core.New()
	serve(newCore)
}

func serve(c *core.Core) {
	c.InfoLog.Println("start server")

	c.InitRepository(os.Getenv("DB_NAME"))
	defer repository.CloseDB()
	
	e := echo.New()
	h := handlers.Handler{Core: c}
	h.Routes(e)

	c.ErrorLog.Fatal(e.Start(fmt.Sprintf(":%s", os.Getenv("PORT"))))
}
