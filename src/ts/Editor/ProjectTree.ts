import { Queue } from 'queue-typescript'
import { FrameComponent } from './FrameLogic/FrameComponent'
import { FrameBuilder } from './FrameLogic/FrameBuilder'
import { FrameType } from './FrameLogic/FrameType & FrameRequire'
import { Editor } from './Editor'
import Saveable from '../Persistence/Saveable'
import SaveContainer from '../Persistence/SaveContainer'
import CustomComplex from './FrameLogic/CustomComplex'
import {
    AppInterfaces,
    AppInterfaceWoodenTexture,
    AppInterfaceBrownColors,
    AppInterfaceBlueColors,
    AppInterfacePurpleColors,
    AppInterfaceDarkColors,
} from './Menus/App Interface'

export class ProjectTree implements IterableIterator<FrameComponent>, Saveable {
    private static instance: ProjectTree
    static getInstance() {
        if (!ProjectTree.instance) ProjectTree.instance = new ProjectTree()
        return ProjectTree.instance
    }
    static readonly SAVE_KEY_ORIGIN_CHILDREN = 'frames'
    static readonly SAVE_KEY_LIBRARY_NAME = 'LibraryName'
    static readonly SAVE_KEY_HIDE_GAMEUI = 'GameUI'
    static readonly SAVE_KEY_HIDE_HEROBAR = 'HeroBar'
    static readonly SAVE_KEY_HIDE_MINIMAP = 'MiniMap'
    static readonly SAVE_KEY_HIDE_RESOURCES = 'Resources'
    static readonly SAVE_KEY_HIDE_BUTTONBAR = 'ButtonBar'
    static readonly SAVE_KEY_HIDE_PORTRAIT = 'Portrait'
    static readonly SAVE_KEY_HIDE_CHAT = 'Chat'
    static readonly SAVE_KEY_ORIGIN_MODE = 'OriginMode'
    static readonly SAVE_KEY_APP_INTERFACE = 'AppInterface'

    static readonly outlineUnSelected_Tooltip = 'rgba(220, 242, 19, 0.8)' //yellow
    static readonly outlineUnSelected = 'rgba(0, 230, 64, 0.8)' //green
    static readonly outlineSelected = 'rgba(242, 38, 19, 0.8)' //red

    readonly rootFrame: FrameComponent
    readonly panelTree: HTMLElement
    private selectedFrame: FrameComponent

    static LibraryName = 'REFORGEDUIMAKER'
    static HideGameUI = false
    static HideHeroBar = false
    static HideMiniMap = false
    static HideResources = false
    static HideButtonBar = false
    static HidePortrait = false
    static HideChat = false
    static OriginMode = 'gameui'

    static ShowBorders = true
    static AppInterface = AppInterfaces.dark

    //path of project that was loaded. used for "Save" functionality
    static fileSavePath: string | null = null

    static refreshElements() {
        for (const el of ProjectTree.getInstance().getIterator()) {
            if (el.type === FrameType.ORIGIN) {
                //base
                continue
            }

            const image = el.custom.getElement()
            const rect = Editor.GetDocumentEditor().workspaceImage.getBoundingClientRect()
            const workspace = Editor.GetDocumentEditor().workspaceImage
            const horizontalMargin = Editor.getInnerMargin()

            const x = el.custom.getLeftX()
            const y = el.custom.getBotY()
            const w = el.custom.getWidth()
            const h = el.custom.getHeight()

            image.style.width = (w / 0.8) * (workspace.width - 2 * horizontalMargin) + 'px'
            image.style.height = `${(+h / 0.6) * workspace.getBoundingClientRect().height}px`

            image.style.left = `${(x * (rect.width - 2 * horizontalMargin)) / 0.8 + rect.left + horizontalMargin}px`
            image.style.top = `${rect.bottom - (y * rect.height) / 0.6 - image.offsetHeight - 120}px`

            el.custom.setScale(el.custom.getScale())
        }
    }

    static setOriginMode(value: string) {
        if (value != 'gameui' && value != 'worldframe' && value != 'consoleui') value = 'gameui'

        this.OriginMode = value

        const radios = document.querySelectorAll('input[type=radio][name="OriginMode"]')
        radios.forEach((radio) => ((radio as HTMLInputElement).checked = (radio as HTMLInputElement).value === value))
    }

    static getSelected(): FrameComponent {
        return Editor.GetDocumentEditor().projectTree.getSelectedFrame()
    }

    static saveGeneralOptions(): void {
        const par = Editor.GetDocumentEditor().parameterEditor
        ProjectTree.LibraryName = par.inputLibraryName.value
        ProjectTree.HideGameUI = par.checkboxGameUI.checked
        ProjectTree.HideHeroBar = par.checkboxHeroBar.checked
        ProjectTree.HideMiniMap = par.checkboxMiniMap.checked
        ProjectTree.HideResources = par.checkboxResources.checked
        ProjectTree.HideButtonBar = par.checkboxButtonBar.checked
        ProjectTree.HidePortrait = par.checkboxPortrait.checked
        ProjectTree.HideChat = par.checkboxChat.checked
    }

    private constructor() {
        const originBuilder: FrameBuilder = new FrameBuilder(false)

        originBuilder.name = 'Origin'
        originBuilder.type = FrameType.ORIGIN
        originBuilder.width = 0
        originBuilder.height = 0
        originBuilder.x = 0
        originBuilder.y = 0
        originBuilder.z = 30

        this.rootFrame = new FrameComponent(originBuilder)
        this.rootFrame.setName('Origin')
        this.selectedFrame = this.rootFrame
        this.rootFrame.treeElement.style.fontWeight = '600'
        Editor.GetDocumentEditor().workspace.appendChild(this.rootFrame.layerDiv)

        this.panelTree = document.getElementById('panelTreeView')

        for (let i = this.panelTree.children.length - 1; i >= 0; i--) {
            this.panelTree.removeChild(this.panelTree.children[i])
        }

        this.panelTree.appendChild(this.rootFrame.treeElement)
    }

    save(container: SaveContainer): void {
        const originChildrenArray = []

        for (const frame of this.rootFrame.getChildren()) {
            const frameSaveContainer = new SaveContainer(null)
            frame.save(frameSaveContainer)
            originChildrenArray.push(frameSaveContainer)
        }

        container.save(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN, originChildrenArray)
        container.save(ProjectTree.SAVE_KEY_LIBRARY_NAME, ProjectTree.LibraryName)
        container.save(ProjectTree.SAVE_KEY_HIDE_GAMEUI, ProjectTree.HideGameUI)
        container.save(ProjectTree.SAVE_KEY_HIDE_HEROBAR, ProjectTree.HideHeroBar)
        container.save(ProjectTree.SAVE_KEY_HIDE_MINIMAP, ProjectTree.HideMiniMap)
        container.save(ProjectTree.SAVE_KEY_HIDE_RESOURCES, ProjectTree.HideResources)
        container.save(ProjectTree.SAVE_KEY_HIDE_BUTTONBAR, ProjectTree.HideButtonBar)
        container.save(ProjectTree.SAVE_KEY_HIDE_PORTRAIT, ProjectTree.HidePortrait)
        container.save(ProjectTree.SAVE_KEY_HIDE_CHAT, ProjectTree.HideChat)
        container.save(ProjectTree.SAVE_KEY_ORIGIN_MODE, ProjectTree.OriginMode)
        container.save(ProjectTree.SAVE_KEY_APP_INTERFACE, ProjectTree.AppInterface)
    }

    appendToSelected(newFrame: FrameBuilder): FrameComponent {
        if (this.selectedFrame == null) {
            newFrame.z = this.rootFrame.custom.getZIndex() + this.rootFrame.getChildren().length + 1
            return this.rootFrame.createAsChild(newFrame)
        } else {
            newFrame.z = this.selectedFrame.custom.getZIndex() + this.selectedFrame.getChildren().length + 1
            return this.selectedFrame.createAsChild(newFrame)
        }
    }

    getSelectedFrame(): FrameComponent {
        return this.selectedFrame
    }

    select(frame: FrameComponent | CustomComplex | CustomComplex | HTMLImageElement | HTMLDivElement | HTMLElement): void {
        //should go to workspace class?
        if (this.selectedFrame != null) {
            let color = ProjectTree.outlineUnSelected
            if (this.selectedFrame.getTooltip()) color = ProjectTree.outlineUnSelected_Tooltip
            this.selectedFrame.custom.getElement().style.outlineColor = color
        }

        if (frame instanceof FrameComponent) this.selectedFrame = frame
        else if (frame instanceof CustomComplex) this.selectedFrame = frame.getFrameComponent()
        else if (frame instanceof HTMLImageElement) this.selectedFrame = CustomComplex.GetCustomComplexFromHTMLDivElement(frame).getFrameComponent()
        else if (frame instanceof HTMLDivElement) this.selectedFrame = CustomComplex.GetCustomComplexFromHTMLDivElement(frame).getFrameComponent()
        else if (frame instanceof HTMLElement) this.selectedFrame = FrameComponent.GetFrameComponent(frame)
        else {
            this.selectedFrame = null
            return
        }

        this.selectedFrame.custom.getElement().style.outlineColor = ProjectTree.outlineSelected

        Editor.GetDocumentEditor().parameterEditor.updateFields(this.selectedFrame)
    }

    load(container: SaveContainer): void {
        if (container.hasKey(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN)) {
            //Clear the entire project tree first.
            for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
                if (el.type == 0) {
                    //Origin
                    continue
                }
                el.destroy()
            }

            const frames = container.load(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN)

            for (const frameData of frames) {
                const frameBuilder = new FrameBuilder(true)
                frameBuilder.load(frameData as SaveContainer)
            }

            try {
                ProjectTree.LibraryName = container.load(ProjectTree.SAVE_KEY_LIBRARY_NAME)
                ProjectTree.HideGameUI = container.load(ProjectTree.SAVE_KEY_HIDE_GAMEUI)
                ProjectTree.HideHeroBar = container.load(ProjectTree.SAVE_KEY_HIDE_HEROBAR)
                ProjectTree.HideMiniMap = container.load(ProjectTree.SAVE_KEY_HIDE_MINIMAP)
                ProjectTree.HideResources = container.load(ProjectTree.SAVE_KEY_HIDE_RESOURCES)
                ProjectTree.HideButtonBar = container.load(ProjectTree.SAVE_KEY_HIDE_BUTTONBAR)
                ProjectTree.HidePortrait = container.load(ProjectTree.SAVE_KEY_HIDE_PORTRAIT)
                ProjectTree.HideChat = container.load(ProjectTree.SAVE_KEY_HIDE_CHAT)
                ProjectTree.setOriginMode(container.load(ProjectTree.SAVE_KEY_ORIGIN_MODE))
            } catch (e) {
                alert('Loading Error: General Options Missing.')
            }

            if (container.load(ProjectTree.SAVE_KEY_APP_INTERFACE) !== undefined) {
                ProjectTree.AppInterface = container.load(ProjectTree.SAVE_KEY_APP_INTERFACE)
                const app = ProjectTree.AppInterface
                switch (app) {
                    case AppInterfaces.wood:
                        new AppInterfaceWoodenTexture().run()
                        break
                    case AppInterfaces.brown:
                        new AppInterfaceBrownColors().run()
                        break
                    case AppInterfaces.blue:
                        new AppInterfaceBlueColors().run()
                        break
                    case AppInterfaces.purple:
                        new AppInterfacePurpleColors().run()
                        break
                    case AppInterfaces.dark:
                        new AppInterfaceDarkColors().run()
                        break
                }
            }

            //this should happen after those values are loaded
            const par = Editor.GetDocumentEditor().parameterEditor
            par.inputLibraryName.value = ProjectTree.LibraryName
            par.checkboxGameUI.checked = ProjectTree.HideGameUI
            par.checkboxHeroBar.checked = ProjectTree.HideHeroBar
            par.checkboxMiniMap.checked = ProjectTree.HideMiniMap
            par.checkboxResources.checked = ProjectTree.HideResources
            par.checkboxButtonBar.checked = ProjectTree.HideButtonBar
            par.checkboxPortrait.checked = ProjectTree.HidePortrait
            par.checkboxChat.checked = ProjectTree.HideChat

            ProjectTree.refreshElements()
        } else {
            console.error('Could not parse JSON')
        }
    }

    //Iterator
    private iteratorQueue: Queue<FrameComponent>

    getIterator(): IterableIterator<FrameComponent> {
        this.iteratorQueue = new Queue<FrameComponent>()
        const tempQueue = new Queue<FrameComponent>()
        let currentNode: FrameComponent

        this.iteratorQueue.enqueue(this.rootFrame)
        tempQueue.enqueue(this.rootFrame)

        do {
            currentNode = tempQueue.dequeue()

            for (const child of currentNode.getChildren()) {
                tempQueue.enqueue(child)
                this.iteratorQueue.enqueue(child)
            }
        } while (tempQueue.front != null)

        return this
    }

    [Symbol.iterator](): IterableIterator<FrameComponent> {
        return this
    }

    next(): { done: boolean; value: FrameComponent } {
        const returnValue = this.iteratorQueue.dequeue()

        return {
            done: returnValue == null ? true : false,
            value: returnValue,
        }
    }

    findByName(name: string): FrameComponent | void {
        const iterator = Editor.GetDocumentEditor().projectTree.getIterator()
        for (const currentFrame of iterator) {
            if (currentFrame.getName() === name) {
                return currentFrame
            }
        }
    }
}
