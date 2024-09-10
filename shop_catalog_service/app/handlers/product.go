package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/andust/shop_catalog_service/repository"
	"github.com/labstack/echo/v4"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var requestProductListCounter = promauto.NewCounter(prometheus.CounterOpts{
	Name: "echo_product_list_requests_total",
	Help: "Total number of requests for product list received",
})

func (h *Handler) ProductList(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("p"))
	limit, _ := strconv.Atoi(c.QueryParam("l"))
	categories := strings.Split(c.QueryParam("categories"), ",")
	product := c.QueryParam("product")
	requestProductListCounter.Inc()
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

func (h *Handler) ProductDetail(c echo.Context) error {
	result, err := h.Core.Repository.Product.Filter(&repository.ProductFilter{
		ID:    c.Param("id"),
		Limit: 1,
	})

	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get product error")
	}

	return c.JSON(http.StatusOK, result.First())
}
