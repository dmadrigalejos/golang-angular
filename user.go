package main

import (
	"encoding/json"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type user struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

func userLogin(w http.ResponseWriter, r *http.Request) {
	log.Println("userLogin start")
	session, _ := store.Get(r, "session-name")

	// parse json param
	decoder := json.NewDecoder(r.Body)
	var u user
	err := decoder.Decode(&u)
	if err != nil {
		panic(err)
	}

	// query database here
	var usr user
	errq := db.QueryRow("SELECT * FROM user where username = ?", u.Username).Scan(&usr.ID, &usr.Username, &usr.Password, &usr.Firstname, &usr.Lastname)
	if errq != nil {
		return
	}

	// check password
	errb := bcrypt.CompareHashAndPassword([]byte(usr.Password), []byte(u.Password))
	if errb != nil {
		return
	}

	session.Values["user"] = usr

	session.Save(r, w)
	log.Println("userLogin end")
}

func userAuthenticate(w http.ResponseWriter, r *http.Request) {
	log.Println("userAuthenticate start")
	session, _ := store.Get(r, "session-name")

	// get sesion user
	usr := session.Values["user"]

	// prepare json response
	jsonResp, err := json.Marshal(usr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResp)

	log.Println("userAuthenticate end")
}

func userLogout(w http.ResponseWriter, r *http.Request) {
	log.Println("userLogout start")
	session, _ := store.Get(r, "session-name")
	session.Options.MaxAge = -1

	session.Save(r, w)
	log.Println("userLogout end")
}
