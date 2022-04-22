import { ICallableDivInstance } from '../../ClassesAndFunctions/ICallableDivInstance'
import { EditorController } from '../EditorController'
import { remote } from 'electron'

export class BackgroundTexture implements ICallableDivInstance {
    private path: string

    constructor(path: string) {
        this.path = path
    }

    run() {
        EditorController.GetDocumentEditor().workspaceImage.src = this.path
    }
}

export class CustomBackground implements ICallableDivInstance {
    run() {
        remote.dialog
            .showOpenDialog({
                filters: [{ name: 'Image', extensions: ['png', 'jpg', 'jpeg'] }],
                properties: ['openFile'],
            })
            .then((openData) => {
                if (openData.canceled) return
                EditorController.GetDocumentEditor().workspaceImage.src = openData.filePaths[0]
                alert(`
            Image loaded.
            Note that the functionality of the app is built on an image of 1920x1080.
            Other sizes may cause incorrect results.
            `)
            })
    }
}
