import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import SimpleCommand from '../../SimpleCommand'
import TableArray from '../../../Editor/FrameLogic/Arrays/TableArray'

export default class ChangeTableXGap extends SimpleCommand {
    private array: TableArray
    private newGap: number
    private oldGap: number

    public constructor(array: TableArray, XGap: number) {
        super()

        this.array = array
        this.newGap = XGap
        this.oldGap = array.getXGap()

        return this
    }

    public pureAction(): void {
        this.array.setXGap(this.newGap)
    }

    public undo(): void {

        super.undo()
        const undoCommand = new ChangeTableXGap(this.array, this.oldGap);
        undoCommand.pureAction()
        debugText('Undid XGap change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid XGap change.')
    }
}
