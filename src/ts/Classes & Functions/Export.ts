/* eslint-disable @typescript-eslint/no-namespace */
import {workspaceImage} from "../Constants/Elements"
import {JASS} from '../Templates/Templates'
import {ICallableDivInstance} from './ICallableDivInstance'
import {writeFile, appendFile} from 'fs';
import { FrameType } from "../Editor/FrameLogic/FrameType"
import { Editor } from "../Editor/Editor"

/**0 for globals, 1 the body */
export class Export implements ICallableDivInstance {
    public Run() {
        writeFile('experiment.txt', JASS.globals, ()=>{
            appendFile('experiment.txt', TemplateReplace(0), ()=>{
                appendFile('experiment.txt', JASS.endglobals, ()=>{
                    appendFile('experiment.txt', JASS.library, ()=>{
                        appendFile('experiment.txt', TemplateReplace(1), () => {
                            appendFile('experiment.txt', JASS.libraryInit, ()=>{
                                appendFile('experiment.txt', TemplateReplace(2), ()=>{
                                    appendFile('experiment.txt', JASS.endlibrary, ()=>{
                                        alert("File Created. Name: Experiment.txt")})})})})})})})})

    }
}

/** 0 for globals, 1 for Function Creation*/
export function TemplateReplace(kind: number) {try{
    let text: string;
    let sumText = ""
    for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
        if(el.type == 0) { //Origin
            continue;
        }

        if(kind == 0) {
            if(el.type == FrameType.BUTTON) {
                text = JASS.declaresBUTTON
            } else {
                text = JASS.declares
            }
            if(el.image.TrigVar != "") text += JASS.declaresFUNCTIONALITY;
        } else if(kind == 1) {
            if(el.image.TrigVar == "") continue;
            text = JASS.TriggerVariableInit
        } else {
            let functionality = false
            if (el.image.TrigVar != "") functionality = true;
            text = JassGetTypeText(el.type, functionality)
        }

        let textEdit = text.replace(/FRvar/gi, el.GetName())
        textEdit = textEdit.replace(/TRIGvar/gi, el.image.TrigVar)
        if(kind == 0) {
            sumText += textEdit;
            continue;
        }
        
        if(el) {
            if(el.GetParent()) {
                textEdit = textEdit.replace("OWNERvar", (el.GetParent().GetName() == 'Origin')?'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : el.GetParent().GetName() );
            }
        }
        textEdit = textEdit.replace("TOPLEFTXvar", `${(el.image.LeftX).toPrecision(6)}`)
        textEdit = textEdit.replace("TOPLEFTYvar", `${(el.image.BotY+el.image.height).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTXvar", `${(el.image.LeftX+el.image.width).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTYvar", `${(el.image.BotY).toPrecision(6)}`)
        textEdit = textEdit.replace("PATHvar", '"'+el.image.textureWC3Path+'"')
        textEdit = textEdit.replace("TEXTvar", '"'+el.image.text+'"')
        textEdit = textEdit.replace("TRIGvar", '"'+el.image.TrigVar+'"')
        sumText += textEdit;
    }
    return sumText;
}catch(e){alert(e)}} 

function JassGetTypeText(type: FrameType, functionality: boolean) : string{
    
    switch (type) {
        case FrameType.BACKDROP:
            return JASS.backdrop

        case FrameType.BUTTON:
            if (functionality) return JASS.button + JASS.TriggerVariableFinal;
            return JASS.button
            
        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return JASS.ScriptDialogButton + JASS.TriggerVariableFinal;
            return JASS.ScriptDialogButton
                
        case FrameType.BROWSER_BUTTON:
            if (functionality) return JASS.BrowserButton + JASS.TriggerVariableFinal;
            return JASS.BrowserButton
                    
        case FrameType.CHECKLIST_BOX:
            return JASS.CheckListBox
        
        case FrameType.ESC_MENU_BACKDROP:
            return JASS.EscMenuBackdrop
                
        case FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE:
            return JASS.OptionsPopupMenuBackdropTemplate
                    
        case FrameType.QUEST_BUTTON_BASE_TEMPLATE:
            return JASS.QuestButtonBaseTemplate
    
        case FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE:
            return JASS.QuestButtonDisabledBackdropTemplate
            
        case FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE:
            return JASS.QuestButtonPushedBackdropTemplate
                
        case FrameType.QUEST_CHECKBOX:
            return JASS.QuestCheckBox    
    }
    return ""
}