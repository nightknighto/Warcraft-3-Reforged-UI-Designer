import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import SimpleCommand from '../../SimpleCommand'
import BaseArray from '../../../Editor/FrameLogic/Arrays/BaseArray'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import CreateFrame from '../CreateFrame'

export default class CloneElementToArrayArray extends SimpleCommand {
    private array: BaseArray
    private clonedElement: FrameBuilder
    private oldElement: FrameBuilder
    private temp?: boolean

    public constructor(array: BaseArray, clonedElement: FrameComponent, temp = false) {
        super()

        this.array = array
        this.clonedElement = FrameBuilder.copy(clonedElement)
        this.oldElement = FrameBuilder.copy(array.getUnselectedElement())
        this.temp = temp

        return this
    }

    public pureAction(): void {
        let fr = this.array.getUnselectedElement().getParent().createAsChild(this.clonedElement)
        this.array.cloneProps(fr)
        fr.destroy()
    }

    public undo(): void {

        super.undo()
        
        let fr = this.array.getUnselectedElement().getParent().createAsChild(this.oldElement)
        const undoCommand = new CloneElementToArrayArray(this.array, fr, true)
        undoCommand.pureAction()
        fr.destroy()
        debugText('Undid Clone Element to Array.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Clone Element to Array.')
    }
}
