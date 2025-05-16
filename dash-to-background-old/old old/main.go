package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go [name]")
		return
	}

	command := os.Args[1]

	if command == "background" {
		fmt.Println("dash-to-background running in background mode.")
		return
	} else if command == "run" {
		// AddTask(, os.Args[2])
	} else if command == "list" {
		fmt.Println(Tasks)
	} else if command == "reload" {
		Reload()
	} else if command == "remove" {
		if len(os.Args) < 3 {
			fmt.Println("Task name is required.")
		}
		RemoveTask(os.Args[2])
	} else if command == "help" {
		showHelp()
	} else {
		fmt.Println("Unknown command")
	}
}

func showHelp() {
	configText := fmt.Sprintf(`
falsename - a simple cross-shell command aliaser

Usage:
	-- background   -> start D2B in background mode (put this in crontab, etc.)

The config directory is %s
`, DataDirPath)
	fmt.Println(configText)
}
