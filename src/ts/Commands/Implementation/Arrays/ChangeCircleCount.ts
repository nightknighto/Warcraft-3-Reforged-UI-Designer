import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../../SimpleCommand'
import RemoveFrame from '../RemoveFrame'
import { FrameType } from '../../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../../Editor/ProjectTree'
import CircleArray from '../../../Editor/FrameLogic/Arrays/CircleArray'

export default class ChangeCircleCount extends SimpleCommand {
    private array: CircleArray
    private newCount: number
    private oldCount: number

    public constructor(array: CircleArray, count: number) {
        super()

        this.array = array
        this.newCount = count
        this.oldCount = array.getCount()

        return this
    }

    public pureAction(): void {
        let name = ProjectTree.getSelected().getName()
        this.array.setCount(this.newCount)
        
        ProjectTree.getInstance().select(this.array.getFirstElement())
    }

    public undo(): void {

        super.undo()
        const undoCommand = new ChangeCircleCount(this.array, this.oldCount);
        undoCommand.pureAction()
        debugText('Undid Circle Count change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Circle Count change.')
    }
}
