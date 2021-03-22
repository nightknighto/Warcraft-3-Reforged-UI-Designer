import { FrameComponent } from "./FrameComponent";
import { FrameType } from "./FrameType";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";
import { debugText } from "../../Classes & Functions/Mini-Functions";

export class FrameBuilder implements ICallableDivInstance{

    public static frameNumber = 1;

    public width = 0.20;
    public height = 0.20;
    public x = 0.250;
    public y = 0.250;
    public name = 'Frame';
    public type : FrameType = FrameType.BACKDROP;
    public texture = "";
    
    public constructor(){ return this; }

    //Used for ICallableDivInstance, aka Insert Menu
    public Run() : void{
        
        const name = this.name;

        this.name += `${FrameBuilder.frameNumber++}`;
        Editor.GetDocumentEditor().projectTree.AppendToSelected(this);

        this.name = name;
        debugText('Element Created')
    }

}