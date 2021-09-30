/* eslint-disable @typescript-eslint/no-explicit-any */
import { debugText } from "../../Classes & Functions/Mini-Functions";
import { FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import SaveContainer from "../../Persistence/SaveContainer";
import FrameBaseContent from "./FrameBaseContent";
import { FrameType } from "./FrameType";
import { MouseFunctions } from "../../Classes & Functions/Mouse Functions";

export default class CustomComplex extends FrameBaseContent implements CustomComplexProps {
    
    public static readonly SAVE_KEY_TEXT = "text";
    public static readonly SAVE_KEY_SCALE = "scale";
    public static readonly SAVE_KEY_COLOR = "color";
    public static readonly SAVE_KEY_HorAlign = "HorAlign";
    public static readonly SAVE_KEY_VerAlign = "VerAlign";
    public static readonly SAVE_KEY_TEXTURE_DISK_PATH = "textureDiskPath";
    public static readonly SAVE_KEY_TEXTURE_WC3_PATH = "textureWc3Path"
    public static readonly SAVE_KEY_TEXTURE_BACK_DISK_PATH = "textureBackDiskPath";
    public static readonly SAVE_KEY_TEXTURE_BACK_WC3_PATH = "textureBackWc3Path"
    public static readonly SAVE_KEY_TRIGGER_VARIABLE_NAME = "trig_var";
    

    text: string = "";
    scale: number = 1;
    color: string = '#ffffff';
    textHorAlign: 'left'|'center'|'right' = 'left';
    textVerAlign: 'start'|'center'|'flex-end' = 'start';
    textureDiskPath: string = '';
    textureWc3Path: string = '';
    textureBackDiskPath: string = '';
    textureBackWc3Path: string = '';
    trigVar: string = "";

    private elemTextContainer: HTMLDivElement;
    private elemText: HTMLParagraphElement;
    private elemImage: HTMLImageElement;
    elemImageBack: HTMLImageElement;


    public getElement(): HTMLDivElement {
        return this.element as HTMLDivElement;
    }

    public getScale(): number {
        return this.scale;
    }

    public setScale(val: number): void {
        if (val <= 0) {
            debugText("Scale can't be zero or less")
            return;
        }
        this.scale = val;
        this.elemText.style.fontSize = (val) * Editor.GetDocumentEditor().workspaceImage.getBoundingClientRect().width / 100 + "px"
        debugText("Scale changed.")
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(val: string): void {
        this.elemText.style.color = val
        this.color = val
        debugText("Color changed.")
    }

    public getHorAlign(): 'left' | 'center' | 'right' {
        return this.textHorAlign
    }

    public setHorAlign(align: 'left' | 'center' | 'right') {
        this.elemText.style.textAlign = align
        this.textHorAlign = align
    }

    public getVerAlign(): 'start' | 'center' | 'flex-end' {
        return this.textVerAlign
    }

    public setVerAlign(align: 'start' | 'center' | 'flex-end') {
        this.elemTextContainer.style.alignItems = align
        this.textVerAlign = align
    }

    public getText(): string {
        return this.text;
    }

    public setText(Text: string): void {
        this.text = Text;
        this.elemText.innerText = Text;
    }
    public getDiskTexture(): string {
        return this.textureDiskPath;
    }

    public setDiskTexture(newTexturePath: string): void {
        this.textureDiskPath = newTexturePath;
        this.elemImage.src = newTexturePath;
    }

    public setWc3Texture(newTexturePath: string): void {
        this.textureWc3Path = newTexturePath;
    }

    public getWc3Texture(): string {
        return this.textureWc3Path;
    }

    public getBackDiskTexture(): string {
        return this.textureBackDiskPath;
    }

    public setBackDiskTexture(newTexturePath: string): void {
        this.textureBackDiskPath = newTexturePath;
        this.elemImageBack.src = newTexturePath;
    }

    public setBackWc3Texture(newTexturePath: string): void {
        this.textureBackWc3Path = newTexturePath;
    }

    public getBackWc3Texture(): string {
        return this.textureBackWc3Path;
    }
    
    public setTrigVar(VarName: string): void {
        this.trigVar = VarName
    }

    public getTrigVar(): string {
        return this.trigVar;
    }


    public constructor(frameComponent: FrameComponent, width: number, height: number, x: number, y: number, z: number, props?: CustomComplexProps) {


        super(frameComponent, document.createElement('div'), width, height, x, y, z);

        try {
            this.specialTypesSetup(props)

            this.element.style.wordBreak = "break-word"
            this.element.style.overflowY = "hidden"
            this.element.style.userSelect = "none";
            this.element.style.lineHeight = "1";
            

            MouseFunctions(this);

            (this.element as any).CustomComplex = this;

        } catch (e) { alert(e) }
    }

    public save(container: SaveContainer): void {

        super.save(container);
        container.save(CustomComplex.SAVE_KEY_TEXT, this.text);
        container.save(CustomComplex.SAVE_KEY_SCALE, this.scale);
        container.save(CustomComplex.SAVE_KEY_COLOR, this.color);
        container.save(CustomComplex.SAVE_KEY_HorAlign, this.textHorAlign);
        container.save(CustomComplex.SAVE_KEY_VerAlign, this.textVerAlign);
        container.save(CustomComplex.SAVE_KEY_TEXTURE_WC3_PATH, this.textureWc3Path);
        container.save(CustomComplex.SAVE_KEY_TEXTURE_DISK_PATH, this.textureDiskPath);
        container.save(CustomComplex.SAVE_KEY_TEXTURE_BACK_WC3_PATH, this.textureBackWc3Path);
        container.save(CustomComplex.SAVE_KEY_TEXTURE_BACK_DISK_PATH, this.textureBackDiskPath);
        container.save(CustomComplex.SAVE_KEY_TRIGGER_VARIABLE_NAME, this.trigVar);
        // container.save(CustomComplex.SAVE_KEY_, this.);

    }

    public delete(): void {

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.select(null);

        debugText("Deleted CustomComplex Object")
    }

    public static GetCustomComplexFromHTMLDivElement(divElement: HTMLDivElement): CustomComplex {
        return (divElement as any).CustomComplex;
    }


    /* ***********************************************  */
    private specialTypesSetup(props: Partial<CustomComplexProps>) {

        const ImageSetup = () => {
            this.elemImage = this.element.appendChild(document.createElement('img'));
            this.elemImage.style.width = "100%"
            this.elemImage.style.height = "100%"
            this.elemImage.draggable = false
            this.elemImage.style.pointerEvents = "none"
            // this.elemImage.style.position = 'absolute';
            // if(this.elemText) this.elemImage.style.zIndex = '-1';
            if(props) {
                props.textureDiskPath && this.setDiskTexture(props.textureDiskPath);
                props.textureWc3Path && this.setWc3Texture(props.textureWc3Path);   
                props.trigVar && this.setTrigVar(props.trigVar);
            }
        }

        const TextSetup = () => {
            this.elemTextContainer = this.element.appendChild(document.createElement('div'))
            this.elemTextContainer.style.top = '0';
            this.elemTextContainer.style.width = '100%';
            this.elemTextContainer.style.height = '100%';
            this.elemTextContainer.style.display = 'flex';
            this.elemTextContainer.style.pointerEvents = 'none';
            this.elemTextContainer.style.position = 'absolute';
            this.elemTextContainer.draggable = false;
            this.elemText = this.elemTextContainer.appendChild(document.createElement('p'))
            this.elemText.draggable = false
            this.elemText.style.pointerEvents = "none"
            this.elemText.style.marginBottom = "0"
            this.elemText.style.width = '100%';
            this.elemText.style.height = 'auto';
            // if(this.elemImage) this.elemImage.style.zIndex = '-1';
            this.setColor(this.color)
            this.setScale(this.scale)
            if(props) {          
                props.text && this.setText(props.text);
                props.color && this.setColor(props.color);
                props.scale && this.setScale(props.scale);
                props.textHorAlign && this.setHorAlign(props.textHorAlign)
                props.textVerAlign && this.setVerAlign(props.textVerAlign)
            }
        }

        const ImageBackSetup = () => {
            this.elemImageBack = this.element.appendChild(document.createElement('img'))
            this.elemImage.style.width = '100%'
            this.elemImage.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)';
            this.elemImageBack.style.width = '100%'
            this.elemImageBack.style.height = '100%'
            this.elemImageBack.style.clipPath = 'polygon(100% 0, 50% 0, 50% 100%, 100% 100%)';
            this.elemImageBack.style.top = '0'
            this.elemImageBack.style.right = '0'
            this.elemImageBack.style.position = "absolute"
            this.elemImageBack.style.pointerEvents = "none"
            this.elemImageBack.draggable = false
            this.element.style.border = '1px solid black'
            if(props) {          
                props.textureBackDiskPath && this.setBackDiskTexture(props.textureBackDiskPath);
                props.textureBackWc3Path && this.setBackWc3Texture(props.textureBackWc3Path);
            }
        }

        const ty = this.frameComponent.type
        let f = FrameType

        if(ty >= f.BACKDROP && ty <= f.INVIS_BUTTON) {
            ImageSetup()
        }
        if(ty == f.SCRIPT_DIALOG_BUTTON || ty == f.BROWSER_BUTTON) {
            TextSetup()
            this.setVerAlign("center")
            this.setHorAlign("center")
            this.setColor('#FCD20D')
        }
        if(ty == f.TEXT_FRAME) TextSetup()
        if(ty == f.HORIZONTAL_BAR) {
            ImageSetup()
            ImageBackSetup()
            this.elemImageBack.src = './files/images/InvisButton.png'
        }
        if(ty == f.HOR_BAR_BACKGROUND) {
            ImageSetup()
            ImageBackSetup()
            this.elemImageBack.src = './files/images/CustomFrame2.png'
        }
        if(ty == f.HOR_BAR_TEXT) {
            ImageSetup()
            TextSetup()
        }
        if(ty == f.HOR_BAR_BACKGROUND_TEXT) {
            ImageSetup()
            ImageBackSetup()
            TextSetup()
            this.elemImageBack.src = './files/images/CustomFrame2.png'
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
    textureDiskPath: string;
    textureWc3Path: string
    textureBackDiskPath: string;
    textureBackWc3Path: string;
    trigVar: string;
}