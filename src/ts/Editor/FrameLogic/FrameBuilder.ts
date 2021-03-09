import { FrameComponent } from "./FrameComponent";
import { FrameType } from "./FrameType";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";

export class FrameBuilder implements ICallableDivInstance{

    public width = 0.250;
    public height = 0.250;
    public x = 0.250;
    public y = 0.250;
    public name = 'Frame';
    public type : FrameType = FrameType.BACKDROP;
    public texture = "";
    
    public constructor(){ return this; }

    public Run() : FrameComponent{
        
        return Editor.GetDocumentEditor().projectTree.AppendToSelected(this);

    }

}