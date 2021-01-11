import { CustomImage } from "./CustomImage"
import { coordsIMG } from "../Constants.ts/Elements"

export namespace JASS{
    export const globals = "globals \n"

    export const declares = "framehandle FRvar = null \n"
    export const declaresBUTTON = "framehandle FRvarButton = null \n framehandle FRvarBackdrop = null \n"

    export const endglobals = "endglobals \n"
    export const library = "library REFORGEDUIMAKER initializer init \n private function init takes nothing returns nothing \n"

    export const backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'
    export const button = 'set FRvarButton = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvarButton, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvarButton, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set FRvarBackdrop = BlzCreateFrameByType("BACKDROP", "FRvarBackdrop", FRvarButton, "", 1) \n call BlzFrameSetAllPoints(FRvarBackdrop, FRvarButton) \n call BlzFrameSetTexture(FRvarBackdrop, PATHvar, 0, true) \n'
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
            text = JassGetTypeText(el.type)
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

function JassGetTypeText(type: string) {
    //no breaks because return already stops the code
    switch (type) {
        case "backdrop":
            return JASS.backdrop
        case "button":
            return JASS.button
            
        case "ScriptDialogButton":
            return JASS.ScriptDialogButton
                
        case "BrowserButton":
            return JASS.BrowserButton
                    
        case "CheckListBox":
            return JASS.CheckListBox
        

        case "EscMenuBackdrop":
            return JASS.EscMenuBackdrop
                
        case "OptionsPopupMenuBackdropTemplate":
            return JASS.OptionsPopupMenuBackdropTemplate
                    

        case "QuestButtonBaseTemplate":
            return JASS.QuestButtonBaseTemplate
    
        case "QuestButtonDisabledBackdropTemplate":
            return JASS.QuestButtonDisabledBackdropTemplate
            
        case "QuestButtonPushedBackdropTemplate":
            return JASS.QuestButtonPushedBackdropTemplate
                
        case "QuestCheckBox":
            return JASS.QuestCheckBox    
    }
    return ""
}