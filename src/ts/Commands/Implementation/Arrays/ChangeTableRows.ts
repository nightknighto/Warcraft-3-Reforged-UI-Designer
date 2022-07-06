import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../../SimpleCommand'
import RemoveFrame from '../RemoveFrame'
import { FrameType } from '../../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../../Editor/ProjectTree'
import TableArray from '../../../Editor/FrameLogic/Arrays/TableArray'
import DuplicateArrayTable from './DuplicateArrayTable'

export default class ChangeTableRows extends SimpleCommand {
    private array: TableArray
    private newRows: number
    private oldRows: number

    public constructor(array: TableArray, rows: number) {
        super()

        this.array = array
        this.newRows = rows
        this.oldRows = array.getRows()

        return this
    }

    public pureAction(): void {
        this.array.setRows(this.newRows)
        ProjectTree.getInstance().select(this.array.getTarget())
    }

    public undo(): void {

        super.undo()
        const undoCommand = new ChangeTableRows(this.array, this.oldRows);
        undoCommand.pureAction()
        debugText('Undid Table Rows change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Table Rows change.')
    }
}
