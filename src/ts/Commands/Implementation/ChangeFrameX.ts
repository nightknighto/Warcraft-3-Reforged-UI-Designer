import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class ChangeFrameX extends SimpleCommand {
    private frame: string
    private newX: number
    private oldX: number

    public constructor(frame: FrameComponent | string, x: number) {
        super()

        if (typeof frame === 'string') {
            this.frame = frame
        } else {
            this.frame = frame.getName()
        }

        this.newX = x
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        this.oldX = frame.custom.getLeftX()
        frame.custom.setLeftX(this.newX)
    }

    public undo(): void {
        const undoCommand = new ChangeFrameX(this.frame, this.oldX)
        undoCommand.pureAction()

        super.undo()
        debugText('Undid change frame X')
    }

    public redo(): void {
        super.redo()
        debugText('Redid change frame X')
    }
}
