import { pynput } from "../deps.ts"
import { Button } from "./types.ts"

class Listener {
  onMove
  onClick
  onScroll
  listener

  constructor(
    onMove: (x: number, y: number) => void,
    onClick: (x: number, y: number, button: Button, pressed: boolean) => void,
    onScroll: (x: number, y: number, dx: number, dy: number) => void,
  ) {
    this.onMove = onMove
    this.onClick = onClick
    this.onScroll = onScroll

    this.listener = new pynput.mouse.Listener({
      on_click: this.onClick,
      on_move: this.onMove,
      on_scroll: this.onScroll,
    }).join()
  }
}

new Listener(
  (x, y) => console.log("move", x, y),
  (x, y, button, pressed) => console.log("click", x, y, button, pressed),
  (x, y, dx, dy) => console.log("scroll", x, y, dx, dy),
)

export { Listener }
