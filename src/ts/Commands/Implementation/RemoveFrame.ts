import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../SimpleCommand'
import CreateFrame from './CreateFrame'
import { FrameType } from '../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../Editor/ProjectTree'

export default class RemoveFrame extends SimpleCommand {
    private frame: string
    private undoCommand: CreateFrame
    private frameChildren: string[]

    public constructor(frame: FrameComponent | string) {
        super()

        if (typeof frame === 'string') {
            this.frame = frame
        } else {
            this.frame = frame.getName()
        }
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find parent, abort.')
            return
        }

        if (frame.type == FrameType.HORIZONTAL_BAR) {
            frame.changeOrigin(false)
        }

        this.undoCommand = new CreateFrame(frame.getParent(), FrameBuilder.copy(frame))
        this.frameChildren = frame.getChildren().map((it: FrameComponent) => it.getName())
        frame.destroy()
    }

    public undo(): void {
        if (this.undoCommand == undefined) {
            debugText('Could not undo, missing builder.')
            return
        }

        this.undoCommand.pureAction()

        const projectTree = ProjectTree.getInstance()
        const parent = projectTree.findByName(this.frame)
        if (typeof parent === 'undefined') {
            debugText('Could not find newly regenerated frame.')
            return
        }

        for (const frameName of this.frameChildren) {
            const frame = projectTree.findByName(frameName)
            if (typeof frame === 'undefined') continue
            parent.makeAsParentTo(frame)
        }

        super.undo()

        if (parent.type == FrameType.HORIZONTAL_BAR) {
            parent.changeOrigin(true)
        }

        debugText('Undid frame remove.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame remove.')
    }
}
