import { debugText } from '../../Classes & Functions/Mini-Functions'
import { Editor } from '../../Editor/Editor'
import { FrameBuilder } from '../../Editor/FrameLogic/FrameBuilder'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import Actionable from '../Actionable'
import SimpleCommand from '../SimpleCommand'
import ChangeFrameName from './ChangeFrameName'
import RemoveFrame from './RemoveFrame'

export default class DuplicateArrayTable extends SimpleCommand {
    private rows: number
    private columns: number
    private leftX: number
    private topY: number
    private gapX: number
    private gapY: number
    private target: string
    private ownerArray: boolean

    private undoCommands: Actionable[] = []

    public constructor(
        target: FrameComponent | string,
        rows: number,
        columns: number,
        leftX: number,
        topY: number,
        gapX: number,
        gapY: number,
        ownerArray: boolean
    ) {
        super()

        if (typeof target === 'string') {
            this.target = target
        } else {
            this.target = target.getName()
        }

        this.rows = rows
        this.columns = columns
        this.topY = topY
        this.leftX = leftX
        this.gapX = gapX
        this.gapY = gapY
        this.ownerArray = ownerArray

        return this
    }

    public undo(): void {
        if (this.undoCommands.length == 0) {
            debugText('No applicable undo actions.')
            return
        }

        for (const command of this.undoCommands) {
            command.pureAction()
        }
        this.undoCommands = []

        super.undo()
        debugText('Undid frame duplication (table).')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame duplication (table).')
    }

    public pureAction(): void {
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.target)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        const parent = frame.getParent()

        const oldName = frame.getName()
        frame.setName(frame.getName().replace('[', '').replace(']', ''))

        let index = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (i == 0 && j == 0) continue
                index++

                const builder = FrameBuilder.copy(frame)

                builder.name = frame.getName() + 'T[' + index + ']'
                builder.x = this.leftX + (builder.width + this.gapX) * j
                builder.y = this.topY + builder.height - (builder.height + this.gapY) * i
                const newFrame = parent.createAsChild(builder)

                if (this.ownerArray) {
                    //find if parent array has the same index. If yes, change parent
                    for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
                        const checkingName = parent.getName().slice(0, parent.getName().length - 4)
                        // alert('checkingName: '+checkingName)
                        // alert('prod: '+checkingName+"["+ind+"]")
                        if (el.getName() == checkingName + '[' + index + ']' || el.getName() == checkingName + '[' + '0' + index + ']') {
                            el.makeAsParentTo(newFrame)
                            if (frame.getTooltip()) newFrame.setTooltip(true)

                            break
                        }
                    }
                }

                this.undoCommands.push(new RemoveFrame(newFrame))
            }
        }

        frame.setName(frame.getName() + 'T[00]')
        this.undoCommands.push(new ChangeFrameName(frame, oldName))
    }
}
