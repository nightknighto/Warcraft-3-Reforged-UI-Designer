import Stack from "ts-data.stack";
import { debugText } from "../Classes & Functions/Mini-Functions";
import Redoable from "../Commands/Redoable";
import Undoable from "../Commands/Undoable";

export default class ChangeStack {

    private undoStack: Stack<Undoable>
    private redoStack: Stack<Redoable>

    public constructor() {

        this.undoStack = new Stack();
        this.redoStack = new Stack();

        return this;

    }

    public undo(): void {

        if (this.undoStack.isEmpty()) {
            debugText("Could not undo, nothing to undo.");
            return;
        }

        const undoCommand = this.undoStack.pop();

        // if((undoCommand[0] as Redoable).redo != undefined){
        //     this.redoStack.push((undoCommand[0] as Redoable).getChangeForRedo());
        // }

        undoCommand.undo();

    }

    public redo(): void {

        if (this.redoStack.isEmpty()) {
            debugText("Could not redo, nothing to redo.");
            return;
        }

        const redoCommand = this.redoStack.pop();
        
        // this.undoStack.push(redoCommand[0].getChangeForUndo());
        redoCommand.redo();
        
    }

    public pushUndoChange(command : Undoable, breakRedo: boolean) : void{
        this.undoStack.push(command);
        if(breakRedo){
            this.redoStack = new Stack();
        }
    }

    public pushRedoChange(command: Redoable) : void{
        this.redoStack.push(command);
    }

}