import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";

export default class ChangeFrameY extends SimpleCommand{

    private frame : string;
    private newY: number;
    private oldY: number;

    public constructor(frame : FrameComponent|string, y : number){
        super();

        if(typeof(frame) === "string"){
            this.frame = frame;
        }
        else{
            this.frame = frame.getName();
        }

        this.newY = y;

    }

    public pureAction(): void {
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame);

        if(typeof(frame) === "undefined"){
            debugText("Could not find frame.");
            return;
        }

        this.oldY = frame.custom.getBotY();
        frame.custom.setBotY(this.newY);
    }

    public undo(): void{
        const undoCommand = new ChangeFrameY(this.frame, this.oldY);
        undoCommand.pureAction();

        super.undo();
        debugText("Undid change frame Y");
    }

    public redo(): void{
        super.redo();
        debugText("Redid change frame Y");
    }

}