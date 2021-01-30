import { RibbonOption } from "./RibbonOption";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";

export class RibbonMenu implements ICallableDivInstance{

    public readonly tabName: string;
    public readonly ribbonBar: HTMLElement;
    private ribbonOptions : RibbonOption[] = [];

    public constructor(name: string){

        this.tabName = name;
        this.ribbonBar = document.getElementById('barRibbon');

    }

    public AddRibbonOption(option : RibbonOption){

        this.ribbonOptions.push(option);

    }

    public Run(){

        //Remove everything from div.
        for (let i = this.ribbonBar.children.length - 1; i >= 0; i--) {

            this.ribbonBar.removeChild(this.ribbonBar.children[i]);

        }

        //Fill it back up
        for (let option of this.ribbonOptions) {

            this.ribbonBar.append(option.CreateHTMLElement());

        }
    }

    public CreateHTMLElement() : HTMLElement{

        let menu = document.createElement('div');

        menu.setAttribute('class', 'tab');
        menu.innerText = this.tabName;

        ICallableDivInstance.Setup(menu, this);
        menu.onclick = ICallableDivInstance.Call;

        return menu;

    }

}