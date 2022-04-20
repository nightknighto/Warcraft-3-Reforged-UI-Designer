import { debugText } from "../../Classes & Functions/Mini-Functions"
import { Editor } from "../../Editor/Editor"
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder"
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent"
import Actionable from "../Actionable"
import SimpleCommand from "../SimpleCommand"
import ChangeFrameName from "./ChangeFrameName"
import RemoveFrame from "./RemoveFrame"
import CreateFrame from "./CreateFrame"

export default class DuplicateArrayCircular extends SimpleCommand {

    private centerX: number
    private centerY: number
    private radius: number
    private count: number
    private initialAngle: number
    private target: string
    private ownerArray: boolean

    private undoCommands: Actionable[] = [];

    public constructor (target: FrameComponent | string, centerX: number, centerY: number, radius: number, count: number, initialAngle: number, ownerArray: boolean) {

        super()

        if (typeof (target) === "string") {
            this.target = target
        }
        else {
            this.target = target.getName()
        }

        this.centerX = centerX
        this.centerY = centerY
        this.radius = radius
        this.count = count
        this.initialAngle = initialAngle
        this.ownerArray = ownerArray

        return this

    }

    public pureAction(): void {

        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.target)

        if (typeof (frame) === "undefined") {
            debugText("Could not find frame.")
            return
        }

        console.log("name: " + frame.getName())
        console.log("tooltip: " + frame.getTooltip())
        const tooltip = frame.getTooltip()

        const angDisp = Math.PI * 2 / this.count
        const parent = frame.getParent()

        const oldName = frame.getName()
        frame.setName(frame.getName().replace('[', '').replace(']', ''))

        for (let i = 0; i < this.count; i++) {

            const builder = FrameBuilder.copy(frame)
            builder.name = frame.getName() + 'C[' + i + ']'
            builder.x = this.centerX + this.radius * Math.cos(this.initialAngle + angDisp * i)
            builder.y = this.centerY + this.radius * Math.sin(this.initialAngle + angDisp * i)
            const newFrame = parent.createAsChild(builder)

            if (this.ownerArray) {
                try { //find if parent array has the same index. If yes, change parent
                    for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
                        const checkingName = parent.getName().slice(0, parent.getName().length - 4)
                        // alert('checkingName: '+checkingName)
                        // alert('prod: '+checkingName+"["+ind+"]")
                        if (el.getName() == checkingName + "[" + i + "]" || el.getName() == checkingName + "[" + "0" + i + "]") {
                            el.makeAsParentTo(newFrame)
                            console.log("step1")
                            console.log("check1: " + tooltip)
                            if (tooltip) {
                                newFrame.setTooltip(true)
                                console.log("check2: " + newFrame.getTooltip())
                            }

                            break
                        }
                    }
                } catch (e) { console.log('CIRC_ARRAY: ' + e) }
            }

            this.undoCommands.push(new RemoveFrame(newFrame))
        }

        this.undoCommands.push(new CreateFrame(frame.getParent(), FrameBuilder.copy(frame)))
        new RemoveFrame(frame).pureAction()

        this.undoCommands.push(new ChangeFrameName(frame, oldName))


    }

    public undo(): void {

        if (this.undoCommands.length == 0) {
            debugText("No applicable undo actions.")
            return
        }

        for (const command of this.undoCommands) {
            command.pureAction()
        }
        this.undoCommands = []

        super.undo()
        debugText("Undid duplicate array (circular).")
    }

    public redo(): void {
        super.redo()
        debugText("Redid duplicate array (circular).")
    }

}