/* eslint @typescript-eslint/no-explicit-any: ["off", { "ignoreRestArgs": false }] */

import { FrameBuilder } from './FrameLogic/FrameBuilder'
import { RibbonMenu } from './Menus/RibbonMenu'
import { RibbonOption } from './Menus/RibbonOption'
import { TabsMenu } from './Menus/TabsMenu'
import { ParameterEditor } from './ParameterEditor'
import { ProjectTree } from './ProjectTree'
import SaveASDocument from '../Persistence/SaveASDocument'
import LoadDocument from '../Persistence/LoadDocument'
import ChangeStack from './ChangeStack'
import Undo from '../Commands/Undo'
import Redo from '../Commands/Redo'
import CreateFrameAtSelected from '../Commands/Implementation/CreateFrameAtSelected'
import { Export } from '../ClassesAndFunctions/Export'
import NewDocument from '../Persistence/NewDocument'
import { BackgroundTexture, CustomBackground } from './Menus/Backgrounds'
import { AppUIWoodenTexture, AppUIBrownColors, AppUIPurpleColors, AppUIBlueColors, AppUIDarkColors } from './Menus/AppInterface'
import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'
import SaveDocument from '../Persistence/SaveDocument'
import { CanvasMovement } from '../Events/CanvasMovement'

export class EditorInit {
    private static instance?: EditorInit

    static initInstance(editor: Editor) {
        if (!EditorInit.instance) EditorInit.instance = new EditorInit(editor)
        return EditorInit.instance
    }

    static getInstance() {
        return EditorInit.instance
    }

    editor: Editor
    private constructor(editor: Editor) {
        this.editor = editor
    }
}

export class Editor {
    //Application bars
    readonly panelDebug: HTMLElement

    readonly btnCloseTreePanel: HTMLButtonElement
    readonly btnCloseParameterPanel: HTMLButtonElement

    //Workspace
    readonly workspaceImage: HTMLImageElement
    readonly workspace: HTMLDivElement

    //Debug
    readonly debugLine: HTMLElement
    readonly debugGameCoordinates: HTMLElement

    //functional units
    readonly projectTree: ProjectTree
    readonly changeStack: ChangeStack
    readonly parameterEditor: ParameterEditor
    readonly tabsMenu: TabsMenu

    //UI
    readonly treeButton: HTMLButtonElement
    readonly panelButton: HTMLButtonElement
    canvasMovement: CanvasMovement

    readonly titleBar: Titlebar

    fileMenu: RibbonMenu
    editMenu: RibbonMenu
    viewMenu: RibbonMenu
    insertMenu: RibbonMenu
    infoMenu: RibbonMenu
    OptionsMenu: RibbonMenu

    private initializeMenus(): TabsMenu {
        const tabsMenu = new TabsMenu()

        this.fileMenu = new RibbonMenu('File')
        this.editMenu = new RibbonMenu('Edit')
        this.viewMenu = new RibbonMenu('View')
        this.insertMenu = new RibbonMenu('Insert')
        this.infoMenu = new RibbonMenu('Info')
        this.OptionsMenu = new RibbonMenu('Options')

        tabsMenu.addTab(this.fileMenu)
        tabsMenu.addTab(this.editMenu)
        tabsMenu.addTab(this.viewMenu)
        tabsMenu.addTab(this.insertMenu)
        tabsMenu.addTab(this.infoMenu)
        tabsMenu.addTab(this.OptionsMenu)

        this.fileMenu.addRibbonOption(new RibbonOption('New', new NewDocument()))
        this.fileMenu.addRibbonOption(new RibbonOption('Open', new LoadDocument()))
        this.fileMenu.addRibbonOption(new RibbonOption('Save', new SaveDocument()))
        this.fileMenu.addRibbonOption(new RibbonOption('Save As', new SaveASDocument()))

        const expRib = new RibbonOption('Export', null)
        this.fileMenu.addRibbonOption(expRib)
        expRib.addMenuOption('JASS', new Export(false, 'jass'))
        expRib.addMenuOption('LUA', new Export(false, 'lua'))
        expRib.addMenuOption('TYPESCRIPT', new Export(false, 'ts'))

        const expRibAs = new RibbonOption('Export to File', null)
        this.fileMenu.addRibbonOption(expRibAs)
        expRibAs.addMenuOption('JASS', new Export(true, 'jass'))
        expRibAs.addMenuOption('LUA', new Export(true, 'lua'))
        expRibAs.addMenuOption('TYPESCRIPT', new Export(true, 'ts'))

        this.editMenu.addRibbonOption(new RibbonOption('Undo (Ctrl+Z)', new Undo()))
        this.editMenu.addRibbonOption(new RibbonOption('Redo (Ctrl+Y)', new Redo()))

        const ribAppInterface = new RibbonOption('App Interface', null)
        this.viewMenu.addRibbonOption(ribAppInterface)

        ribAppInterface.addMenuOption('Wooden Interface', AppUIWoodenTexture.getInstance())
        ribAppInterface.addMenuOption('Brownish Interface', AppUIBrownColors.getInstance())
        ribAppInterface.addMenuOption('Purple Interface', AppUIPurpleColors.getInstance())
        ribAppInterface.addMenuOption('Blue Interface', AppUIBlueColors.getInstance())
        ribAppInterface.addMenuOption('Dark Interface', AppUIDarkColors.getInstance())

        const ribBackground = new RibbonOption('Background/Resolution', null)
        ribBackground.addMenuOption('1920x1080 With Default UI', new BackgroundTexture('./files/images/backgroundWorkspace.png'))
        ribBackground.addMenuOption('1920x1080 Without Default UI', new BackgroundTexture('./files/images/backgroundWorkspace2.png'))
        ribBackground.addMenuOption('Custom Background (Experimental)', new CustomBackground())
        this.viewMenu.addRibbonOption(ribBackground)

        this.infoMenu.addRibbonOption(new RibbonOption('About Us', null))
        this.infoMenu.addRibbonOption(new RibbonOption('Hall of Fame', null))
        this.infoMenu.addRibbonOption(new RibbonOption('Tutorials', null))
        this.infoMenu.addRibbonOption(new RibbonOption('Change Log', null))

        const ribButton = new RibbonOption('Buttons', new CreateFrameAtSelected(FrameBuilder.newButton()))
        ribButton.addMenuOption('Custom Button', new CreateFrameAtSelected(FrameBuilder.newButton()))
        ribButton.addMenuOption('Black Text Button', new CreateFrameAtSelected(FrameBuilder.newButtonBlackText()))
        ribButton.addMenuOption('Blue Text Button', new CreateFrameAtSelected(FrameBuilder.newButtonBlueText()))
        ribButton.addMenuOption('Invisible Button', new CreateFrameAtSelected(FrameBuilder.newButtonInvis()))
        this.insertMenu.addRibbonOption(ribButton)

        const ribBackdrop = new RibbonOption('Backdrops', new CreateFrameAtSelected(FrameBuilder.newBackdrop()))
        ribBackdrop.addMenuOption('Custom Backdrop', new CreateFrameAtSelected(FrameBuilder.newBackdrop()))
        ribBackdrop.addMenuOption('Semi-transparent w border', new CreateFrameAtSelected(FrameBuilder.newBackdropSemiTransWithBorder()))
        ribBackdrop.addMenuOption('Black Box with arrow', new CreateFrameAtSelected(FrameBuilder.newBackdropBlackBoxWithArrow()))
        ribBackdrop.addMenuOption('Black Backdrop', new CreateFrameAtSelected(FrameBuilder.newBackdropBlack()))
        ribBackdrop.addMenuOption('Grey Backdrop', new CreateFrameAtSelected(FrameBuilder.newBackdropGrey()))
        ribBackdrop.addMenuOption('Very Black Backdrop', new CreateFrameAtSelected(FrameBuilder.newBackdropVeryBlack()))
        ribBackdrop.addMenuOption('Default Menus Backdrop', new CreateFrameAtSelected(FrameBuilder.newBackdropDefaultMenus()))

        this.insertMenu.addRibbonOption(ribBackdrop)

        const ribText = new RibbonOption('Texts', new CreateFrameAtSelected(FrameBuilder.newText()))
        ribText.addMenuOption('Text Frame', new CreateFrameAtSelected(FrameBuilder.newText()))
        ribText.addMenuOption('Text Area', new CreateFrameAtSelected(FrameBuilder.newTextArea()))
        ribText.addMenuOption('Edit Box', new CreateFrameAtSelected(FrameBuilder.newEditBox()))
        this.insertMenu.addRibbonOption(ribText)

        const ribOthers = new RibbonOption('Others', null)
        ribOthers.addMenuOption('Checkbox', new CreateFrameAtSelected(FrameBuilder.newCheckbox()))
        ribOthers.addMenuOption('Horizontal Bar', new CreateFrameAtSelected(FrameBuilder.newHorizontalBar()))
        this.insertMenu.addRibbonOption(ribOthers)

        const ribTemplates = new RibbonOption('Templates', null)
        ribTemplates.addMenuOption('Horiz. Bar + Background', new CreateFrameAtSelected(FrameBuilder.newHorizBarWithBG()))
        ribTemplates.addMenuOption('Horiz. Bar + Text', new CreateFrameAtSelected(FrameBuilder.newHorizBarWithText()))
        ribTemplates.addMenuOption('Horiz. Bar + Background-Text', new CreateFrameAtSelected(FrameBuilder.newHorizBarWithTextBG()))
        this.insertMenu.addRibbonOption(ribTemplates)

        this.OptionsMenu.override = () => {
            ProjectTree.getInstance().select(ProjectTree.getInstance().rootFrame)
        }

        this.insertMenu.run()
        return tabsMenu
    }

    constructor() {
        // ;(document as any).editor = this
        EditorInit.initInstance(this)

        this.panelDebug = document.getElementById('panelDebug')

        this.btnCloseTreePanel = document.getElementById('treeClose') as HTMLButtonElement
        this.btnCloseParameterPanel = document.getElementById('panelClose') as HTMLButtonElement

        this.workspaceImage = document.getElementById('workspace') as HTMLImageElement
        this.workspace = document.getElementById('workspaceContainer') as HTMLDivElement

        this.debugLine = document.getElementById('debugLine')
        this.debugGameCoordinates = document.getElementById('debugGameCoordinates')

        this.projectTree = ProjectTree.getInstance()
        this.changeStack = ChangeStack.getInstance()
        this.parameterEditor = ParameterEditor.getInstance()
        this.tabsMenu = this.initializeMenus()

        this.treeButton = document.getElementById('treeClose') as HTMLButtonElement
        this.panelButton = document.getElementById('panelClose') as HTMLButtonElement
        this.canvasMovement = CanvasMovement.getInstance()

        this.titleBar = new Titlebar({
            backgroundColor: new Color(new RGBA(69, 49, 26, 255)),
            icon: './files/icon.png',
            menu: null,
        })

        AppUIDarkColors.getInstance().run()
    }

    static GetDocumentEditor(): Editor {
        return EditorInit.getInstance().editor
    }

    /**returns the margin of the 4:3 area. */
    static getInnerMargin(): number {
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspace.getBoundingClientRect()
        return (240 / 1920) * rect.width
    }

    static getActualMargin(): number {
        if (ProjectTree.OriginMode === 'consoleui') {
            return 0
        } else {
            return this.getInnerMargin()
        }
    }

    //gives the max and min numbers for the x-position (edges of the frame-movable area)
    static getActualMarginLimits(): { min: number; max: number } {
        const workspaceImage = Editor.GetDocumentEditor().workspaceImage
        return {
            min: Math.floor(((0 - this.getInnerMargin()) / (workspaceImage.getBoundingClientRect().width - 2 * this.getInnerMargin())) * 800) / 1000,
            max:
                Math.floor(
                    ((workspaceImage.getBoundingClientRect().right - workspaceImage.getBoundingClientRect().left - this.getInnerMargin()) /
                        (workspaceImage.getBoundingClientRect().width - 2 * this.getInnerMargin())) *
                        800
                ) / 1000,
        }
    }
}
