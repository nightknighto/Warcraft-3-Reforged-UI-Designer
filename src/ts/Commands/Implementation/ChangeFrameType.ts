import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { FrameType } from '../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class ChangeFrameType extends SimpleCommand {
    private frame: string
    private newType: FrameType
    private oldType: FrameType

    public constructor(frame: FrameComponent | string, newType: FrameType) {
        super()

        if (typeof frame === 'string') {
            this.frame = frame
        } else {
            this.frame = frame.getName()
        }

        this.newType = newType
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        this.oldType = frame.type
        frame.type = this.newType
        frame.setupAllowedFields()
    }

    public undo(): void {
        const command = new ChangeFrameType(this.frame, this.oldType)
        command.pureAction()

        super.undo()
        debugText('Undid frame change type.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame change type.')
    }
}
