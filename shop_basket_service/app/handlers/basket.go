package handlers

import (
	"net/http"

	"github.com/andust/shop_basket_service/model"
	usecase "github.com/andust/shop_basket_service/use-case"
	"github.com/labstack/echo/v4"
)

func (h *Handler) BasketsAddProduct(c echo.Context) error {

	prod := new(model.Product)
	if err := c.Bind(prod); err != nil {
		h.Core.ErrorLog.Println(err)
		return echo.NewHTTPError(http.StatusBadRequest, "add product bad data")
	}

	basketUseCase := usecase.NewBasket("123", "1", h.Core.Repository.BasketRepository)
	basket, err := basketUseCase.AddProduct(*prod)
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "insert product to basket error")
	}
	return c.JSON(http.StatusOK, basket)
}
