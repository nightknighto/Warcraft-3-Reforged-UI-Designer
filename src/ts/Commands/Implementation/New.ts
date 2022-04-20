import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameType } from "../../Editor/FrameLogic/FrameType & FrameRequire";
import SaveContainer from "../../Persistence/SaveContainer";
import SimpleCommand from "../SimpleCommand";
import Load from "./Load";

export default class New extends SimpleCommand {

	private saveContainer: SaveContainer;

	public pureAction(): void {

		const projectTree = Editor.GetDocumentEditor().projectTree;

		this.saveContainer = new SaveContainer(null);
		projectTree.save(this.saveContainer);

		for (const el of projectTree.getIterator()) {
			if (el.type == FrameType.ORIGIN) {
				continue;
			}
			el.destroy()
		}

		FrameBuilder.frameNumber = 1;

	}

	public undo(): void {

		const command = new Load(this.saveContainer);
		command.pureAction();
		super.undo();
		debugText("Undid new project.");

	}

	public redo(): void {

		super.redo();
		debugText("Redid new project.");

	}

}