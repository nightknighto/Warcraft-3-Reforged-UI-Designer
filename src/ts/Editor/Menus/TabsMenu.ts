import { RibbonMenu } from './RibbonMenu'

export class TabsMenu {
    public readonly barTab: HTMLElement
    public readonly barTabInner: HTMLElement

    public constructor() {
        this.barTab = document.getElementById('barTab')
        this.barTabInner = document.getElementById('barTabInner')
        this.tabs = []
        this.barTab.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'

        for (let i = this.barTabInner.children.length - 1; i >= 0; i--) this.barTabInner.removeChild(this.barTabInner.children[i])
    }

    private tabs: RibbonMenu[]

    public addTab(newTabMenu: RibbonMenu): void {
        this.tabs.push(newTabMenu)
        this.barTabInner.append(newTabMenu.createHTMLElement())
    }
}
