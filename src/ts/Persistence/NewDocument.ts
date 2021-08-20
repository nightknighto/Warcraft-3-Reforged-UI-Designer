import { ICallableDivInstance } from "../Classes & Functions/ICallableDivInstance";
import { debugText } from "../Classes & Functions/Mini-Functions";
import New from "../Commands/Implementation/New";

export default class NewDocument implements ICallableDivInstance {
    public run() : void{
        
        const command = new New();
        command.action();
        
        debugText('New page.')
    }
}