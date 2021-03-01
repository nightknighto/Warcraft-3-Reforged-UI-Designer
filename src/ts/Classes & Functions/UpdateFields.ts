import * as Element from "../Constants/Elements";
import { InputEdit } from "./Mini-Functions";
import { CustomImage } from "../Editor/FrameLogic/CustomImage";
import { Editor } from "../Editor/Editor";
const ParentOptions: HTMLOptionElement[] = []
/**
 * 
 * @param focusIMG : CustomImage
 * 
if null, then remove values and disable fields  */
export function UpdateFields(focusIMG: CustomImage) : void { try{
    const horizontalMargin = 240/1920*Element.workspaceImage.width

    if(focusIMG) {        
        DisableFields(false)

        for(const el of ParentOptions)
            el.hidden = false;

        //focusIMG.parentOption.hidden = true;
        focusIMG.element.style.outlineColor = "red"

        //Element.selectElementParent.selectedIndex = focusIMG.parentIndex
        Element.inputElementName.value = focusIMG.frameComponent.GetName();
        Element.inputElementWidth.value = InputEdit(focusIMG.element.width * 800 / (Element.workspaceImage.width - 2*horizontalMargin))
        Element.inputElementHeight.value = InputEdit(focusIMG.element.height * 600 / Element.workspaceImage.height)
        Element.inputElementCoordinateX.value = `${InputEdit((focusIMG.element.offsetLeft - Element.workspaceImage.getBoundingClientRect().x - horizontalMargin)/(Element.workspaceImage.width - 2*horizontalMargin) * 800) }`;
        Element.inputElementCoordinateY.value = `${InputEdit((Element.workspaceImage.getBoundingClientRect().bottom - focusIMG.element.getBoundingClientRect().bottom)/Element.workspaceImage.height * 600)}`;
        Element.inputElementDiskTexture.value = focusIMG.GetTexture()
        Element.inputElementWC3Texture.value = focusIMG.textureWC3Path
        Element.inputElementText.value = focusIMG.text
        Element.inputElementTrigVar.value = focusIMG.TrigVar
        
        if(focusIMG.frameComponent.type == 1 || focusIMG.frameComponent.type == 2) {
            Element.selectElementType.disabled = false
            Element.selectElementType.selectedIndex = focusIMG.frameComponent.type - 1
        } else {
            Element.selectElementType.disabled = true
        }

        const optionArray = Element.selectElementParent.options

        console.log("Note to self: this 'delay' thinggy has to be fixed eventually");
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if(optionArray[0]) {
                optionArray[0].remove()
            } else {
                break;
            }
        }

        for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
            if(el.image == focusIMG || focusIMG.frameComponent.GetChildren().indexOf(el) >= 0) { //itself or first children
                continue;
            }

            const option = document.createElement('option') as HTMLOptionElement
            option.text = el.GetName()
            el.ParentOption = option
            optionArray.add(option)
            
            if(focusIMG.frameComponent.GetParent() == el) option.selected = true;
        }

    } else {
        DisableFields(true)
        EmptyFields()
    }

}catch(e){alert(e)}
}

function DisableFields(disable: boolean) {
    Element.inputElementWidth.disabled          = disable
    Element.inputElementHeight.disabled         = disable
    Element.inputElementName.disabled           = disable
    Element.selectElementType.disabled          = disable
    Element.selectElementParent.disabled        = disable
    Element.inputElementCoordinateX.disabled    = disable
    Element.inputElementCoordinateY.disabled    = disable
    Element.inputElementDiskTexture.disabled        = disable
    Element.buttonElementTextureBrowse.disabled = disable
    Element.inputElementWC3Texture.disabled = disable
    Element.inputElementText.disabled = disable
    Element.inputElementTrigVar.disabled = disable
}

function EmptyFields() {
    Element.inputElementWidth.value          = ""
    Element.inputElementHeight.value         = ""
    Element.inputElementName.value           = ""
    Element.selectElementType.value          = ""
    Element.selectElementParent.value        = ""
    Element.inputElementCoordinateX.value    = ""
    Element.inputElementCoordinateY.value    = ""
    Element.inputElementDiskTexture.value    = ""
    Element.inputElementWC3Texture.value = ""
    Element.inputElementText.value = ""
    Element.inputElementTrigVar.value = ""

}