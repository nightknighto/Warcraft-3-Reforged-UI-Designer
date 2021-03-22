/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from "electron";
import { debug } from "../../Classes & Functions/Mini-Functions";
import { FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import { ImageFunctions } from "../../Classes & Functions/ImageFunctions";

export class CustomImage {

    public readonly frameComponent : FrameComponent;
    public readonly element : HTMLImageElement;

    private textureDiskPath : string;
    textureWC3Path = 'null.blp';

    text = "text"
    TrigVar = "";

    public GetTexture() : string{
        return this.textureDiskPath;
    }

    public SetDiskTexture(newTexturePath : string) : void{
        this.textureDiskPath = newTexturePath;
        this.element.src = newTexturePath;
    }

    public SetWC3Texture(newTexturePath : string) : void{
        this.textureWC3Path = newTexturePath;
    }
    
    public SetText(Text : string) : void{
        this.text = Text;
    }

    public SetTrigVar(VarName: string) : void{
        this.TrigVar = VarName
    }

    width : number;

    public SetWidth(newWidth : number) : void{
        this.width = newWidth;
    }

    height : number;

    public SetHeight(newHeight : number) : void{
        this.height = newHeight
    }

    LeftX : number;

    public SetLeftX(newX : number) : void{
        this.LeftX = newX;
    }

    BotY : number;

    public SetBotY(newY : number) : void{
        this.BotY = newY;
    }

    constructor(frameComponent : FrameComponent, texturePath : string, width : number, height : number, x : number, y : number) {try{
        this.frameComponent = frameComponent;
        this.textureDiskPath = texturePath;
        this.width = width;
        this.height = height;
        this.LeftX = x;
        this.BotY = y;

        const editor = Editor.GetDocumentEditor();
        const workspace = editor.workspace;
        const workspaceImage = editor.workspaceImage;

        const horizontalMargin = 240/1920*workspaceImage.width
        const rect = workspaceImage.getBoundingClientRect()

        this.element = document.createElement('img');
        this.element.src = texturePath;
        this.element.style.height = `${+height / 0.6 * workspace.getBoundingClientRect().height}px`;
        this.element.width = +width / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin);
        this.element.draggable = false;
        this.element.style.position = "absolute";
        this.element.style.top = `${rect.bottom - y*rect.height/0.6 - this.element.height - 120}px`
        this.element.style.left = `${ +x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`;
        this.element.style.outlineStyle = "dashed"
        this.element.style.outlineColor = "green"
        this.element.style.outlineOffset = "-3px"

        workspace.appendChild(this.element);
        ImageFunctions(this);

        console.log("There has to be a better way of doing this below.");
        (this.element as any).customImage = this;

        //step 1: event sent to main.ts to display the menu.
        this.element.oncontextmenu = (ev : Event) => {

            Editor.GetDocumentEditor().projectTree.Select(ev.target as HTMLImageElement);

            ipcRenderer.send('show-context-menu')
        }

    }catch(e){alert(e)}}

    Delete() : void{

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.Select(null);

        debug("Deleted CustomImage Object")
    }

    public static GetCustomImageFromHTMLImageElement(imageElement : HTMLImageElement) : CustomImage{
        console.log("Fetching custom images from HTMLImageElement, 'as any' problem.");
        return (imageElement as any).customImage;
    }

}