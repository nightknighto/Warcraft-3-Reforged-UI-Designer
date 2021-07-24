/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from "electron";
import { debugText } from "../../Classes & Functions/Mini-Functions";
import {FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import Saveable from "../../Persistence/Saveable";
import SaveContainer from "../../Persistence/SaveContainer";
import { TextFunctions } from "../../Classes & Functions/TextFunctions";

export class CustomText implements Saveable {

    public static readonly SAVE_KEY_TEXT = "text";
    public static readonly SAVE_KEY_HEIGHT = "height";
    public static readonly SAVE_KEY_WIDTH = "width";
    public static readonly SAVE_KEY_LEFTX = "leftX";
    public static readonly SAVE_KEY_BOTY = "botY";
    public static readonly SAVE_KEY_SCALE = "scale";
    public static readonly SAVE_KEY_COLOR = "color";

    public readonly frameComponent : FrameComponent;
    public readonly element : HTMLDivElement;

    text = "Text Frame"
    scale = 1
    color = "#FFFFFF"

    public setScale(val: number) {
        if(val <= 0) {
            debugText("Scale can't be zero or less")
            return;
        }
        this.scale = val;
        this.element.style.fontSize = val-0.1+"vw"
        debugText("Scale changed.")
    }

    public setColor(val: string) {
        this.element.style.color = val
        this.color = val
        debugText("Color changed.")
    }
    
    public SetText(Text : string) : void{
        this.text = Text;
        this.element.innerText = Text;
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

    public SetLeftXWithElement(newX : number) : void{
        const editor = Editor.GetDocumentEditor();
        const rect = editor.workspaceImage.getBoundingClientRect()
        const horizontalMargin = 240/1920*rect.width

        this.LeftX = newX;
        this.element.style.left = `${ +newX*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
        
        debugText(`${ +newX*rect.width/0.8 + rect.left + horizontalMargin}px`)
    }

    BotY : number;

    public SetBotY(newY : number) : void{
        this.BotY = newY;
    }

    public SetBotYWithElement(newY : number) : void{
        const editor = Editor.GetDocumentEditor();
        const rect = editor.workspaceImage.getBoundingClientRect()

        this.BotY = newY;
        let num = rect.bottom - +newY*rect.height/0.6 - this.element.offsetHeight - 120
        this.element.style.top = num+"px"
    }

    constructor(frameComponent : FrameComponent, width : number, height : number, x : number, y : number) {try{
        this.frameComponent = frameComponent;
        this.width = width;
        this.height = height;

        const editor = Editor.GetDocumentEditor();
        const workspaceImage = editor.workspaceImage.getBoundingClientRect();

        const horizontalMargin = 240/1920*workspaceImage.width

        this.element = document.createElement('div');
        this.element.style.top = "50px"
        this.element.style.height = `${height / 0.6 * workspaceImage.height}px`;
        this.element.style.width = `${width / 0.8 * (editor.workspaceImage.width-2*horizontalMargin)}px`;
        this.element.draggable = false;
        this.element.style.position = "absolute";
        this.element.style.outlineStyle = "dashed"
        this.element.style.outlineColor = "green"
        this.element.style.outlineOffset = "-3px"
        this.element.style.wordBreak = "break-all"
        this.element.style.overflowY = "hidden"
        this.element.innerText = "Text Frame"
        this.element.style.userSelect = "none";
        this.element.style.color = "#ffffff"
        this.element.style.fontSize = "0.9vw"
        
        //must be after creation of element
        this.SetLeftXWithElement(x);
        this.SetBotYWithElement(y);

        const workspace = editor.workspace;
        workspace.appendChild(this.element);
        TextFunctions(this);

        console.log("There has to be a better way of doing this below.");
        (this.element as any).customText = this;

        //step 1: event sent to main.ts to display the menu.
        this.element.oncontextmenu = (ev : Event) => {

            Editor.GetDocumentEditor().projectTree.Select(ev.target as HTMLDivElement);

            ipcRenderer.send('show-context-menu')
        }

    }catch(e){alert(e)}}

    save(container: SaveContainer): void {

        container.save(CustomText.SAVE_KEY_HEIGHT, this.height);
        container.save(CustomText.SAVE_KEY_WIDTH, this.width);
        container.save(CustomText.SAVE_KEY_LEFTX, this.LeftX);
        container.save(CustomText.SAVE_KEY_BOTY, this.BotY);
        container.save(CustomText.SAVE_KEY_TEXT, this.text);
        container.save(CustomText.SAVE_KEY_SCALE, this.scale);
        container.save(CustomText.SAVE_KEY_COLOR, this.color);

    }
    
    public load(container: SaveContainer) : void{

        this.scale = container.load(CustomText.SAVE_KEY_SCALE);
        this.text = container.load(CustomText.SAVE_KEY_TEXT);
        this.color = container.load(CustomText.SAVE_KEY_COLOR);

    }

    Delete() : void{

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.Select(null);

        debugText("Deleted CustomText Object")
    }

    public static GetCustomTextFromHTMLDivElement(divElement : HTMLDivElement) : CustomText{
        console.log("Fetching custom texts from HTMLDivElement, 'as any' problem.");
        return (divElement as any).customText;
    }

}