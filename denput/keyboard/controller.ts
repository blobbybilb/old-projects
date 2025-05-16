import { pynput } from "../deps.ts"
import { Key } from "./types.ts"

class KeyboardController {
  controller

  constructor() {
    this.controller = new pynput.keyboard.Controller()
  }

  get ctrlPressed(): boolean {
    return this.controller.ctrl_pressed
  }

  get altPressed(): boolean {
    return this.controller.alt_pressed
  }

  get shiftPressed(): boolean {
    return this.controller.shift_pressed
  }

  get altGrPressed(): boolean {
    return this.controller.alt_gr_pressed
  }

  press(key: Key | string) {
    this.controller.press(key)
  }

  release(key: Key | string) {
    this.controller.release(key)
  }

  type(text: string) {
    this.controller.type(text)
  }

  typeWithModifiers(text: string, modifiers: Key[]) {
    this.controller.type(text, modifiers)
  }
}

export { KeyboardController }
