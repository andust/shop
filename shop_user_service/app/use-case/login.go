package usecase

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/andust/shop_user_service/repository"
	"github.com/andust/shop_user_service/utils"
)

type login struct {
	ErrorLog       *log.Logger
	UserRepository repository.UserRepository
}

func NewLogin(logger *log.Logger, userRepository repository.UserRepository) login {
	return login{ErrorLog: logger, UserRepository: userRepository}
}

func (l *login) Base(email, password string) (*utils.JWTResponse, error) {
	user, err := l.UserRepository.FindOne(repository.UserQuery{Email: email})
	if err != nil {
		l.ErrorLog.Println(err)
		return nil, errors.New("unexpected error, please try again")
	}

	if user.IsValidPassword(password) {
		accessToken, err := utils.GenerateJWT(*user, time.Minute*15)
		if err != nil {
			l.ErrorLog.Println("accessToken", err)
			return nil, errors.New("unexpected error, please try again")
		}
		refreshToken, err := utils.GenerateJWT(*user, time.Hour*24)
		if err != nil {
			l.ErrorLog.Println("refreshToken", err)
			return nil, errors.New("unexpected error, please try again")
		}
		return &utils.JWTResponse{
			Access:  accessToken,
			Refresh: refreshToken,
		}, nil
	}

	return nil, fmt.Errorf("login user error, please try again")
}
