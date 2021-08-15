import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Actionable from "../Actionable";
import Redoable from "../Redoable";
import ChangeFrameName from "./ChangeFrameName";
import RemoveFrame from "./RemoveFrame";

export default class DuplicateArrayTable implements Redoable, Actionable {

    private rows: number;
    private columns: number;
    private leftX: number;
    private topY: number;
    private gapX: number;
    private gapY: number;
    private target: string;

    private undoCommands: Actionable[] = [];

    public constructor(target: FrameComponent | string, rows: number, columns: number, leftX: number, topY: number, gapX: number, gapY: number) {

        if (typeof (target) === "string") {
            this.target = target;
        }
        else {
            this.target = target.getName();
        }

        this.rows = rows;
        this.columns = columns;
        this.topY = topY;
        this.leftX = leftX;
        this.gapX = gapX;
        this.gapY = gapY;

        return this;
    }


    redo(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, false);
        this.pureAction();
    }
    undo(): void {
        if (this.undoCommands.length == 0) {
            debugText("No applicable undo actions.");
            return;
        }

        for (const command of this.undoCommands) {
            command.pureAction();
        }
        this.undoCommands = [];

        Editor.GetDocumentEditor().changeStack.pushRedoChange(this);
    }
    action(): void {

        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true);
        this.pureAction();
    }
    pureAction(): void {

        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.target);

        if (typeof (frame) === "undefined") {
            debugText("Could not find frame.");
            return;
        }

        const parent = frame.getParent();

        let index = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (i == 0 && j == 0) continue;
                index++;

                const builder = FrameBuilder.copy(frame)

                builder.name = frame.getName() + 'T[' + index + ']';
                builder.x = this.leftX + (builder.width + this.gapX) * j;
                builder.y = this.topY + builder.height - (builder.height + this.gapY) * i;

                this.undoCommands.push(new RemoveFrame(parent.createAsChild(builder)));
            }
        }

        const oldName = frame.getName();
        frame.setName(oldName + "T[00]")
        this.undoCommands.push(new ChangeFrameName(frame, oldName));

    }

}