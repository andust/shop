package handlers

import (
	"net/http"
	"time"

	"github.com/andust/shop_user_service/core"
)

type Handler struct {
	Core *core.Core
}

func newHttpOnlyCookie(name, value, path string, t time.Time) *http.Cookie {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = value
	cookie.Path = path
	cookie.Expires = t
	cookie.HttpOnly = true
	return cookie
}

func newAccessCookie(value string) *http.Cookie {
	return newHttpOnlyCookie("access", value, "/api/v1/", time.Now().Add(time.Hour*24))
}
