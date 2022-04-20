import { ICallableDivInstance } from "../Classes & Functions/ICallableDivInstance"
import { Editor } from "../Editor/Editor"

export default class Redo implements ICallableDivInstance {

    public run(): void {
        Editor.GetDocumentEditor().changeStack.redo()
    }

}