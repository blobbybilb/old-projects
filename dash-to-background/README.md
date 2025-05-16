Archived, not sure why I even made this (things like [pm2](https://github.com/Unitech/pm2?tab=readme-ov-file) exist)

---

# dash-to-background
A simple CLI command to run tasks in the background, restart if stopped, etc. Just put "--" before your command, and it will dash to background.

Status: beta (should work, but might not be very friendly yet)

### Usage

```bash
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

-- -archive <id> # Archive a command
# -> Archived (ID 100)
```

##### TODO
- [ ] Better info/error messages
- [ ] Default output files without needing shell redirects
- [ ] Choose shell, more robust behaviour
- [ ] Short command names
