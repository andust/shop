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

	apiGroup.GET("/token/verify", h.VerifyToken)
	apiGroup.GET("/token/refresh", h.RefreshToken)

	authMiddleware := middlewares.AuthMiddleware{}

	apiGroup.Use(authMiddleware.IsLoggedIn)

	apiGroup.GET("/logout", h.Logout)
	apiGroup.GET("/user", guard.AdminAuthGuard(h.UserDetail))
	apiGroup.GET("/users", guard.AdminAuthGuard(h.UsersList))
}
