import { FrameType } from './FrameType'
import SaveContainer from '../../Persistence/SaveContainer'
import { FrameComponent } from './FrameComponent'
import CustomComplex, { CustomComplexProps } from './CustomComplex'
import FrameBaseContent from './FrameBaseContent'
import { ProjectTree } from '../ProjectTree'

export class FrameBuilder implements CustomComplexProps {
    static frameNumber = 1

    width = 0.1
    height = 0.1
    x = 0.25
    y = 0.25
    z = 1
    name = 'Frame'
    type: FrameType = FrameType.BACKDROP
    textureDiskPath = ''
    textureWc3Path = ''
    textureBackDiskPath = ''
    textureBackWc3Path = ''
    trigVar = ''
    isRelative = false
    text = 'Text'
    scale = 1
    color = '#FFCC00'
    textHorAlign: 'left' | 'center' | 'right' = 'left'
    textVerAlign: 'center' | 'start' | 'flex-end' = 'start'
    autoId = false

    constructor(autoassignId: boolean) {
        this.autoId = autoassignId
    }

    load(container: SaveContainer): void {
        const projectTree = ProjectTree.getInstance()
        const originallySelectedFrame = projectTree.getSelectedFrame()

        if (!container.hasKey(FrameComponent.SAVE_KEY_NAME)) {
            console.error('Could not parse JSON.')
            return
        }
        if (!container.hasKey(FrameComponent.SAVE_KEY_TYPE)) {
            console.error('Could not parse JSON.')
            return
        }

        if (!container.hasKey(FrameBaseContent.SAVE_KEY_LEFTX)) {
            console.error('Could not parse JSON.')
            return
        }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_BOTY)) {
            console.error('Could not parse JSON.')
            return
        }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_HEIGHT)) {
            console.error('Could not parse JSON.')
            return
        }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_WIDTH)) {
            console.error('Could not parse JSON.')
            return
        }

        this.name = container.load(FrameComponent.SAVE_KEY_NAME)
        this.type = container.load(FrameComponent.SAVE_KEY_TYPE)

        if (/.*[0-9]+/.test(this.name)) {
            const index = this.name.search(/[0-9]+/)
            const frameNumber = Number.parseInt(this.name.slice(index))

            console.log(frameNumber)

            FrameBuilder.frameNumber = Math.max(FrameBuilder.frameNumber, frameNumber + 1)
        }

        this.x = container.load(FrameBaseContent.SAVE_KEY_LEFTX)
        this.y = container.load(FrameBaseContent.SAVE_KEY_BOTY)
        this.height = container.load(FrameBaseContent.SAVE_KEY_HEIGHT)
        this.width = container.load(FrameBaseContent.SAVE_KEY_WIDTH)

        try {
            this.textureDiskPath = container.load(CustomComplex.SAVE_KEY_TEXTURE_DISK_PATH)
            this.textureWc3Path = container.load(CustomComplex.SAVE_KEY_TEXTURE_WC3_PATH)
            this.trigVar = container.load(CustomComplex.SAVE_KEY_TRIGGER_VARIABLE_NAME)
            this.isRelative = container.load(CustomComplex.SAVE_KEY_TRIGGER_IS_RELATIVE)
            this.textureBackDiskPath = container.load(CustomComplex.SAVE_KEY_TEXTURE_BACK_DISK_PATH)
            this.textureBackWc3Path = container.load(CustomComplex.SAVE_KEY_TEXTURE_BACK_WC3_PATH)
        } catch (e) {
            console.log('textures error: ' + e)
        }
        // if (!container.hasKey(CustomComplex.SAVE_KEY_SCALE)) { console.error("Could not parse JSON."); return; }
        // if (!container.hasKey(CustomComplex.SAVE_KEY_COLOR)) { console.error("Could not parse JSON."); return; }

        try {
            this.text = container.load(CustomComplex.SAVE_KEY_TEXT)
            this.scale = container.load(CustomComplex.SAVE_KEY_SCALE)
            this.color = container.load(CustomComplex.SAVE_KEY_COLOR)
            this.textHorAlign = container.load(CustomComplex.SAVE_KEY_HorAlign)
            this.textVerAlign = container.load(CustomComplex.SAVE_KEY_VerAlign)
        } catch (e) {
            console.log('Loading Error: Text Frame Options Missing.')
        }

        const frameComponent = projectTree.appendToSelected(this)

        try {
            frameComponent.setTooltip(container.load(FrameComponent.SAVE_KEY_TOOLTIP))
            frameComponent.custom.getElement().style.outlineColor = ProjectTree.outlineUnSelected_Tooltip
        } catch (e) {
            console.log('Loading Error: Tooltip Info')
        }

        try {
            frameComponent.world_frame = container.load(FrameComponent.SAVE_KEY_WORLDFRAME)
        } catch (e) {
            console.log('Loading Error: world frame missing')
        }

        projectTree.select(frameComponent)

        if (container.hasKey(FrameComponent.SAVE_KEY_CHILDREN))
            for (const frameData of container.load(FrameComponent.SAVE_KEY_CHILDREN)) new FrameBuilder(false).load(frameData)

        projectTree.select(originallySelectedFrame)
    }

    private static copyBuilder(frame: FrameBuilder): FrameBuilder {
        const frameBuilder = new FrameBuilder(false)

        for (const key in frameBuilder) {
            frameBuilder[key] = frame[key]
        }

        return frameBuilder
    }

    private static copyFrame(frame: FrameComponent): FrameBuilder {
        const frameBuilder = new FrameBuilder(false)

        frameBuilder.name = frame.getName()
        frameBuilder.type = frame.type
        frameBuilder.text = frame.custom.getText()
        frameBuilder.width = frame.custom.getWidth()
        frameBuilder.height = frame.custom.getHeight()
        frameBuilder.y = frame.custom.getBotY()
        frameBuilder.x = frame.custom.getLeftX()
        frameBuilder.z = frame.custom.getZIndex()
        frameBuilder.trigVar = frame.custom.getTrigVar()
        frameBuilder.isRelative = frame.custom.getIsRelative()
        frameBuilder.textureDiskPath = frame.custom.getDiskTexture('normal')
        frameBuilder.textureWc3Path = frame.custom.getWc3Texture('normal')
        frameBuilder.textureBackDiskPath = frame.custom.getDiskTexture('back')
        frameBuilder.textureBackWc3Path = frame.custom.getWc3Texture('back')
        frameBuilder.color = frame.custom.getColor()
        frameBuilder.scale = frame.custom.getScale()
        frameBuilder.textHorAlign = frame.custom.getHorAlign()
        frameBuilder.textVerAlign = frame.custom.getVerAlign()

        return frameBuilder
    }

    static copy(frame: FrameComponent | FrameBuilder): FrameBuilder {
        return frame instanceof FrameComponent ? FrameBuilder.copyFrame(frame) : FrameBuilder.copyBuilder(frame)
    }

    // Buttons
    static newButton = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        frameBuilder.type = FrameType.BUTTON
        frameBuilder.name = 'Button'
        return frameBuilder
    }
    static newButtonBlackText = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.textureDiskPath = './files/images/ScriptDialogButton.png'
        frameBuilder.type = FrameType.SCRIPT_DIALOG_BUTTON
        frameBuilder.name = 'Black Text Button'
        return frameBuilder
    }
    static newButtonBlueText = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/BrowserButton.png'
        newFrameBuilder.type = FrameType.BROWSER_BUTTON
        newFrameBuilder.name = 'Blue Text Button'
        return newFrameBuilder
    }
    static newButtonInvis = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/InvisButton.png'
        newFrameBuilder.type = FrameType.INVIS_BUTTON
        newFrameBuilder.name = 'Invis Button'
        return newFrameBuilder
    }

    // Backdrops
    static newBackdrop = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        frameBuilder.type = FrameType.BACKDROP
        frameBuilder.name = 'Backdrop'
        return frameBuilder
    }
    static newBackdropSemiTransWithBorder = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/CheckListBox.png'
        newFrameBuilder.type = FrameType.CHECKLIST_BOX
        newFrameBuilder.name = 'Backdrop Semi Trans'
        return newFrameBuilder
    }
    static newBackdropBlackBoxWithArrow = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/OptionsPopupMenuBackdropTemplate.png'
        newFrameBuilder.type = FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE
        newFrameBuilder.name = 'Backdrop Black Box Arrow'
        return newFrameBuilder
    }
    static newBackdropBlack = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonBaseTemplate.png'
        newFrameBuilder.type = FrameType.QUEST_BUTTON_BASE_TEMPLATE
        newFrameBuilder.name = 'Backdrop Black'
        return newFrameBuilder
    }
    static newBackdropGrey = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonPushedBackdropTemplate.png'
        newFrameBuilder.type = FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE
        newFrameBuilder.name = 'Backdrop Grey'
        return newFrameBuilder
    }
    static newBackdropVeryBlack = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/QuestButtonDisabledBackdropTemplate.png'
        newFrameBuilder.type = FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE
        newFrameBuilder.name = 'Backdrop Very Black'
        return newFrameBuilder
    }
    static newBackdropDefaultMenus = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/EscMenuBackdrop.png'
        newFrameBuilder.type = FrameType.ESC_MENU_BACKDROP
        newFrameBuilder.name = 'Default Menus'
        return newFrameBuilder
    }

    // Text
    static newText = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.type = FrameType.TEXT_FRAME
        frameBuilder.text = 'Text Frame testing'
        frameBuilder.name = 'Text'
        frameBuilder.width = 0.07
        frameBuilder.height = 0.07
        return frameBuilder
    }
    static newTextArea = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.textureDiskPath = './files/images/TextArea.png'
        frameBuilder.type = FrameType.TEXTAREA
        frameBuilder.name = 'Text Area'
        return frameBuilder
    }
    static newEditBox = () => {
        const frameBuilder = new FrameBuilder(true)
        frameBuilder.textureDiskPath = './files/images/EditBox.png'
        frameBuilder.type = FrameType.EDITBOX
        frameBuilder.name = 'Edit Box'
        return frameBuilder
    }

    // Others
    static newCheckbox = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/QuestCheckBox.png'
        newFrameBuilder.type = FrameType.CHECKBOX
        newFrameBuilder.name = 'Checkbox'
        return newFrameBuilder
    }
    static newHorizontalBar = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        newFrameBuilder.type = FrameType.HORIZONTAL_BAR
        newFrameBuilder.name = 'Horizontal Bar'
        return newFrameBuilder
    }

    // Templates
    static newHorizBarWithBG = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        newFrameBuilder.type = FrameType.HOR_BAR_BACKGROUND
        newFrameBuilder.name = 'Horiz Bar With BG'
        return newFrameBuilder
    }
    static newHorizBarWithText = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        newFrameBuilder.type = FrameType.HOR_BAR_TEXT
        newFrameBuilder.name = 'Horiz Bar with Text'
        return newFrameBuilder
    }
    static newHorizBarWithTextBG = () => {
        const newFrameBuilder = new FrameBuilder(true)
        newFrameBuilder.textureDiskPath = './files/images/CustomFrame.png'
        newFrameBuilder.type = FrameType.HOR_BAR_BACKGROUND_TEXT
        newFrameBuilder.name = 'Horiz Bar with Text BG'
        return newFrameBuilder
    }
}
