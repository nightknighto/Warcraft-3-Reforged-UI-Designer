import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";

export class RibbonOption {

    public readonly name: string;
    private callbackObject: ICallableDivInstance;

    public constructor(name: string, callbackObject: ICallableDivInstance) {

        this.name = name;
        this.callbackObject = callbackObject;

    }

    public createHTMLElement(): HTMLElement {

        const div = document.createElement('div');

        div.setAttribute('class', 'ribbonOption btn pt-2');
        div.innerText = this.name;

        ICallableDivInstance.setup(div, this.callbackObject);
        div.onclick = ICallableDivInstance.call;

        return div;

    }


}