package utils

import (
	"net/http"
	"time"
)

func newHttpOnlyCookie(name, value, path string, t time.Time) *http.Cookie {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = value
	cookie.Path = path
	cookie.Expires = t
	cookie.HttpOnly = true
	return cookie
}

func NewAccessCookie(value string) *http.Cookie {
	return newHttpOnlyCookie("access", value, "/api/v1/", time.Now().Add(time.Hour*24))
}
