import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Redoable from "../Redoable";
import RemoveFrame from "./RemoveFrame";

export default class CreateFrame implements Redoable {
    private frameBuilder: FrameBuilder;
    private parent: string;
    private resultingFrame: FrameComponent;

    public constructor(parent: FrameComponent | string, frameBuilder: FrameBuilder) {

        if(typeof(parent) === "string"){
            this.parent = parent;
        }
        else{
            this.parent = parent.getName();
        }

        this.frameBuilder = frameBuilder;

        return this;

    }

    public pureAction(): FrameComponent{
        const iterator = Editor.GetDocumentEditor().projectTree.getIterator();
        let parent : FrameComponent = null;
        for(const frame of iterator){
            if(frame.getName() === this.parent){
                parent = frame;
                break;
            }
        }

        if(parent == null){
            debugText("Could not find parent, abort.");
            return;
        }

        this.resultingFrame = parent.createAsChild(this.frameBuilder)
        

        return this.resultingFrame;
    }

    public action(): FrameComponent {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true);
        return this.pureAction();
    }

    redo(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, false);
        this.pureAction();
    }

    undo(): void {

        if (this.resultingFrame == undefined) {
            debugText("Could not undo, missing object.");
            return;
        }

        const undoCommand = new RemoveFrame(this.resultingFrame);
        undoCommand.pureAction();
        Editor.GetDocumentEditor().changeStack.pushRedoChange(this);

    }

}