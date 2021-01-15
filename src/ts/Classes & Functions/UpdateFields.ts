import * as Element from "../Constants/Elements";
import { InputEdit } from "./Mini-Functions";
/**
 * 
 * @param focusIMG : CustomImage
 */
const ParentOptions: HTMLOptionElement[] = []
export function UpdateFields(focusIMG: any) {
    const horizontalMargin = 240/1920*Element.workspace.width

    for(const el of ParentOptions)
        el.hidden = false;

    focusIMG.parentOption.hidden = true;
    focusIMG.element.style.outlineStyle = "dashed"
    focusIMG.element.style.outlineColor = "red"
    focusIMG.element.style.outlineOffset = "-3px"

    Element.selectElementParent.selectedIndex = focusIMG.parentIndex
    Element.inputElementName.value = focusIMG.name
    Element.inputElementWidth.value = InputEdit(focusIMG.element.width * 800 / (Element.workspace.width - 2*horizontalMargin))
    Element.inputElementHeight.value = InputEdit(focusIMG.element.height * 600 / Element.workspace.height)
    Element.inputElementCoordinateX.value = `${InputEdit((focusIMG.element.offsetLeft - Element.workspace.getBoundingClientRect().x - horizontalMargin)/(Element.workspace.width - 2*horizontalMargin) * 800) }`;
    Element.inputElementCoordinateY.value = `${InputEdit((Element.workspace.getBoundingClientRect().bottom - focusIMG.element.getBoundingClientRect().bottom)/Element.workspace.height * 600)}`;
    Element.inputElementTexture.value = focusIMG.texturePath

    if(!focusIMG.typeEditable) {
        Element.selectElementType.disabled = true
    } else {
        Element.selectElementType.disabled = false
    }

}