import { debugText } from '../../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../../SimpleCommand'
import RemoveFrame from '../RemoveFrame'
import { FrameType } from '../../../Editor/FrameLogic/FrameType'
import { ProjectTree } from '../../../Editor/ProjectTree'
import CircleArray from '../../../Editor/FrameLogic/Arrays/CircleArray'

export default class ChangeCircleRadius extends SimpleCommand {
    private array: CircleArray
    private newRadius: number
    private oldRadius: number

    public constructor(array: CircleArray, radius: number) {
        super()

        this.array = array
        this.newRadius = radius
        this.oldRadius = array.getRadius()

        return this
    }

    public pureAction(): void {
        let name = ProjectTree.getSelected().getName()
        this.array.setRadius(this.newRadius)
        
        let search = ProjectTree.getInstance().findByName(name)
        if(search) ProjectTree.getInstance().select(search)
    }

    public undo(): void {

        super.undo()
        const undoCommand = new ChangeCircleRadius(this.array, this.oldRadius);
        undoCommand.pureAction()
        debugText('Undid Circle Radius change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid Circle Radius change.')
    }
}
