import * as Element from "../Constants/Elements";
/**
 * 
 * @param focusIMG : CustomImage
 */
const ParentOptions: HTMLOptionElement[] = []
export function UpdateFields(focusIMG: any) {
    for(const el of ParentOptions)
        el.hidden = false;

    focusIMG.parentOption.hidden = true;
    focusIMG.element.style.outlineStyle = "dashed"
    focusIMG.element.style.outlineColor = "red"
    focusIMG.element.style.outlineOffset = "-3px"

    Element.selectElementParent.selectedIndex = focusIMG.parentIndex
    Element.inputElementName.value = focusIMG.name
    Element.inputElementWidth.value = focusIMG.element.width * 800 / Element.workspace.width+""
    Element.inputElementHeight.value = focusIMG.element.height * 600 / Element.workspace.height+"";
    Element.inputElementCoordinateX.value = `${(focusIMG.element.offsetLeft - Element.workspace.getBoundingClientRect().x)/Element.workspace.offsetWidth * 800 }`;
    Element.inputElementCoordinateY.value = `${(Element.workspace.getBoundingClientRect().bottom - focusIMG.element.getBoundingClientRect().bottom)/Element.workspace.height * 600}`;
    Element.inputElementTexture.value = focusIMG.texturePath

    if(!focusIMG.typeEditable) {
        Element.selectElementType.disabled = true
    } else {
        Element.selectElementType.disabled = false
    }

}