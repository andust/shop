package middlewares

import (
	"net/http"

	"github.com/andust/shop_user_service/utils"
	"github.com/labstack/echo/v4"
)

type AuthMiddleware struct{}

func (a AuthMiddleware) IsLoggedIn(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		access, err := c.Cookie("access")
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}

		token, err := utils.VerifyToken(access.Value)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}
		if claims, ok := utils.GetClaim(token); ok {
			c.Set("id", claims["id"])
			c.Set("role", claims["role"])
		}

		return next(c)
	}
}
