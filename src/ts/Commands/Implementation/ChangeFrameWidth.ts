import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand"

export default class ChangeFrameWidth extends SimpleCommand {

	private frame: string;
	private width: number;
	private oldWidth: number;

	public constructor (frame: FrameComponent | string, newWidth: number) {
		super();

		if (typeof (frame) === "string") {
			this.frame = frame;
		}
		else {
			this.frame = frame.getName();
		}

		this.width = newWidth;

	}

	public undo(): void {

		const command = new ChangeFrameWidth(this.frame, this.oldWidth);
		command.pureAction();

		super.undo();
		debugText("Undid frame change width.");
	}

	public redo(): void {
		super.redo();
		debugText("Redid frame change width.");
	}

	public pureAction(): void {
		const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame);

		if (typeof (frame) === "undefined") {
			debugText("Could not find frame.");
			return;
		}

		this.oldWidth = frame.custom.getWidth();
		frame.custom.setWidth(this.width);

	}

}