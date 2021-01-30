/* eslint-disable @typescript-eslint/no-namespace */
import {CustomImage} from "../FrameLogic/CustomImage"
import {ProjectTree} from "../FrameLogic/ProjectTree"
import {workspaceImage} from "../Constants/Elements"
import {JASS} from '../Templates/Templates'
import {ICallableDivInstance} from './ICallableDivInstance'
import {writeFile, appendFile} from 'fs';
import { FrameType } from "../FrameLogic/FrameType"

/**0 for globals, 1 the body */
export class Export implements ICallableDivInstance {
    public Run() {
        writeFile('experiment.txt', JASS.globals, ()=>{
            appendFile('experiment.txt', TemplateReplace(0), ()=>{
                appendFile('experiment.txt', JASS.endglobals, ()=>{
                    appendFile('experiment.txt', JASS.library, ()=>{
                        appendFile('experiment.txt', TemplateReplace(1), ()=>{
                            appendFile('experiment.txt', JASS.endlibrary, ()=>{
                                alert("File Created in Output folder")})})})})})})

    }
}

/** 0 for globals */
export function TemplateReplace(kind: number) {try{
    let text: string;
    let sumText = ""
    for(const el of ProjectTree.GetInstance().GetIterator()) {
        if(kind == 0) {
            if(el.type == FrameType.BUTTON) {
                text = JASS.declaresBUTTON
            } else {
                text = JASS.declares
            }
        } else {
            text = JassGetTypeText(el.type)
        }
        let textEdit = text.replace(/FRvar/gi, el.GetName())
        if(kind == 0) {
            sumText += textEdit;
            continue;
        }
        
        if(el.type == FrameType.ORIGIN) textEdit = textEdit.replace("OWNERvar", "BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)");
        textEdit = textEdit.replace("TOPLEFTXvar", `${((el.image.element.offsetLeft - workspaceImage.getBoundingClientRect().x)/workspaceImage.offsetWidth * 0.8).toPrecision(6)}`)
        textEdit = textEdit.replace("TOPLEFTYvar", `${((workspaceImage.getBoundingClientRect().bottom - el.image.element.getBoundingClientRect().top)/workspaceImage.height * 0.6).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTXvar", `${((el.image.element.offsetLeft - workspaceImage.getBoundingClientRect().x + el.image.element.width)/workspaceImage.offsetWidth * 0.8).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTYvar", `${((workspaceImage.getBoundingClientRect().bottom - el.image.element.getBoundingClientRect().bottom)/workspaceImage.height * 0.6).toPrecision(6)}`)
        textEdit = textEdit.replace("PATHvar", '"'+el.image.GetTexture()+'"')
        sumText += textEdit;
    }
    return sumText;
}catch(e){alert(e)}} 

function JassGetTypeText(type: FrameType) : string{
    
    switch (type) {
        case FrameType.BACKDROP:
            return JASS.backdrop
        case FrameType.BUTTON:
            return JASS.button
            
        case FrameType.SCRIPT_DIALOG_BUTTON:
            return JASS.ScriptDialogButton
                
        case FrameType.BROWSER_BUTTON:
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