import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class ChangeFrameName extends SimpleCommand {
    private oldName: string
    private newName: string

    public constructor(frame: FrameComponent | string, newName: string) {
        super()

        if (typeof frame === 'string') {
            this.oldName = frame
        } else {
            this.oldName = frame.getName()
        }
        this.newName = newName
    }

    public undo(): void {
        super.undo()

        const undoCommand = new ChangeFrameName(this.newName, this.oldName)
        undoCommand.pureAction()
        debugText('Undid frame change name.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame change name.')
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.oldName)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        frame.setName(this.newName)
    }
}
