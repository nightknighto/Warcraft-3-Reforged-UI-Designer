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
import { JASS } from "./Templates/Templates";
import { coordsIMG, formIMG, coordsTEXT, formWIDTH, input, formHEIGHT, formNAME, formX, formY, ParentOptions, formPARENT, formTEXTURE, formTYPE, Generate, imgCONT } from "./Constants.ts/Elements";
import { debug } from "./Classes & Functions/Mini-Functions";
import { CustomImage, focusIMG } from "./Classes & Functions/CustomImage";
import { TemplateReplace } from "./Classes & Functions/Generate Functions";
import { Insert } from "./Classes & Functions/Insert";
import { ImageFunctions } from "./Classes & Functions/ImageFunctions";

window.addEventListener('mousemove', e => {
    let ss = ""
    if(e.clientX >= coordsIMG.getBoundingClientRect().x && e.clientX <= coordsIMG.getBoundingClientRect().right && e.clientY >= coordsIMG.getBoundingClientRect().y && e.clientY <= coordsIMG.getBoundingClientRect().bottom) {
        ss = `Game X/Y: (${Math.floor( (e.clientX - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 )}, ${Math.floor(((780 - (e.clientY - coordsIMG.getBoundingClientRect().y))/coordsIMG.offsetHeight * 600) )})`
    }
    coordsTEXT.innerText = `${ss}
    e.client: (${e.clientX}, ${e.clientY})
    coordsIMG.Rect: (${coordsIMG.getBoundingClientRect().x}, ${coordsIMG.getBoundingClientRect().bottom})`;
});





formIMG.addEventListener("submit", e => {
    e.preventDefault();
    const el = document.createElement("img")
    const img = new CustomImage(el, input.files)
    const posx1 = 0, posy1 = 0, posx2 = 0, posy2 = 0;

    ImageFunctions(img, posx1, posy1, posx2, posy2);
})

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


//Element Parent


formPARENT.onchange = function() {
    focusIMG.parentIndex = formPARENT.selectedIndex
}


//Element X,Y
formX.oninput = function() {
    const loc = formX.value
    focusIMG.element.style.left = `${(+loc * coordsIMG.width) / 800 + coordsIMG.x}px`
}
formY.oninput = function() {
    const loc = formY.value
    focusIMG.element.style.top = `${coordsIMG.height - ((+loc * coordsIMG.height) / 600 + coordsIMG.y)}px`
}

formTEXTURE.onchange = function() {
    focusIMG.texturePath = formTEXTURE.value
    debug('Texture Path Changed.')
}

//step 2: Delete event comes from main.ts
//step 1 inside class
ipcRenderer.on('Delete', () => {
    focusIMG.Delete()
})

Generate.onclick = () => {
    writeFile('experiment.txt', JASS.globals, ()=>{
        appendFile('experiment.txt', TemplateReplace(0), ()=>{
            appendFile('experiment.txt', JASS.endglobals, ()=>{
                appendFile('experiment.txt', JASS.library, ()=>{
                    appendFile('experiment.txt', TemplateReplace(1), ()=>{
                        appendFile('experiment.txt', JASS.endlibrary, ()=>{
                            alert("File Created in Output folder")})})})})})})
}

Insert.Init()

//# sourceMappingURL=renderer.js.map

//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize

