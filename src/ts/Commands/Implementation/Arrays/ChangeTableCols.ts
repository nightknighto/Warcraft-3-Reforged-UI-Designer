import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../../SimpleCommand'
import RemoveFrame from '../RemoveFrame'
import { FrameType } from '../../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../../Editor/ProjectTree'
import TableArray from '../../../Editor/FrameLogic/Arrays/TableArray'
import DuplicateArrayTable from './DuplicateArrayTable'

export default class ChangeTableCols extends SimpleCommand {
    private array: TableArray
    private newCols: number
    private oldCols: number

    public constructor(array: TableArray, cols: number) {
        super()

        this.array = array
        this.newCols = cols
        this.oldCols = array.getCols()

        return this
    }

    public pureAction(): void {
        this.array.setCols(this.newCols)
        ProjectTree.getInstance().select(this.array.getTarget())
    }

    public undo(): void {

        super.undo()
        const undoCommand = new ChangeTableCols(this.array, this.oldCols);
        undoCommand.pureAction()
        debugText('Undid Table Cols change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Table Cols change.')
    }
}
