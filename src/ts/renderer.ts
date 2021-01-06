/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { writeFile, appendFile } from "fs";
import { ipcRenderer } from "electron";

import { debug } from "./debug";

namespace TEMPLATES{
    export const globals = "globals \n"

    export const declares = "framehandle FRvar = null \n"

    export const endglobals = "endglobals \n"
    export const library = "library REFORGEDUIMAKER initializer init \n private function init takes nothing returns nothing \n"

    export const backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'
    export const ScriptDialogButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const BrowserButton = 'set FRvar = BlzCreateFrame("BrowserButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const CheckListBox = 'set FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const EscMenuBackdrop = 'set FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const OptionsPopupMenuBackdropTemplate = 'set FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonBaseTemplate = 'set FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonDisabledBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonPushedBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestCheckBox = 'set FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'

    export const endlibrary = "endfunction \n endlibrary \n"
}

const coordsIMG = document.getElementById('coordsIMG') as HTMLImageElement
const coordsTEXT = document.getElementById('coordsTEXT')

window.addEventListener('mousemove', e => {
    let ss = ""
    if(e.clientX >= coordsIMG.getBoundingClientRect().x && e.clientX <= coordsIMG.getBoundingClientRect().right && e.clientY >= coordsIMG.getBoundingClientRect().y && e.clientY <= coordsIMG.getBoundingClientRect().bottom) {
        ss = `Game X/Y: (${Math.floor( (e.clientX - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 )}, ${Math.floor(((780 - (e.clientY - coordsIMG.getBoundingClientRect().y))/coordsIMG.offsetHeight * 600) )})`
    }
    coordsTEXT.innerText = `${ss}
    e.client: (${e.clientX}, ${e.clientY})
    coordsIMG.Rect: (${coordsIMG.getBoundingClientRect().x}, ${coordsIMG.getBoundingClientRect().bottom})`;
});

const formIMG = document.getElementById("formIMG") as HTMLInputElement
const imgCONT = document.getElementById("imgCONT") as HTMLInputElement
const input = document.getElementById('img') as HTMLInputElement


let focusIMG: CustomImage;


formIMG.addEventListener("submit", e => {
    e.preventDefault();
    const el = document.createElement("img")
    const img = new CustomImage(el, input.files)
    const posx1 = 0, posy1 = 0, posx2 = 0, posy2 = 0;

    ImageFunctions(img, posx1, posy1, posx2, posy2);
})

//Width and Height inputs, changes width and height
const formWIDTH = document.getElementById('formWIDTH') as HTMLInputElement
const formHEIGHT = document.getElementById('formHEIGHT') as HTMLInputElement
formWIDTH.oninput = function() {
    if(focusIMG) {
        if(+formWIDTH.value < 20) {focusIMG.element.width = 20 / 800 * coordsIMG.width; debug("Minimum Width: 20")}
        else focusIMG.element.width = +formWIDTH.value / 800 * coordsIMG.width
    }
}
formHEIGHT.oninput = function() {
    if(focusIMG) {
        if(+formHEIGHT.value < 20) {focusIMG.element.height = 20 / 600 * coordsIMG.height; debug("Minimum Height: 20")}
        else focusIMG.element.height = +formHEIGHT.value / 600 * coordsIMG.height;
    }
}


//Element Name: 2 parts
const formNAME = document.getElementById('formNAME') as HTMLInputElement
//1: prevents first character from being a number, prevents symbols
// eslint-disable-next-line no-useless-escape
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
formNAME.oninput = function() {
    const text = formNAME.value

    //checks only the first character if it is number or not
    if (+text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
        formNAME.value = ""
        debug("Name can't start with a number")
    }

    //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
    if (format.test(text)) {
        formNAME.value = text.slice(0, text.length - 1)
        debug("Special Characters refused")
    }
}

//2: changes the element name
formNAME.onchange = function() {
    focusIMG.UpdateName(formNAME.value)
    debug('Name Changed to "'+focusIMG.name+'"')
}

//Element Type
const formTYPE = document.getElementById('formTYPE') as HTMLSelectElement


//Element Parent
const formPARENT = document.getElementById("formPARENT") as HTMLSelectElement
const ParentOptions: HTMLOptionElement[] = []

function ImageFunctions(img: CustomImage, posx1: number, posy1: number, posx2: number, posy2: number) {
    img.element.onmousedown = function (e) {
        posx1 = e.clientX;
        posy1 = e.clientY;
        if(focusIMG)
            focusIMG.element.style.outlineStyle = 'none';
        focusIMG = img;
        UpdateFields();
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.element.getBoundingClientRect().x) > 25 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 25 && (e.clientY - img.element.getBoundingClientRect().y) > 25 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 25) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;
                debug(`(${img.element.offsetLeft},${img.element.offsetTop})`);
                if (((img.element.offsetLeft - posx2) - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800 >= 0 && ((img.element.offsetLeft - posx2 + img.element.width) - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800 <= 800) {
                    img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                }

                if (coordsIMG.getBoundingClientRect().bottom - (img.element.offsetTop - posy2 + img.element.height) >= 0 && coordsIMG.getBoundingClientRect().top - (img.element.offsetTop - posy2) <= 0) {
                    img.element.style.top = `${img.element.offsetTop - posy2}px`;
                }
                formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800}`;
                formY.value = `${(coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / coordsIMG.height * 600}`;
            };
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 25 || (e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 25) {
                //right and bottom edge: just resize
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(`(${img.element.width}, ${img.element.height})`);
                    if ((img.element.width - posx2) * 800 / coordsIMG.width <= 20) {
                        img.element.width = 20 * coordsIMG.width / 800;
                    }
                    else if (coordsIMG.getBoundingClientRect().right < img.element.x + (img.element.width - posx2)) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width - posx2;
                    }

                    if ((img.element.height - posy2) * 600 / coordsIMG.height <= 20) {
                        img.element.height = 20 * coordsIMG.height / 600;
                    }
                    else if (coordsIMG.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height - posy2;
                    }


                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString();
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString();

                };
            }
            else {
                //top and left edge: resize and drag
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(+img.element.style.height);

                    if ((img.element.width + posx2) * 800 / coordsIMG.width <= 20) {
                        img.element.width = 20 * coordsIMG.width / 800;
                    }
                    else if (coordsIMG.getBoundingClientRect().x > img.element.x - posx2) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width + posx2;
                        img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                    }
                    if ((img.element.height + posy2) * 600 / coordsIMG.height <= 20) {
                        img.element.height = 20 * coordsIMG.height / 600;
                    }
                    else if (coordsIMG.getBoundingClientRect().y > img.element.y - posy2) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height + posy2;
                        img.element.style.top = `${img.element.offsetTop - posy2}px`;
                    }
                    // img.element.height = img.element.height + posy2
                    // img.element.width = img.element.width + posx2
                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString();
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString();
                    formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800}`;
                    formY.value = `${(coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / coordsIMG.height * 600}`;
                };
            }


        }
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };


    };
    return { posx1, posy1, posx2, posy2 };
}

//Hide the image's own option, shows the image's chosen parent and edits the Element Name value
/** Updates Parent Options and Element Name*/
function UpdateFields() {
    for(const el of ParentOptions)
        el.hidden = false;

    focusIMG.parentOption.hidden = true;
    focusIMG.element.style.outlineStyle = "dashed"
    focusIMG.element.style.outlineColor = "red"
    focusIMG.element.style.outlineOffset = "-3px"

    formPARENT.selectedIndex = focusIMG.parentIndex
    formNAME.value = focusIMG.name
    formWIDTH.value = focusIMG.element.width * 800 / coordsIMG.width+""
    formHEIGHT.value = focusIMG.element.height * 600 / coordsIMG.height+"";
    formX.value = `${(focusIMG.element.offsetLeft - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 }`;
    formY.value = `${(coordsIMG.getBoundingClientRect().bottom - focusIMG.element.getBoundingClientRect().bottom)/coordsIMG.height * 600}`;
    formTEXTURE.value = focusIMG.texturePath

    if(!focusIMG.typeEditable) {
        formTYPE.disabled = true
    } else {
        formTYPE.disabled = false
    }

}

formPARENT.onchange = function() {
    focusIMG.parentIndex = formPARENT.selectedIndex
}


//Element X,Y
const formX = document.getElementById("formX") as HTMLInputElement
const formY = document.getElementById("formY") as HTMLInputElement
formX.oninput = function() {
    const loc = formX.value
    focusIMG.element.style.left = `${(+loc * coordsIMG.width) / 800 + coordsIMG.x}px`
}
formY.oninput = function() {
    const loc = formY.value
    focusIMG.element.style.top = `${coordsIMG.height - ((+loc * coordsIMG.height) / 600 + coordsIMG.y)}px`
}

const formTEXTURE = document.getElementById('formTEXTURE') as HTMLInputElement
formTEXTURE.onchange = function() {
    focusIMG.texturePath = formTEXTURE.value
    debug('Texture Path Changed.')
}

//step 2: Delete event comes from main.ts
//step 1 inside class
ipcRenderer.on('Delete', () => {
    focusIMG.Delete()
})

const Generate = document.getElementById('BUTTONgenerate') as HTMLButtonElement
Generate.onclick = () => {
    writeFile('experiment.txt', TEMPLATES.globals, ()=>{
        appendFile('experiment.txt', TemplateReplace(0), ()=>{
            appendFile('experiment.txt', TEMPLATES.endglobals, ()=>{
                appendFile('experiment.txt', TEMPLATES.library, ()=>{
                    appendFile('experiment.txt', TemplateReplace(1), ()=>{
                        appendFile('experiment.txt', TEMPLATES.endlibrary, ()=>{
                            alert("File Created in Output folder")})})})})})})
     //target
    
    
     //target
    
    
}

/**kinds: 0 for declare, 1 for backdrop and Inserts? */
function TemplateReplace(kind: number) {
    let text
    if(kind == 0) {
        text = TEMPLATES.declares
    }
    let sumText = ""
    for(const el of CustomImage.Array) {
        if(kind != 0) {
            eval('text = TEMPLATES.'+el.type)
        }
        let textEdit = text.replace(/FRvar/gi, el.name )
        if(kind == 0) {
            sumText += textEdit;
            continue;
        }
        if(el.parentIndex == 0) textEdit = textEdit.replace("OWNERvar", "BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)");
        textEdit = textEdit.replace("TOPLEFTXvar", `${((el.element.offsetLeft - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 0.8).toPrecision(6)}`)
        textEdit = textEdit.replace("TOPLEFTYvar", `${((coordsIMG.getBoundingClientRect().bottom - el.element.getBoundingClientRect().top)/coordsIMG.height * 0.6).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTXvar", `${((el.element.offsetLeft - coordsIMG.getBoundingClientRect().x + el.element.width)/coordsIMG.offsetWidth * 0.8).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTYvar", `${((coordsIMG.getBoundingClientRect().bottom - el.element.getBoundingClientRect().bottom)/coordsIMG.height * 0.6).toPrecision(6)}`)
        textEdit = textEdit.replace("PATHvar", '"'+el.texturePath+'"')
        sumText += textEdit;
    }
    return sumText;
}


ipcRenderer.on('Insert', (e,i) => {
    const el = document.createElement('img')
    let src = './files/images/'
    switch (i) {
        case 0:
                
            src += 'ScriptDialogButton.png'
            break; 
        case 1:
                
            src += 'BrowserButton.png'
            break;
        case 2:
                
            src += 'QuestCheckBox.png'
            break;
        case 3:
    
                        
            src += 'CheckListBox.png'
           break;
        case 4:
                        
            src += 'OptionsPopupMenuBackdropTemplate.png'
           break;
        case 5:
                        
            src += 'QuestButtonBaseTemplate.png'
           break;
        case 6:
                        
            src += 'QuestButtonPushedBackdropTemplate.png'
           break;
        case 7:
                        
            src += 'QuestButtonDisabledBackdropTemplate.png'
           break;
        case 8:
                        
            src += 'EscMenuBackdrop.png'
           break;
        case 9:
                            
            src += ''
           break;
        case 10:

    }
    const img = new CustomImage(el, src)
    let type = src.slice(15)
    type = type.slice(0,type.length-4)
    img.type = type
    img.typeEditable = false;

    ImageFunctions(img,0,0,0,0)
})

//# sourceMappingURL=renderer.js.map
class CustomImage {
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
            UpdateFields()
            ipcRenderer.send('show-context-menu')
        }
        
        imgCONT.appendChild(this.element)
        if(focusIMG)
            focusIMG.element.style.outlineStyle = 'none';
        focusIMG = this
        UpdateFields()
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

//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize

