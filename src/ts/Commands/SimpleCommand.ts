import { Editor } from '../Editor/Editor'
import Actionable from './Actionable'
import Redoable from './Redoable'

export default abstract class SimpleCommand implements Actionable, Redoable {
    public redo(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, false)
        this.pureAction()
    }

    public undo(): void {
        //When implementing, your own undo method, you MUST use super.undo() method call to update the changeStack
        Editor.GetDocumentEditor().changeStack.pushRedoChange(this)
    }

    public abstract pureAction(): void

    public action(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true)
        this.pureAction()
    }
}
