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
import { Editor } from "./Editor/Editor";
import { CustomImage } from "./Editor/FrameLogic/CustomImage";
import { ImageFunctions } from "./Classes & Functions/ImageFunctions";
import { FrameBuilder } from "./Editor/FrameLogic/FrameBuilder";
import { ParameterEditor } from "./Editor/ParameterEditor";

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);

Element.panelButton.onclick                 = GUIEvents.PanelOpenClose;
Element.treeButton.onclick                 = GUIEvents.TreeOpenClose;

let editor = new Editor(document);

//# sourceMappingURL=renderer.js.map

//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize
const input = document.getElementById('imgFile') as HTMLInputElement

// Set the width of the side navigation to 250px 
function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
  }

  // Set the width of the side navigation to 0 
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
} 

Element.formIMG.addEventListener("submit", e => {
  e.preventDefault()
  const frameBuilder = new FrameBuilder();

  frameBuilder.name = "name";
  frameBuilder.texture =  URL.createObjectURL(input.files[0]);
  
  frameBuilder.Run();
})

new ParameterEditor()