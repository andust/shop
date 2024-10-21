package handlers

import (
	"errors"
	"net/http"

	"github.com/andust/shop_catalog_service/publisher"
	usecase "github.com/andust/shop_catalog_service/use-case"
	"github.com/labstack/echo/v4"
)

type AddProductToBasketParams struct {
	ID       string `json:"id" validate:"required,min=6"`
	Quantity int    `json:"quantity" validate:"required,min=1"`
	UserId   string `json:"userId"`
}

func (h *Handler) ProductToBasket(c echo.Context) error {
	ap := new(AddProductToBasketParams)
	if err := c.Bind(ap); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	dv := NewValidator()
	if err := dv.Validate(ap); err != nil {
		return err
	}

	pub := publisher.NewPublisher(h.Core.NC)
	basketUsecase := usecase.NewBasket(h.Core.Repository.Product, pub)
	err := basketUsecase.AddProduct(ap.UserId, ap.ID, ap.Quantity)
	if err != nil {
		h.Core.ErrorLog.Println(err)
		return echo.NewHTTPError(http.StatusBadRequest, errors.New("add product to basket problem"))
	}

	return c.JSON(http.StatusOK, "ok")
}
