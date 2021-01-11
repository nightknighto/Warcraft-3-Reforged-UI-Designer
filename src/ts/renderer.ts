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

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);

Element.inputElementWidth.oninput           = GUIEvents.InputWidth;
Element.inputElementHeight.oninput          = GUIEvents.InputHeight;
Element.inputElementName.oninput            = GUIEvents.InputName;
Element.inputElementName.onchange           = GUIEvents.ChangeName;
Element.selectElementType.onchange          = GUIEvents.ChangeType;
Element.selectElementParent.onchange        = GUIEvents.ChangeParent;
Element.inputElementCoordinateX.onchange    = GUIEvents.InputCoordinateX;
Element.inputElementCoordinateY.onchange    = GUIEvents.InputCoordinateY;
Element.inputElementTexture.onchange        = GUIEvents.InputTexture;


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

