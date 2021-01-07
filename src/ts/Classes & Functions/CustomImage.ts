import { formPARENT, ParentOptions, imgCONT, formNAME, coordsIMG } from "../Constants.ts/Elements";
import { ipcRenderer } from "electron";
import { UpdateFields } from "./UpdateFields";
import { debug } from "./Mini-Functions";

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

    constructor(element: HTMLImageElement, inputFile: FileList | string) {try{
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
        document.getElementById('main').appendChild(this.element)

        CustomImage.number++;
        this.name = "Element"+CustomImage.number
        CustomImage.Array.push(this)
        
        this.parentOption = document.createElement("option")
        this.parentOption.text = this.name
        formPARENT.add(this.parentOption)
        ParentOptions.push(this.parentOption)
        this.parentOption.value = ParentOptions.indexOf(this.parentOption)+""

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
        const id = ParentOptions.indexOf(this.parentOption)
        formPARENT.remove(id + 1)
        ParentOptions.splice(id, 1)
        this.parentOption.remove()
        this.element.remove()

        for(const el of CustomImage.Array) {
            if(el.parentIndex == id + 1) {
                el.parentIndex = 0
            } else if(el.parentIndex > id + 1) {
                el.parentIndex--;
            }  
        }
        CustomImage.Array.splice(CustomImage.Array.indexOf(this),1)

        for(const el of ParentOptions) {
            el.value = ParentOptions.indexOf(el)+""
        }

        debug("Deleted Element")
        formNAME.value = ""
    }

    static number = 0;
    static Array: CustomImage[] = []
}