import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Actionable from "../Actionable";

export default class ChangeFrameName implements Actionable{

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

    pureAction(): void {
        
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.oldName);

        if(typeof(frame) === "undefined"){
            debugText("Could not find frame.");
            return;
        }

        frame.setName(this.newName);

    }

    action(): void {
        this.pureAction();
    }

}