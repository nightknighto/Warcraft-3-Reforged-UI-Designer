import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Actionable from "../Actionable";
import Redoable from "../Redoable";

export default class ChangeFrameName implements Redoable, Actionable{

    private oldName: string;
    private newName: string;

    public constructor(frame: FrameComponent | string, newName: string){

        if(typeof(frame) === "string"){
            this.oldName = frame;
        }
        else{
            this.oldName = frame.getName();
        }
        this.newName = newName;

    }
    redo(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, false);
        this.pureAction();
    }
    undo(): void {
        
        const undoCommand = new ChangeFrameName(this.newName, this.oldName);
        undoCommand.pureAction();
        Editor.GetDocumentEditor().changeStack.pushRedoChange(this);

    }

    pureAction(): void {
        
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.oldName);

        if(typeof(frame) === "undefined"){
            debugText("Could not find frame.");
            return;
        }

        frame.setName(this.newName);

    }

    action(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true);
        this.pureAction();
    }

}