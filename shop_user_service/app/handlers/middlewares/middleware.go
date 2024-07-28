package middlewares

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/andust/shop_user_service/utils"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authorizationHeader := c.Request().Header.Get("Authorization")
		splittedAuthorizationHeader := strings.Split(authorizationHeader, " ")
		if len(splittedAuthorizationHeader) != 2 {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}

		headerToken := splittedAuthorizationHeader[1]
		token, err := utils.VerifyToken(headerToken)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Set("aud", fmt.Sprint(claims["aud"]))
		}

		return next(c)
	}
}
