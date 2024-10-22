package handlers

import (
	"net/http"

	"github.com/andust/shop_basket_service/model"
	usecase "github.com/andust/shop_basket_service/use-case"
	"github.com/labstack/echo/v4"
)

type SyncBasketParams struct {
	Products []model.Product `json:"products" bson:"products"`
	UserId   string          `json:"userId"`
}

func (h *Handler) SyncBasket(c echo.Context) error {
	sb := new(SyncBasketParams)
	if err := c.Bind(sb); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	basketUscase := usecase.NewBasket(sb.UserId, h.Core.Repository.BasketRepository)
	basketUscase.SyncBasket(sb.Products)
	return c.JSON(http.StatusOK, "ok")
}
