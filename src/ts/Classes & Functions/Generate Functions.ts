import { JASS } from "../Templates/Templates"
import { CustomImage } from "./CustomImage"
import { coordsIMG } from "../Constants.ts/Elements"

/**0 for globals, 1 the body */
export function TemplateReplace(kind: number) {try{
    let text: string;
    let sumText = ""
    for(const el of CustomImage.Array) {
        if(kind == 0) {
            if(el.type == 'button') {
                text = JASS.declaresBUTTON
            } else {
                text = JASS.declares
            }
        } else {
            eval(`text = JASS.${el.type}`)
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
}catch(e){alert(e)}} 