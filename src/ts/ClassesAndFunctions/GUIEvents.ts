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

    static DisplayGameCoords(ev: MouseEvent): void {
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
            editor.debugGameCoordinates.innerText = gameCoordsString
        }
    }

    static DeleteSelectedImage(): void {
        const command = new RemoveFrame(ProjectTree.getInstance().getSelectedFrame())
        command.action()
    }

    static DuplicateSelectedImage(): void {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()
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

            const command = new CreateFrame(selected.getParent(), builder)
            command.action()

            debugText('Duplicated.')
        } catch (e) {
            alert(e)
        }
    }

    static DuplicateArrayCircular(centerX: number, centerY: number, radius: number, count: number, initAng: number, ownerArray: boolean): void {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()

            const command = new DuplicateArrayCircular(selected, centerX, centerY, radius, count, initAng, ownerArray)
            command.action()

            debugText('Duplicated Circular.')
        } catch (e) {
            alert(e)
        }
    }

    static DuplicateArrayTable(leftX: number, topY: number, rows: number, columns: number, gapX: number, gapY: number, ownerArray: boolean): void {
        try {
            const projectTree = ProjectTree.getInstance()
            const selected = projectTree.getSelectedFrame()

            const command = new DuplicateArrayTable(selected, rows, columns, leftX, topY, gapX, gapY, ownerArray)
            command.action()

            debugText('Duplicated Table form.')
        } catch (e) {
            alert(e)
        }
    }

    static PanelOpenClose(): void {
        const panel = ParameterEditor.getInstance().panelParameters
        const panelButton = Editor.getInstance().panelButton

        if (panel.style.visibility == 'visible') {
            // panel.style.minWidth = "0";
            // panel.style.width = "0";
            panel.style.visibility = 'hidden'
            panelButton.style.visibility = 'visible'
            document.getElementById('img').style.display = 'none'
            document.getElementById('imgBUTTON').style.display = 'none'
        } else {
            // panel.style.minWidth = panelDefaultminSize;
            // panel.style.width = panelDefaultSize;
            panel.style.visibility = 'visible'
            document.getElementById('img').style.display = 'initial'
            document.getElementById('imgBUTTON').style.display = 'initial'
        }
    }

    static TreeOpenClose(): void {
        const panel = document.getElementById('panelTree')
        const treeButton = Editor.getInstance().treeButton
        if (panel.style.visibility == 'visible') {
            panel.style.visibility = 'hidden'
            treeButton.style.visibility = 'visible'
        } else {
            panel.style.visibility = 'visible'
        }
    }
}
