import { ICallableDivInstance } from '../ClassesAndFunctions/ICallableDivInstance'
import ChangeStack from '../Editor/ChangeStack'

export default class Undo implements ICallableDivInstance {
    public run(): void {
        ChangeStack.getInstance().undo()
    }
}
