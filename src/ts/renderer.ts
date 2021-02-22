/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from "electron";
import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'

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
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize
const input = document.getElementById('imgFile') as HTMLInputElement

Element.formIMG.addEventListener("submit", e => {
  e.preventDefault()
  const frameBuilder = new FrameBuilder();

  frameBuilder.name = "name";
  frameBuilder.texture =  URL.createObjectURL(input.files[0]);
  
  frameBuilder.Run();
})

new ParameterEditor()

window.onresize = () => {
  for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
    if(el.type == 0) { //base
      continue;
    }
    
    const image = el.image.element
    const rect = Element.workspaceImage.getBoundingClientRect() 
    const workspace = Editor.GetDocumentEditor().workspaceImage
    const horizontalMargin = 240/1920*rect.width

    const x = el.image.LeftX
    const y = el.image.BotY
    const w = el.image.width
    const h = el.image.height

    image.width = w / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)
    image.style.height = `${+h / 0.6 * workspace.getBoundingClientRect().height}px`;

    image.style.left = `${ x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
    image.style.top = `${rect.bottom - y*rect.height/0.6 - image.height - 120}px`

  }
}

new Titlebar({
  backgroundColor: new Color( new RGBA(69,49,26,255)),
  icon: "./files/images/backgroundWorkspace.png",
  menu: null,

})