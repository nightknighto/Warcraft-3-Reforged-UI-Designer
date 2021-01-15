import { ipcRenderer } from "electron";
import { UpdateFields } from "./UpdateFields";
import { debug } from "./Mini-Functions";
import { workspace, debugLine, containerUI } from "../Constants/Elements";

export let focusIMG: CustomImage = null;

export function FocusIMGchange(img: CustomImage) {
    focusIMG = img
}

export class CustomImage {
    element: HTMLImageElement;
    name: string;
    parentIndex = 0; //GAME_UI
    parentOption: HTMLOptionElement;
    texturePath = "";
    type = "backdrop";
    typeEditable = true;

    constructor(name : string, element: HTMLImageElement, source: FileList | string) {try{
        this.element = element;
        if(typeof source === 'string')
            this.element.src = source;
        else 
            this.element.src = URL.createObjectURL(source[0]);

        this.element.height = 300
        this.element.width = 200
        this.element.draggable = false
        this.element.style.position = "absolute"
        this.element.style.top = '40vh'
        this.element.style.left = '40vw'
        containerUI.appendChild(this.element)

        this.parentOption = document.createElement("option")
        this.parentOption.text = this.name
        
        //step 1: event sent to main.ts to display the menu.
        this.element.oncontextmenu = () => {
            if(focusIMG)
                focusIMG.element.style.outlineStyle = 'none';
            focusIMG = this
            UpdateFields(focusIMG)
            ipcRenderer.send('show-context-menu')
        }
        
        if(focusIMG)
            focusIMG.element.style.outlineStyle = 'none';
        focusIMG = this
        UpdateFields(focusIMG)
    }catch(e){alert(e)}}
    

    UpdateName(text: string) {
        this.name = text
        this.parentOption.text = text
    }

    Delete() {

        this.parentOption.remove()
        this.element.remove()

        debug("Deleted CustomImage Object")
    }

    toOption(){
        return this.parentOption;
    }
}