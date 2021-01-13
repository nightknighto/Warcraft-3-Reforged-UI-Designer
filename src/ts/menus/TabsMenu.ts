import RibbonMenu from './RibbonMenu'

export class TabsMenu{

    private static tabs : RibbonMenu[] = [];

    static AddTab(tab : RibbonMenu){

        this.tabs.push(tab);

    }

    static Show(div : HTMLElement){

        //Remove everything from div.
        for(let i = div.children.length - 1; i >= 0; i--){

            div.removeChild(div.children[i]);

        }

        //Fill it back up
        for(let tab of this.tabs){

            div.append(tab.CreateHTMLElement());

        }

    }

    
}