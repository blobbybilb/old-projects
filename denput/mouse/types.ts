import { pynput } from "../deps.ts"

export enum Button {
  left = pynput.mouse.Button.left,
  middle = pynput.mouse.Button.middle,
  right = pynput.mouse.Button.right,
}

console.log(Button.left)
