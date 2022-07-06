import tooltip from "bootstrap/js/dist/tooltip";
import ChangeFrameName from "../../../Commands/Implementation/ChangeFrameName";
import CreateFrame from "../../../Commands/Implementation/CreateFrame";
import RemoveFrame from "../../../Commands/Implementation/RemoveFrame";
import SaveContainer from "../../../Persistence/SaveContainer";
import { ProjectTree } from "../../ProjectTree";
import { FrameBuilder } from "../FrameBuilder";
import { FrameComponent } from "../FrameComponent";
import BaseArray from "./BaseArray";

export default class CircleArray extends BaseArray {
    static SAVE_KEY_NAME: string = 'arrayName'
    static SAVE_KEY_TARGET = 'target'
    static SAVE_KEY_CENTER_X = 'centerX'
    static SAVE_KEY_CENTER_Y = 'centerY'
    static SAVE_KEY_RADIUS = 'radius'
    static SAVE_KEY_COUNT = 'count'
    static SAVE_KEY_INITIAL_ANGLE = 'initialAngle'
    static SAVE_KEY_PARENT = 'parent'
    static SAVE_KEY_TOOLTIP = 'tooltip'
    static SAVE_KEY_ELEMENTS: string = 'ArrayElements'
    static SAVE_KEY_EACH_ELEMENT_NAME: string = 'ElementName'


    public target: FrameBuilder
    private centerX: number
    private centerY: number
    private radius: number
    private count: number
    private initialAngle: number

    private parent: FrameComponent
    private tooltip: boolean

    constructor (
        initialFrame: FrameComponent,
        centerX: number,
        centerY: number,
        radius: number,
        count: number,
        initialAngle: number,
        ownerArray: boolean
    ) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.radius = radius
        this.count = count
        this.initialAngle = initialAngle
        this.ownerArray = ownerArray
        
        try{
            this.target = FrameBuilder.copy(initialFrame)
            this.parent = initialFrame.getParent()
            this.tooltip = initialFrame.getTooltip()
            this.arrayName = initialFrame.getName()
        } catch (e) {
            console.log(e)
        }
    }

    public create(): void {
        const frame = this.target
        const parent = this.parent
        const angDisp = (Math.PI * 2) / this.count
        const tooltip = this.tooltip

        const baseName = this.arrayName.replace('[', '').replace(']', '')

        for (let i = 0; i < this.count; i++) {
            const builder = FrameBuilder.copy(frame)
            builder.name = baseName + 'C[' + i + ']'
            builder.x = this.centerX + this.radius * Math.cos(this.initialAngle + angDisp * i)
            builder.y = this.centerY + this.radius * Math.sin(this.initialAngle + angDisp * i)
            const newFrame = parent.createAsChild(builder)
            this.elements.push(newFrame)
            newFrame.array = this

            if (this.ownerArray) {
                try {
                    //find if parent array has the same index. If yes, change parent
                    for (const el of ProjectTree.getInstance().getIterator()) {
                        const checkingName = parent.getName().slice(0, parent.getName().length - 4)
                        if (el.getName() == checkingName + '[' + i + ']' || el.getName() == checkingName + '[' + '0' + i + ']') {
                            el.makeAsParentTo(newFrame)
                            if (tooltip) {
                                newFrame.setTooltip(true)
                            }

                            break
                        }
                    }
                } catch (e) {
                    console.log('CIRC_ARRAY: ' + e)
                }
            }
        }

    }

    public destroy(): void {
        this.elements.forEach(el => {
            el.destroy()
        })
        this.elements = []
    }

    public cloneProps(cloningTarget: FrameComponent): void {
        
        this.target = FrameBuilder.copy(cloningTarget)
        this.destroy()
        this.create()
    }

    setRadius(radius: number): void {
        this.radius = radius
        this.destroy()
        this.create()
    }

    setCount(count: number): void {
        this.count = count
        this.destroy()
        this.create()
    }

    getRadius(): number {
        return this.radius
    }

    getCount(): number {
        return this.count
    }
    
    getFirstElement(): FrameComponent {
        return this.elements[0]
    }

    save(container: SaveContainer): void {
        container.save(CircleArray.SAVE_KEY_NAME, this.arrayName)
        container.save(CircleArray.SAVE_KEY_TARGET, this.target)
        container.save(CircleArray.SAVE_KEY_CENTER_X, this.centerX)
        container.save(CircleArray.SAVE_KEY_CENTER_Y, this.centerY)
        container.save(CircleArray.SAVE_KEY_RADIUS, this.radius)
        container.save(CircleArray.SAVE_KEY_COUNT, this.count)
        container.save(CircleArray.SAVE_KEY_INITIAL_ANGLE, this.initialAngle)
        container.save(CircleArray.SAVE_KEY_PARENT, this.parent.getName())
        container.save(CircleArray.SAVE_KEY_TOOLTIP, this.tooltip)

        const elementsSaveArray: SaveContainer[] = []

        for (const element of this.elements) {
            const elementSaveContainer = new SaveContainer(null)
            elementSaveContainer.save(CircleArray.SAVE_KEY_EACH_ELEMENT_NAME, element.getName())
            elementsSaveArray.push(elementSaveContainer)
        }

        container.save(CircleArray.SAVE_KEY_ELEMENTS, elementsSaveArray)
    }

    static load(container: SaveContainer): CircleArray {
        const arrayName = container.load(CircleArray.SAVE_KEY_NAME)
        const target = container.load(CircleArray.SAVE_KEY_TARGET)
        const centerX = container.load(CircleArray.SAVE_KEY_CENTER_X)
        const centerY = container.load(CircleArray.SAVE_KEY_CENTER_Y)
        const radius = container.load(CircleArray.SAVE_KEY_RADIUS)
        const count = container.load(CircleArray.SAVE_KEY_COUNT)
        const initialAngle = container.load(CircleArray.SAVE_KEY_INITIAL_ANGLE)
        const parent = container.load(CircleArray.SAVE_KEY_PARENT)
        const tooltip = container.load(CircleArray.SAVE_KEY_TOOLTIP)

        const elementsSaveArray = container.load(CircleArray.SAVE_KEY_ELEMENTS) as SaveContainer[]
        const elements: FrameComponent[] = []
        
        
        for (const elementSaveContainer of elementsSaveArray) {
            const elementName = elementSaveContainer.load(CircleArray.SAVE_KEY_EACH_ELEMENT_NAME)
            const element = ProjectTree.getInstance().findByName(elementName)
            if (element) {
                elements.push(element)
            }
        }
        
        const circleArray = new CircleArray(target, centerX, centerY, radius, count, initialAngle, false)
        circleArray.arrayName = arrayName
        circleArray.parent = ProjectTree.getInstance().findByName(parent)
        circleArray.tooltip = tooltip
        if(elements[0])
            circleArray.target = FrameBuilder.copy(elements[0])
            
        circleArray.elements = elements
        circleArray.elements.forEach(el => el.array = circleArray)

        return circleArray
    }
}