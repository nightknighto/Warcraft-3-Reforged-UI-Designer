/* eslint-disable @typescript-eslint/no-namespace */
import { JASS, LUA } from '../Templates/Templates'
import { ICallableDivInstance } from './ICallableDivInstance'
import { writeFile, appendFile } from 'fs';
import { FrameType } from "../Editor/FrameLogic/FrameType"
import { Editor } from "../Editor/Editor"
import { SaveDialogReturnValue, remote } from 'electron';

/**0 for globals, 1 the body */
export class Export implements ICallableDivInstance {

    public SaveJASS(filepath : string) : void{

        writeFile(filepath, JASS.globals, () => {
            appendFile(filepath, JASSTemplateReplace(0), () => {
                appendFile(filepath, JASS.endglobals, () => {
                    appendFile(filepath, JASS.library, () => {
                        appendFile(filepath, JASSTemplateReplace(1), () => {
                            appendFile(filepath, JASS.libraryInit, () => {
                                appendFile(filepath, JASSTemplateReplace(2), () => {
                                    appendFile(filepath, JASS.endlibrary, () => {
                                        alert(`File Created. Path: ${filepath}`);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }

    public SaveLUA(filepath : string) : void{

        writeFile(filepath, LUA.globals, () => {
            appendFile(filepath, LUATemplateReplace(0), () => {
                appendFile(filepath, LUA.endglobals, () => {
                    appendFile(filepath, LUA.library, () => {
                        appendFile(filepath, LUATemplateReplace(1), () => {
                            appendFile(filepath, LUA.libraryInit, () => {
                                appendFile(filepath, LUATemplateReplace(2), () => {
                                    appendFile(filepath, LUA.endlibrary, () => {
                                        alert(`File Created. Path: ${filepath}`);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }

    public Run(): void {

        const saveParams = remote.dialog.showSaveDialog({filters: [
            {name: 'JASS file', extensions: ['j']},
            {name: 'LUA file', extensions: ['lua']},
            {name: 'Typescript file', extensions: ['ts']}
        ] ,properties: [ 'createDirectory'] });

        saveParams.then((saveData : SaveDialogReturnValue) => {
            
            const filepathsections = saveData.filePath.split('.');
            const fileExtension = filepathsections[filepathsections.length - 1];

            if(saveData.canceled) return;

            switch(fileExtension){
                case 'j': this.SaveJASS(saveData.filePath); break;
                case 'lua': this.SaveLUA(saveData.filePath); break;
                default: remote.dialog.showErrorBox("Invalid file extension", "You have selected an invalid file extension."); break;
            }

        });

    }
}

/** 0 for globals, 1 for Function Creation*/
export function JASSTemplateReplace(kind: number) : string {try{
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


/** 0 for globals, 1 for Function Creation*/
export function LUATemplateReplace(kind: number) : string {try{
    let text: string;
    let sumText = ""
    for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
        if(el.type == 0) { //Origin
            continue;
        }

        if(kind == 0) {
            if(el.type == FrameType.BUTTON) {
                text = LUA.declaresBUTTON
            } else {
                text = LUA.declares
            }
            if(el.image.TrigVar != "") text += LUA.declaresFUNCTIONALITY;
        } else if(kind == 1) {
            if(el.image.TrigVar == "") continue;
            text = LUA.TriggerVariableInit
        } else {
            let functionality = false
            if (el.image.TrigVar != "") functionality = true;
            text = LuaGetTypeText(el.type, functionality)
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

function LuaGetTypeText(type: FrameType, functionality: boolean) : string{
    
    switch (type) {
        case FrameType.BACKDROP:
            return LUA.backdrop

        case FrameType.BUTTON:
            if (functionality) return LUA.button + LUA.TriggerVariableFinal;
            return LUA.button
            
        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return LUA.ScriptDialogButton + LUA.TriggerVariableFinal;
            return LUA.ScriptDialogButton
                
        case FrameType.BROWSER_BUTTON:
            if (functionality) return LUA.BrowserButton + LUA.TriggerVariableFinal;
            return LUA.BrowserButton
                    
        case FrameType.CHECKLIST_BOX:
            return LUA.CheckListBox
        
        case FrameType.ESC_MENU_BACKDROP:
            return LUA.EscMenuBackdrop
                
        case FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE:
            return LUA.OptionsPopupMenuBackdropTemplate
                    
        case FrameType.QUEST_BUTTON_BASE_TEMPLATE:
            return LUA.QuestButtonBaseTemplate
    
        case FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE:
            return LUA.QuestButtonDisabledBackdropTemplate
            
        case FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE:
            return LUA.QuestButtonPushedBackdropTemplate
                
        case FrameType.QUEST_CHECKBOX:
            return LUA.QuestCheckBox    
    }
    return ""
}