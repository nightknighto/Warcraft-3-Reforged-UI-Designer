import { ipcRenderer } from "electron";
import { UpdateFields } from "./UpdateFields";
import { debug } from "./Mini-Functions";

export let focusIMG: CustomImage = null;

export function FocusIMGchange(img: CustomImage) {
    focusIMG = img
}

export default CustomImage;
export class CustomImage {
    element: HTMLImageElement;
    name: string;
    parentIndex = 0; //GAME_UI
    parentOption: HTMLOptionElement;
    texturePath = "";
    type = "backdrop";
    typeEditable = true;

    constructor(name : string, element: HTMLImageElement, inputFile: FileList | string) {try{
        this.element = element;
        if(typeof inputFile === 'string')
            this.element.src = inputFile
        else 
            this.element.src = URL.createObjectURL(inputFile[0]);

        this.element.height = 300
        this.element.width = 200
        this.element.draggable = false
        this.element.style.position = "absolute"
        this.element.style.top = '400px'
        this.element.style.left = '900px'

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