import { Export } from "../Classes & Functions/Export";
import { remote } from 'electron';
import { FrameBuilder } from "./FrameLogic/FrameBuilder";
import { FrameType } from "./FrameLogic/FrameType";
import { RibbonMenu } from "./Menus/RibbonMenu";
import { RibbonOption } from "./Menus/RibbonOption";
import { TabsMenu } from "./Menus/TabsMenu";
import { ParameterEditor } from "./ParameterEditor";
import { ProjectTree } from "./ProjectTree";

export class Editor{

    //Window Bar elements   
    public readonly barWindow                   : HTMLElement;
    public readonly btnMinimizeWindow           : HTMLImageElement;
    public readonly btnMaximizeWindow           : HTMLImageElement;
    public readonly btnCloseWindow              : HTMLImageElement;

    //Application bars      
    public readonly panelDebug                  : HTMLElement;

    public readonly btnCloseTreePanel           : HTMLButtonElement;
    public readonly btnCloseParameterPanel      : HTMLButtonElement;
    
    //Workspace
    public readonly workspaceImage              : HTMLImageElement; 
    public readonly workspace                   : HTMLElement;      
    
    //Debug
    public readonly debugLine                   : HTMLElement;
    public readonly debugGameCoordinates        : HTMLElement;

    //functional units
    public readonly tabsMenu                    : TabsMenu;
    public readonly projectTree                 : ProjectTree;
    public readonly parameterEditor             : ParameterEditor;

    private initializeMenus() : TabsMenu{

        let tabsMenu = new TabsMenu();

        let fileMenu = new RibbonMenu('File')
        let editMenu = new RibbonMenu('Edit');
        let viewMenu = new RibbonMenu('View');
        let insertMenu = new RibbonMenu('Insert');
        let windowMenu = new RibbonMenu('Window');

        tabsMenu.AddTab(fileMenu);
        tabsMenu.AddTab(editMenu);
        tabsMenu.AddTab(viewMenu);
        tabsMenu.AddTab(insertMenu);
        tabsMenu.AddTab(windowMenu);

        fileMenu.AddRibbonOption(new RibbonOption('New', null));
        fileMenu.AddRibbonOption(new RibbonOption('Open', null));
        fileMenu.AddRibbonOption(new RibbonOption('Save', null));
        fileMenu.AddRibbonOption(new RibbonOption('Export',  new Export()));
                
        editMenu.AddRibbonOption(new RibbonOption('Undo', null));
        editMenu.AddRibbonOption(new RibbonOption('Redo', null));
        
        viewMenu.AddRibbonOption(new RibbonOption('Color Theme', null));
        viewMenu.AddRibbonOption(new RibbonOption('Zoom out', null));
        
        let newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/ScriptDialogButton.png';
        newFrameBuilder.type = FrameType.SCRIPT_DIALOG_BUTTON;
        insertMenu.AddRibbonOption(new RibbonOption('Script Dialog Button', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/BrowserButton.png';
        newFrameBuilder.type = FrameType.BROWSER_BUTTON;
        insertMenu.AddRibbonOption(new RibbonOption('Browser Button', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/QuestCheckBox.png';
        newFrameBuilder.type = FrameType.QUEST_CHECKBOX;
        insertMenu.AddRibbonOption(new RibbonOption('Quest Check Box', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/CheckListBox.png';
        newFrameBuilder.type = FrameType.CHECKLIST_BOX;
        insertMenu.AddRibbonOption(new RibbonOption('Checklist Box', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/OptionsPopupMenuBackdropTemplate.png';
        newFrameBuilder.type = FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE;
        insertMenu.AddRibbonOption(new RibbonOption('Options Popup Menu Backdrop', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/QuestButtonBaseTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_BASE_TEMPLATE;
        insertMenu.AddRibbonOption(new RibbonOption('Quest Button Base', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/QuestButtonPushedBackdropTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE;
        insertMenu.AddRibbonOption(new RibbonOption('Quest Button Pushed Backdrop', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/QuestButtonDisabledBackdropTemplate.png';
        newFrameBuilder.type = FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE;
        insertMenu.AddRibbonOption(new RibbonOption('Quest Button Disabled Backdrop', newFrameBuilder));

        newFrameBuilder = new FrameBuilder();
        newFrameBuilder.texture = './files/images/EscMenuBackdrop.png';
        newFrameBuilder.type = FrameType.ESC_MENU_BACKDROP;
        insertMenu.AddRibbonOption(new RibbonOption('Esc Menu Backdrop', newFrameBuilder));

        windowMenu.AddRibbonOption(new RibbonOption('About', null));
        
        fileMenu.Run();
        return tabsMenu;

    }

    public constructor(document : HTMLDocument){

        (document as any).editor        = this;
        
        this.barWindow                  = document.getElementById('barTitle');
        this.btnMinimizeWindow          = document.getElementById('btnMinimizeWindow') as HTMLImageElement;
        this.btnMaximizeWindow          = document.getElementById('btnMaximizeWindow') as HTMLImageElement;
        this.btnCloseWindow             = document.getElementById('btnCloseWindow') as HTMLImageElement;
        
        this.panelDebug                 = document.getElementById('panelDebug');

        this.btnCloseTreePanel          = document.getElementById('treeClose') as HTMLButtonElement;
        this.btnCloseParameterPanel     = document.getElementById('panelClose') as HTMLButtonElement;

        this.workspaceImage             = document.getElementById('workspace') as HTMLImageElement;
        this.workspace                  = document.getElementById('workspaceContainer') as HTMLElement;

        this.debugLine                  = document.getElementById('debugLine');
        this.debugGameCoordinates       = document.getElementById('debugGameCoordinates');

        this.projectTree                = new ProjectTree();
        this.tabsMenu                   = this.initializeMenus();

        this.barWindow.ondrag           = Editor.DragWindow; //needs implementation
        this.btnCloseWindow.onclick     = Editor.CloseApplication;
        this.btnMaximizeWindow.onclick  = Editor.MaximizeWindow; 
        this.btnMinimizeWindow.onclick  = Editor.MinimizeWindow; 
        
    }

    public static GetDocumentEditor() : Editor{

        return (document as any).editor;
    }

    static CloseApplication(ev: Event){

        remote.app.quit();

    }

    static MaximizeWindow(ev: Event){

        const window = remote.getCurrentWindow();
        //cannot unmaximize...
        if(window.isMaximized()){
            window.unmaximize();
            console.log("Unmaximized");
        }
        else{
            window.maximize();
            console.log("Maximized");
        }
    }

    static MinimizeWindow(ev: Event){

        remote.getCurrentWindow().minimize();

    }

    static DragWindow(ev: Event){

        const window = remote.getCurrentWindow();
        //Dragging functionality goes here

    }
}