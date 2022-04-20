import Undoable from "./Undoable";

export default interface Redoable extends Undoable {

	redo(): void;

}