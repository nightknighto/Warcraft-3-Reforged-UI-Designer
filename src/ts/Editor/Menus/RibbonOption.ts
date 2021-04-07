import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";

export interface RibbonOption{

    readonly name : string;
    readonly callbackObject : ICallableDivInstance

    CreateHTMLElement() : HTMLElement

}