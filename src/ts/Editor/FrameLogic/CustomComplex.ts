/* eslint-disable @typescript-eslint/no-explicit-any */
import { debugText } from "../../Classes & Functions/Mini-Functions";
import { FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import SaveContainer from "../../Persistence/SaveContainer";
import FrameBaseContent from "./FrameBaseContent";
import { FrameType } from "./FrameType";
import { MouseFunctions } from "../../Classes & Functions/Mouse Functions";

export default class CustomComplex extends FrameBaseContent {
    
    public static readonly SAVE_KEY_TEXTURE_DISK_PATH = "textureDiskPath";
    public static readonly SAVE_KEY_TEXTURE_WC3_PATH = "textureWc3Path"
    public static readonly SAVE_KEY_TRIGGER_VARIABLE_NAME = "trig_var";
    public static readonly SAVE_KEY_SCALE = "scale";
    public static readonly SAVE_KEY_COLOR = "color";

    private scale: number;
    private color: string;
    private textureDiskPath: string;
    private textureWc3Path: string;
    private trigVar: string;

    private elemText: HTMLParagraphElement;
    private elemImage: HTMLImageElement;
    private elemImageAddition: HTMLImageElement;


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
    
    public setTrigVar(VarName: string): void {
        this.trigVar = VarName
    }

    public getTrigVar(): string {
        return this.trigVar;
    }


    public constructor(frameComponent: FrameComponent, width: number, height: number, x: number, y: number, z: number, props?: CustomComplexPropsConst) {

        try {

            const element = document.createElement('div');
            super(frameComponent, element, width, height, x, y, z);

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
        container.save(CustomComplex.SAVE_KEY_SCALE, this.scale);
        container.save(CustomComplex.SAVE_KEY_COLOR, this.color);

    }

    public delete(): void {

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.select(null);

        debugText("Deleted CustomComplex Object")
    }

    public static GetCustomComplexFromHTMLDivElement(divElement: HTMLDivElement): CustomComplex {
        return (divElement as any).CustomComplex;
    }

    private specialTypesSetup(props: CustomComplexProps) {

        const ImageSetup = () => {
            this.elemImage = this.element.appendChild(document.createElement('img'));
            this.elemImage.style.width = "100%"
            this.elemImage.style.height = "100%"
            this.elemImage.draggable = false
            this.elemImage.style.pointerEvents = "none"
            if(props) {
                props.textureDiskPath && this.setDiskTexture(props.textureDiskPath);
                props.textureWc3Path && this.setWc3Texture(props.textureWc3Path);   
                props.trigVar && this.setTrigVar(props.trigVar);
            }
        }

        const TextSetup = () => {
            this.elemText = this.element.appendChild(document.createElement('p'))
            this.elemText.draggable = false
            this.elemText.style.pointerEvents = "none"
            if(props) {          
                props.text && this.setText(props.text);
                props.color && this.setColor(props.color);
                props.scale && this.setScale(props.scale);
            }
        }

        const ty = this.frameComponent.type

        if(ty >= FrameType.BACKDROP && ty <= FrameType.INVIS_BUTTON) {
            ImageSetup()
        }
        if(ty == FrameType.TEXT_FRAME) TextSetup()
        if(ty == FrameType.HORIZONTAL_BAR) {
            ImageSetup()
        }
    }

}

export class CustomComplexPropsConst implements CustomComplexProps {
    text= "" 
    color= ""
    scale= 1
    textureDiskPath= "";
    textureWc3Path= ""
    trigVar= "";

    constructor(props: CustomComplexProps) {try{
        for(let p in props) {
            if(props[p])
                this[p] = props[p];
        }
    }catch(e){alert('CustomComplexPropsConst: '+e)}}

}

interface CustomComplexProps {
    text?: string 
    color?: string
    scale?: number
    textureDiskPath?: string;
    textureWc3Path?: string
    trigVar?: string;
}