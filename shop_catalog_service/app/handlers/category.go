package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CategoryList(c echo.Context) error {
	result, err := h.Core.Repository.Category.Filter()
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get categories list error")
	}
	return c.JSON(http.StatusOK, result)
}
