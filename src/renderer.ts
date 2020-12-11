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
let focusIMG: HTMLImageElement;

formIMG.addEventListener("submit", e => {
    e.preventDefault();
    const img = document.createElement("img")
    img.src = URL.createObjectURL(input.files[0])
    img.height = 200
    img.width = 150
    img.draggable = false
    img.style.position = "absolute"
    imgCONT.appendChild(img)
    let posx1 = 0, posy1 = 0, posx2 = 0, posy2 = 0;

    img.onmousedown = function(e) {
        posx1 = e.clientX
        posy1 = e.clientY
        focusIMG = img
        img
        
        window.onmousemove = function(e) {
            posx2 = posx1 - e.clientX
            posy2 = posy1 - e.clientY
            posx1 = e.clientX
            posy1 = e.clientY

            img.style.top = `${img.offsetTop - posy2}px`
            img.style.left = `${img.offsetLeft - posx2}px`
        }

        img.onmouseup = function() {
            window.onmousemove = null
            img.onmouseup = null
        }
        
    }
})

const formWIDTH = document.getElementById('formWIDTH') as HTMLInputElement
const formHEIGHT = document.getElementById('formHEIGHT') as HTMLInputElement
formWIDTH.onchange = function() {
    if(focusIMG) {
        if(+formWIDTH.value < 20) {formWIDTH.value = "20"}
        focusIMG.width = +formWIDTH.value / 800 * coordsIMG.width
    }
}
formHEIGHT.onchange = function() {
    if(focusIMG) {
        if(+formHEIGHT.value < 20) {formHEIGHT.value = "20"}
        focusIMG.height = +formHEIGHT.value / 600 * coordsIMG.height;
    }
}
//# sourceMappingURL=renderer.js.map