/**
 * /* eslint-disable @typescript-eslint/no-namespace
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from 'electron'
import { GUIEvents } from './Classes & Functions/GUIEvents'
import { Editor } from './Editor/Editor'
import { ProjectTree } from './Editor/ProjectTree'
import { Modals } from './modals/modals Init'
import bootstrap = require('bootstrap')
import Undo from './Commands/Undo'
import Redo from './Commands/Redo'
import RemoveFrame from './Commands/Implementation/RemoveFrame'
import { ParameterEditor } from './Editor/ParameterEditor'
import SaveDocument from './Persistence/SaveDocument'
import { Export } from './Classes & Functions/Export'
import SaveASDocument from './Persistence/SaveASDocument'
import LoadDocument from './Persistence/LoadDocument'
import NewDocument from './Persistence/NewDocument'
import { BackgroundTexture, CustomBackground } from './Editor/Menus/Backgrounds'
import { FrameBuilder } from './Editor/FrameLogic/FrameBuilder'
import CreateFrameAtSelected from './Commands/Implementation/CreateFrameAtSelected'
import { FrameType } from './Editor/FrameLogic/FrameType & FrameRequire'

window.addEventListener('mousemove', GUIEvents.DisplayGameCoords)
ipcRenderer.on('Delete', GUIEvents.DeleteSelectedImage)
ipcRenderer.on('Duplicate', GUIEvents.DuplicateSelectedImage)

const circArray = new bootstrap.Modal(document.getElementById('CircArray'))
const CircParent = document.getElementById('CircCheckParent') as HTMLInputElement

ipcRenderer.on('CircularArray', () => {
  CircParent.checked = false
  if (ProjectTree.getSelected().getParent().getName().indexOf('[') >= 0) {
    CircParent.disabled = false
  } else {
    CircParent.disabled = true
  }
  circArray.show()
})

const CircArraySubmit = document.getElementById('CircArraySubmit')
const radius = document.getElementById('radius') as HTMLInputElement
const count = document.getElementById('count') as HTMLInputElement
const initAng = document.getElementById('initAng') as HTMLInputElement

CircArraySubmit.onclick = (e) => {
  try {
    //conditions plz
    e.preventDefault()
    if (+radius.value < 0 || +radius.value > 0.4 || +count.value <= 0 || +initAng.value < 0 || +initAng.value > 360) {
      if (+radius.value < 0 || +radius.value > 0.4) {
        radius.value = ''
      }
      if (+count.value <= 0) {
        count.value = ''
      }
      if (+initAng.value < 0 || +initAng.value > 360) {
        initAng.value = ''
      }
      return
    }

    const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom
    GUIEvents.DuplicateArrayCircular(source.getLeftX(), source.getBotY(), radius.valueAsNumber, count.valueAsNumber, initAng.valueAsNumber, CircParent.checked)
    circArray.hide()
  } catch (e) {
    alert(e)
  }
}
const tableArray = new bootstrap.Modal(document.getElementById('TableArray'))
const tableParent = document.getElementById('TableCheckParent') as HTMLInputElement

ipcRenderer.on('TableArray', () => {
  tableParent.checked = false
  if (ProjectTree.getSelected().getParent().getName().indexOf('[') >= 0) {
    tableParent.disabled = false
  } else {
    tableParent.disabled = true
  }
  tableArray.show()
})

const TableArraySubmit = document.getElementById('TableArraySubmit')
const rows = document.getElementById('rows') as HTMLInputElement
const columns = document.getElementById('columns') as HTMLInputElement
const gapX = document.getElementById('gapX') as HTMLInputElement
const gapY = document.getElementById('gapY') as HTMLInputElement

TableArraySubmit.onclick = (e) => {
  try {
    //conditions plz
    e.preventDefault()
    if (+rows.value <= 0 || +columns.value <= 0) {
      if (+rows.value <= 0) {
        rows.value = ''
      }
      if (+columns.value <= 0) {
        columns.value = ''
      }
      return
    }

    const source = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom
    GUIEvents.DuplicateArrayTable(
      source.getLeftX(),
      source.getBotY() - source.getHeight(),
      rows.valueAsNumber,
      columns.valueAsNumber,
      gapX.valueAsNumber,
      gapY.valueAsNumber,
      tableParent.checked
    )
    tableArray.hide()
  } catch (e) {
    alert(e)
  }
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
try {
  window.onresize = () => {
    ProjectTree.refreshElements()
  }

  //keyboard shortcuts
  window.addEventListener('keydown', function (event) {
    const t = event.target as HTMLInputElement
    if (t.tagName != 'BODY') return

    // Control Modifier
    if (event.ctrlKey && !event.shiftKey && !event.altKey) {
      switch (event.code) {
        case 'KeyZ':
          // Undo
          new Undo().run()
          break
        case 'KeyY':
          // Redo
          new Redo().run()
          break
        case 'KeyS':
          // Save Document
          new SaveDocument().run()
          break
        case 'KeyO':
          // Open Document
          new LoadDocument().run()
          break
        case 'KeyN':
          // New Document
          new NewDocument().run()
          break
        case 'KeyT':
          // Export Typescript to Clipboard Bypass Alert
          new Export(false, 'ts', false).run()
          break
        case 'KeyJ':
          // Export Jass to Clipboard Bypass Alert
          new Export(false, 'jass', false).run()
          break
        case 'KeyL':
          // Export Lua to Clipboard Bypass Alert
          new Export(false, 'lua', false).run()
          break
        case 'KeyD':
          GUIEvents.DuplicateSelectedImage()
          break
        default:
          break
      }

      // Alt Modifier
    } else if (event.altKey && !event.shiftKey && !event.ctrlKey) {
      let newFrameBuilder: FrameBuilder

      switch (event.code) {
        case 'KeyB':
          // Custom Button
          newFrameBuilder = new FrameBuilder(true)
          newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
          newFrameBuilder.type = FrameType.BUTTON
          new CreateFrameAtSelected(newFrameBuilder).run()
          break
        case 'KeyD':
          // Custom Backdrop
          newFrameBuilder = new FrameBuilder(true)
          newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
          newFrameBuilder.type = FrameType.BACKDROP
          new CreateFrameAtSelected(newFrameBuilder).run()
          break
        case 'KeyT':
          // Text Frame
          newFrameBuilder = new FrameBuilder(true)
          newFrameBuilder.type = FrameType.TEXT_FRAME
          newFrameBuilder.text = 'Text Frame'
          newFrameBuilder.width = 0.07
          newFrameBuilder.height = 0.07
          new CreateFrameAtSelected(newFrameBuilder).run()
          break
        default:
          break
      }

      // Alt + Shift Modifier
    } else if (event.altKey && event.shiftKey && !event.ctrlKey) {
      switch (event.code) {
        case 'KeyS':
          // Background with UI
          new BackgroundTexture('./files/images/backgroundWorkspace.png').run()
          break
        case 'KeyH':
          // Background without UI
          new BackgroundTexture('./files/images/backgroundWorkspace2.png').run()
          break
        case 'KeyC':
          // Browse for Custom Background
          new CustomBackground().run()
          break
        default:
          break
      }

      // Control + Shift Modifier
    } else if (event.ctrlKey && event.shiftKey && !event.altKey) {
      switch (event.code) {
        case 'KeyZ':
          // Redo
          new Redo().run()
          break
        case 'KeyS':
          // Save As
          new SaveASDocument().run()
          break
        case 'KeyT':
          // Export Typescript to File Bypass Alert
          new Export(true, 'ts', false).run()
          break
        case 'KeyJ':
          // Export Jass to File Bypass Alert
          new Export(true, 'jass', false).run()
          break
        case 'KeyL':
          // Export Lua to File Bypass Alert
          new Export(true, 'lua', false).run()
          break
        default:
          break
      }
    }

    const par = ParameterEditor.inst()
    switch (event.which) {
      case 46:
        // Delete Frame
        if (ProjectTree.getSelected()) {
          const command = new RemoveFrame(ProjectTree.getSelected())
          command.action()
        }
        break

      case 37:
        //left
        if (ProjectTree.getSelected()) {
          par.inputElementCoordinateX.value = (+par.inputElementCoordinateX.value - 0.0005).toFixed(5)
          if (!event.shiftKey) par.inputElementCoordinateX.value = (+par.inputElementCoordinateX.value - 0.0095).toFixed(5)
          par.inputElementCoordinateX.dispatchEvent(new Event('change'))
        }
        break

      case 38:
        //up
        if (ProjectTree.getSelected()) {
          par.inputElementCoordinateY.value = (+par.inputElementCoordinateY.value + 0.0005).toFixed(5)
          if (!event.shiftKey) par.inputElementCoordinateY.value = (+par.inputElementCoordinateY.value + 0.0095).toFixed(5)
          par.inputElementCoordinateY.dispatchEvent(new Event('change'))
        }
        break

      case 39:
        //right
        if (ProjectTree.getSelected()) {
          par.inputElementCoordinateX.value = (+par.inputElementCoordinateX.value + 0.0005).toFixed(5)
          if (!event.shiftKey) par.inputElementCoordinateX.value = (+par.inputElementCoordinateX.value + 0.0095).toFixed(5)
          par.inputElementCoordinateX.dispatchEvent(new Event('change'))
        }
        break

      case 40:
        //down
        if (ProjectTree.getSelected()) {
          par.inputElementCoordinateY.value = (+par.inputElementCoordinateY.value - 0.0005).toFixed(5)
          if (!event.shiftKey) par.inputElementCoordinateY.value = (+par.inputElementCoordinateY.value - 0.0095).toFixed(5)
          par.inputElementCoordinateY.dispatchEvent(new Event('change'))
        }
        break

      default:
        break
    }
  })

  //general Initializations
  const editor = new Editor(document)
  editor.parameterEditor.fieldElement.style.display = 'none'
  document.getElementById('panelTree').style.visibility = 'visible'
  document.getElementById('panelParameters').style.visibility = 'visible'

  //general Initializations
  editor.parameterEditor.fieldElement.style.display = 'none'
  document.getElementById('panelTree').style.visibility = 'visible'
  document.getElementById('panelParameters').style.visibility = 'visible'

  editor.panelButton.onclick = GUIEvents.PanelOpenClose
  editor.treeButton.onclick = GUIEvents.TreeOpenClose
} catch (e) {
  alert('renderer' + e)
}

new Modals()

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//# sourceMappingURL=renderer.js.map
