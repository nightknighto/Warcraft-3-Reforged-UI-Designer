import * as Element from "../Constants/Elements";
import { InputEdit } from "./Mini-Functions";
/**
 * 
 * @param focusIMG : CustomImage
 */
const ParentOptions: HTMLOptionElement[] = []
/**if null, then remove values and disable fields  */
export function UpdateFields(focusIMG: any) {
    const horizontalMargin = 240/1920*Element.workspace.width

    if(focusIMG) {        
        DisableFields(false)

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
    } else {
        DisableFields(true)
        EmptyFields()
    }

}

function DisableFields(disable: boolean) {
    Element.inputElementWidth.disabled          = disable
    Element.inputElementHeight.disabled         = disable
    Element.inputElementName.disabled           = disable
    Element.selectElementType.disabled          = disable
    Element.selectElementParent.disabled        = disable
    //Element.inputElementCoordinates.disabled    = disable
    Element.inputElementCoordinateX.disabled    = disable
    Element.inputElementCoordinateY.disabled    = disable
    Element.inputElementTexture.disabled        = disable
    Element.buttonElementTextureBrowse.disabled = disable
}

function EmptyFields() {
    Element.inputElementWidth.value          = " "
    Element.inputElementHeight.value         = " "
    Element.inputElementName.value           = " "
    Element.selectElementType.value          = " "
    Element.selectElementParent.value        = " "
    //Element.inputElementCoordinates.value    = " "
    Element.inputElementCoordinateX.value    = " "
    Element.inputElementCoordinateY.value    = " "
    Element.inputElementTexture.value
    
    = " "

}