/** @format */

import { debugText } from '../Classes & Functions/Mini-Functions'
import { ProjectTree } from '../Editor/ProjectTree'

export class CanvasMovement {
  private static instance: CanvasMovement

  static getInstance() {
    if (!CanvasMovement.instance) CanvasMovement.instance = new CanvasMovement()
    return CanvasMovement.instance
  }

  windowNumber: number
  windowSizes: number[]
  workspace: HTMLElement

  private constructor() {
    this.windowNumber = 5
    this.windowSizes = [5, 10, 25, 33.3, 50, 66.6, 75, 100, 125, 150, 175, 200, 250, 300, 400, 600, 800, 1200, 1600, 2400, 3200]
    this.workspace = document.getElementById('workspace')

    // Handle Zoom and Wheel movement up/down and left/right
    window.addEventListener('wheel', this.onWheel)

    // Handle Canvas Dragging
    window.onmousedown = this.onDrag

    this.workspace.ondragstart = () => {
      return false
    }
  }

  onWheel = (event: WheelEvent) => {
    if (event.altKey) {
      this.zoomCanvas(event)
    } else if (!event.altKey && !event.shiftKey && !event.ctrlKey) {
      this.moveCanvasVertical(event)
    } else if (!event.altKey && event.shiftKey && !event.ctrlKey) {
      this.moveCanvasHorizontal(event)
    }
  }

  onDrag = (event: MouseEvent) => {
    if (event.altKey) {
      document.body.style.cursor = 'grabbing'
      let posX1 = event.clientX
      let posY1 = event.clientY
      let posX2 = 0
      let posY2 = 0

      const onMouseMove = (e) => {
        posX2 = posX1 - e.clientX
        posY2 = posY1 - e.clientY

        posX1 = e.clientX
        posY1 = e.clientY

        debugText('Move Canvas')

        this.workspace.style.left = `${this.workspace.offsetLeft - posX2}px`
        this.workspace.style.top = `${this.workspace.offsetTop - posY2}px`
        ProjectTree.refreshElements()
      }

      document.addEventListener('mousemove', onMouseMove)
      window.onmouseup = () => {
        document.body.style.cursor = 'default'
        document.removeEventListener('mousemove', onMouseMove)
        window.onmouseup = null
      }
    }
  }

  zoomCanvas = (event: WheelEvent) => {
    event.preventDefault()

    const height = this.workspace.offsetHeight
    let left = this.workspace.offsetLeft
    let top = this.workspace.offsetTop

    const changeAmount = -event.deltaY * 0.01
    let newHeight: number

    if (this.windowNumber + changeAmount > 0 && this.windowNumber + changeAmount < this.windowSizes.length - 1) {
      this.windowNumber += changeAmount
      newHeight = (this.windowSizes[this.windowNumber] / 100) * 1080

      left += (height - newHeight) / 1.5
      top += (height - newHeight) / 2

      this.workspace.style.left = left + 'px'
      this.workspace.style.top = top + 'px'
      this.workspace.style.height = newHeight + 'px'
      ProjectTree.refreshElements()
    }
  }

  moveCanvasVertical = (event: WheelEvent) => {
    const changeAmount = event.deltaY
    let top = this.workspace.offsetTop
    top -= changeAmount
    this.workspace.style.top = top.toString() + 'px'
    ProjectTree.refreshElements()
  }

  moveCanvasHorizontal = (event: WheelEvent) => {
    const changeAmount = event.deltaY
    let left = this.workspace.offsetLeft
    left -= changeAmount
    this.workspace.style.left = left.toString() + 'px'
    ProjectTree.refreshElements()
  }
}
