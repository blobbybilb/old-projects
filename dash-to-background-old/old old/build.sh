# build for all platforms, and save to ./build/<platform>/--

# build for linux
GOOS=linux GOARCH=amd64 go build -o build/linux-amd64/--
GOOS=linux GOARCH=arm64 go build -o build/linux-arm64/--

# build for mac
GOOS=darwin GOARCH=amd64 go build -o build/mac-amd64/--
GOOS=darwin GOARCH=arm64 go build -o build/mac-arm64/--

# build for windows
GOOS=windows GOARCH=amd64 go build -o build/windows-amd64/--.exe

# build for freebsd
GOOS=freebsd GOARCH=amd64 go build -o build/freebsd-amd64/--
GOOS=freebsd GOARCH=arm64 go build -o build/freebsd-arm64/--