package main

import (
	"fmt"
	"net/http"

	"github.com/andust/shop_catalog_service/core"
	"github.com/andust/shop_catalog_service/handlers"
	"github.com/andust/shop_catalog_service/repository"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/prometheus/client_golang/prometheus/promhttp"
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
	c.InitNats()
	defer c.NC.Close()

	e := echo.New()
	h := handlers.Handler{Core: c}
	h.Routes(e)

	p := prometheus.NewPrometheus("catalog_service", nil)

	p.Use(e)

	http.Handle("/metrics", promhttp.Handler())

	c.ErrorLog.Fatal(e.Start(fmt.Sprintf(":%s", webPort)))
}
