// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const coordsIMG = document.getElementById('coordsIMG') as HTMLImageElement
const coordsTEXT = document.getElementById('coordsTEXT')

coordsIMG.addEventListener('mousemove', e => {
    coordsTEXT.innerText = `Target X/Y: (${Math.floor( (e.clientX - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 )}, ${Math.floor(((780 - (e.clientY - coordsIMG.getBoundingClientRect().y))/coordsIMG.offsetHeight * 600) )})`;
});


const formIMG = document.getElementById("formIMG") as HTMLInputElement
const imgCONT = document.getElementById("imgCONT") as HTMLInputElement
const input = document.getElementById('img') as HTMLInputElement

const debug = function(stuff: any) {
    document.getElementById("debug").innerText = stuff
}

let focusIMG: CustomImage;

formIMG.addEventListener("submit", e => {
    e.preventDefault();
    const el = document.createElement("img")
    const img = new CustomImage(el, input.files)
    imgCONT.appendChild(img.element)
    focusIMG = img
    UpdateFields()
    let posx1 = 0, posy1 = 0, posx2 = 0, posy2 = 0;

    img.element.onmousedown = function(e) {
        posx1 = e.clientX
        posy1 = e.clientY
        focusIMG = img
        UpdateFields()
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if((e.clientX - img.element.getBoundingClientRect().x) > 25 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 25 && (e.clientY - img.element.getBoundingClientRect().y) > 25 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 25) {
            //not at edge, so drag
            window.onmousemove = function(e) {
                posx2 = posx1 - e.clientX
                posy2 = posy1 - e.clientY
                posx1 = e.clientX
                posy1 = e.clientY
    
                img.element.style.top = `${img.element.offsetTop - posy2}px`
                img.element.style.left = `${img.element.offsetLeft - posx2}px`
                formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 }`;
                formY.value = `${-(img.element.offsetTop - coordsIMG.height + coordsIMG.getBoundingClientRect().y)/coordsIMG.height * 600}`;
            }
        } else {
            //at edge, so resize
            //now determine which edges
            if((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 25 || (e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 25) {
                //right and bottom edge: just resize
                window.onmousemove = function(e) {
                    posx2 = posx1 - e.clientX
                    posy2 = posy1 - e.clientY
                    posx1 = e.clientX
                    posy1 = e.clientY
                    debug(+img.element.style.height)
                    img.element.height = img.element.height - posy2
                    img.element.width = img.element.width - posx2
                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString()
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString()

                }
            } else {
                //top and left edge: resize and drag
                window.onmousemove = function(e) {
                    posx2 = posx1 - e.clientX
                    posy2 = posy1 - e.clientY
                    posx1 = e.clientX
                    posy1 = e.clientY
                    debug(+img.element.style.height)
                    img.element.height = img.element.height + posy2
                    img.element.width = img.element.width + posx2
                    img.element.style.top = `${img.element.offsetTop - posy2}px`
                    img.element.style.left = `${img.element.offsetLeft - posx2}px`
                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString()
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString()
                    formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 }`;
                    formY.value = `${-(img.element.offsetTop - coordsIMG.height + coordsIMG.getBoundingClientRect().y)/coordsIMG.height * 600}`;
                }
            }
    

        }
        img.element.onmouseup = function() {
            window.onmousemove = null
            img.element.onmouseup = null
        }

        
    }
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


//Element Parent
const formPARENT = document.getElementById("formPARENT") as HTMLSelectElement
const ParentOptions: HTMLOptionElement[] = []

//Hide the image's own option, shows the image's chosen parent and edits the Element Name value
/** Updates Parent Options and Element Name*/
function UpdateFields() {
    for(const el of ParentOptions)
        el.hidden = false;

    focusIMG.parentOption.hidden = true;

    formPARENT.selectedIndex = focusIMG.parentIndex
    formNAME.value = focusIMG.name
    formWIDTH.value = focusIMG.element.width+""
    formHEIGHT.value = focusIMG.element.height+"";
    formX.value = `${(focusIMG.element.offsetLeft - coordsIMG.getBoundingClientRect().x)/coordsIMG.offsetWidth * 800 }`;
    formY.value = `${-(focusIMG.element.offsetTop - coordsIMG.height + coordsIMG.getBoundingClientRect().y)/coordsIMG.height * 600}`;

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

//# sourceMappingURL=renderer.js.map
class CustomImage {
    element: HTMLImageElement;
    name: string;
    parentIndex = 0; //GAME_UI
    parentOption: HTMLOptionElement;

    constructor(element: HTMLImageElement, inputFile: FileList) {
        this.element = element;
        this.element.src = URL.createObjectURL(inputFile[0])
        this.element.height = 200
        this.element.width = 150
        this.element.draggable = false
        this.element.style.position = "absolute"

        CustomImage.number++;
        this.name = "Element"+CustomImage.number
        CustomImage.CustomImageArray.push(this)
        
        this.parentOption = document.createElement("option")
        this.parentOption.text = this.name
        this.parentOption.value = CustomImage.number+""
        formPARENT.add(this.parentOption)
        ParentOptions.push(this.parentOption)

    }

    UpdateName(text: string) {
        this.name = text
        this.parentOption.text = text
    }

    static number = 0;
    static CustomImageArray: CustomImage[] = []
}

//required:
//resizing currently changes both height and width at any edge. needs fix
//resizing need to have minimum limit. currently you can just make the element totally invisible
//something visible on the selected image to know that it is selected
//coordsIMG X/Y be visible even above elements, so window.onmousemove and check if mouse is within the coordsimg Rect or not