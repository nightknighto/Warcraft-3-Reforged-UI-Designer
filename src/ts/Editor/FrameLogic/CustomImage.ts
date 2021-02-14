import { ipcRenderer } from "electron";
import { UpdateFields } from "../../Classes & Functions/UpdateFields";
import { debug } from "../../Classes & Functions/Mini-Functions";
import { workspace } from "../../Constants/Elements";
import { FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import { ImageFunctions } from "../../Classes & Functions/ImageFunctions";

export class CustomImage {

    public readonly frameComponent : FrameComponent;
    public readonly element : HTMLImageElement;

    private textureDiskPath : string;
    textureWC3Path : string = 'null.blp';

    text: string = "text"
    TrigVar: string = "";

    public GetTexture() : string{
        return this.textureDiskPath;
    }

    public SetDiskTexture(newTexturePath : string){
        this.textureDiskPath = newTexturePath;
        this.element.src = newTexturePath;
    }

    public SetWC3Texture(newTexturePath : string){
        this.textureWC3Path = newTexturePath;
    }
    
    public SetText(Text : string){
        this.text = Text;
    }

    public SetTrigVar(VarName: string) {
        this.TrigVar = VarName
    }

    width : number;

    public SetWidth(newWidth : number){
        this.width = newWidth;
    }

    height : number;

    public SetHeight(newHeight : number){
        this.height = newHeight
    }

    LeftX : number;

    public SetLeftX(newX : number){
        this.LeftX = newX;
    }

    BotY : number;

    public SetBotY(newY : number){
        this.BotY = newY;
    }

    public Select(){
        let selectedFrame = Editor.GetDocumentEditor().projectTree.GetSelectedFrame();

        if(selectedFrame)
            selectedFrame.image.element.style.outlineColor = 'green';
            
        Editor.GetDocumentEditor().projectTree.Select(this.frameComponent);
        UpdateFields(this)
    }

    constructor(frameComponent : FrameComponent, texturePath : string, width : number, height : number, x : number, y : number) {try{
        this.frameComponent = frameComponent;
        this.textureDiskPath = texturePath;
        this.width = width;
        this.height = height;
        this.LeftX = x;
        this.BotY = y;

        this.element = document.createElement('img');
        this.element.src = texturePath;
        this.element.height = height*1000;
        this.element.width = width*1000;
        this.element.draggable = false;
        this.element.style.position = "absolute";
        this.element.style.top = '40vh';
        this.element.style.left = '40vw';
        this.element.style.outlineStyle = "dashed"
        this.element.style.outlineColor = "green"
        this.element.style.outlineOffset = "-3px"

        workspace.appendChild(this.element);
        ImageFunctions(this);

        (this.element as any).customImage = this;

        //step 1: event sent to main.ts to display the menu.
        this.element.oncontextmenu = () => {

            this.Select();

            ipcRenderer.send('show-context-menu')
        }

    }catch(e){alert(e)}}

    Delete() {

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.Select(null);

        debug("Deleted CustomImage Object")
    }

    public static GetCustomImageFromHTMLImageElement(imageElement : HTMLImageElement) : CustomImage{
        return (imageElement as any).customImage;
    }

}