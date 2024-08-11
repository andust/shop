package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/andust/shop_catalog_service/repository"
	"github.com/labstack/echo/v4"
)

func (h *Handler) ProductList(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("p"))
	limit, _ := strconv.Atoi(c.QueryParam("l"))
	categories := strings.Split(c.QueryParam("categories"), ",")
	product := c.QueryParam("product")

	result, err := h.Core.Repository.Product.Filter(&repository.ProductFilter{
		Limit:       limit,
		Page:        page,
		ProductName: product,
		CategoryIDs: categories,
	})

	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get product list error")
	}
	return c.JSON(http.StatusOK, result)
}
