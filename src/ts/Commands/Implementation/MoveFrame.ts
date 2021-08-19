import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";

export default class MoveFrame extends SimpleCommand {

    private oldData: {oldX: number, oldY: number, oldWidth: number, oldHeight: number};
    private newX: number;
    private newY: number;
    private newWidth: number;
    private newHeight: number;
    private target: string;

    public constructor(frame: string | FrameComponent, newX: number, newY: number, newWidth: number, newHeight: number, oldData? : {oldX: number, oldY: number, oldWidth: number, oldHeight: number}) {
        super();

        if (typeof (frame) === "string") {
            this.target = frame;
        }
        else {
            this.target = frame.getName();
        }

        this.oldData = oldData;
        this.newX = newX;
        this.newY = newY;
        this.newWidth = newWidth;
        this.newHeight = newHeight;

    }

    public undo(): void {

        if(this.oldData === undefined){
            debugText("Unknown previous state.");
            return;
        }

        const command = new MoveFrame(this.target, this.oldData.oldX, this.oldData.oldY, this.oldData.oldWidth, this.oldData.oldHeight);
        command.pureAction();

        super.undo();
        debugText("Undid frame mouse manipulation.");
    }

    public redo(): void{
        super.redo();
        debugText("Redid frame mouse manipulation.");
    }
    
    public pureAction(): void {
        
        const target = Editor.GetDocumentEditor().projectTree.findByName(this.target);

        if(typeof(target) === "undefined"){
            debugText("Could not find frame.");
            return;
        }
        const frameContent = target.custom;

        frameContent.setBotY(this.newY);
        frameContent.setLeftX(this.newX);
        frameContent.setHeight(this.newHeight);
        frameContent.setWidth(this.newWidth);

    }

}