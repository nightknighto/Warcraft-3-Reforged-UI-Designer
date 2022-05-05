/* eslint @typescript-eslint/no-explicit-any: ["off", { "ignoreRestArgs": false }] */

import { FrameBuilder } from './FrameLogic/FrameBuilder'
import { RibbonMenu } from './Menus/RibbonMenu'
import { RibbonOption } from './Menus/RibbonOption'
import { TabsMenu } from './Menus/TabsMenu'
import { ProjectTree } from './ProjectTree'
import SaveASDocument from '../Persistence/SaveASDocument'
import LoadDocument from '../Persistence/LoadDocument'
import Undo from '../Commands/Undo'
import Redo from '../Commands/Redo'
import CreateFrameAtSelected from '../Commands/Implementation/CreateFrameAtSelected'
import { Export } from '../ClassesAndFunctions/Export'
import NewDocument from '../Persistence/NewDocument'
import { BackgroundTexture, CustomBackground } from './Menus/Backgrounds'
import { AppUIWoodenTexture, AppUIBrownColors, AppUIPurpleColors, AppUIBlueColors, AppUIDarkColors } from './Menus/AppInterface'
import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'
import SaveDocument from '../Persistence/SaveDocument'
import { GUIEvents } from '../ClassesAndFunctions/GUIEvents'

export class Editor {
    private static instance?: Editor

    static getInstance() {
        if (!Editor.instance) Editor.instance = new Editor()
        return Editor.instance
    }

    readonly panelDebug: HTMLElement

    readonly btnCloseTreePanel: HTMLButtonElement
    readonly btnCloseParameterPanel: HTMLButtonElement

    //Workspace
    readonly workspaceImage: HTMLImageElement
    readonly workspace: HTMLDivElement

    //Debug
    readonly debugLine: HTMLElement
    readonly debugGameCoordinates: HTMLElement

    readonly tabsMenu: TabsMenu

    //UI
    readonly treeButton: HTMLButtonElement
    readonly panelButton: HTMLButtonElement
    // canvasMovement: CanvasMovement

    readonly titleBar: Titlebar

    fileMenu: RibbonMenu
    editMenu: RibbonMenu
    viewMenu: RibbonMenu
    insertMenu: RibbonMenu
    infoMenu: RibbonMenu
    OptionsMenu: RibbonMenu

    constructor() {
        this.panelDebug = document.getElementById('panelDebug')

        this.btnCloseTreePanel = document.getElementById('treeClose') as HTMLButtonElement
        this.btnCloseParameterPanel = document.getElementById('panelClose') as HTMLButtonElement

        this.workspaceImage = document.getElementById('workspace') as HTMLImageElement
        this.workspace = document.getElementById('workspaceContainer') as HTMLDivElement

        this.debugLine = document.getElementById('debugLine')
        this.debugGameCoordinates = document.getElementById('debugGameCoordinates')

        this.tabsMenu = this.initializeMenus()

        this.treeButton = document.getElementById('treeClose') as HTMLButtonElement
        this.panelButton = document.getElementById('panelClose') as HTMLButtonElement
        // this.canvasMovement = CanvasMovement.getInstance()

        this.titleBar = new Titlebar({
            backgroundColor: new Color(new RGBA(69, 49, 26, 255)),
            icon: './files/icon.png',
            menu: null,
        })

        this.panelButton.onclick = GUIEvents.PanelOpenClose
        this.treeButton.onclick = GUIEvents.TreeOpenClose
    }

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
        expRib.addMenuOption('WURST', new Export(false, 'wurst'))

        const expRibAs = new RibbonOption('Export to File', null)
        this.fileMenu.addRibbonOption(expRibAs)
        expRibAs.addMenuOption('JASS', new Export(true, 'jass'))
        expRibAs.addMenuOption('LUA', new Export(true, 'lua'))
        expRibAs.addMenuOption('TYPESCRIPT', new Export(true, 'ts'))
        expRibAs.addMenuOption('WURST', new Export(true, 'wurst'))

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
            const projectTree = ProjectTree.getInstance()
            projectTree.select(projectTree.rootFrame)
        }

        this.insertMenu.run()
        return tabsMenu
    }
}
