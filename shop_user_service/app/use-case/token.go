package usecase

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/andust/shop_user_service/repository"
	"github.com/andust/shop_user_service/utils"
	"github.com/golang-jwt/jwt"
)

type token struct {
	ErrorLog       *log.Logger
	UserRepository repository.UserRepository
}

func NewToken(logger *log.Logger, userRepository repository.UserRepository) token {
	return token{ErrorLog: logger, UserRepository: userRepository}
}

func (t *token) Refres(refreshToken string) (*utils.JWTResponse, error) {
	baseError := errors.New("refresh token error")

	token, err := utils.VerifyToken(refreshToken)
	if err != nil {
		t.ErrorLog.Println(err)
		return nil, baseError
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		sub := fmt.Sprint(claims["sub"])
		subId := fmt.Sprint(claims["subId"])
		user, err := t.UserRepository.FindOne(repository.UserQuery{ID: subId, Email: sub})
		if err != nil {
			t.ErrorLog.Println(err)
			return nil, baseError
		}

		access, err := utils.GenerateJWT(*user, time.Minute*15)
		if err != nil {
			t.ErrorLog.Println(err)
			return nil, baseError
		}

		return &utils.JWTResponse{
			Access:  access,
			Refresh: token.Raw,
		}, nil
	}

	return nil, baseError
}
