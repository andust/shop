package handlers

import (
	"net/http"

	usecase "github.com/andust/shop_catalog_service/use-case"
	"github.com/labstack/echo/v4"
)

func (h *Handler) HomePage(c echo.Context) error {
	pageUseCase := usecase.NewPage()
	result, err := pageUseCase.HomePageData()
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get home page error")
	}
	return c.JSON(http.StatusOK, result)
}
