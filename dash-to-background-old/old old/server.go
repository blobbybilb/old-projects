package main

// import (
// 	"net/http"

// 	"github.com/labstack/echo"
// )

// func RunServer() {
// 	e := echo.New()
// 	e.GET("/", func(c echo.Context) error {
// 		return c.String(http.StatusOK, "dash-to-background -- v1")
// 	})

// 	e.GET("/tasks", func(c echo.Context) error {
// 		return c.JSON(http.StatusOK, Tasks)
// 	})

// 	e.POST("/addtask", func(c echo.Context) error {
// 		name := c.FormValue("name")
// 		command := c.FormValue("command")

// 		AddTask(name, command)

// 		return c.String(http.StatusOK, "OK")
// 	})

// 	e.POST("/reload", func(c echo.Context) error {
// 		Reload()
// 		return c.String(http.StatusOK, "OK")
// 	})

// 	e.POST("/removetask", func(c echo.Context) error {
// 		name := c.FormValue("name")
// 		RemoveTask(name)
// 		return c.String(http.StatusOK, "OK")
// 	})

// 	e.Logger.Fatal(e.Start(":60807"))
// }
