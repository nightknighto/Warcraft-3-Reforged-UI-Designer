import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { PopupOption } from "./PopupOption";

export class PopupMenu implements ICallableDivInstance {

    name: string;
    callbackObject: ICallableDivInstance;
    private popupOptions: PopupOption[] = []
    private divElement : HTMLElement

    constructor(name: string, callbackObject: ICallableDivInstance) {
        this.name = name
        this.callbackObject = callbackObject

        this.divElement = this.CreateHTMLElement()

        var container = document.createElement('div')
        container.setAttribute("class","dropdown-content")
        this.divElement.appendChild(container)

        this.popupOptions.forEach((it : PopupOption) => {
            container.appendChild(it.CreateHTMLElement())
        })
    }

    CreateHTMLElement(): HTMLElement {

        const div = document.createElement('div');

        div.setAttribute('class', 'dropdown dropbtn');
        div.innerText = this.name;

        ICallableDivInstance.Setup(div, this.callbackObject);
        div.onclick = ICallableDivInstance.Call;

        return div;

    }

    public AddPopupOption(option: PopupOption): void {
        this.popupOptions.push(option);
    }

    public Run = () => {

    }

}