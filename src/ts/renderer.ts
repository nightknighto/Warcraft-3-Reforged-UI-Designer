/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from "electron";

import * as Element from "./Constants/Elements";
import { GUIEvents } from "./Classes & Functions/GUIEvents";
import { TabsMenu } from "./menus/TabsMenu";
import { RibbonMenu } from "./menus/RibbonMenu";
import { RibbonOption } from "./menus/RibbonOption";
import { FrameBuilder } from "./FrameLogic/FrameBuilder";
import { Export } from "./Classes & Functions/Export";
import { ProjectTree } from "./FrameLogic/ProjectTree";
import { FrameType } from "./FrameLogic/FrameType";

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);

//technically, inputing works, but not without an element to input into.
Element.panelButton.onclick                 = GUIEvents.PanelOpenClose;
Element.inputElementWidth.oninput           = GUIEvents.InputWidth;
Element.inputElementHeight.oninput          = GUIEvents.InputHeight;
Element.inputElementName.oninput            = GUIEvents.InputName;
Element.inputElementName.onchange           = GUIEvents.ChangeName;
Element.selectElementType.onchange          = GUIEvents.ChangeType;
Element.selectElementParent.onchange        = GUIEvents.ChangeParent;
Element.inputElementCoordinateX.onchange    = GUIEvents.InputCoordinateX;
Element.inputElementCoordinateY.onchange    = GUIEvents.InputCoordinateY;
Element.inputElementTexture.onchange        = GUIEvents.InputTexture;

Element.barWindow.ondrag                    = GUIEvents.DragWindow; //needs implementation
Element.btnCloseWindow.onclick              = GUIEvents.CloseApplication;
Element.btnMaximizeWindow.onclick           = GUIEvents.MaximizeWindow; 
Element.btnMinimizeWindow.onclick           = GUIEvents.MinimizeWindow; 


Element.treeButton.onclick                 = GUIEvents.TreeOpenClose;

//By default have it disabled because no selected element.
Element.inputElementWidth.disabled          = true
Element.inputElementHeight.disabled         = true
Element.inputElementName.disabled           = true
Element.selectElementType.disabled          = true
Element.selectElementParent.disabled        = true
Element.inputElementCoordinates.disabled    = true
Element.inputElementCoordinateX.disabled    = true
Element.inputElementCoordinateY.disabled    = true
Element.inputElementTexture.disabled        = true
Element.buttonElementTextureBrowse.disabled = true

//need better way, this is invisible dependancy.
ProjectTree.GetInstance().SetProjectTreeElement(Element.panelTree);

//Initialize menus
RibbonMenu.SetRibbonBar(Element.barRibbon);

let fileMenu = new RibbonMenu('File')
fileMenu.AddRibbonOption(new RibbonOption('New', null));
fileMenu.AddRibbonOption(new RibbonOption('Open', null));
fileMenu.AddRibbonOption(new RibbonOption('Save', null));
fileMenu.AddRibbonOption(new RibbonOption('Export',  new Export()));
TabsMenu.AddTab(fileMenu);

let editMenu = new RibbonMenu('Edit');
editMenu.AddRibbonOption(new RibbonOption('Undo', null));
editMenu.AddRibbonOption(new RibbonOption('Redo', null));
TabsMenu.AddTab(editMenu);

let viewMenu = new RibbonMenu('View');
viewMenu.AddRibbonOption(new RibbonOption('Zoom in', null));
viewMenu.AddRibbonOption(new RibbonOption('Zoom out', null));
TabsMenu.AddTab(viewMenu);

let insertMenu = new RibbonMenu('Insert');

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
insertMenu.AddRibbonOption(new RibbonOption('Options Popup Menu Backdrop Template', newFrameBuilder));

newFrameBuilder = new FrameBuilder();
newFrameBuilder.texture = './files/images/QuestButtonBaseTemplate.png';
newFrameBuilder.type = FrameType.QUEST_BUTTON_BASE_TEMPLATE;
insertMenu.AddRibbonOption(new RibbonOption('Quest Button Base Template', newFrameBuilder));

newFrameBuilder = new FrameBuilder();
newFrameBuilder.texture = './files/images/QuestButtonPushedBackdropTemplate.png';
newFrameBuilder.type = FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE;
insertMenu.AddRibbonOption(new RibbonOption('Quest Button Pushed Backdrop Template', newFrameBuilder));

newFrameBuilder = new FrameBuilder();
newFrameBuilder.texture = './files/images/QuestButtonDisabledBackdropTemplate.png';
newFrameBuilder.type = FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE;
insertMenu.AddRibbonOption(new RibbonOption('Quest Button Disabled Backdrop Template', newFrameBuilder));

newFrameBuilder = new FrameBuilder();
newFrameBuilder.texture = './files/images/EscMenuBackdrop.png';
newFrameBuilder.type = FrameType.ESC_MENU_BACKDROP;
insertMenu.AddRibbonOption(new RibbonOption('Esc Menu Backdrop', newFrameBuilder));

TabsMenu.AddTab(insertMenu);

let windowMenu = new RibbonMenu('Window');
windowMenu.AddRibbonOption(new RibbonOption('About', null));
TabsMenu.AddTab(windowMenu);

TabsMenu.Show(Element.barTab);

//# sourceMappingURL=renderer.js.map

//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize
const input = document.getElementById('img') as HTMLInputElement

// Set the width of the side navigation to 250px 
function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
  }

  // Set the width of the side navigation to 0 
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
} 