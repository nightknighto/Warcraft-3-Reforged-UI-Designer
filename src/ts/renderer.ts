// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from 'electron'
import { GUIEvents } from './ClassesAndFunctions/GUIEvents'
import { Editor } from './Editor/Editor'
import { ProjectTree } from './Editor/ProjectTree'
import { Modals } from './modals/ModalsInit'
import bootstrap = require('bootstrap')
import { KeyboardShortcuts } from './Events/keyboardShortcuts'
import { CanvasMovement } from './Events/CanvasMovement'
import ChangeStack from './Editor/ChangeStack'
import { ParameterEditor } from './Editor/ParameterEditor'

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

        const source = ProjectTree.getInstance().getSelectedFrame().custom
        GUIEvents.DuplicateArrayCircular(
            source.getLeftX(),
            source.getBotY(),
            radius.valueAsNumber,
            count.valueAsNumber,
            initAng.valueAsNumber,
            CircParent.checked
        )
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

        const source = ProjectTree.getInstance().getSelectedFrame().custom
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

try {
    window.onresize = () => {
        if (document.getElementById('workspaceContainer').offsetWidth > CanvasMovement.getInstance().width) CanvasMovement.getInstance().moveToCenter()
        ProjectTree.refreshElements()
    }

    //keyboard shortcuts
    KeyboardShortcuts.getInstance()

    //general Initializations
    new Editor()
    ProjectTree.getInstance()
    ChangeStack.getInstance()
    ParameterEditor.getInstance()
    CanvasMovement.getInstance()

    document.getElementById('panelTree').style.visibility = 'visible'
    document.getElementById('panelParameters').style.visibility = 'visible'

    //general Initializations
} catch (e) {
    alert('renderer' + e)
}

new Modals()

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

//# sourceMappingURL=renderer.js.map
