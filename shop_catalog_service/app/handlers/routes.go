package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (h *Handler) Routes(e *echo.Echo) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	apiGroup := e.Group("/api/v1")

	apiGroup.GET("/home", h.HomePage)

	apiGroup.GET("/products", h.ProductList)

	apiGroup.GET("/categories", h.CategoryList)
}
