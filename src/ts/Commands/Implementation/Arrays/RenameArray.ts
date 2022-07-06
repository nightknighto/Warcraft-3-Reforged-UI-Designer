import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import SimpleCommand from '../../SimpleCommand'
import BaseArray from '../../../Editor/FrameLogic/Arrays/BaseArray'

export default class RenameArray extends SimpleCommand {
    private array: BaseArray
    private newName: string
    private oldName: string

    public constructor(array: BaseArray, newName: string) {
        super()

        this.array = array
        this.newName = newName
        this.oldName = array.getArrayName()

        return this
    }

    public pureAction(): void {
        this.array.renameArray(this.newName)
    }

    public undo(): void {

        super.undo()
        const undoCommand = new RenameArray(this.array, this.oldName)
        undoCommand.pureAction()
        debugText('Undid Create Array.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Create Array.')
    }
}
