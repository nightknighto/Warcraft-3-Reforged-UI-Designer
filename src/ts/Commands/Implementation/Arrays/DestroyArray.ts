import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../../SimpleCommand'
import RemoveFrame from '../RemoveFrame'
import { FrameType } from '../../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../../Editor/ProjectTree'
import TableArray from '../../../Editor/FrameLogic/Arrays/TableArray'
import DuplicateArrayTable from './DuplicateArrayTable'
import BaseArray from '../../../Editor/FrameLogic/Arrays/BaseArray'
import CircleArray from '../../../Editor/FrameLogic/Arrays/CircleArray'

export default class DestroyArray extends SimpleCommand {
    private array: BaseArray

    public constructor(array: BaseArray) {
        super()

        this.array = array

        return this
    }

    public pureAction(): void {
        this.array.destroy()
        if(this.array instanceof TableArray) {
            ProjectTree.TableArrays.splice(ProjectTree.TableArrays.indexOf(this.array), 1)
        } else if(this.array instanceof CircleArray) {
            ProjectTree.CircleArrays.splice(ProjectTree.CircleArrays.indexOf(this.array), 1)
        }

    }

    public undo(): void {

        super.undo()
        let undoCommand;
        if(this.array instanceof TableArray) {
            undoCommand = new DuplicateArrayTable(this.array)
        } else if(this.array instanceof CircleArray) {
            throw new Error("Circle Arrays Delete undo not implemented.");
        }

        undoCommand.pureAction()
        debugText('Undid Create Array.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Create Array.')
    }
}
