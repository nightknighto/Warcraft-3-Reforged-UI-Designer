import { RibbonOption } from './RibbonOption'
import { ICallableDivInstance } from '../../ClassesAndFunctions/ICallableDivInstance'

export class RibbonMenu implements ICallableDivInstance {
    public readonly tabName: string
    public readonly ribbonBar: HTMLElement
    private ribbonOptions: RibbonOption[] = []

    /**Overrides the default behavior with custom behavior. If it is used, default behavior of
     * removing and re-filling the bar below will not happen.
     */
    public override: () => void = null

    public constructor(name: string) {
        this.tabName = name
        this.ribbonBar = document.getElementById('barRibbon')

        this.ribbonBar.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        this.ribbonBar.style.backgroundAttachment = 'fixed'
    }

    public addRibbonOption(option: RibbonOption): void {
        this.ribbonOptions.push(option)
    }

    public run(): void {
        if (this.override) {
            this.override()
            return
        }

        //Remove everything from div.
        for (let i = this.ribbonBar.children.length - 1; i >= 0; i--) {
            this.ribbonBar.removeChild(this.ribbonBar.children[i])
        }

        //Fill it back up
        for (const option of this.ribbonOptions) {
            this.ribbonBar.append(option.createHTMLElement())
        }
    }

    public createHTMLElement(): HTMLElement {
        const menu = document.createElement('div')

        menu.setAttribute('class', 'tab btn')
        menu.innerText = this.tabName

        ICallableDivInstance.setup(menu, this)
        menu.onclick = ICallableDivInstance.call

        return menu
    }
}
