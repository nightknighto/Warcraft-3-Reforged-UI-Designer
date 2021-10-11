/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer, remote } from "electron";

import { GUIEvents } from "./Classes & Functions/GUIEvents";
import { Editor } from "./Editor/Editor";
import * as path from "path";
import { ProjectTree } from "./Editor/ProjectTree";
import { Modals } from "./modals/modals Init";
import bootstrap = require("bootstrap");
import { electron } from "webpack";
import Undo from "./Commands/Undo";
import Redo from "./Commands/Redo";
import RemoveFrame from "./Commands/Implementation/RemoveFrame";
import { ParameterEditor } from "./Editor/ParameterEditor";
import CustomComplex from "./Editor/FrameLogic/CustomComplex";

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords);
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage);
ipcRenderer.on('Duplicate', GUIEvents.DuplicateSelectedImage);

const circArray = new bootstrap.Modal(document.getElementById('CircArray'))
const CircParent = document.getElementById('CircCheckParent') as HTMLInputElement 

ipcRenderer.on('CircularArray', () => {
  CircParent.checked = false
  if(ProjectTree.getSelected().getParent().getName().indexOf('[') >= 0) {
      CircParent.disabled = false
  } else {
    CircParent.disabled = true
  }
  circArray.show();
});

const CircArraySubmit = document.getElementById('CircArraySubmit')
const radius = document.getElementById('radius') as HTMLInputElement
const count = document.getElementById('count') as HTMLInputElement
const initAng = document.getElementById('initAng') as HTMLInputElement

CircArraySubmit.onclick = (e) => {
  try {
      //conditions plz
      e.preventDefault();
      if (+radius.value < 0 || +radius.value > .4 || +count.value <= 0 || +initAng.value < 0 || +initAng.value > 360) {

          if (+radius.value < 0 || +radius.value > .4) { radius.value = "" }
          if (+count.value <= 0) { count.value = '' }
          if (+initAng.value < 0 || +initAng.value > 360) { initAng.value = '' }
          return;
      }

      const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;
      GUIEvents.DuplicateArrayCircular(source.getLeftX(), source.getBotY(), radius.valueAsNumber, count.valueAsNumber, initAng.valueAsNumber, CircParent.checked)
      circArray.hide();
      
  } catch (e) { alert(e) }
}
const tableArray = new bootstrap.Modal(document.getElementById('TableArray'))
const tableParent = document.getElementById('TableCheckParent') as HTMLInputElement 

ipcRenderer.on('TableArray', () => {
  tableParent.checked = false
  if(ProjectTree.getSelected().getParent().getName().indexOf('[') >= 0) {
    tableParent.disabled = false
  } else {
    tableParent.disabled = true
  }
  tableArray.show();
});

const TableArraySubmit = document.getElementById('TableArraySubmit')
const rows = document.getElementById('rows') as HTMLInputElement
const columns = document.getElementById('columns') as HTMLInputElement
const gapX = document.getElementById('gapX') as HTMLInputElement
const gapY = document.getElementById('gapY') as HTMLInputElement

TableArraySubmit.onclick = (e) => {
  try {
      //conditions plz
      e.preventDefault();
      if (+rows.value <= 0 || +columns.value <= 0) {

        if (+rows.value <= 0) { rows.value = "" }
        if (+columns.value <= 0) { columns.value = '' }
        return;
      }

      const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;
      GUIEvents.DuplicateArrayTable(source.getLeftX(), source.getBotY() - source.getHeight(), rows.valueAsNumber, columns.valueAsNumber, gapX.valueAsNumber, gapY.valueAsNumber, tableParent.checked)
      tableArray.hide();
      
  } catch (e) { alert(e) }
}

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
          const horizontalMargin = Editor.getInnerMargin()
      
          const x = el.custom.getLeftX();
          const y = el.custom.getBotY();
          const w = el.custom.getWidth();
          const h = el.custom.getHeight();
      
          image.style.width = w / 0.8 * (workspace.width-2*horizontalMargin) + "px"
          image.style.height = `${+h / 0.6 * workspace.getBoundingClientRect().height}px`;

          image.style.left = `${ x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
          image.style.top = `${rect.bottom - y*rect.height/0.6 - image.offsetHeight - 120}px`

          if(el.custom instanceof CustomComplex) {
              image.style.fontSize = (el.custom.getScale()) * rect.width / 100 + "px"
          }
      
        }
  }

//keyboard shortcuts
window.addEventListener('keydown', function (event) {
  let t = event.target as HTMLInputElement
  if(t.tagName != "BODY") return;
  
  if (event.ctrlKey && event.code === 'KeyZ') {
      new Undo().run()
  }
  if (event.ctrlKey && event.code === 'KeyY') {
      new Redo().run()
  }
  if (event.which === 46) {
      if(ProjectTree.getSelected()) {
        const command = new RemoveFrame(ProjectTree.getSelected());
        command.action();
      }
  }

  const par = ParameterEditor.inst()
  if (event.which === 37) { //left
    if(ProjectTree.getSelected()) {
      par.inputElementCoordinateX.value = +par.inputElementCoordinateX.value - 0.001 + ""
      if(!event.shiftKey) par.inputElementCoordinateX.value = +par.inputElementCoordinateX.value - 0.009 + ""
      par.inputElementCoordinateX.dispatchEvent(new Event('change'));
    }
  } 

  if (event.which === 38) { //up
    if(ProjectTree.getSelected()) {
      par.inputElementCoordinateY.value = +par.inputElementCoordinateY.value + 0.001 + ""
      if(!event.shiftKey) par.inputElementCoordinateY.value = +par.inputElementCoordinateY.value + 0.009 + ""
      par.inputElementCoordinateY.dispatchEvent(new Event('change'));
    }
  }

  if (event.which === 39) { //right
    if(ProjectTree.getSelected()) {
      par.inputElementCoordinateX.value = +par.inputElementCoordinateX.value + 0.001 + ""
      if(!event.shiftKey) par.inputElementCoordinateX.value = +par.inputElementCoordinateX.value + 0.009 + ""
      par.inputElementCoordinateX.dispatchEvent(new Event('change'));
    }
  }

  if (event.which === 40) { //down
    if(ProjectTree.getSelected()) {
      par.inputElementCoordinateY.value = +par.inputElementCoordinateY.value - 0.001 + ""
      if(!event.shiftKey) par.inputElementCoordinateY.value = +par.inputElementCoordinateY.value - 0.009 + ""
      par.inputElementCoordinateY.dispatchEvent(new Event('change'));
    }
  }
});

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

new Modals();

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
//# sourceMappingURL=renderer.js.map