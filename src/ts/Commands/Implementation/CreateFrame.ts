import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../SimpleCommand'
import RemoveFrame from './RemoveFrame'
import { FrameType } from '../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../Editor/ProjectTree'

export default class CreateFrame extends SimpleCommand {
    private frameBuilder: FrameBuilder
    private parent: string
    private resultingFrame?: FrameComponent

    public constructor(parent: FrameComponent | string, frameBuilder: FrameBuilder) {
        super()

        if (typeof parent === 'string') {
            this.parent = parent
        } else {
            this.parent = parent.getName()
        }

        this.frameBuilder = frameBuilder

        return this
    }

    public pureAction(): void {
        const projectTree = ProjectTree.getInstance()
        const frame = projectTree.findByName(this.parent)

        if (typeof frame === 'undefined') {
            debugText('Could not find parent, abort.')
            return
        }

        this.resultingFrame = frame.createAsChild(this.frameBuilder)
        projectTree.select(this.resultingFrame)

        if (this.resultingFrame.type == FrameType.HORIZONTAL_BAR) {
            this.resultingFrame.changeOrigin(true)
        }
    }

    public undo(): void {
        if (this.resultingFrame == undefined) {
            debugText('Could not undo, missing object.')
            return
        }

        if (this.resultingFrame.type == FrameType.HORIZONTAL_BAR) {
            this.resultingFrame.changeOrigin(false)
        }

        super.undo()

        const undoCommand = new RemoveFrame(this.resultingFrame)
        undoCommand.pureAction()
        debugText('Undid create frame.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid create frame.')
    }
}
