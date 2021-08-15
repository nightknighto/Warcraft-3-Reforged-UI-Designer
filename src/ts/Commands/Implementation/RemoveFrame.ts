import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Actionable from "../Actionable";
import Redoable from "../Redoable";
import CreateFrame from "./CreateFrame";

export default class RemoveFrame implements Redoable, Actionable{

    private frame: string;
    private undoCommand: CreateFrame;

    public constructor(frame: FrameComponent | string){

        if(typeof(frame) === "string"){
            this.frame = frame;
        }
        else{
            this.frame = frame.getName();
        }
        
    }

    public pureAction(): void{
    
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame);

        if(typeof(frame) === "undefined"){
            debugText("Could not find parent, abort.");
            return;
        }

        this.undoCommand = new CreateFrame(frame.getParent(), FrameBuilder.copy(frame));
        frame.destroy();

    }

    public action(): void{

        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true)
        this.pureAction();

    }

    redo(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, false);
        this.pureAction();
    }

    undo(): void {

        if (this.undoCommand == undefined) {
            debugText("Could not undo, missing builder.");
            return;
        }

        this.undoCommand.pureAction();
            Editor.GetDocumentEditor().changeStack.pushRedoChange(this);
    }

}