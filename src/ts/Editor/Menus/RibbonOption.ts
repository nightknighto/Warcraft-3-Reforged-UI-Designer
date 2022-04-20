import { node } from "webpack"
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance"

export class RibbonOption {

    public readonly name: string
    private callbackObject: ICallableDivInstance
    private menuOptions: { name: string, callbackObject: ICallableDivInstance }[] = []

    public constructor (name: string, callbackObject: ICallableDivInstance) {

        this.name = name
        this.callbackObject = callbackObject

    }

    public createHTMLElement(): HTMLElement {

        const div = document.createElement('div')
        let callBtn = div as HTMLElement // default

        //div.innerText = this.name;
        switch (this.name) {

            // case "Texts": {
            //     div.innerText = this.name
            //     div.setAttribute('class', 'ribbonOption btn btn-outline-danger pt-2 insert');
            //     break;
            // }

            case "About Us": {
                div.setAttribute('data-bs-toggle', 'modal')
                div.setAttribute('data-bs-target', '#AboutUs')
                div.innerText = this.name
                div.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2')
                break
            }

            case "Hall of Fame": {
                div.setAttribute('data-bs-toggle', 'modal')
                div.setAttribute('data-bs-target', '#HallOfFame')
                div.innerText = this.name
                div.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2')
                break
            }

            case "Tutorials": {
                div.setAttribute('data-bs-toggle', 'modal')
                div.setAttribute('data-bs-target', '#Tutorial')
                div.innerText = this.name
                div.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2')
                break
            }

            case "Change Log": {
                div.setAttribute('data-bs-toggle', 'modal')
                div.setAttribute('data-bs-target', '#ChangeLog')
                div.innerText = this.name
                div.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2')
                break
            }

            default: {
                if (this.menuOptions.length > 0) {
                    if (this.callbackObject) callBtn = this.dropdownMenu(div, this.name, true)
                    else callBtn = this.dropdownMenu(div, this.name, false)
                } else {
                    div.innerText = this.name
                    div.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2')
                }
            }
        }

        ICallableDivInstance.setup(callBtn, this.callbackObject)
        callBtn.onclick = ICallableDivInstance.call

        return div

    }

    dropdownMenu(div: HTMLElement, name: string, withCaret: boolean): HTMLElement {
        div.setAttribute('class', 'btn-group')
        div.style.minWidth = "fit-content"
        div.style.width = "7%"

        const btn = div.appendChild(document.createElement('button'))
        btn.innerText = name

        let dropBtn: HTMLButtonElement //the button to have dropdown menu
        if (withCaret) {
            btn.setAttribute('class', 'ribbonOption btn btn-outline-warning pt-2 insert')

            const caret = div.appendChild(document.createElement('button'))
            caret.setAttribute('class', 'ribbonOption btn btn-outline-warning dropdown-toggle dropdown-toggle-split pt-3')
            caret.style.marginRight = "10px"

            const sp = caret.appendChild(document.createElement("span"))
            sp.setAttribute('class', 'caret')

            dropBtn = caret
        } else {
            btn.setAttribute('class', 'ribbonOption btn btn-outline-warning dropdown-toggle insert pt-2')

            // btn.style.marginLeft = "1"
            btn.style.minWidth = "100px"
            div.style.width = "7%"

            dropBtn = btn
        }

        dropBtn.setAttribute('data-bs-toggle', "dropdown")
        dropBtn.setAttribute('aria-haspopup', "true")
        dropBtn.setAttribute('aria-expanded', "false")
        if (name !== "Export") dropBtn.setAttribute('data-bs-auto-close', "outside")

        const ul = div.appendChild(document.createElement('ul'))
        ul.setAttribute('class', 'dropdown-menu')
        ul.style.zIndex = "5"
        for (const ob of this.menuOptions) {
            const li = ul.appendChild(document.createElement('li'))
            li.setAttribute('class', 'dropdown-item')
            li.innerText = ob.name

            ICallableDivInstance.setup(li, ob.callbackObject)
            li.onclick = ICallableDivInstance.call
        }

        return btn
    }

    addMenuOption(name: string, callable: ICallableDivInstance): this {
        this.menuOptions.push({ name: name, callbackObject: callable })
        return this
    }

}