import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import CustomComplex from '../../Editor/FrameLogic/CustomComplex'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class ChangeFrameDiskTexture extends SimpleCommand {
    private frame: string
    private oldTexture?: string
    private newTexture: string

    public constructor(frame: FrameComponent | string, texture: string) {
        super()

        if (typeof frame === 'string') {
            this.frame = frame
        } else {
            this.frame = frame.getName()
        }

        this.newTexture = texture
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)

        if (typeof frame === 'undefined') {
            debugText('Could not find frame.')
            return
        }

        if (!(frame.custom instanceof CustomComplex)) {
            debugText('Frame not CustomComplex')
            return
        }

        this.oldTexture = frame.custom.getDiskTexture('normal')
        frame.custom.setDiskTexture(this.newTexture, 'normal')
    }

    public undo(): void {
        if (this.oldTexture) {
            const command = new ChangeFrameDiskTexture(this.frame, this.oldTexture)
            command.pureAction()
        }

        super.undo()
        debugText('Undid change frame disk texture')
    }

    public redo(): void {
        super.redo()
        debugText('Redid change frame disk texture')
    }
}
