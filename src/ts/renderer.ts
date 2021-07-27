/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer, remote } from "electron";
import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'

import * as Element from "./Constants/Elements";
import { GUIEvents } from "./Classes & Functions/GUIEvents";
import { Editor } from "./Editor/Editor";
import * as path from "path";
import { FrameBuilder } from "./Editor/FrameLogic/FrameBuilder";
import { CustomText } from "./Editor/FrameLogic/CustomText";
import { FrameComponent } from "./Editor/FrameLogic/FrameComponent";
import { FrameType } from "./Editor/FrameLogic/FrameType";

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);
ipcRenderer.on('Duplicate', GUIEvents.DuplicateSelectedImage);

ipcRenderer.on('TableArray', () => {try{
  const win = new remote.BrowserWindow( {
    height: 400,
    width: 300,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    
  })
  win.show()
  win.focus()
  win.loadFile(path.join(__dirname, "./TableArray.html"));

}catch(e){alert(e)}});

ipcRenderer.on('CircularArray', () => {
  const win = new remote.BrowserWindow( {
    height: 400,
    width: 300,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  
  })
  win.show()
  win.focus()
  win.loadFile(path.join(__dirname, "./CircularArray.html"));
});

ipcRenderer.on('TableArraySubmit', (event, args) => {try{
  const source = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom;
  GUIEvents.DuplicateArrayTable(source.LeftX, source.BotY - source.height, args[0], args[1], args[2], args[3])
}catch(e){alert(e)}})

ipcRenderer.on('CircularArraySubmit', (event, args) => {
  const source = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom;
  GUIEvents.DuplicateArrayCircular(source.LeftX, source.BotY, args[0], args[1], args[2])
})

Element.panelButton.onclick                 = GUIEvents.PanelOpenClose;
Element.treeButton.onclick                 = GUIEvents.TreeOpenClose;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*const input = document.getElementById('imgFile') as HTMLInputElement

Element.formIMG.addEventListener("submit", e => {
  e.preventDefault()
  const frameBuilder = new FrameBuilder();

  frameBuilder.name = "name";
  frameBuilder.texture =  URL.createObjectURL(input.files[0]);
  
  frameBuilder.Run();
})
*/
try{
window.onresize = GUIEvents.RefreshElements;

new Titlebar({
  backgroundColor: new Color( new RGBA(69,49,26,255)),
  icon: "./files/icon.png",
  menu: null,

})
//general Initializations
new Editor(document)
Editor.GetDocumentEditor().parameterEditor.fieldElement.style.display = "none"
document.getElementById("panelTree").style.visibility = "visible"
document.getElementById("panelParameters").style.visibility = "visible"

//general Initializations
Editor.GetDocumentEditor().parameterEditor.fieldElement.style.display = "none"
document.getElementById("panelTree").style.visibility = "visible"
document.getElementById("panelParameters").style.visibility = "visible"

//# sourceMappingURL=renderer.js.map
}catch(e){alert("renderer"+e)}