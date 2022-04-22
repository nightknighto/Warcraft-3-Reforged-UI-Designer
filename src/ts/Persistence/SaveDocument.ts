import { writeFile } from 'original-fs'
import { ICallableDivInstance } from '../ClassesAndFunctions/ICallableDivInstance'
import SaveContainer from './SaveContainer'
import { ProjectTree } from '../Editor/ProjectTree'
import { debugText } from '../ClassesAndFunctions/MiniFunctions'

export default class SaveDocument implements ICallableDivInstance {
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

        if (!ProjectTree.fileSavePath) {
            debugText("Can't save: No project was loaded. Use Save As instead")
            return
        }

        this.save(ProjectTree.fileSavePath)
        debugText('Project saved in ' + ProjectTree.fileSavePath)
    }
}
