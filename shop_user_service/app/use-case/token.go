package usecase

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/andust/shop_user_service/constants"
	"github.com/andust/shop_user_service/repository"
	"github.com/andust/shop_user_service/utils"
	"github.com/redis/go-redis/v9"
)

type Token interface {
	Refres(accessToken string) (string, error)
}

type token struct {
	ErrorLog       *log.Logger
	UserRepository repository.UserRepository
	RedisClient    *redis.Client
}

func NewToken(logger *log.Logger, userRepository repository.UserRepository, redis *redis.Client) token {
	return token{ErrorLog: logger, UserRepository: userRepository, RedisClient: redis}
}

func (t *token) Refres(accessToken string) (string, error) {
	baseError := errors.New("refresh token error")

	// 1. get token struct and it's claim (need user id)
	token, _ := utils.VerifyToken(accessToken)
	claim, ok := utils.GetClaim(token)
	if !ok {
		return "", errors.New("get claim error")
	}

	// 2. pick and verify user refresh token
	subId := fmt.Sprint(claim["subId"])
	refreshToken, err := t.RedisClient.Get(context.Background(), subId).Result()
	if err != nil {
		return "", baseError
	}

	_, err = utils.VerifyToken(refreshToken)
	if err != nil {
		return "", baseError
	}

	// 3. If we don't have any error from verify refresh token then we generate new access token
	// TODO don't get data from DB just get this from claim
	user, err := t.UserRepository.FindOne(repository.UserQuery{ID: subId})
	if err != nil {
		t.ErrorLog.Println(err)
		return "", baseError
	}

	newAccessToken, err := utils.GenerateJWT(*user, constants.ACCESS_TOKEN_EXP)
	if err != nil {
		t.ErrorLog.Println(err)
		return "", baseError
	}

	return newAccessToken, nil
}
