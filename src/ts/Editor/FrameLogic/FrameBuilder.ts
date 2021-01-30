import { FrameComponent } from "./FrameComponent";
import { FrameType } from "./FrameType";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { ProjectTree } from "../ProjectTree";
import { Editor } from "../Editor";

export class FrameBuilder implements ICallableDivInstance{

    public width : number = 250;
    public height : number = 250;
    public x : number = 250;
    public y : number = 250;
    public name : string = 'Frame ';
    public type : FrameType = FrameType.BACKDROP;
    public texture : string = "null.png";
    
    public constructor(){ return this; }

    public Run(){
        
        Editor.GetDocumentEditor().projectTree.AppendToSelected(this);

    }

}