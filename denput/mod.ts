import { python } from "./deps.ts"

const { version, executable } = python.import("sys")

const pythonInfo = {
  version: version.toString() as string,
  executable: executable.toString() as string,
}

function installPynput() {
  if (
    new Deno.Command(pythonInfo.executable, {
      args: ["-m", "pip", "install", "pynput"],
    }).outputSync().success
  ) console.log("pynput installed")
  else console.log("error: pynput not installed")
}

export { installPynput, pythonInfo }
