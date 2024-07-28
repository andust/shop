package usecase

import (
	"errors"
	"log"

	model "github.com/andust/shop_user_service/models"
	"github.com/andust/shop_user_service/repository"
)

type register struct {
	ErrorLog       *log.Logger
	UserRepository repository.UserRepository
}

func NewRegister(logger *log.Logger, userRepository repository.UserRepository) register {
	return register{ErrorLog: logger, UserRepository: userRepository}
}

func (r *register) Base(email, password string) (*model.User, error) {
	dbUser, err := r.UserRepository.FindOne(repository.UserQuery{Email: email})
	if err != nil {
		r.ErrorLog.Println(err)
		return nil, errors.New("unexpected error, please try again")
	}
	if dbUser.ID != "" {
		return nil, errors.New("user exist")
	}

	user := model.User{
		Email:    email,
		Password: password,
	}
	user.HashPassword()

	newUser, err := r.UserRepository.InsertOne(user)
	if err != nil {
		r.ErrorLog.Println(err)
		return nil, errors.New("can't register user, please try again")
	}

	return newUser, nil
}
