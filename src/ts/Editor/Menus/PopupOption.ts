import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";

export class PopupOption{

    readonly name : string;
    readonly callbackObject : ICallableDivInstance;

    constructor(name: string, callbackObject: ICallableDivInstance){
        this.name = name
        this.callbackObject = callbackObject
    }

    public CreateHTMLElement() : HTMLElement{

        const div = document.createElement('div');

        div.setAttribute('class', 'popupOption');
        div.innerText = this.name;
    
        ICallableDivInstance.Setup(div, this.callbackObject);
        div.onclick = ICallableDivInstance.Call;

        return div;

    }


}