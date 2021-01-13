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
import { Insert } from "./Classes & Functions/Insert";
import { GUIEvents } from "./Classes & Functions/GUIEvents";
import { TabsMenu } from "./menus/TabsMenu";
import { RibbonMenu } from "./menus/RibbonMenu";
import { RibbonOption } from "./menus/RibbonOption";

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);

//technically, inputing works, but not without an element to input into.
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

//By default have it disabled because no selected element.
Element.inputElementWidth.disabled          = true
Element.inputElementHeight.disabled         = true
Element.inputElementName.disabled           = true
Element.inputElementName.disabled           = true
Element.selectElementType.disabled          = true
Element.selectElementParent.disabled        = true
Element.inputElementCoordinates.disabled    = true
Element.inputElementCoordinateX.disabled    = true
Element.inputElementCoordinateY.disabled    = true
Element.inputElementTexture.disabled        = true
Element.buttonElementTextureBrowse.disabled = true

//Initialize menus
RibbonMenu.SetRibbonBar(Element.barRibbon);

let fileMenu = new RibbonMenu('File')
fileMenu.AddRibbonOption(new RibbonOption('New'));
fileMenu.AddRibbonOption(new RibbonOption('Open'));
fileMenu.AddRibbonOption(new RibbonOption('Save'));
fileMenu.AddRibbonOption(new RibbonOption('Export'));
TabsMenu.AddTab(fileMenu);

let editMenu = new RibbonMenu('Edit');
editMenu.AddRibbonOption(new RibbonOption('Undo'));
editMenu.AddRibbonOption(new RibbonOption('Redo'));
TabsMenu.AddTab(editMenu);

let viewMenu = new RibbonMenu('View');
viewMenu.AddRibbonOption(new RibbonOption('Zoom in'));
viewMenu.AddRibbonOption(new RibbonOption('Zoom out'));
TabsMenu.AddTab(viewMenu);

let insertMenu = new RibbonMenu('Insert');1
insertMenu.AddRibbonOption(new RibbonOption('Frame 1'));
insertMenu.AddRibbonOption(new RibbonOption('Frame 2'));
TabsMenu.AddTab(insertMenu);

let windowMenu = new RibbonMenu('Window');
windowMenu.AddRibbonOption(new RibbonOption('About'));
TabsMenu.AddTab(windowMenu);

TabsMenu.Show(Element.barTab);

/* Obsolete, no generate button, generation is done via exporting.
Generate.onclick = () => {
    writeFile('experiment.txt', JASS.globals, ()=>{
        appendFile('experiment.txt', TemplateReplace(0), ()=>{
            appendFile('experiment.txt', JASS.endglobals, ()=>{
                appendFile('experiment.txt', JASS.library, ()=>{
                    appendFile('experiment.txt', TemplateReplace(1), ()=>{
                        appendFile('experiment.txt', JASS.endlibrary, ()=>{
                            alert("File Created in Output folder")})})})})})})
}
*/
Insert.Init()

//# sourceMappingURL=renderer.js.map

//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize

