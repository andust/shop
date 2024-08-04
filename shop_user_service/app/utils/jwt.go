package utils

import (
	"errors"
	"os"
	"strings"
	"time"

	model "github.com/andust/shop_user_service/models"
	"github.com/golang-jwt/jwt"
)

type JWTResponse struct {
	Access  string `json:"access"`
	Refresh string `json:"refresh"`
}

func GenerateJWT(user model.User, exp time.Duration) (string, error) {
	secretKey := os.Getenv("SECRET_KEY")
	cleanSecretKey := strings.TrimSpace(secretKey)
	if cleanSecretKey == "" && len(cleanSecretKey) < 64 {
		return "", errors.New("invalid secret key")
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.MapClaims{
		"subId": user.ID,
		"sub":   user.Email,
		"iss":   "user service",
		"aud":   user.Role,
		"exp":   time.Now().Add(exp).Unix(),
		"iat":   time.Now().Unix(),
	})

	tokenString, err := claims.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		return token, err
	}

	return token, nil
}

func GetClaim(token *jwt.Token) (jwt.MapClaims, bool) {
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return claims, ok
	}
	return jwt.MapClaims{}, false
}
