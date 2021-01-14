import { RibbonOption } from "./RibbonOption";
import { ICallableDivInstance } from "../Classes & Functions/ICallableDivInstance";

export default RibbonMenu;
export class RibbonMenu implements ICallableDivInstance{

    private static ribbonBar : HTMLElement;

    public static SetRibbonBar(ribbonBar : HTMLElement){
        this.ribbonBar = ribbonBar;
    }

    private tabName: string;
    private ribbonOptions : RibbonOption[] = [];

    public constructor(name: string){

        this.tabName = name;

    }

    public AddRibbonOption(option : RibbonOption){

        this.ribbonOptions.push(option);

    }

    public Run(){

        //Remove everything from div.
        for (let i = RibbonMenu.ribbonBar.children.length - 1; i >= 0; i--) {

            RibbonMenu.ribbonBar.removeChild(RibbonMenu.ribbonBar.children[i]);

        }

        //Fill it back up
        for (let option of this.ribbonOptions) {

            RibbonMenu.ribbonBar.append(option.CreateHTMLElement());

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