import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { Editor } from '../../Editor/Editor'
import SaveContainer from '../../Persistence/SaveContainer'
import SimpleCommand from '../SimpleCommand'

export default class Load extends SimpleCommand {
    private dataContainer: SaveContainer
    private previousDataContainer: SaveContainer

    public constructor(state: SaveContainer) {
        super()
        this.dataContainer = state
    }

    public pureAction(): void {
        const projectTree = Editor.GetDocumentEditor().projectTree

        this.previousDataContainer = new SaveContainer(null)
        projectTree.save(this.previousDataContainer)

        projectTree.load(this.dataContainer)
    }

    public undo(): void {
        const command = new Load(this.previousDataContainer)
        command.pureAction()

        super.undo()
        debugText('Undid loading.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid loading.')
    }
}
