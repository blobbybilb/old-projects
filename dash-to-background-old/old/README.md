### Usage

Run the server: `-- -background` (put that in crontab or something)


```sh
-- <commmand> # Run a command
# -> Running (ID 100)

-- -restart <command> # Run a command, reloading if it stops
# -> Running (ID 100) (Auto restart: true)

-- -list # List running commands
# -> ID 100 | Reload: false | Command: <command> | Output file: <file>

-- -listall # List all commands
# -> ID 100 | Reload: false | Command: <command> | Output file: <file> | Status: Running

-- -stop <id> # Stop a command
# -> Stopped (ID 100)

-- -run <id> # Run a command
# -> Running (ID 100)

-- -rerun <id> # Stop and rerun a command
# -> Stopped (ID 100)

-- -cleanup # Archive all stopped commands
# -> Archived 1 commands
```