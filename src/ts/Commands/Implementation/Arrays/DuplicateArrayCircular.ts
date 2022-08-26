import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import Actionable from '../../Actionable'
import SimpleCommand from '../../SimpleCommand'
import ChangeFrameName from '../ChangeFrameName'
import RemoveFrame from '../RemoveFrame'
import CreateFrame from '../CreateFrame'
import { ProjectTree } from '../../../Editor/ProjectTree'
import CircleArray from '../../../Editor/FrameLogic/Arrays/CircleArray'
import DestroyArray from './DestroyArray'

export default class DuplicateArrayCircular extends SimpleCommand {
    array: CircleArray
    targetName: string

    private undoCommands: Actionable[] = []

    public constructor(array: CircleArray, initialFrame: FrameComponent) {
        super()
        this.array = array
        this.targetName = initialFrame.getName()

        return this
    }

    public pureAction() {
        const frame = ProjectTree.getInstance().findByName(this.targetName)
        if(!frame) {alert("not Found"); return}
        this.undoCommands.push(new CreateFrame(frame.getParent(), FrameBuilder.copy(frame)))
        this.array.create()
        this.undoCommands.push(new DestroyArray(this.array))
        new RemoveFrame(frame).pureAction()
        ProjectTree.CircleArrays.push(this.array)
    }

    public undo(): void {
        if (this.undoCommands.length == 0) {
            debugText('No applicable undo actions.')
            return
        }

        for (const command of this.undoCommands) {
            command.pureAction()
        }
        this.undoCommands = []

        super.undo()
        debugText('Undid duplicate array (circular).')
    }

    public redo(): void {
        super.redo()
        debugText('Redid duplicate array (circular).')
    }
}
