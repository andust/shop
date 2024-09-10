package middlewares

import (
	"fmt"
	"net/http"

	"github.com/andust/shop_user_service/utils"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("access")
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}

		token, err := utils.VerifyToken(cookie.Value)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}

		if claims, ok := utils.GetClaim(token); ok {
			c.Set("subId", fmt.Sprint(claims["subId"]))
			c.Set("aud", fmt.Sprint(claims["aud"]))
		}

		return next(c)
	}
}
