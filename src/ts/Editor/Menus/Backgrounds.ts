import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";

export class BackgroundTexture implements ICallableDivInstance {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    run() {
        Editor.GetDocumentEditor().workspaceImage.src=this.path
    }
}