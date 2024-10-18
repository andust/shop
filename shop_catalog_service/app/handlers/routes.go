package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var requestCounter = promauto.NewCounter(prometheus.CounterOpts{
	Name: "echo_requests_total",
	Help: "Total number of requests received",
})

func (h *Handler) Routes(e *echo.Echo) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			requestCounter.Inc()
			return next(c)
		}
	})

	apiGroup := e.Group("/api/v1")

	apiGroup.GET("/home", h.HomePage)

	apiGroup.GET("/products", h.ProductList)
	apiGroup.GET("/products/:id", h.ProductDetail)

	apiGroup.GET("/categories", h.CategoryList)
	apiGroup.POST("/basket/add-product", h.ProductToBasket)
}
