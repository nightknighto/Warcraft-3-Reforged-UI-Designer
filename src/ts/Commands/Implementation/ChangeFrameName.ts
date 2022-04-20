import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";

export default class ChangeFrameName extends SimpleCommand {

	private oldName: string;
	private newName: string;

	public constructor (frame: FrameComponent | string, newName: string) {
		super();

		if (typeof (frame) === "string") {
			this.oldName = frame;
		}
		else {
			this.oldName = frame.getName();
		}
		this.newName = newName;

	}

	public undo(): void {
		super.undo();

		const undoCommand = new ChangeFrameName(this.newName, this.oldName);
		undoCommand.pureAction();
		debugText("Undid frame change name.");
	}

	public redo(): void {
		super.redo();
		debugText("Redid frame change name.");
	}

	public pureAction(): void {

		const frame = Editor.GetDocumentEditor().projectTree.findByName(this.oldName);

		if (typeof (frame) === "undefined") {
			debugText("Could not find frame.");
			return;
		}

		frame.setName(this.newName);

	}

}