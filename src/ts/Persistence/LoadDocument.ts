import { OpenDialogReturnValue, remote } from "electron";
import { readFile } from "original-fs";
import { ICallableDivInstance } from "../Classes & Functions/ICallableDivInstance";
import Load from "../Commands/Implementation/Load";
import { Editor } from "../Editor/Editor";
import SaveContainer from "./SaveContainer";

export default class LoadDocument implements ICallableDivInstance {

    public load(filepath: string): void {

        readFile(filepath, (err, data) => {
            try {
                if (err != null) {
                    console.error("Failed opening file: " + err.message);
                } else if (data != null) {

                    const loadData = new SaveContainer(data.toString());
                    const command = new Load(loadData);
                    command.action();

                }
            } catch (e) { alert('Load: ' + e) }
        });

    }

    public run(): void {

        const openParams = remote.dialog.showOpenDialog({
            filters: [{ name: 'JSON', extensions: ['json'] }],
            properties: ['openFile']
        });

        openParams.then((openData: OpenDialogReturnValue) => {

            if (openData.canceled) return;
            this.load(openData.filePaths[0]);
            // Editor.GetDocumentEditor().changeStack.clear();

        });

    }

}