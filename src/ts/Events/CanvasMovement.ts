/** @format */

import { debugText } from '../ClassesAndFunctions/MiniFunctions'
import { Editor } from '../Editor/Editor'
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
    workspaceContainer: HTMLElement

    private constructor() {
        this.windowNumber = 5
        this.windowSizes = [5, 10, 25, 33.3, 50, 66.6, 75, 100, 125, 150, 175, 200, 250, 300, 400, 600, 800, 1200, 1600]
        this.workspace = document.getElementById('workspace') as HTMLElement
        this.workspaceContainer = document.getElementById('workspaceContainer') as HTMLElement

        // Handle Zoom and Wheel movement up/down and left/right
        this.workspaceContainer.addEventListener('wheel', this.onWheel)

        // Handle Canvas Dragging
        this.workspaceContainer.onmousedown = (ev) => {
            if(ev.altKey || Editor.getInstance().selectionMode == 'drag') this.dragCanvas(ev)
            else if(Editor.getInstance().selectionMode == 'zoom') this.zoomCanvasViaMouseMove(ev)
        }

        this.scale = 50
        this.moveToCenter()

        this.workspace.ondragstart = () => {
            return false
        }
    }

    get scale() {
        return (this.workspace.offsetHeight * 100) / 1080
    }

    set scale(value: number) {
        const currentHeight = this.workspace.offsetHeight
        const height = (value / 100) * 1080
        const heightDiff = height - currentHeight
        this.left -= heightDiff / 1.5
        this.top -= heightDiff / 2
        this.workspace.style.height = height.toString() + 'px'
        ProjectTree.refreshElements()
    }

    get height() {
        return this.workspace.offsetHeight
    }

    set height(value: number) {
        const currentHeight = this.workspace.offsetHeight
        const heightDiff = currentHeight - value
        this.left -= heightDiff / 1.5
        this.top -= heightDiff / 2
        this.workspace.style.height = value.toString() + 'px'
        ProjectTree.refreshElements()
    }

    get left() {
        return this.workspace.offsetLeft
    }

    set left(value: number) {
        this.workspace.style.left = value.toString() + 'px'
        ProjectTree.refreshElements()
    }

    get top() {
        return this.workspace.offsetTop
    }

    set top(value: number) {
        this.workspace.style.top = value.toString() + 'px'
        ProjectTree.refreshElements()
    }

    get width() {
        return this.workspace.offsetWidth
    }

    onWheel = (event: WheelEvent) => {
        if (event.altKey) {
            event.preventDefault()
            this.zoomCanvas(-event.deltaY * 0.01)
            } else if (!event.altKey && !event.shiftKey && !event.ctrlKey) {
                this.moveCanvasVertical(event)
            } else if (!event.altKey && event.shiftKey && !event.ctrlKey) {
                this.moveCanvasHorizontal(event)
        }
    }

    dragCanvas = (event: MouseEvent) => {
        if (event.altKey || Editor.getInstance().selectionMode == 'drag') {
            let prevCursor = document.body.style.cursor
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

                this.left -= posX2
                this.top -= posY2
                ProjectTree.refreshElements()
            }

            document.addEventListener('mousemove', onMouseMove)
            window.onmouseup = () => {
                document.body.style.cursor = prevCursor
                document.removeEventListener('mousemove', onMouseMove)
                window.onmouseup = null
            }
        }
    }

    zoomCanvas = (changeAmount: number) => {
        
        if (this.windowNumber + changeAmount > 0 && this.windowNumber + changeAmount < this.windowSizes.length - 1) {
            this.windowNumber += changeAmount

            this.scale = this.windowSizes[this.windowNumber]
        }
    }

    zoomCanvasViaMouseMove = (event: MouseEvent) => {
        // drag up for zoom in, drag down for zoom out
        let posY1 = event.clientY
        let posY2 = 0

        const onMouseMove = (e) => {
            posY2 = posY1 - e.clientY

            posY1 = e.clientY

            debugText('Zooming In/Out')
            this.zoomCanvas(posY2 / 2)
        }

        document.addEventListener('mousemove', onMouseMove)
        window.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove)
            window.onmouseup = null
        }
    }

    moveCanvasVertical = (event: WheelEvent) => {
        const changeAmount = event.deltaY
        let top = this.workspace.offsetTop
        top -= changeAmount

        this.top = top
    }

    moveCanvasHorizontal = (event: WheelEvent) => {
        const changeAmount = event.deltaY
        let left = this.workspace.offsetLeft
        left -= changeAmount
        this.workspace.style.left = left.toString() + 'px'

        this.left = left
    }

    moveToCenter() {
        const windowWidth = this.workspaceContainer.offsetWidth
        const windowHeight = this.workspaceContainer.offsetHeight

        this.left = (windowWidth - this.width) / 2
        this.top = (windowHeight - this.height) / 2
    }
}
