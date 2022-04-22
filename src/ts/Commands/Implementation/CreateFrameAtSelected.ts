import { ICallableDivInstance } from '../../ClassesAndFunctions/ICallableDivInstance'
import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameBuilder } from '../../Editor/FrameLogic/FrameBuilder'
import { ProjectTree } from '../../Editor/ProjectTree'
import CreateFrame from './CreateFrame'

export default class CreateFrameAtSelected implements ICallableDivInstance {
    private builder: FrameBuilder

    public constructor(builder: FrameBuilder) {
        this.builder = builder
    }

    //Used for ICallableDivInstance, aka Insert Menu
    public run(): void {
        const name = this.builder.name

        if (this.builder.autoId) {
            if (FrameBuilder.frameNumber / 10 < 10) {
                this.builder.name += '0' + `${FrameBuilder.frameNumber++}`
            } else {
                this.builder.name += `${FrameBuilder.frameNumber++}`
            }
        }

        let target = ProjectTree.getInstance().getSelectedFrame()
        if (target == null) {
            target = ProjectTree.getInstance().rootFrame
        }

        const command = new CreateFrame(target, FrameBuilder.copy(this.builder))
        command.action()

        this.builder.name = name
        debugText('Element Created')
    }
}
