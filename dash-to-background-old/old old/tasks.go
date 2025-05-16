package main

import (
	"errors"
	"os"

	"gopkg.in/yaml.v3"
)

var (
	// DataDirPath = os.Getenv("HOME") + "/.config/.dash-to-background/"
	DataDirPath = "tmpdata/"
	Tasks       = []Task{}
)

type Task struct {
	Name    string
	Command string
}

func init() {
	if _, err := os.Stat(DataDirPath); os.IsNotExist(err) {
		os.MkdirAll(DataDirPath, 0755)
	}

	GetTasks()
}

func GetTasks() {
	f, _ := os.Open(DataDirPath + "tasks.yml")
	defer f.Close()

	var tasks []Task
	dec := yaml.NewDecoder(f)
	dec.Decode(&tasks)

	Tasks = tasks
}

func SaveTasks() {
	f, _ := os.Create(DataDirPath + "tasks.yml")
	defer f.Close()

	enc := yaml.NewEncoder(f)
	enc.Encode(Tasks)
}

func AddTask(name, command string) error {
	for _, cmd := range Tasks {
		if cmd.Name == name {
			// Tasks[i].Command = command
			return errors.New("Task with this name already exists")
		}
	}

	Tasks = append(Tasks, Task{Name: name, Command: command})
	SaveTasks()
	return nil
}

func RemoveTask(name string) {
	for i, cmd := range Tasks {
		if cmd.Name == name {
			Tasks = append(Tasks[:i], Tasks[i+1:]...)
			break
		}
	}

	SaveTasks()
}
