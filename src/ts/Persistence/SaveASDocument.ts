import { remote, SaveDialogReturnValue } from 'electron'
import { writeFile } from 'original-fs'
import { ICallableDivInstance } from '../ClassesAndFunctions/ICallableDivInstance'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EditorController } from '../Editor/EditorController'
import SaveContainer from './SaveContainer'
import { ProjectTree } from '../Editor/ProjectTree'
import { debugText } from '../ClassesAndFunctions/MiniFunctions'

export default class SaveASDocument implements ICallableDivInstance {
    public save(filepath: string): void {
        try {
            const data = new SaveContainer(null)
            ProjectTree.getInstance().save(data)

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

        const saveParams = remote.dialog.showSaveDialog({
            filters: [{ name: 'JSON', extensions: ['json'] }],
            properties: ['createDirectory'],
        })

        saveParams.then((saveData: SaveDialogReturnValue) => {
            if (saveData.canceled || !saveData.filePath) return
            this.save(saveData.filePath)
            ProjectTree.fileSavePath = saveData.filePath
            debugText('Project saved in ' + saveData.filePath)
        })
    }
}
