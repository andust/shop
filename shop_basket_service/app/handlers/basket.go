package handlers

import (
	"net/http"

	"github.com/andust/shop_basket_service/repository"
	"github.com/labstack/echo/v4"
)

func (h *Handler) BasketsList(c echo.Context) error {
	result, err := h.Core.Repository.BasketRepository.FindOne(repository.BasketQuery{ID: "669e07427d50a9d7b3034b57"})
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get baskets error")
	}
	return c.JSON(http.StatusOK, result)
}
