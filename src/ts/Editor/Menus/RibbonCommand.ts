import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { RibbonOption } from "./RibbonOption"

export class RibbonCommand implements RibbonOption{

    readonly name : string;
    readonly callbackObject : ICallableDivInstance;

    constructor(name: string, callbackObject: ICallableDivInstance){
        this.name = name
        this.callbackObject = callbackObject
    }

    public CreateHTMLElement() : HTMLElement{

        const div = document.createElement('div');

        div.setAttribute('class', 'ribbonOption');
        div.innerText = this.name;
    
        ICallableDivInstance.Setup(div, this.callbackObject);
        div.onclick = ICallableDivInstance.Call;

        return div;

    }


}