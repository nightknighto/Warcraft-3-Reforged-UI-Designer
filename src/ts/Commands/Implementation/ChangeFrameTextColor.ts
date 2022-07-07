import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class ChangeFrameTextColor extends SimpleCommand {
    private frame: FrameComponent
    private oldColor: string
    private newColor: string

    public constructor(frame: FrameComponent, newColor: string) {
        super()
        this.frame = frame
        this.newColor = newColor
        this.oldColor = frame.custom.getColor()
    }

    public undo(): void {
        super.undo()

        const undoCommand = new ChangeFrameTextColor(this.frame, this.oldColor)
        undoCommand.pureAction()
        debugText('Undid frame change text color.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame change text color.')
    }

    public pureAction(): void {
        this.frame.custom.setColor(this.newColor)
    }
}
