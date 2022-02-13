import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";
import { dialog, remote } from "electron";

export class BackgroundTexture implements ICallableDivInstance {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    run() {
        Editor.GetDocumentEditor().workspaceImage.src=this.path
    }
}

export class CustomBackground implements ICallableDivInstance {

    run() {
        remote.dialog.showOpenDialog({
            filters: [{ name: 'Image', extensions: ['png','jpg','jpeg'] }],
            properties: ['openFile']
        })
        .then((openData) => {
            if(openData.canceled) return;
            Editor.GetDocumentEditor().workspaceImage.src = openData.filePaths[0]
            alert(`
            Image loaded.
            Note that the functionality of the app is built on an image of 1920x1080.
            Other sizes may cause incorrect results.
            `)
        })

    }
}