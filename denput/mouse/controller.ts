import { pynput } from "../deps.ts"
import { Button } from "./types.ts"

class Controller {
  controller

  constructor() {
    this.controller = pynput.mouse.Controller()
  }

  get position(): [number, number] {
    const [x, y] = this.controller.position
    return [x, y]
  }

  set position([x, y]: [number, number]) {
    this.controller.position = [x, y]
  }

  move(x: number, y: number) {
    this.controller.move(x, y)
  }

  press(button: Button) {
    this.controller.press(button)
  }

  release(button: Button) {
    this.controller.release(button)
  }

  click(button: Button, count = 1) {
    this.controller.click(button, count)
  }

  scroll(x: number, y: number) {
    this.controller.scroll(x, y)
  }
}

export { Controller }
