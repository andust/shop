package handlers

import (
	"net/http"

	"github.com/andust/shop_user_service/repository"
	usecase "github.com/andust/shop_user_service/use-case"
	"github.com/labstack/echo/v4"
)

func (h *Handler) UsersList(c echo.Context) error {

	result, err := h.Core.Repository.UserRepository.FindOne(repository.UserQuery{ID: "669e07427d50a9d7b3034b57"})
	if err != nil {
		h.Core.ErrorLog.Println(err)
		echo.NewHTTPError(http.StatusBadRequest, "get users error")
	}
	return c.JSON(http.StatusOK, result)
}

type LoginParams struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (h *Handler) Login(c echo.Context) error {
	lp := new(LoginParams)
	if err := c.Bind(lp); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	dv := NewValidator()
	if err := dv.Validate(lp); err != nil {
		return err
	}

	loginUseCase := usecase.NewLogin(h.Core.ErrorLog, h.Core.Repository.UserRepository)
	result, err := loginUseCase.Base(lp.Email, lp.Password)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, result)
}

func (h *Handler) Register(c echo.Context) error {
	registerUseCase := usecase.NewRegister(h.Core.ErrorLog, h.Core.Repository.UserRepository)
	result, err := registerUseCase.Base("andrzej@example.com", "mysecretpassword")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, result)
}
