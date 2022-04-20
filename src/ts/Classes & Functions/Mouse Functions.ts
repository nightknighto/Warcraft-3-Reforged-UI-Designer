import { debugText, InputEdit } from "./Mini-Functions"
import { Editor } from "../Editor/Editor"
import MoveFrame from "../Commands/Implementation/MoveFrame"
import { GUIEvents } from "./GUIEvents"
import CustomComplex from "../Editor/FrameLogic/CustomComplex"

export function MouseFunctions(div: CustomComplex): void {

    const workspaceImage = Editor.GetDocumentEditor().workspaceImage

    div.getElement().onmousedown = function (e) {
        const horizontalMargin = Editor.getInnerMargin()
        const actualMargin = Editor.getActualMargin()
        const projectTree = Editor.GetDocumentEditor().projectTree
        const frame = div.getFrameComponent()

        const startingX = div.getLeftX()
        const startingY = div.getBotY()
        const startingWidth = div.getWidth()
        const startingHeight = div.getHeight()

        projectTree.select(div)

        let posx1 = e.clientX
        let posy1 = e.clientY
        let posx2 = 0
        let posy2 = 0

        GUIEvents.isInteracting = true

        if ((e.clientX - div.getElement().getBoundingClientRect().x) > 5 && (e.clientX - div.getElement().getBoundingClientRect().x) < div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < div.getElement().offsetHeight - 5) {
            //not at edge, so drag
            document.body.style.cursor = "grabbing"
        }

        //debug((e.clientY - div.getElement().getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - div.getElement().getBoundingClientRect().x) > 5 && (e.clientX - div.getElement().getBoundingClientRect().x) < div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < div.getElement().offsetHeight - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX
                posy2 = posy1 - e.clientY
                posx1 = e.clientX
                posy1 = e.clientY

                debugText('drag')
                if (((div.getElement().offsetLeft - posx2) - (workspaceImage.getBoundingClientRect().x + actualMargin)) / workspaceImage.offsetWidth * 800 >= 0 && ((div.getElement().offsetLeft - posx2 + div.getElement().offsetWidth) - (workspaceImage.getBoundingClientRect().x - actualMargin)) / workspaceImage.offsetWidth * 800 <= 800) {
                    div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`
                }

                if (workspaceImage.getBoundingClientRect().bottom - (div.getElement().getBoundingClientRect().bottom - posy2) >= 0 && workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) <= 0) {
                    div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`
                }
                inputElementsUpdate(div)
                document.body.style.cursor = "grabbing"
            }
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 || (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                //right and bottom edge: just resize
                if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posx1 = e.clientX
                        debugText(`(${div.getElement().offsetWidth}, ${div.getElement().offsetHeight})`)
                        debugText('resize right')
                        if ((div.getElement().offsetWidth - posx2) * 0.8 / workspaceImage.width <= .01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 + 'px'
                        }
                        else if (workspaceImage.getBoundingClientRect().right - actualMargin < div.getElement().offsetLeft + (div.getElement().offsetWidth - posx2)) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth - posx2 + 'px'
                        }

                        inputElementsUpdate(div)
                        document.body.style.cursor = "e-resize"
                    }
                }

                if ((e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY
                        posy1 = e.clientY
                        debugText('resize bot')

                        if ((div.getElement().offsetHeight - posy2) * 600 / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${10 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posy2)) {
                            null
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posy2}px`
                        }
                        inputElementsUpdate(div)
                        document.body.style.cursor = "n-resize"
                    }
                }

                //corner
                if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posy2 = posy1 - e.clientY
                        posx1 = e.clientX
                        posy1 = e.clientY
                        if ((div.getElement().offsetWidth - posx2) * 800 / workspaceImage.width <= 10) {
                            div.getElement().style.width = 10 * workspaceImage.width / 800 + 'px'
                        }
                        else if (workspaceImage.getBoundingClientRect().right - actualMargin < div.getElement().offsetLeft + (div.getElement().offsetWidth - posx2)) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth - posx2 + 'px'
                        }

                        if ((div.getElement().offsetHeight - posy2) * 600 / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${10 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posy2)) {
                            null
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posy2}px`
                        }
                        inputElementsUpdate(div)
                        document.body.style.cursor = "nw-resize"
                    }
                };

                //corner top-right NEW
                if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posy2 = posy1 - e.clientY
                        posx1 = e.clientX
                        posy1 = e.clientY
                        debugText(div.getElement().style.height)

                        if ((div.getElement().offsetWidth - posx2) * 0.8 / workspaceImage.width <= .01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 + 'px'
                        }
                        else if (workspaceImage.getBoundingClientRect().right - actualMargin < div.getElement().offsetLeft + (div.getElement().offsetWidth - posx2)) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth - posx2 + 'px'
                        }


                        if ((div.getElement().offsetHeight + posy2) * 0.6 / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${0.01 * workspaceImage.height / 0.6}`
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) > 0) {
                            null
                            debugText('resize top MAX')
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posy2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posy2
                        // div.getElement().offsetWidth = div.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                        document.body.style.cursor = "ne-resize"
                    }
                }

                //corner bottom-left NEW
                if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posy2 = posy1 - e.clientY
                        posx1 = e.clientX
                        posy1 = e.clientY
                        debugText(`(${div.getElement().offsetWidth}, ${div.getElement().offsetHeight})`)
                        if ((div.getElement().offsetWidth + posx2) * 0.8 / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 + 'px'
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + actualMargin) > div.getElement().offsetLeft - posx2) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth + posx2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`
                        }

                        if ((div.getElement().offsetHeight - posy2) * 600 / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${10 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posy2)) {
                            null
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posy2}px`
                        }
                        inputElementsUpdate(div)
                        document.body.style.cursor = "ne-resize"
                    }
                }

            } else if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 || (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                //top and left edge: resize and drag

                if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posx1 = e.clientX
                        debugText('resize left')

                        if ((div.getElement().offsetWidth + posx2) * 0.8 / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 + 'px'
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + actualMargin) > div.getElement().offsetLeft - posx2) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth + posx2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`
                        }

                        // div.getElement().offsetHeight = div.getElement().offsetHeight + posy2
                        // div.getElement().style.width = div.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                        document.body.style.cursor = "e-resize"
                    }
                }

                if ((e.clientY - div.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY
                        posy1 = e.clientY
                        debugText('resize top')

                        if ((div.getElement().offsetHeight + posy2) * 0.6 / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${0.01 * workspaceImage.height / 0.6}`
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) > 0) {
                            null
                            debugText('resize top MAX')
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posy2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posy2
                        // div.getElement().style.width = div.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                        document.body.style.cursor = "n-resize"
                    }
                }

                //corner
                if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX
                        posy2 = posy1 - e.clientY
                        posx1 = e.clientX
                        posy1 = e.clientY

                        if ((div.getElement().offsetWidth + posx2) * 800 / workspaceImage.width <= 10) {
                            div.getElement().style.width = 10 * workspaceImage.width / 800 + 'px'
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + actualMargin) > div.getElement().offsetLeft - posx2) {
                            null
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth + posx2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`
                        }

                        if ((div.getElement().offsetHeight + posy2) * 0.6 / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${0.01 * workspaceImage.height / 0.6}`
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) > 0) {
                            null
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posy2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posy2
                        // div.getElement().style.width = div.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                        document.body.style.cursor = "nw-resize"
                    }
                }

            }
        }


        window.onmouseup = function () {

            window.onmousemove = null
            window.onmouseup = null
            GUIEvents.isInteracting = false
            document.body.style.cursor = "default"

            if (startingX == div.getLeftX() && startingY == div.getBotY() && startingHeight == div.getHeight() && startingWidth == div.getWidth()) {
                return
                //Aka nothing has happened, user just did a selection, not undoing that shit, bye bye.
            }

            const command = new MoveFrame(frame, div.getLeftX(), div.getBotY(), div.getWidth(), div.getHeight(), { oldX: startingX, oldY: startingY, oldWidth: startingWidth, oldHeight: startingHeight })
            command.action(true)
        }

    }

    div.getElement().onmouseenter = function (e) {

        div.getElement().onmousemove = function (e) {
            if (GUIEvents.isInteracting) return
            // if(ProjectTree.getSelected() != div.getFrameComponent()) return

            if ((e.clientX - div.getElement().getBoundingClientRect().x) > 5 && (e.clientX - div.getElement().getBoundingClientRect().x) < div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < div.getElement().offsetHeight - 5) {
                //not at edge, so drag
                document.body.style.cursor = "grab"

            }
            else {
                //at edge, so resize
                //now determine which edges
                if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 || (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                    //right and bottom edge: just resize
                    if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5) {
                        //right
                        document.body.style.cursor = "e-resize"
                    }

                    if ((e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                        //bottom
                        document.body.style.cursor = "n-resize"
                    }

                    //corner
                    if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                        document.body.style.cursor = "nw-resize"
                    }

                    //corner top-right NEW
                    if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                        document.body.style.cursor = "ne-resize"
                    }

                    //corner bottom-left NEW
                    if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                        document.body.style.cursor = "ne-resize"
                    }


                } else if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 || (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                    //top and left edge: resize and drag

                    if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5) {
                        document.body.style.cursor = "e-resize"
                    }

                    if ((e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                        document.body.style.cursor = "n-resize"
                    }

                    //corner
                    if ((e.clientX - div.getElement().getBoundingClientRect().x) < 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                        document.body.style.cursor = "nw-resize"
                    }

                }
            }
        }

        div.getElement().onmouseleave = () => {
            div.getElement().onmousemove = null
            div.getElement().onmouseleave = null
            document.body.style.cursor = "default"

        }



    }
}

function inputElementsUpdate(div: CustomComplex) {

    const editor = Editor.GetDocumentEditor()
    const workspaceImage = editor.workspaceImage
    const parameterEditor = editor.parameterEditor
    const horizontalMargin = Editor.getInnerMargin()

    parameterEditor.inputElementWidth.value = InputEdit((div.getElement().offsetWidth * 800 / (workspaceImage.width - 2 * horizontalMargin)))
    div.setWidth(+parameterEditor.inputElementWidth.value, true)
    parameterEditor.inputElementHeight.value = InputEdit(div.getElement().offsetHeight * 600 / workspaceImage.height)
    div.setHeight(+parameterEditor.inputElementHeight.value, true)
    parameterEditor.inputElementCoordinateX.value = `${InputEdit((div.getElement().offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2 * horizontalMargin) * 800)}`
    div.setLeftX(+parameterEditor.inputElementCoordinateX.value, true)
    parameterEditor.inputElementCoordinateY.value = `${InputEdit((workspaceImage.getBoundingClientRect().bottom - div.getElement().getBoundingClientRect().bottom) / workspaceImage.height * 600)}`
    div.setBotY(+parameterEditor.inputElementCoordinateY.value, true)

}