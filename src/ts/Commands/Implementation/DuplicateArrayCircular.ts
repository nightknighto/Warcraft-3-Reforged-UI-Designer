import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import Actionable from "../Actionable";
import Redoable from "../Redoable";
import ChangeFrameName from "./ChangeFrameName";
import RemoveFrame from "./RemoveFrame";

export default class DuplicateArrayCircular implements Redoable, Actionable {

    private centerX: number;
    private centerY: number;
    private radius: number;
    private count: number;
    private initialAngle: number;
    private target: string;

    private undoCommands: Actionable[] = [];

    public constructor(target: FrameComponent | string, centerX: number, centerY: number, radius: number, count: number, initialAngle: number) {

        if (typeof (target) === "string") {
            this.target = target;
        }
        else {
            this.target = target.getName();
        }

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.count = count;
        this.initialAngle = initialAngle;

        return this;

    }

    public pureAction(): void {

        const target = Editor.GetDocumentEditor().projectTree.findByName(this.target);

        if (typeof (target) === "undefined") {
            debugText("Could not find frame.");
            return;
        }

        const angDisp = Math.PI * 2 / this.count;
        const parent = target.getParent();

        for (let i = 1; i <= this.count; i++) {

            const builder = FrameBuilder.copy(target);
            builder.name = target.getName() + 'C[' + i + ']';
            builder.x = this.centerX + this.radius * Math.cos(this.initialAngle + angDisp * i);
            builder.y = this.centerY + this.radius * Math.sin(this.initialAngle + angDisp * i);

            this.undoCommands.push(new RemoveFrame(parent.createAsChild(builder)));
        }

        const oldName = target.getName();
        target.setName(oldName + 'C[0]');
        this.undoCommands.push(new ChangeFrameName(target, oldName));

    }

    public action(): void {
        Editor.GetDocumentEditor().changeStack.pushUndoChange(this, true);
        this.pureAction();
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

}