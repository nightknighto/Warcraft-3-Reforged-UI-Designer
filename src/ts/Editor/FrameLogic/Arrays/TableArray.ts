import RemoveFrame from "../../../Commands/Implementation/RemoveFrame"
import SaveContainer from "../../../Persistence/SaveContainer"
import { ProjectTree } from "../../ProjectTree"
import { FrameBuilder } from "../FrameBuilder"
import { FrameComponent } from "../FrameComponent"
import BaseArray from "./BaseArray"

export default class TableArray extends BaseArray {
    static SAVE_KEY_NAME: string = 'arrayName'
    static SAVE_KEY_ROWS: string = 'ArrayRows'
    static SAVE_KEY_COLS: string = 'ArrayCols'
    static SAVE_KEY_LEFT_X: string = 'ArrayLeftX'
    static SAVE_KEY_TOP_Y: string = 'ArrayTopY'
    static SAVE_KEY_X_GAP: string = 'ArrayXGap'
    static SAVE_KEY_Y_GAP: string = 'ArrayYGap'
    static SAVE_KEY_ELEMENTS: string = 'ArrayElements'
    static SAVE_KEY_EACH_ELEMENT_NAME: string = 'ElementName'

    public target: FrameComponent
    private rows: number
    private columns: number
    private leftX: number
    private topY: number
    private gapX: number
    private gapY: number

    public constructor(
        target: FrameComponent,
        rows: number,
        columns: number,
        leftX: number,
        topY: number,
        gapX: number,
        gapY: number,
        ownerArray: boolean
    ) {
        super()
        this.target = target
        this.rows = rows
        this.columns = columns
        this.leftX = leftX
        this.topY = topY
        this.gapX = gapX
        this.gapY = gapY
        this.ownerArray = ownerArray

        this.arrayName = this.target.getName().replace('[', '').replace(']', '')
    }

    public create(): void {
        this.elements[0] = this.target
        this.target.array = this

        const parent = this.target.getParent()

        let index = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (i == 0 && j == 0) continue
                index++

                const builder = FrameBuilder.copy(this.target)

                builder.name = this.arrayName + 'T[' + index + ']'
                builder.x = this.leftX + (builder.width + this.gapX) * j
                builder.y = this.topY + builder.height - (builder.height + this.gapY) * i
                const newFrame = parent?.createAsChild(builder)

                if (newFrame) {
                    this.elements.push(newFrame)
                    newFrame.array = this
                    if (this.ownerArray) {
                        //find if parent array has the same index. If yes, change parent
                        for (const el of ProjectTree.getInstance().getIterator()) {
                            const checkingName = parent?.getName().slice(0, parent.getName().length - 4)
                            if (el.getName() == checkingName + '[' + index + ']' || el.getName() == checkingName + '[' + '0' + index + ']') {
                                el.makeAsParentTo(newFrame)
                                if (this.target.getTooltip()) newFrame.setTooltip(true)

                                break
                            }
                        }
                    }
                }

            }
        }

    }

    public destroy(): void {
        this.elements.forEach(el => {
            if(el != this.target) el.destroy()
        })
        this.elements = []
        this.target.array = undefined
    }

    public setXGap(gap: number): void {
        this.gapX = gap
        for(let i = 0; i < this.elements.length; i++) {
            const el = this.elements[i]
            el.custom.setLeftX(this.leftX + (el.custom.getWidth() + this.gapX) * (i % this.columns))
        }
    }

    public setYGap(gap: number): void {
        this.gapY = gap
        for(let i = 0; i < this.elements.length; i++) {
            const el = this.elements[i]
            el.custom.setBotY(this.topY + el.custom.getHeight() - (el.custom.getHeight() + this.gapY) * Math.floor(i / this.columns))
        }
    }

    public setRows(rows: number): void {
        this.rows = rows
        this.destroy()
        this.create()
    }

    public setCols(columns: number): void {
        this.columns = columns
        this.destroy()
        this.create()
    }

    public cloneProps(cloningTarget: FrameComponent): void {
        
        const el = this.target
        el.setTooltip(cloningTarget.getTooltip())
        el.type = cloningTarget.type

        el.custom.setText(cloningTarget.custom.getText())
        el.custom.setWidth(cloningTarget.custom.getWidth())
        el.custom.setHeight(cloningTarget.custom.getHeight())
        el.custom.setTrigVar(cloningTarget.custom.getTrigVar())
        el.custom.setIsRelative(cloningTarget.custom.getIsRelative())
        el.custom.setDiskTexture(cloningTarget.custom.getDiskTexture('normal'), 'normal')
        el.custom.setWc3Texture(cloningTarget.custom.getWc3Texture('normal'), 'normal')
        el.custom.setDiskTexture(cloningTarget.custom.getDiskTexture('back'), 'back')
        el.custom.setWc3Texture(cloningTarget.custom.getWc3Texture('back'), 'back')
        el.custom.setColor(cloningTarget.custom.getColor())
        el.custom.setScale(cloningTarget.custom.getScale())
        el.custom.setHorAlign(cloningTarget.custom.getHorAlign())
        el.custom.setVerAlign(cloningTarget.custom.getVerAlign())

        this.destroy()
        this.create()
    }
    
    getXGap(): number {
        return this.gapX
    }

    getYGap(): number {
        return this.gapY
    }

    getRows(): number {
        return this.rows
    }

    getCols(): number {
        return this.columns
    }

    getTarget(): FrameComponent {
        return this.target
    }

    save(container: SaveContainer): void {
        container.save(TableArray.SAVE_KEY_NAME, this.arrayName)
        container.save(TableArray.SAVE_KEY_ROWS, this.rows)
        container.save(TableArray.SAVE_KEY_COLS, this.columns)
        container.save(TableArray.SAVE_KEY_LEFT_X, this.leftX)
        container.save(TableArray.SAVE_KEY_TOP_Y, this.topY)
        container.save(TableArray.SAVE_KEY_X_GAP, this.gapX)
        container.save(TableArray.SAVE_KEY_Y_GAP, this.gapY)

        const elementsSaveArray: SaveContainer[] = []

        for (const element of this.elements) {
            const elementSaveContainer = new SaveContainer(null)
            elementSaveContainer.save(TableArray.SAVE_KEY_EACH_ELEMENT_NAME, element.getName())
            elementsSaveArray.push(elementSaveContainer)
        }

        container.save(TableArray.SAVE_KEY_ELEMENTS, elementsSaveArray)
    }

    static load(container: SaveContainer): TableArray {
        const arrayName = container.load(TableArray.SAVE_KEY_NAME)
        const rows = container.load(TableArray.SAVE_KEY_ROWS)
        const columns = container.load(TableArray.SAVE_KEY_COLS)
        const leftX = container.load(TableArray.SAVE_KEY_LEFT_X)
        const topY = container.load(TableArray.SAVE_KEY_TOP_Y)
        const gapX = container.load(TableArray.SAVE_KEY_X_GAP)
        const gapY = container.load(TableArray.SAVE_KEY_Y_GAP)

        const elementsSaveArray = container.load(TableArray.SAVE_KEY_ELEMENTS) as SaveContainer[]
        const elements: FrameComponent[] = []
        
        
        for (const elementSaveContainer of elementsSaveArray) {
            const elementName = elementSaveContainer.load(TableArray.SAVE_KEY_EACH_ELEMENT_NAME)
            const element = ProjectTree.getInstance().findByName(elementName)
            if (element) {
                elements.push(element)
            }
        }
        
        const tableArray = new TableArray(elements[0], rows, columns, leftX, topY, gapX, gapY, true)
        tableArray.arrayName = arrayName
        tableArray.elements = elements
        tableArray.elements.forEach(el => el.array = tableArray)

        return tableArray
    }

}