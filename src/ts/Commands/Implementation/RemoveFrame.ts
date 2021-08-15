import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { CustomImage } from "../../Editor/FrameLogic/CustomImage";
import { CustomText } from "../../Editor/FrameLogic/CustomText";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Redoable from "../Redoable";
import CreateFrame from "./CreateFrame";

export default class RemoveFrame implements Redoable{

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
    
        const builder = new FrameBuilder(false);

        const iterator = Editor.GetDocumentEditor().projectTree.getIterator();
        let frame : FrameComponent = null;
        for(const currentFrame of iterator){
            if(currentFrame.getName() === this.frame){
                frame = currentFrame;
                break;
            }
        }

        if(parent == null){
            debugText("Could not find parent, abort.");
            return;
        }

        builder.name = this.frame;
        builder.type = frame.type;

        builder.text = frame.custom.getText();
        builder.x = frame.custom.getLeftX();
        builder.y = frame.custom.getBotY();
        builder.z = frame.custom.getZIndex();
        builder.height = frame.custom.getHeight();
        builder.width = frame.custom.getWidth();
        
        if(frame.custom instanceof CustomImage){
            builder.trigVar = frame.custom.getTrigVar();
            builder.texture = frame.custom.getDiskTexture();
            builder.wc3Texture = frame.custom.getWc3Texture();
        }
        else if(frame.custom instanceof CustomText){
            builder.color = frame.custom.getColor();
            builder.scale = frame.custom.getScale();
        }

        this.undoCommand = new CreateFrame(frame.getParent(), builder);
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