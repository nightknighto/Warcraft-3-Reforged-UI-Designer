import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";

export default class ChangeFrameHeight extends SimpleCommand{

    private frame: string;
    private height: number;
    private oldHeight: number;

    public constructor(frame : FrameComponent|string, newHeight: number){
        super();

        if(typeof(frame) === "string"){
            this.frame = frame;
        }
        else{
            this.frame = frame.getName();
        }

        this.height = newHeight;

    }


    public undo(): void{

        const command = new ChangeFrameHeight(this.frame, this.oldHeight);
        command.pureAction();

        super.undo();
        debugText("Undid frame change height.");

    }

    public redo(): void{
        super.redo();
        debugText("Redid frame change height.");
    }

    public pureAction(): void {
        
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame);

        if(typeof(frame) === "undefined"){
            debugText("Could not find frame.");
            return;
        }

        this.oldHeight = frame.custom.getHeight();
        frame.custom.setHeight(this.height);

    }

}