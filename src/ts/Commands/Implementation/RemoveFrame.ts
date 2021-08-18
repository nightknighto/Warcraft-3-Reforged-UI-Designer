import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";
import CreateFrame from "./CreateFrame";

export default class RemoveFrame extends SimpleCommand{

    private frame: string;
    private undoCommand: CreateFrame;

    public constructor(frame: FrameComponent | string){

        super();

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

    undo(): void {

        if (this.undoCommand == undefined) {
            debugText("Could not undo, missing builder.");
            return;
        }

        this.undoCommand.pureAction();
        super.undo();
    }

}