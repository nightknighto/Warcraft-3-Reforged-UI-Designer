import { ICallableDivInstance } from '../ClassesAndFunctions/ICallableDivInstance'
import { debugText } from '../ClassesAndFunctions/MiniFunctions'
import New from '../Commands/Implementation/New'
import { ProjectTree } from '../Editor/ProjectTree'

export default class NewDocument implements ICallableDivInstance {
    public run(): void {
        const command = new New()
        command.action()

        ProjectTree.fileSavePath = null
        debugText('New Project Initiated.')
    }
}
