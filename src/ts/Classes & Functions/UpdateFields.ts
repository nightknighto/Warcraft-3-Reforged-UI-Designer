import { ParentOptions, formPARENT, formNAME, formWIDTH, coordsIMG, formHEIGHT, formX, formY, formTEXTURE, formTYPE } from "../Constants.ts/Elements";

/**
 * 
 * @param focusIMG : CustomImage
 */
export function UpdateFields(focusIMG: any) {
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