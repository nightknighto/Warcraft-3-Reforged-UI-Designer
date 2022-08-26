/* eslint @typescript-eslint/no-explicit-any: ["off", { "ignoreRestArgs": false }]*/

import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from './FrameComponent'
import SaveContainer from '../../Persistence/SaveContainer'
import FrameBaseContent from './FrameBaseContent'
import { FrameType } from './FrameType'
import { MouseFunctions } from '../../ClassesAndFunctions/MouseFunctions'
import { blp_to_png } from '../../ImageConversion/blp/blp to png'
import { dds_to_png } from '../../ImageConversion/dds/dds to png'
import { extname } from '../../ImageConversion/shared'
import { readFile } from 'fs'
import { basename } from 'path'
import { ParameterEditor } from '../ParameterEditor'
import { ProjectTree } from '../ProjectTree'
import { Editor } from '../Editor'

export default class CustomComplex extends FrameBaseContent implements CustomComplexProps {
    public static readonly SAVE_KEY_TEXT = 'text'
    public static readonly SAVE_KEY_SCALE = 'scale'
    public static readonly SAVE_KEY_COLOR = 'color'
    public static readonly SAVE_KEY_HorAlign = 'HorAlign'
    public static readonly SAVE_KEY_VerAlign = 'VerAlign'
    public static readonly SAVE_KEY_TEXTURE_DISK_PATH = 'textureDiskPath'
    public static readonly SAVE_KEY_TEXTURE_WC3_PATH = 'textureWc3Path'
    public static readonly SAVE_KEY_TEXTURE_BACK_DISK_PATH = 'textureBackDiskPath'
    public static readonly SAVE_KEY_TEXTURE_BACK_WC3_PATH = 'textureBackWc3Path'
    public static readonly SAVE_KEY_TRIGGER_VARIABLE_NAME = 'trig_var'
    public static readonly SAVE_KEY_TRIGGER_IS_RELATIVE = 'isRelative'

    text = ''
    scale = 1
    color = '#ffffff'
    textHorAlign: 'left' | 'center' | 'right' = 'left'
    textVerAlign: 'start' | 'center' | 'flex-end' = 'start'
    textureDiskPath = ''
    textureWc3Path = ''
    textureBackDiskPath = ''
    textureBackWc3Path = ''
    trigVar = ''
    isRelative = false

    private elemTextContainer?: HTMLDivElement
    private elemText?: HTMLParagraphElement
    private elemImage?: HTMLImageElement
    elemImageBack?: HTMLImageElement

    public constructor(frameComponent: FrameComponent, width: number, height: number, x: number, y: number, z: number, props?: CustomComplexProps) {
        super(frameComponent, document.createElement('div'), width, height, x, y, z)

        try {
            if (props) {
                this.isRelative = props.isRelative
                this.specialTypesSetup(props)
            }

            this.element.style.wordBreak = 'break-word'
            this.element.style.overflowY = 'hidden'
            this.element.style.userSelect = 'none'
            this.element.style.lineHeight = '1'

            MouseFunctions(this)
            ;(this.element as any).CustomComplex = this
        } catch (e) {
            alert(e)
        }
    }

    public getElement(): HTMLDivElement {
        return this.element as HTMLDivElement
    }

    public getScale(): number {
        return this.scale
    }

    public setScale(val: number): void {
        try {
            if (val <= 0) {
                debugText("Scale can't be zero or less")
                return
            }
            this.scale = val
            if (this.elemText) {
                this.elemText.style.fontSize = (val * Editor.getInstance().workspaceImage.getBoundingClientRect().width) / 100 + 'px'
            }
        } catch (e) {
            console.log('e: ' + e)
        }
    }

    public getColor(): string {
        return this.color
    }

    public setColor(val: string): void {
        if (this.elemText) this.elemText.style.color = val
        this.color = val
        debugText('Color changed.')
    }

    public getHorAlign(): 'left' | 'center' | 'right' {
        return this.textHorAlign
    }

    public setHorAlign(align: 'left' | 'center' | 'right') {
        if (this.elemText) this.elemText.style.textAlign = align
        this.textHorAlign = align
    }

    public getVerAlign(): 'start' | 'center' | 'flex-end' {
        return this.textVerAlign
    }

    public setVerAlign(align: 'start' | 'center' | 'flex-end') {
        if (this.elemTextContainer) this.elemTextContainer.style.alignItems = align
        this.textVerAlign = align
    }

    public getText(): string {
        return this.text
    }

    public setText(Text: string): void {
        this.text = Text
        if (this.elemText) this.elemText.innerText = Text
    }
    public getDiskTexture(which: 'normal' | 'back'): string {
        if (which == 'normal') return this.textureDiskPath
        else return this.textureBackDiskPath
    }

    public setDiskTexture(Input: File | string, which: 'normal' | 'back'): void {
        let Image: HTMLImageElement | undefined
        if (which == 'normal') {
            Image = this.elemImage
        } else {
            Image = this.elemImageBack
        }

        if (typeof Input !== 'string') {
            const file = Input
            if (which == 'normal') this.textureDiskPath = file.path
            else this.textureBackDiskPath = file.path

            const ext = extname(file.name)

            if (ext === '.dds') {
                const buf = file.arrayBuffer()
                buf.then((buffer) => {
                    if (Image) Image.src = dds_to_png(buffer) ?? ''
                })
            } else if (ext === '.blp') {
                const buf = file.arrayBuffer()
                buf.then((buffer) => {
                    if (Image) Image.src = blp_to_png(buffer) ?? ''
                })
            } else {
                if (Image) Image.src = file.path
            }

            if (ParameterEditor.getInstance().checkboxPathFill.checked) {
                this.setWc3Texture(file.name, which, true)
            }
        } else {
            const ext = extname(basename(Input))
            if (which == 'normal') this.textureDiskPath = Input
            else this.textureBackDiskPath = Input

            readFile(Input, (e, buffer) => {
                try {
                    if (e) console.log('setDiskTexture: ' + e)
                    if (ext === '.dds') {
                        if (Image) Image.src = dds_to_png(buffer) ?? ''
                    } else if (ext === '.blp') {
                        if (Image) Image.src = blp_to_png(buffer) ?? ''
                    } else {
                        if (Image) Image.src = Input
                    }
                } catch (e) {
                    console.log('setDiskTexture-readFILE: ' + e)
                }
            })

            if (ParameterEditor.getInstance().checkboxPathFill.checked) {
                this.setWc3Texture(basename(Input), which, true)
            }
        }
    }

    /**
     *
     * @param newTexturePath
     * @param which
     * @param refresh refresh input field? Default is false
     */
    public setWc3Texture(newTexturePath: string, which: 'normal' | 'back', refresh?: boolean): void {
        if (which == 'normal') {
            this.textureWc3Path = newTexturePath
            if (refresh) ParameterEditor.getInstance().inputElementWC3Texture.value = newTexturePath
        } else {
            this.textureBackWc3Path = newTexturePath
            if (refresh) ParameterEditor.getInstance().inputElementBackWC3Texture.value = newTexturePath
        }
    }

    public getWc3Texture(which: 'normal' | 'back'): string {
        if (which == 'normal') return this.textureWc3Path
        else return this.textureBackWc3Path
    }

    public setTrigVar(VarName: string): void {
        this.trigVar = VarName
    }

    public getTrigVar(): string {
        return this.trigVar
    }

    public setIsRelative(IsIt: boolean): void {
        this.isRelative = IsIt
    }

    public getIsRelative(): boolean {
        return this.isRelative
    }

    public save(container: SaveContainer): void {
        super.save(container)
        container.save(CustomComplex.SAVE_KEY_TEXT, this.text)
        container.save(CustomComplex.SAVE_KEY_SCALE, this.scale)
        container.save(CustomComplex.SAVE_KEY_COLOR, this.color)
        container.save(CustomComplex.SAVE_KEY_HorAlign, this.textHorAlign)
        container.save(CustomComplex.SAVE_KEY_VerAlign, this.textVerAlign)
        container.save(CustomComplex.SAVE_KEY_TEXTURE_WC3_PATH, this.textureWc3Path)
        container.save(CustomComplex.SAVE_KEY_TEXTURE_DISK_PATH, this.textureDiskPath)
        container.save(CustomComplex.SAVE_KEY_TEXTURE_BACK_WC3_PATH, this.textureBackWc3Path)
        container.save(CustomComplex.SAVE_KEY_TEXTURE_BACK_DISK_PATH, this.textureBackDiskPath)
        container.save(CustomComplex.SAVE_KEY_TRIGGER_VARIABLE_NAME, this.trigVar)
        container.save(CustomComplex.SAVE_KEY_TRIGGER_IS_RELATIVE, this.isRelative)
        // container.save(CustomComplex.SAVE_KEY_, this.);
    }

    public delete(): void {
        this.element.remove()
        ProjectTree.getInstance().select(null)

        debugText('Deleted the element.')
    }

    public static GetCustomComplexFromHTMLDivElement(divElement: HTMLDivElement): CustomComplex {
        return (divElement as any).CustomComplex
    }

    /* ***********************************************  */
    private specialTypesSetup(props: Partial<CustomComplexProps>) {
        const ImageSetup = () => {
            this.elemImage = this.element.appendChild(document.createElement('img'))
            this.elemImage.style.width = '100%'
            this.elemImage.style.height = '100%'
            this.elemImage.draggable = false
            this.elemImage.style.pointerEvents = 'none'
            // this.elemImage.style.position = 'absolute';
            // if(this.elemText) this.elemImage.style.zIndex = '-1';
            if (props) {
                props.textureDiskPath && this.setDiskTexture(props.textureDiskPath, 'normal')
                props.textureWc3Path && this.setWc3Texture(props.textureWc3Path, 'normal')
                props.trigVar && this.setTrigVar(props.trigVar)
            }
        }

        const TextSetup = () => {
            this.elemTextContainer = this.element.appendChild(document.createElement('div'))
            this.elemTextContainer.style.top = '0'
            this.elemTextContainer.style.width = '100%'
            this.elemTextContainer.style.height = '100%'
            this.elemTextContainer.style.display = 'flex'
            this.elemTextContainer.style.pointerEvents = 'none'
            this.elemTextContainer.style.position = 'absolute'
            this.elemTextContainer.draggable = false
            this.elemText = this.elemTextContainer.appendChild(document.createElement('p'))
            this.elemText.draggable = false
            this.elemText.style.pointerEvents = 'none'
            this.elemText.style.marginBottom = '0'
            this.elemText.style.width = '100%'
            this.elemText.style.height = 'auto'
            // if(this.elemImage) this.elemImage.style.zIndex = '-1';
            this.setColor(this.color)
            this.setScale(this.scale)
            if (props) {
                props.text && this.setText(props.text)
                props.color && this.setColor(props.color)
                props.scale && this.setScale(props.scale)
                props.textHorAlign && this.setHorAlign(props.textHorAlign)
                props.textVerAlign && this.setVerAlign(props.textVerAlign)
            }
        }

        const ImageBackSetup = () => {
            this.elemImageBack = this.element.appendChild(document.createElement('img'))
            if (this.elemImage) this.elemImage.style.width = '100%'
            if (this.elemImage) this.elemImage.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)'
            this.elemImageBack.style.width = '100%'
            this.elemImageBack.style.height = '100%'
            this.elemImageBack.style.clipPath = 'polygon(100% 0, 50% 0, 50% 100%, 100% 100%)'
            this.elemImageBack.style.top = '0'
            this.elemImageBack.style.right = '0'
            this.elemImageBack.style.position = 'absolute'
            this.elemImageBack.style.pointerEvents = 'none'
            this.elemImageBack.draggable = false
            this.element.style.border = '1px solid black'
            if (props) {
                props.textureBackDiskPath && this.setDiskTexture(props.textureBackDiskPath, 'back')
                props.textureBackWc3Path && this.setWc3Texture(props.textureBackWc3Path, 'back')
            }
        }

        const ty = this.frameComponent.type
        const f = FrameType

        if (ty >= f.BACKDROP && ty <= f.INVIS_BUTTON) {
            ImageSetup()
        }
        if (ty == f.SCRIPT_DIALOG_BUTTON || ty == f.BROWSER_BUTTON) {
            TextSetup()
            this.setVerAlign('center')
            this.setHorAlign('center')
            this.setColor('#FCD20D')
        }
        if (ty == f.TEXT_FRAME) TextSetup()
        if (ty == f.HORIZONTAL_BAR) {
            ImageSetup()
            ImageBackSetup()
            if (this.elemImageBack) this.elemImageBack.src = './files/images/InvisButton.png'
        }
        if (ty == f.HOR_BAR_BACKGROUND) {
            ImageSetup()
            ImageBackSetup()
            if (this.elemImageBack) this.elemImageBack.src = './files/images/CustomFrame2.png'
        }
        if (ty == f.HOR_BAR_TEXT) {
            ImageSetup()
            TextSetup()
        }
        if (ty == f.HOR_BAR_BACKGROUND_TEXT) {
            ImageSetup()
            ImageBackSetup()
            TextSetup()
            if (this.elemImageBack) this.elemImageBack.src = './files/images/CustomFrame2.png'
        }
        if (ty == f.TEXTAREA) {
            ImageSetup()
            TextSetup()
            if (this.elemTextContainer) this.elemTextContainer.style.width = ''
            if (this.elemTextContainer) this.elemTextContainer.style.height = ''
            if (this.elemTextContainer) this.elemTextContainer.style.left = '10px'
            if (this.elemTextContainer) this.elemTextContainer.style.right = '6px'
            if (this.elemTextContainer) this.elemTextContainer.style.top = '6px'
            if (this.elemTextContainer) this.elemTextContainer.style.bottom = '16px'
            if (this.elemTextContainer) this.elemTextContainer.style.lineHeight = '10px'
            if (this.elemTextContainer) this.elemTextContainer.style.overflowY = 'auto'
            if (this.elemTextContainer) this.elemTextContainer.className = 'scroll_textarea'
        }
        if (ty == f.EDITBOX) {
            ImageSetup()
            TextSetup()
            this.setColor('#ffffff')
            if (this.elemTextContainer) this.elemTextContainer.style.height = ''
            if (this.elemTextContainer) this.elemTextContainer.style.top = '45%'
            // if (this.elemTextContainer) this.elemTextContainer.style.right = '6px'
            if (this.elemTextContainer) this.elemTextContainer.style.width = '100vw'
            if (this.elemTextContainer) this.elemTextContainer.style.left = '6px'
            if (this.elemTextContainer) this.elemTextContainer.style.bottom = '16px'
            this.element.style.overflowX = 'hidden'
        }
    }
    /* ***********************************************  */
}

export interface CustomComplexProps {
    text: string
    color: string
    scale: number
    textHorAlign: 'left' | 'center' | 'right'
    textVerAlign: 'start' | 'center' | 'flex-end'
    textureDiskPath: string
    textureWc3Path: string
    textureBackDiskPath: string
    textureBackWc3Path: string
    trigVar: string
    isRelative: boolean
}
