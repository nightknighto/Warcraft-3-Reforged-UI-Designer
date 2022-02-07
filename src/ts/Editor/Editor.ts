/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrameBuilder } from "./FrameLogic/FrameBuilder";
import { FrameType } from "./FrameLogic/FrameType";
import { RibbonMenu } from "./Menus/RibbonMenu";
import { RibbonOption } from "./Menus/RibbonOption";
import { TabsMenu } from "./Menus/TabsMenu";
import { ParameterEditor } from "./ParameterEditor";
import { ProjectTree } from "./ProjectTree";
import SaveASDocument from "../Persistence/SaveASDocument";
import LoadDocument from "../Persistence/LoadDocument";
import ChangeStack from "./ChangeStack";
import Undo from "../Commands/Undo";
import Redo from "../Commands/Redo";
import CreateFrameAtSelected from "../Commands/Implementation/CreateFrameAtSelected";
import { ExportJass, ExportLua, ExportTS } from "../Classes & Functions/Export";
import NewDocument from "../Persistence/NewDocument";
import { BackgroundTexture } from "./Menus/Backgrounds";
import { AppInterfaceWoodenTexture, AppInterfaceBrownColors, AppInterfacePurpleColors, AppInterfaceBlueColors, AppInterfaceDarkColors } from "./Menus/App Interface";
import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'
import SaveDocument from "../Persistence/SaveDocument";

export class Editor {

    //Application bars      
    public readonly panelDebug: HTMLElement;

    public readonly btnCloseTreePanel: HTMLButtonElement;
    public readonly btnCloseParameterPanel: HTMLButtonElement;

    //Workspace
    public readonly workspaceImage: HTMLImageElement;
    public readonly workspace: HTMLDivElement;

    //Debug
    public readonly debugLine: HTMLElement;
    public readonly debugGameCoordinates: HTMLElement;

    //functional units
    public readonly projectTree: ProjectTree;
    public readonly changeStack : ChangeStack;
    public readonly parameterEditor: ParameterEditor;
    public readonly tabsMenu: TabsMenu;    

    //UI
    public readonly treeButton: HTMLButtonElement;
    public readonly panelButton: HTMLButtonElement;

    public readonly titleBar: Titlebar;

    private initializeMenus(): TabsMenu {

        const tabsMenu = new TabsMenu();

        const fileMenu = new RibbonMenu('File')
        const editMenu = new RibbonMenu('Edit');
        const viewMenu = new RibbonMenu('View');
        const insertMenu = new RibbonMenu('Insert')
        const infoMenu = new RibbonMenu('Info');
        const OptionsMenu = new RibbonMenu('Options');

        tabsMenu.addTab(fileMenu);
        tabsMenu.addTab(editMenu);
        tabsMenu.addTab(viewMenu);
        tabsMenu.addTab(insertMenu);
        tabsMenu.addTab(infoMenu);
        tabsMenu.addTab(OptionsMenu);

        fileMenu.addRibbonOption(new RibbonOption('New', new NewDocument()));
        fileMenu.addRibbonOption(new RibbonOption('Open', new LoadDocument()));
        fileMenu.addRibbonOption(new RibbonOption('Save', new SaveDocument()));
        fileMenu.addRibbonOption(new RibbonOption('Save As', new SaveASDocument()));

        const expRib = new RibbonOption('Export', null)
        fileMenu.addRibbonOption(expRib);
        expRib.addMenuOption('JASS', new ExportJass(false))
        expRib.addMenuOption('LUA', new ExportLua(false))
        expRib.addMenuOption('TYPESCRIPT', new ExportTS(false))

        const expRibAs = new RibbonOption('Export As', null)
        fileMenu.addRibbonOption(expRibAs);
        expRibAs.addMenuOption('JASS', new ExportJass(true))
        expRibAs.addMenuOption('LUA', new ExportLua(true))
        expRibAs.addMenuOption('TYPESCRIPT', new ExportTS(true))


        editMenu.addRibbonOption(new RibbonOption('Undo (Ctrl+Z)', new Undo()));
        editMenu.addRibbonOption(new RibbonOption('Redo (Ctrl+Y)', new Redo()));

        const ribAppInterface = new RibbonOption('App Interface', null)
        viewMenu.addRibbonOption(ribAppInterface);

        ribAppInterface.addMenuOption('Wooden Interface', new AppInterfaceWoodenTexture)
        ribAppInterface.addMenuOption('Brownish Interface', new AppInterfaceBrownColors)
        ribAppInterface.addMenuOption('Purple Interface', new AppInterfacePurpleColors)
        ribAppInterface.addMenuOption('Blue Interface', new AppInterfaceBlueColors)
        ribAppInterface.addMenuOption('Dark Interface', new AppInterfaceDarkColors)

        const ribBackground = new RibbonOption('Background/Resolution', null)
        viewMenu.addRibbonOption(ribBackground);
        ribBackground.addMenuOption('1920x1080 With Default UI', new BackgroundTexture("./files/images/backgroundWorkspace.png"))
        ribBackground.addMenuOption('1920x1080 Without Default UI', new BackgroundTexture("./files/images/backgroundWorkspace2.png"))

        infoMenu.addRibbonOption(new RibbonOption('About Us', null));
        infoMenu.addRibbonOption(new RibbonOption('Hall of Fame', null));
        infoMenu.addRibbonOption(new RibbonOption('Tutorials', null));
        infoMenu.addRibbonOption(new RibbonOption('Change Log', null));

        let newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.BUTTON;
        const ribButton = new RibbonOption('Buttons', new CreateFrameAtSelected(newFrameBuilder))
        insertMenu.addRibbonOption(ribButton)
        ribButton.addMenuOption('Custom Button', new CreateFrameAtSelected(newFrameBuilder))

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.BACKDROP;
        const ribBackdrop = new RibbonOption('Backdrops', new CreateFrameAtSelected(newFrameBuilder))
        insertMenu.addRibbonOption(ribBackdrop)
        ribBackdrop.addMenuOption('Custom Backdrop', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.type = FrameType.TEXT_FRAME;
        newFrameBuilder.text = "Text Frame"
        newFrameBuilder.width = 0.07
        newFrameBuilder.height = 0.07
        insertMenu.addRibbonOption(new RibbonOption('Texts', new CreateFrameAtSelected(newFrameBuilder)))
        
        const ribOthers = new RibbonOption('Others', null)
        insertMenu.addRibbonOption(ribOthers)
        
        const ribTemplates = new RibbonOption('Templates', null)
        insertMenu.addRibbonOption(ribTemplates)

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/ScriptDialogButton.png';
        newFrameBuilder.type = FrameType.SCRIPT_DIALOG_BUTTON;
        ribButton.addMenuOption('Script Dialog Button', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/BrowserButton.png';
        newFrameBuilder.type = FrameType.BROWSER_BUTTON;
        ribButton.addMenuOption('Browser Button', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/InvisButton.png';
        newFrameBuilder.type = FrameType.INVIS_BUTTON;
        ribButton.addMenuOption('Invis Button', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/QuestCheckBox.png';
        newFrameBuilder.type = FrameType.CHECKBOX;
        ribOthers.addMenuOption('Check Box', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.HORIZONTAL_BAR;
        ribOthers.addMenuOption('Horizontal Bar', new CreateFrameAtSelected(newFrameBuilder));


        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.HOR_BAR_BACKGROUND;
        ribTemplates.addMenuOption('Horiz. Bar + Background', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.HOR_BAR_TEXT;
        ribTemplates.addMenuOption('Horiz. Bar + Text', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png';
        newFrameBuilder.type = FrameType.HOR_BAR_BACKGROUND_TEXT;
        ribTemplates.addMenuOption('Horiz. Bar + Background-Text', new CreateFrameAtSelected(newFrameBuilder));


        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/CheckListBox.png';
        newFrameBuilder.type = FrameType.CHECKLIST_BOX;
        ribBackdrop.addMenuOption('Checklist Box', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/OptionsPopupMenuBackdropTemplate.png';
        newFrameBuilder.type = FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE;
        ribBackdrop.addMenuOption('Options Popup', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonBaseTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_BASE_TEMPLATE;
        ribBackdrop.addMenuOption('Button Base', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonPushedBackdropTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE;
        ribBackdrop.addMenuOption('Button Pushed', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonDisabledBackdropTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE;
        ribBackdrop.addMenuOption('Button Disabled', new CreateFrameAtSelected(newFrameBuilder));

        newFrameBuilder = new FrameBuilder(true);
        newFrameBuilder.textureDiskPath = './files/images/EscMenuBackdrop.png';
        newFrameBuilder.type = FrameType.ESC_MENU_BACKDROP;
        ribBackdrop.addMenuOption('Esc Menu', new CreateFrameAtSelected(newFrameBuilder));

        OptionsMenu.override = () => {
            ProjectTree.inst().select(ProjectTree.inst().rootFrame)
        }

        insertMenu.run();
        return tabsMenu;

    }

    public constructor(document: HTMLDocument) {

        (document as any).editor = this;

        this.panelDebug = document.getElementById('panelDebug');

        this.btnCloseTreePanel = document.getElementById('treeClose') as HTMLButtonElement;
        this.btnCloseParameterPanel = document.getElementById('panelClose') as HTMLButtonElement;

        this.workspaceImage = document.getElementById('workspace') as HTMLImageElement;
        this.workspace = document.getElementById('workspaceContainer') as HTMLDivElement;

        this.debugLine = document.getElementById('debugLine');
        this.debugGameCoordinates = document.getElementById('debugGameCoordinates');

        this.projectTree = new ProjectTree();
        this.changeStack = new ChangeStack();
        this.parameterEditor = new ParameterEditor();
        this.tabsMenu = this.initializeMenus();

        this.treeButton = document.getElementById('treeClose') as HTMLButtonElement;
        this.panelButton = document.getElementById('panelClose') as HTMLButtonElement;

    
        this.titleBar = new Titlebar({
            backgroundColor: new Color( new RGBA(69,49,26,255)),
            icon: "./files/icon.png",
            menu: null,
        
        })

        new AppInterfaceDarkColors().run()
    }

    public static GetDocumentEditor(): Editor {
        return (document as any).editor;
    }

    /**returns the margin of the 4:3 area. */
    public static getInnerMargin(): number {
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspace.getBoundingClientRect()
        return 240 / 1920 * rect.width
    }

    public static getActualMargin(): number {
        if(ProjectTree.OriginMode === 'consoleui') {
            return 0;
        } else {
            return this.getInnerMargin();
        }
    }

    //gives the max and min numbers for the x-position (edges of the frame-movable area)
    public static getActualMarginLimits(): {min: number, max: number} {
        const workspaceImage = Editor.GetDocumentEditor().workspaceImage
        return {min: Math.floor((0 - this.getInnerMargin()) / (workspaceImage.getBoundingClientRect().width - 2*this.getInnerMargin()) * 800)/1000
            , max: Math.floor((workspaceImage.getBoundingClientRect().right - workspaceImage.getBoundingClientRect().left - this.getInnerMargin()) / (workspaceImage.getBoundingClientRect().width - 2*this.getInnerMargin()) * 800)/1000}
    }
}