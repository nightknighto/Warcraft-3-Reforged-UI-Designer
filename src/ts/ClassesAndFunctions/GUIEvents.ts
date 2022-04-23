import { EditorController } from '../Editor/EditorController'
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder'
import { debugText } from './MiniFunctions'
import CreateFrame from '../Commands/Implementation/CreateFrame'
import RemoveFrame from '../Commands/Implementation/RemoveFrame'
import DuplicateArrayCircular from '../Commands/Implementation/DuplicateArrayCircular'
import DuplicateArrayTable from '../Commands/Implementation/DuplicateArrayTable'
import { ProjectTree } from '../Editor/ProjectTree'
import { ParameterEditor } from '../Editor/ParameterEditor'
import { Editor } from '../Editor/Editor'

export class GUIEvents {
    static isInteracting = false

    static DisplayGameCoords(ev: MouseEvent) {
        const editor = Editor.getInstance()
        const workspaceImage = editor.workspaceImage

        const horizontalMargin = EditorController.getInnerMargin()
        const actualMargin = EditorController.getActualMargin()

        let gameCoordsString: string
        const workspaceRect: DOMRect = workspaceImage.getBoundingClientRect()

        if (
            ev.x >= workspaceRect.left + actualMargin &&
            ev.x <= workspaceRect.right - actualMargin &&
            ev.y >= workspaceRect.top &&
            ev.y <= workspaceRect.bottom
        ) {
            const gameX = Math.floor(((ev.x - workspaceRect.left - horizontalMargin) / (workspaceImage.width - 2 * horizontalMargin)) * 800) / 1000
            const gameY = Math.floor(600 - ((ev.y - workspaceRect.top) / workspaceImage.offsetHeight) * 600) / 1000
            gameCoordsString = `Game X/Y: (${gameX.toFixed(3)}, ${gameY.toFixed(3)})`
            if (editor.debugGameCoordinates) editor.debugGameCoordinates.innerText = gameCoordsString
        }
    }

    static DeleteSelectedFrame() {
        const selectedFrame = ProjectTree.getInstance().getSelectedFrame()
        if (selectedFrame !== null) {
            const command = new RemoveFrame(selectedFrame)
            command.action()
        }
    }

    static DuplicateSelectedFrame() {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()
            if (!selected) return

            const builder = FrameBuilder.copy(selected)

            builder.x = builder.x + 0.03
            builder.y = builder.y > 0.03 ? builder.y - 0.03 : 0 // Prevents Duplicate from pasting into Negative space
            builder.name = builder.name.replace('[', '').replace(']', '')
            if (projectTree.findByName(builder.name + 'Copy')) {
                let i = 0
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    i++
                    if (!projectTree.findByName(builder.name + 'Copy' + i)) {
                        builder.name += 'Copy' + i
                        break
                    }
                }
            } else {
                builder.name += 'Copy'
            }

            const parent = selected.getParent()
            if (parent) {
                const command = new CreateFrame(parent, builder)
                command.action()
            }

            debugText('Duplicated.')
        } catch (e) {
            alert(e)
        }
    }

    static DuplicateArrayCircular(centerX: number, centerY: number, radius: number, count: number, initAng: number, ownerArray: boolean) {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()
            if (!selected) return

            const command = new DuplicateArrayCircular(selected, centerX, centerY, radius, count, initAng, ownerArray)
            command.action()

            debugText('Duplicated Circular.')
        } catch (e) {
            alert(e)
        }
    }

    static DuplicateArrayTable(leftX: number, topY: number, rows: number, columns: number, gapX: number, gapY: number, ownerArray: boolean) {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()
            if (!selected) return

            const command = new DuplicateArrayTable(selected, rows, columns, leftX, topY, gapX, gapY, ownerArray)
            command.action()

            debugText('Duplicated Table form.')
        } catch (e) {
            alert(e)
        }
    }

    static PanelOpenClose() {
        const panel = ParameterEditor.getInstance().panelParameters
        const panelButton = Editor.getInstance().panelButton

        if (panel.style.visibility == 'visible') {
            // panel.style.minWidth = "0";
            // panel.style.width = "0";
            panel.style.visibility = 'hidden'
            panelButton.style.visibility = 'visible'
            const img = document.getElementById('img')
            if (img) img.style.display = 'none'
            const imgButton = document.getElementById('imgBUTTON')
            if (imgButton) imgButton.style.display = 'none'
        } else {
            // panel.style.minWidth = panelDefaultminSize;
            // panel.style.width = panelDefaultSize;
            panel.style.visibility = 'visible'
            const img = document.getElementById('img')
            if (img) img.style.display = 'initial'
            const imgButton = document.getElementById('imgBUTTON')
            if (imgButton) imgButton.style.display = 'initial'
        }
    }

    static TreeOpenClose() {
        const panel = document.getElementById('panelTree')
        const treeButton = Editor.getInstance().treeButton
        if (panel?.style.visibility == 'visible') {
            panel.style.visibility = 'hidden'
            treeButton.style.visibility = 'visible'
        } else {
            if (panel) panel.style.visibility = 'visible'
        }
    }
}
