package handlers

import (
	"net/http"
	"strconv"

	"github.com/andust/shop_catalog_service/repository"
	"github.com/labstack/echo/v4"
)

func (h *Handler) ProductList(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("p"))
	limit, _ := strconv.Atoi(c.QueryParam("l"))
	result, err := h.Core.Repository.Product.Filter(&repository.ProductFilter{
		Limit: limit,
		Page:  page,
	})
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get product list error")
	}
	return c.JSON(http.StatusOK, result)
}
