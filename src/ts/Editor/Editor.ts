/* eslint-disable @typescript-eslint/no-explicit-any */
import { Export } from "../Classes & Functions/Export";
import { FrameBuilder } from "./FrameLogic/FrameBuilder";
import { FrameType } from "./FrameLogic/FrameType";
import { RibbonMenu } from "./Menus/RibbonMenu";
import { RibbonOption } from "./Menus/RibbonOption";
import { TabsMenu } from "./Menus/TabsMenu";
import { ParameterEditor } from "./ParameterEditor";
import { ProjectTree } from "./ProjectTree";
import { ICallableDivInstance } from "../Classes & Functions/ICallableDivInstance";

export class Editor{

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

        const tabsMenu = new TabsMenu();

        const fileMenu = new RibbonMenu('File')
        const editMenu = new RibbonMenu('Edit');
        const viewMenu = new RibbonMenu('View');
        const insertMenu = new RibbonMenu('Insert');
        const windowMenu = new RibbonMenu('Window');

        tabsMenu.AddTab(fileMenu);
        tabsMenu.AddTab(editMenu);
        tabsMenu.AddTab(viewMenu);
        tabsMenu.AddTab(insertMenu);
        tabsMenu.AddTab(windowMenu);

        fileMenu.AddRibbonOption(new RibbonOption('New', new RibbonOptionsNew()));
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

        console.log("Again, cleaner way than doing 'as any' for editor");
        (document as any).editor        = this;
        
        this.panelDebug                 = document.getElementById('panelDebug');

        this.btnCloseTreePanel          = document.getElementById('treeClose') as HTMLButtonElement;
        this.btnCloseParameterPanel     = document.getElementById('panelClose') as HTMLButtonElement;

        this.workspaceImage             = document.getElementById('workspace') as HTMLImageElement;
        this.workspace                  = document.getElementById('workspaceContainer') as HTMLElement;

        this.debugLine                  = document.getElementById('debugLine');
        this.debugGameCoordinates       = document.getElementById('debugGameCoordinates');

        this.projectTree                = new ProjectTree();
        this.parameterEditor            = new ParameterEditor();
        this.tabsMenu                   = this.initializeMenus();
        
    }

    public static GetDocumentEditor() : Editor{

        console.log("Again, cleaner way than doing 'as any' for editor");
        return (document as any).editor;
    }
}

class RibbonOptionsNew implements ICallableDivInstance { 
    public Run() {
        window.location.reload()
    }
}