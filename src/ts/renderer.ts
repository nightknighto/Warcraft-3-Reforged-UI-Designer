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

import { GUIEvents } from "./Classes & Functions/GUIEvents";
import { Editor } from "./Editor/Editor";
import * as path from "path";
import { CustomText } from "./Editor/FrameLogic/CustomText";
import { ProjectTree } from "./Editor/ProjectTree";

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
  if(ProjectTree.getSelected().getParent().getName().indexOf('[') >= 0) {
    win.loadFile(path.join(__dirname, "./TableArrayArrayOn.html"));
  } else {
    win.loadFile(path.join(__dirname, "./TableArrayArrayOff.html"));
  }


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
  const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;
  GUIEvents.DuplicateArrayTable(source.getLeftX(), source.getBotY() - source.getHeight(), args[0], args[1], args[2], args[3], args[4])
}catch(e){alert(e)}})

ipcRenderer.on('CircularArraySubmit', (event, args) => {
  const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;
  GUIEvents.DuplicateArrayCircular(source.getLeftX(), source.getBotY(), args[0], args[1], args[2])
})

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

  window.onresize = () =>{
    const editor = Editor.GetDocumentEditor();

        for(const el of editor.projectTree.getIterator()) {
          if(el.type == 0) { //base
            continue;
          }
          
          const image = el.custom.getElement()
          const rect = editor.workspaceImage.getBoundingClientRect() 
          const workspace = Editor.GetDocumentEditor().workspaceImage
          const horizontalMargin = 240/1920*rect.width
      
          const x = el.custom.getLeftX();
          const y = el.custom.getBotY();
          const w = el.custom.getWidth();
          const h = el.custom.getHeight();
      
          image.style.width = w / 0.8 * (workspace.width-2*horizontalMargin) + "px"
          image.style.height = `${+h / 0.6 * workspace.getBoundingClientRect().height}px`;

          image.style.left = `${ x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
          image.style.top = `${rect.bottom - y*rect.height/0.6 - image.offsetHeight - 120}px`

          if(el.custom instanceof CustomText) {
              image.style.fontSize = (el.custom.getScale()) * rect.width / 100 + "px"
          }
      
        }
  }

new Titlebar({
  backgroundColor: new Color( new RGBA(69,49,26,255)),
  icon: "./files/icon.png",
  menu: null,

})
//general Initializations
const editor = new Editor(document)
editor.parameterEditor.fieldElement.style.display = "none"
document.getElementById("panelTree").style.visibility = "visible"
document.getElementById("panelParameters").style.visibility = "visible"

//general Initializations
editor.parameterEditor.fieldElement.style.display = "none"
document.getElementById("panelTree").style.visibility = "visible"
document.getElementById("panelParameters").style.visibility = "visible"

editor.panelButton.onclick                 = GUIEvents.PanelOpenClose;
editor.treeButton.onclick                 = GUIEvents.TreeOpenClose;

}catch(e){alert("renderer"+e)}


//# sourceMappingURL=renderer.js.map