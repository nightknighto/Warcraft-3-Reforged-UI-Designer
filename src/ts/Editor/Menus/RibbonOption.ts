import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";

export class RibbonOption{

    public readonly name : string;
    private callbackObject : ICallableDivInstance;

    public constructor(name : string, callbackObject : ICallableDivInstance){

        this.name = name;
        this.callbackObject = callbackObject;

    }

    public CreateHTMLElement() : HTMLElement{

        let div = document.createElement('div');

        div.setAttribute('class', 'ribbonOption');
        div.innerText = this.name;
    
        ICallableDivInstance.Setup(div, this.callbackObject);
        div.onclick = ICallableDivInstance.Call;

        return div;

    }


}