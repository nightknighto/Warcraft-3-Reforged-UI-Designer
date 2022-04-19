/** @format */

import { Export } from '../Classes & Functions/Export'
import { GUIEvents } from '../Classes & Functions/GUIEvents'
import CreateFrameAtSelected from '../Commands/Implementation/CreateFrameAtSelected'
import RemoveFrame from '../Commands/Implementation/RemoveFrame'
import Redo from '../Commands/Redo'
import Undo from '../Commands/Undo'
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder'
import { FrameType } from '../Editor/FrameLogic/FrameType & FrameRequire'
import { BackgroundTexture, CustomBackground } from '../Editor/Menus/Backgrounds'
import { ParameterEditor } from '../Editor/ParameterEditor'
import { ProjectTree } from '../Editor/ProjectTree'
import LoadDocument from '../Persistence/LoadDocument'
import NewDocument from '../Persistence/NewDocument'
import SaveASDocument from '../Persistence/SaveASDocument'
import SaveDocument from '../Persistence/SaveDocument'

export class KeyboardShortcuts {
  private static instance: KeyboardShortcuts

  static getInstance() {
    if (!KeyboardShortcuts.instance) KeyboardShortcuts.instance = new KeyboardShortcuts()
    return KeyboardShortcuts.instance
  }

  private constructor() {
    window.addEventListener('keydown', this.shortcutListener)
  }

  shortcutListener = (event: KeyboardEvent) => {
    const t = event.target as HTMLInputElement
    if (t.tagName != 'BODY') return

    // Control Modifier
    this.keydownCtrl(event)

    // Alt Modifier
    this.keydownAlt(event)

    // Alt + Shift Modifier
    this.keydownAltShift(event)

    // Control + Shift Modifier
    this.keydownCtrlShift(event)

    this.keydownNoMod(event)
  }

  keydownCtrl = (event: KeyboardEvent) => {
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
    }
  }

  keydownAlt = (event: KeyboardEvent) => {
    if (event.altKey && !event.shiftKey && !event.ctrlKey) {
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
    }
  }

  keydownCtrlShift = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && !event.altKey) {
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
  }

  keydownAltShift = (event: KeyboardEvent) => {
    if (event.altKey && event.shiftKey && !event.ctrlKey) {
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
    }
  }

  keydownNoMod = (event: KeyboardEvent) => {
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
  }
}
