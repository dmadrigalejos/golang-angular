package main

import (
	"database/sql"
	"encoding/gob"
	"log"
	"net/http"

	"github.com/gobuffalo/packr"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"

	_ "github.com/go-sql-driver/mysql"
)

var store = sessions.NewCookieStore(securecookie.GenerateRandomKey(32))
var db, _ = sql.Open("mysql", "root:root@tcp(localhost)/notes")

func init() {
	gob.Register(&user{})
}

func main() {
	sessions.NewSession(store, "session-name")

	router := mux.NewRouter()

	defer db.Close()

	// Set routes
	router.HandleFunc("/login", userLogin).Methods("POST")
	router.HandleFunc("/login/authenticate", userAuthenticate).Methods("GET")
	router.HandleFunc("/login/invalidate", userLogout).Methods("GET")

	// Handle static content
	box := packr.NewBox("./static")
	fileServer := http.FileServer(box)
	router.PathPrefix("/").Handler(http.StripPrefix("/", fileServer))

	// Launch server
	log.Printf("Running from port 3000\n")
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
