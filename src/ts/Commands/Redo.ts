import { ICallableDivInstance } from '../ClassesAndFunctions/ICallableDivInstance'
import ChangeStack from '../Editor/ChangeStack'

export default class Redo implements ICallableDivInstance {
    public run(): void {
        ChangeStack.getInstance().redo()
    }
}
