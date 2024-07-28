package guards

import (
	"fmt"
	"net/http"
	"slices"

	"github.com/labstack/echo/v4"
)

func AuthGuard(next echo.HandlerFunc, audiences []string) echo.HandlerFunc {
	return func(c echo.Context) error {
		audience := fmt.Sprint(c.Get("aud"))
		if !slices.Contains(audiences, audience) {
			return echo.NewHTTPError(http.StatusUnauthorized, nil)
		}
		return next(c)
	}
}
