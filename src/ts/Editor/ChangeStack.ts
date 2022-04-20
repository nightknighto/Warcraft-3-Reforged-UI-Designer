import Stack from "ts-data.stack";
import { debugText } from "../Classes & Functions/Mini-Functions";
import Redoable from "../Commands/Redoable";
import Undoable from "../Commands/Undoable";

export default class ChangeStack {

	private undoStack: Stack<Undoable>
	private redoStack: Stack<Redoable>

	public constructor () {

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
		undoCommand.undo();

	}

	public redo(): void {

		if (this.redoStack.isEmpty()) {
			debugText("Could not redo, nothing to redo.");
			return;
		}

		const redoCommand = this.redoStack.pop();
		redoCommand.redo();

	}

	public pushUndoChange(command: Undoable, breakRedo: boolean): void {
		this.undoStack.push(command);
		if (breakRedo) {
			this.redoStack = new Stack();
		}
	}

	public pushRedoChange(command: Redoable): void {
		this.redoStack.push(command);
	}

	public clear(): void {
		this.undoStack = new Stack();
		this.redoStack = new Stack();
	}

}