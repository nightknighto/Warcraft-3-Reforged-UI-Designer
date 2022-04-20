import { debugText } from '../../Classes & Functions/Mini-Functions'
import { Editor } from '../../Editor/Editor'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../SimpleCommand'
import { ParameterEditor } from '../../Editor/ParameterEditor'
import { ProjectTree } from '../../Editor/ProjectTree'

export default class ChangeFrameTooltip extends SimpleCommand {
    private frame: string
    private tooltip: boolean
    private oldTooltip: boolean
    private childrenTooltipPair: [string, boolean][]

    public constructor(frame: FrameComponent | string, newTooltip: boolean) {
        super()

        if (typeof frame === 'string') {
            this.frame = frame
        } else {
            this.frame = frame.getName()
        }

        this.tooltip = newTooltip
    }

    public pureAction(): void {
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        this.oldTooltip = frame.getTooltip()

        this.childrenTooltipPair = []
        frame.getChildren().forEach((child: FrameComponent) => {
            this.childrenTooltipPair.push([child.getName(), child.getTooltip()])
            child.setTooltip(false)
            if (ProjectTree.getSelected() != child) child.custom.getElement().style.outlineColor = ProjectTree.outlineUnSelected
        })

        frame.setTooltip(this.tooltip)
    }

    public undo(): void {
        const projectTree = Editor.GetDocumentEditor().projectTree
        const frame = projectTree.findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        this.childrenTooltipPair.forEach((childTooltipPair: [string, boolean]) => {
            const child = projectTree.findByName(childTooltipPair[0])
            if (typeof child === 'undefined') return

            child.setTooltip(childTooltipPair[1])
            if (ProjectTree.getSelected() != child) {
                if (childTooltipPair[1]) child.custom.getElement().style.outlineColor = ProjectTree.outlineUnSelected_Tooltip
                else child.custom.getElement().style.outlineColor = ProjectTree.outlineUnSelected
            }
        })
        frame.setTooltip(this.oldTooltip)

        super.undo()
        debugText('Undid frame change tooltip.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame change tooltip.')
    }
}
