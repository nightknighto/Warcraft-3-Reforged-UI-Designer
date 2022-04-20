import { remote, SaveDialogReturnValue } from 'electron'
import { writeFile } from 'original-fs'
import { ICallableDivInstance } from '../Classes & Functions/ICallableDivInstance'
import { Editor } from '../Editor/Editor'
import SaveContainer from './SaveContainer'
import { ProjectTree } from '../Editor/ProjectTree'
import { debugText } from '../Classes & Functions/Mini-Functions'

export default class SaveDocument implements ICallableDivInstance {
    public save(filepath: string): void {
        try {
            const data = new SaveContainer(null)
            Editor.GetDocumentEditor().projectTree.save(data)

            writeFile(filepath, data.exportToJSON(), (err) => {
                if (err != null) {
                    console.error('Failed saving file: ' + err.message)
                }
            })
        } catch (e) {
            alert('Save: ' + e)
        }
    }

    public run(): void {
        ProjectTree.saveGeneralOptions()

        if (!ProjectTree.fileSavePath) {
            debugText("Can't save: No project was loaded. Use Save As instead")
            return
        }

        this.save(ProjectTree.fileSavePath)
        debugText('Project saved in ' + ProjectTree.fileSavePath)
    }
}
