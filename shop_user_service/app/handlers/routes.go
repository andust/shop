package handlers

import (
	"net/http"

	guard "github.com/andust/shop_user_service/handlers/guards"
	"github.com/andust/shop_user_service/handlers/middlewares"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (h *Handler) Routes(e *echo.Echo) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	apiGroup := e.Group("/api/v1")

	apiGroup.POST("/login", h.Login)
	apiGroup.POST("/register", h.Register)

	apiGroup.POST("/token/refresh", h.RefreshToken)
	apiGroup.POST("/token/verify", h.VerifyToken)

	apiGroup.Use(middlewares.AuthMiddleware)

	apiGroup.GET("/users", guard.AuthGuard(h.UsersList, []string{"admin", "super-admin"}))
}