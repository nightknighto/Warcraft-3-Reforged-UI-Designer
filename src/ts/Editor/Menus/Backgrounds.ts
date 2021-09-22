import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";
import { ParameterEditor } from "../ParameterEditor";

export class BackgroundTexture extends ICallableDivInstance {
    path: string;

    constructor(path: string) {
        super()
        this.path = path;
    }

    run = () => {
        Editor.GetDocumentEditor().workspaceImage.src=this.path
    }
}