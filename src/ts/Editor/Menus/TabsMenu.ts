import { RibbonMenu } from './RibbonMenu'

export class TabsMenu {

    public readonly barTab: HTMLElement;

    public constructor() {

        this.barTab = document.getElementById('barTab');
        this.tabs = [];

        for (let i = this.barTab.children.length - 1; i >= 0; i--)
            this.barTab.removeChild(this.barTab.children[i]);

    }

    private tabs: RibbonMenu[];

    public addTab(newTabMenu: RibbonMenu): void {

        this.tabs.push(newTabMenu);
        this.barTab.append(newTabMenu.createHTMLElement());

    }

}