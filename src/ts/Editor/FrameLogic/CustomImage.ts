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

    private texturePath : string;

    public GetTexture() : string{
        return this.texturePath;
    }

    public SetTexture(newTexturePath : string){
        this.texturePath = newTexturePath;
        this.element.src = newTexturePath;
    }

    private width : number;

    public GetWidth() : number{
        return this.width
    }

    public SetWidth(newWidth : number){
        this.element.width = newWidth;
        this.width = newWidth;
    }

    private height : number;

    public GetHeight() : number{
        return this.height;
    }

    public SetHeight(newHeight : number){
        this.element.height = newHeight;
        this.height = newHeight
    }

    private coordsX : number;

    public GetX() : number{
        return this.coordsX;
    }

    public SetX(newX : number){
        this.coordsX = newX;
    }

    private coordsY : number;

    public GetY() : number{
        return this.coordsY;
    }

    public SetY(newY : number){
        this.coordsY = newY;
    }

    public Select(){
        let selectedFrame = Editor.GetDocumentEditor().projectTree.GetSelectedFrame();

        if(selectedFrame)
            selectedFrame.image.element.style.outlineStyle = 'none';
            
        Editor.GetDocumentEditor().projectTree.Select(this.frameComponent);
        UpdateFields(this)
    }

    constructor(frameComponent : FrameComponent, texturePath : string, width : number, height : number, x : number, y : number) {try{
        this.frameComponent = frameComponent;
        this.texturePath = texturePath;
        this.width = width;
        this.height = height;
        this.coordsX = x;
        this.coordsY = y;

        this.element = document.createElement('img');
        this.element.src = texturePath;
        this.element.height = height;
        this.element.width = width;
        this.element.draggable = false;
        this.element.style.position = "absolute";
        this.element.style.top = '40vh';
        this.element.style.left = '40vw';
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

        debug("Deleted CustomImage Object")
    }

    public static GetCustomImageFromHTMLImageElement(imageElement : HTMLImageElement) : CustomImage{
        return (imageElement as any).customImage;
    }

}