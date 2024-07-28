package handlers

import (
	"net/http"

	usecase "github.com/andust/shop_user_service/use-case"
	"github.com/andust/shop_user_service/utils"
	"github.com/labstack/echo/v4"
)

type accessToken struct {
	Access string `json:"access"`
}

type refreshToken struct {
	Refresh string `json:"refresh"`
}

func (h *Handler) RefreshToken(c echo.Context) error {
	rt := new(refreshToken)
	c.Bind(rt)

	tokenUseCase := usecase.NewToken(h.Core.ErrorLog, h.Core.Repository.UserRepository)
	result, err := tokenUseCase.Refres(rt.Refresh)
	if err != nil {
		h.Core.ErrorLog.Println(err)
		return echo.NewHTTPError(http.StatusUnauthorized, nil)
	}

	return c.JSON(http.StatusOK, result)
}

func (h *Handler) VerifyToken(c echo.Context) error {
	at := new(accessToken)
	c.Bind(at)
	_, err := utils.VerifyToken(at.Access)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err)
	}

	return c.JSON(http.StatusOK, "ok")
}
