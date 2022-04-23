/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { FrameBuilder } from './FrameBuilder'
import { FrameType } from './FrameType'
import Saveable from '../../Persistence/Saveable'
import SaveContainer from '../../Persistence/SaveContainer'
import CustomComplex from './CustomComplex'
import { ProjectTree } from '../ProjectTree'
import ChangeFrameParent from '../../Commands/Implementation/ChangeFrameParent'
import { ParameterEditor } from '../ParameterEditor'
import { FrameMap } from './ComponentMap'

export class FrameComponent implements Saveable {
    static readonly SAVE_KEY_NAME = 'name'
    static readonly SAVE_KEY_CHILDREN = 'children'
    static readonly SAVE_KEY_TYPE = 'type'
    static readonly SAVE_KEY_TOOLTIP = 'tooltip'
    static readonly SAVE_KEY_WORLDFRAME = 'world_frame'

    private name: string
    private children: FrameComponent[]
    type: FrameType
    private tooltip = false

    world_frame = false

    readonly custom: CustomComplex
    readonly treeElement: HTMLElement
    parentOption: HTMLOptionElement
    readonly layerDiv: HTMLDivElement
    // private orderInParent = 0;

    FieldsAllowed: ElementFieldsAllowed = JSON.parse(JSON.stringify(defaultFieldsAllowed))

    constructor(frameBuildOptions: FrameBuilder) {
        const ul: HTMLElement = document.createElement('ul')
        const li: HTMLElement = document.createElement('li')
        this.name = ''
        ul.append(li)

        this.treeElement = ul
        this.treeElement.setAttribute('style', 'cursor: pointer;')
        this.children = []
        this.parentOption = document.createElement('option')
        this.type = frameBuildOptions.type
        this.layerDiv = document.createElement('div')
        this.custom = new CustomComplex(
            this,
            frameBuildOptions.width,
            frameBuildOptions.height,
            frameBuildOptions.x,
            frameBuildOptions.y,
            frameBuildOptions.z,
            frameBuildOptions
        )

        this.setName(frameBuildOptions.name)
        // ;(ul as any).frameComponent = this
        FrameMap.getInstance().frameComponent.set(ul, this)

        li.onclick = () => {
            ProjectTree.getInstance().select(this)
        }

        this.setupAllowedFields()

        if (!ProjectTree.ShowBorders) this.custom.getElement().style.outlineWidth = '0px'
    }

    setTooltip(on: boolean): FrameComponent {
        this.tooltip = on
        let color = ProjectTree.outlineUnSelected
        if (on) color = ProjectTree.outlineUnSelected_Tooltip

        if (ProjectTree.getSelected() != this) {
            this.custom.getElement().style.outlineColor = color
        }

        return this
    }

    getTooltip(): boolean {
        return this.tooltip
    }

    getName(): string {
        return this.name
    }

    setName(newName: string): void {
        if (/.*\[[0-9]\]/.test(newName)) {
            const name1 = newName.slice(0, newName.length - 2)
            let name2 = newName.slice(newName.length - 2)
            name2 = '0' + name2
            newName = name1 + name2
        }

        this.name = newName
        try {
            ;(this.treeElement.firstChild as HTMLElement).innerText = newName
        } catch (error) {
            console.log(error)
        }

        if (this.parentOption) this.parentOption.text = newName
    }

    save(container: SaveContainer): void {
        container.save(FrameComponent.SAVE_KEY_NAME, this.name)
        container.save(FrameComponent.SAVE_KEY_TYPE, this.type)
        container.save(FrameComponent.SAVE_KEY_TOOLTIP, this.tooltip)
        container.save(FrameComponent.SAVE_KEY_WORLDFRAME, this.world_frame)
        this.custom.save(container)

        const childrenSaveArray: SaveContainer[] = []

        for (const child of this.children) {
            const childSaveContainer = new SaveContainer(null)
            child.save(childSaveContainer)
            childrenSaveArray.push(childSaveContainer)
        }

        if (childrenSaveArray.length > 0) container.save(FrameComponent.SAVE_KEY_CHILDREN, childrenSaveArray)
    }

    private appendFrame(frame: FrameComponent): void {
        // if(!this.layerDiv) {
        //     this.layerDiv = document.createElement("div")
        //     this.getParent().layerDiv.appendChild(this.layerDiv)
        // }

        // this.layerDiv.appendChild(frame.custom.getElement())

        this.layerDiv.appendChild(frame.layerDiv)

        this.children.push(frame)
        this.treeElement.append(frame.treeElement)
    }

    private removeFrame(whatFrame: FrameComponent): boolean {
        const childIndex = this.children.indexOf(whatFrame)

        if (childIndex == -1) return false

        this.children.splice(childIndex, 1)

        return true
    }

    createAsChild(newFrame: FrameBuilder): FrameComponent {
        const newChild = new FrameComponent(newFrame)

        this.appendFrame(newChild)
        if (!newChild.FieldsAllowed.parent) {
            new ChangeFrameParent(newChild, ProjectTree.getInstance().rootFrame).pureAction()
        }

        ProjectTree.refreshElements()
        return newChild
    }

    destroy() {
        const parent = this.getParent()
        if (!parent) return
        parent.removeFrame(this)

        for (const child of this.children) {
            parent.appendFrame(child)
        }

        this.treeElement.remove()
        if (this.custom != null) this.custom.delete()
        if (this.parentOption != null) this.parentOption.remove()

        ParameterEditor.getInstance().updateFields(null)
    }

    makeAsParentTo(newChild: FrameComponent) {
        if (newChild == this) return false

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let traverseNode: FrameComponent | undefined = this
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let previousNode: FrameComponent = this

        do {
            if (traverseNode == newChild) {
                newChild.removeFrame(previousNode)
                newChild.getParent()?.appendFrame(previousNode)

                break
            }

            previousNode = traverseNode
            traverseNode = traverseNode.getParent()
        } while (traverseNode)

        newChild.getParent()?.removeFrame(newChild)
        this.appendFrame(newChild)

        return true
    }

    static GetFrameComponent(projectTreeElement: HTMLElement) {
        return FrameMap.getInstance().frameComponent.get(projectTreeElement)
    }

    getChildren(): FrameComponent[] {
        return this.children
    }

    getParent() {
        return this.treeElement?.parentElement ? FrameComponent.GetFrameComponent(this.treeElement.parentElement) : undefined
    }

    changeOrigin(world_frame: boolean): FrameComponent {
        let parent: FrameComponent = this

        let foundOrigin = false
        while (foundOrigin == false) {
            if (!parent.getParent()) foundOrigin = true

            if (parent.getParent()?.type == FrameType.ORIGIN) {
                if (world_frame) {
                    parent.world_frame = true
                } else {
                    parent.world_frame = false
                }
                console.log('world_frame: ' + parent.world_frame)
                foundOrigin = true
                break
            }
            parent = parent.getParent() ?? parent
        }

        return this
    }

    setupAllowedFields() {
        const i = this.type
        const ft = FrameType
        const f = this.FieldsAllowed

        //reset to default
        Object.assign(this.FieldsAllowed, defaultFieldsAllowed)

        const allowText = () => {
            f.text = true
            f.color = true
            f.scale = true
        }

        switch (i) {
            case ft.BROWSER_BUTTON:
                allowText()
                f.trigVar = true
                f.tooltip = false
                break
            case ft.BUTTON:
                f.trigVar = true
                f.tooltip = false
                f.textures = true
                f.type = true

                break
            case ft.SCRIPT_DIALOG_BUTTON:
                allowText()
                f.trigVar = true
                f.tooltip = false

                break
            case ft.INVIS_BUTTON:
                f.trigVar = true
                f.tooltip = false

                break
            case ft.BACKDROP:
                f.textures = true
                f.type = true

                break
            case ft.CHECKBOX:
                f.trigVar = true
                break
            case ft.TEXT_FRAME:
                allowText()
                f.text = false
                f.textBig = true
                f.textAlign = true
                break
            case ft.HORIZONTAL_BAR:
                f.textures = true
                f.tooltip = false
                break
            case ft.HOR_BAR_BACKGROUND:
                f.textures = true
                f.backTextures = true
                f.tooltip = false
                f.parent = false
                break
            case ft.HOR_BAR_TEXT:
                f.textures = true
                allowText()
                f.textAlign = true
                f.tooltip = false
                f.parent = false
                break
            case ft.HOR_BAR_BACKGROUND_TEXT:
                f.textures = true
                f.backTextures = true
                allowText()
                f.textAlign = true
                f.tooltip = false
                f.parent = false
                break
            case ft.TEXTAREA:
                f.color = true
                f.textBig = true
                break
            case ft.EDITBOX:
                f.text = true
                break
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;

            default:
                break
        }
    }
}

interface ElementFieldsAllowed {
    text: boolean
    textBig: boolean
    type: boolean
    color: boolean
    scale: boolean
    textAlign: boolean
    textures: boolean
    backTextures: boolean
    trigVar: boolean
    /**Default is true */
    parent: boolean
    /**Default is true */
    tooltip: boolean
}

const defaultFieldsAllowed: ElementFieldsAllowed = {
    parent: true,
    tooltip: true,

    color: false,
    scale: false,
    text: false,
    textBig: false,
    textAlign: false,
    textures: false,
    backTextures: false,
    trigVar: false,
    type: false,
}
