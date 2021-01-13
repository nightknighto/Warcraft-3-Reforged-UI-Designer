import { RibbonOption } from "./RibbonOption";

export default RibbonMenu;
export class RibbonMenu{

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

        console.log('Ribbon Menu: ' + this.tabName + ' has ' + this.ribbonOptions.length + ' options.')

    }

    public ShowOptions() {

        //Remove everything from div.
        for (let i = RibbonMenu.ribbonBar.children.length - 1; i >= 0; i--) {

            RibbonMenu.ribbonBar.removeChild(RibbonMenu.ribbonBar.children[i]);

        }

        //Fill it back up
        for (let option of this.ribbonOptions) {

            RibbonMenu.ribbonBar.append(option.CreateHTMLElement());

        }

    }

    public static OnClick(ev: Event){
        //a very dirty way of doing things in typescript.
        (ev.target as any).instance.ShowOptions();
    }

    public CreateHTMLElement() : HTMLElement{

        let menu = document.createElement('div');

        menu.setAttribute('class', 'tab');
        menu.innerText = this.tabName;

        (menu as any).instance = this;
        
        menu.onclick = RibbonMenu.OnClick;


        return menu;

    }

}