/* eslint-disable @typescript-eslint/no-namespace */
import { JASS, LUA } from '../Templates/Templates'
import { ICallableDivInstance } from './ICallableDivInstance'
import { writeFile, appendFile } from 'fs';
import { FrameType } from "../Editor/FrameLogic/FrameType"
import { Editor } from "../Editor/Editor"
import { SaveDialogReturnValue, remote } from 'electron';
import { ProjectTree } from '../Editor/ProjectTree';
import { CustomImage } from '../Editor/FrameLogic/CustomImage';
import { CustomText } from '../Editor/FrameLogic/CustomText';

/**0 for globals, 1 the body */
export class Export implements ICallableDivInstance {

    public SaveJASS(filepath : string) : void{try{

        writeFile(filepath, JASS.globals, () => {
            appendFile(filepath, JASSTemplateReplace(0), () => {
                appendFile(filepath, JASS.endglobals, () => {
                    appendFile(filepath, JASS.library.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                        appendFile(filepath, JASSTemplateReplace(1), () => {
                            appendFile(filepath, JASS.libraryInit, () => {
                                appendFile(filepath, generalOptions('jass'), () => {
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
        })

    }catch(e){alert("SaveJASS: "+e)}}

    public SaveLUA(filepath : string) : void{

        writeFile(filepath, LUA.globals, () => {
            appendFile(filepath, LUATemplateReplace(0), () => {
                appendFile(filepath, LUA.endglobals, () => {
                    appendFile(filepath, LUA.library.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                        appendFile(filepath, LUATemplateReplace(1), () => {
                            appendFile(filepath, LUA.libraryInit.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                                appendFile(filepath, generalOptions('lua'), () => {
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
        })

    }

    public Run(): void {

        ProjectTree.saveGeneralOptions();

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

/** 0 for globals, 1 for Function Creation (NOT USED FOR TEXT FRAME), 2 for initialization of each frame*/
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
            if(el.custom instanceof CustomImage && el.custom.TrigVar != "") text += JASS.declaresFUNCTIONALITY;
        } else if(kind == 1) {
            if(el.custom instanceof CustomText) continue;
            if(el.type != FrameType.BROWSER_BUTTON && el.type != FrameType.SCRIPT_DIALOG_BUTTON && el.type != FrameType.BUTTON && el.type != FrameType.INVIS_BUTTON ) continue;

            text = JASS.TriggerButtonDisableStart
            if(el.custom.TrigVar == "") {
                text += JASS.TriggerButtonDisableEnd
            } else {
                text += JASS.TriggerVariableInit
                text += JASS.TriggerButtonDisableEnd
            }
        } else if(kind == 2) {
            let functionality = false
            if (el.custom instanceof CustomImage && el.custom.TrigVar != "") functionality = true;
            text = JassGetTypeText(el.type, functionality)
        }

        let textEdit = text.replace(/FRlib/gi, ProjectTree.LibraryName)
        textEdit = textEdit.replace(/FRvar/gi, el.GetName())
        if(el.custom instanceof CustomImage) textEdit = textEdit.replace(/TRIGvar/gi, el.custom.TrigVar)
        if(kind == 0) {
            sumText += textEdit;
            continue;
        }
        
        if(el) {
            if(el.GetParent()) {
                textEdit = textEdit.replace("OWNERvar", (el.GetParent().GetName() == 'Origin')?'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : el.GetParent().GetName() );
            }
        }
        textEdit = textEdit.replace("TOPLEFTXvar", `${(el.custom.LeftX).toPrecision(6)}`)
        textEdit = textEdit.replace("TOPLEFTYvar", `${(el.custom.BotY+el.custom.height).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTXvar", `${(el.custom.LeftX+el.custom.width).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTYvar", `${(el.custom.BotY).toPrecision(6)}`)
        if(el.custom instanceof CustomImage) {
            textEdit = textEdit.replace("PATHvar", '"'+el.custom.textureWC3Path+'"')
            textEdit = textEdit.replace("TRIGvar", '"'+el.custom.TrigVar+'"')
            textEdit = textEdit.replace("TEXTvar", '"'+el.custom.text.replace(/\n/gi, "\\n")+'"')
        } else {
            textEdit = textEdit.replace("TEXTvar", '"|cff'+el.custom.color.slice(1)+el.custom.text.replace(/\n/gi, "\\n")+'|r"')
            textEdit = textEdit.replace("FRscale", `${(1/0.7*el.custom.scale - 0.428).toPrecision(3)}`) //y = 1/0.7 x - 0.428, where x is (app scale)
        }
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

        if(kind == 0) { //declare element
            if(el.type == FrameType.BUTTON) {
                text = LUA.declaresBUTTON
            } else {
                text = LUA.declares
            }
            if(el.custom instanceof CustomImage && el.custom.TrigVar != "") text += LUA.declaresFUNCTIONALITY;
        } else if(kind == 1 && el.custom instanceof CustomImage) {
            if(el.custom instanceof CustomText) continue;
            if(el.type != FrameType.BROWSER_BUTTON && el.type != FrameType.SCRIPT_DIALOG_BUTTON && el.type != FrameType.BUTTON && el.type != FrameType.INVIS_BUTTON ) continue;

            text = LUA.TriggerButtonDisableStart
            if(el.custom.TrigVar == "") {
                text += LUA.TriggerButtonDisableEnd
            } else {
                text += LUA.TriggerVariableInit
                text += LUA.TriggerButtonDisableEnd
            }
        } else if(kind == 2) {
            let functionality = false
            if (el.custom instanceof CustomImage && el.custom.TrigVar != "") functionality = true;
            text = LuaGetTypeText(el.type, functionality)
        }

        let textEdit = text.replace(/FRlib/gi, ProjectTree.LibraryName)
        textEdit = textEdit.replace(/FRvar/gi, el.GetName())
        if (el.custom instanceof CustomImage) textEdit = textEdit.replace(/TRIGvar/gi, el.custom.TrigVar)
        if(kind == 0) {
            sumText += textEdit;
            continue;
        }
        
        if(el) {
            if(el.GetParent()) {
                textEdit = textEdit.replace("OWNERvar", (el.GetParent().GetName() == 'Origin')?'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : el.GetParent().GetName() );
            }
        }
        textEdit = textEdit.replace("TOPLEFTXvar", `${(el.custom.LeftX).toPrecision(6)}`)
        textEdit = textEdit.replace("TOPLEFTYvar", `${(el.custom.BotY+el.custom.height).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTXvar", `${(el.custom.LeftX+el.custom.width).toPrecision(6)}`)
        textEdit = textEdit.replace("BOTRIGHTYvar", `${(el.custom.BotY).toPrecision(6)}`)
        if(el.custom instanceof CustomImage) {
            textEdit = textEdit.replace("PATHvar", '"'+el.custom.textureWC3Path+'"')
            textEdit = textEdit.replace("TRIGvar", '"'+el.custom.TrigVar+'"')
            textEdit = textEdit.replace("TEXTvar", '"'+el.custom.text.replace(/\n/gi, "\\n")+'"')
        } else {
            
            textEdit = textEdit.replace("TEXTvar", '"|cff'+el.custom.color.slice(1)+el.custom.text.replace(/\n/gi, "\\n")+'|r"')
            textEdit = textEdit.replace("FRscale", `${(1/0.7*el.custom.scale - 0.428).toPrecision(3)}`) //y = 1/0.7 x - 0.428, where x is (app scale)
        }
        sumText += textEdit;
    }
    return sumText;
}catch(e){alert(e)}} 


function generalOptions(type:'lua'|'jass') {
    let sumText = ""
    if(type == 'jass') {
        if(ProjectTree.HideGameUI) sumText += JASS.HideGameUI;
        if(ProjectTree.HideHeroBar) sumText += JASS.HideHeroBar;
        if(ProjectTree.HideMiniMap) sumText += JASS.HideMiniMap;
    } else if(type == 'lua') {
        if(ProjectTree.HideGameUI) sumText += LUA.HideGameUI;
        if(ProjectTree.HideHeroBar) sumText += LUA.HideHeroBar;
        if(ProjectTree.HideMiniMap) sumText += LUA.HideMiniMap;
    }

    return sumText+"\n";
}


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
        
        case FrameType.INVIS_BUTTON:
            if (functionality) return JASS.InvisButton + JASS.TriggerVariableFinal;
            return JASS.InvisButton    
        
        case FrameType.TEXT_FRAME:
            return JASS.TextFrame    
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
        
        case FrameType.INVIS_BUTTON:
            if (functionality) return LUA.InvisButton + LUA.TriggerVariableFinal;
            return LUA.InvisButton
        
        case FrameType.TEXT_FRAME:
            return LUA.TextFrame
                
    }
    return ""
}