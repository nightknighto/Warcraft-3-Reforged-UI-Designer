import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import TableArray from '../../../Editor/FrameLogic/Arrays/TableArray'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../../Editor/ProjectTree'
import Actionable from '../../Actionable'
import SimpleCommand from '../../SimpleCommand'
import ChangeFrameName from '../ChangeFrameName'
import DestroyArray from './DestroyArray'
import RemoveFrame from '../RemoveFrame'

export default class DuplicateArrayTable extends SimpleCommand {
    array: TableArray

    private undoCommands: Actionable[] = []

    public constructor(array: TableArray) {
        super()
        this.array = array
        return this
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
        debugText('Undid frame duplication (table).')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame duplication (table).')
    }

    public pureAction(): void {
        const frame = this.array.target

        const oldName = frame.getName()
        this.array.create()

        frame.setName(frame.getName().replace('[', '').replace(']', '') + 'T[00]')
        this.undoCommands.push(new DestroyArray(this.array))
        this.undoCommands.push(new ChangeFrameName(frame, oldName))
        ProjectTree.TableArrays.push(this.array)
    }
}
