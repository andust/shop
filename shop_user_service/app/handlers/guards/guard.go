package guards

import (
	"fmt"
	"net/http"
	"slices"

	model "github.com/andust/shop_user_service/models"
	"github.com/labstack/echo/v4"
)

func AdminAuthGuard(next echo.HandlerFunc) echo.HandlerFunc {
	allRoles := []string{string(model.SuperAdminRole), string(model.AdminRole)}
	return func(c echo.Context) error {
		audience := fmt.Sprint(c.Get("aud"))
		if !slices.Contains(allRoles, audience) {
			return echo.NewHTTPError(http.StatusForbidden, nil)
		}
		return next(c)
	}
}
