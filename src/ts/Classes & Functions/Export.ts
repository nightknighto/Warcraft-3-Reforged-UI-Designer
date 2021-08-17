/* eslint-disable @typescript-eslint/no-namespace */
import { JASS, LUA, Typescript } from '../Templates/Templates'
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

    public SaveJASS(filepath: string): void {
        try {

            writeFile(filepath, JASS.globals, () => {
                appendFile(filepath, TemplateReplace('jass',0), () => {
                    appendFile(filepath, JASS.endglobals, () => {
                        appendFile(filepath, JASS.library.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                            appendFile(filepath, TemplateReplace('jass',1), () => {
                                appendFile(filepath, JASS.libraryInit, () => {
                                    appendFile(filepath, generalOptions('jass'), () => {
                                        appendFile(filepath, TemplateReplace('jass',2), () => {
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

        } catch (e) { alert("SaveJASS: " + e) }
    }

    public SaveLUA(filepath: string): void {

        writeFile(filepath, LUA.globals, () => {
            appendFile(filepath, TemplateReplace('lua',0), () => {
                appendFile(filepath, LUA.endglobals, () => {
                    appendFile(filepath, LUA.library.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                        appendFile(filepath, TemplateReplace('lua',1), () => {
                            appendFile(filepath, LUA.libraryInit.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
                                appendFile(filepath, generalOptions('lua'), () => {
                                    appendFile(filepath, TemplateReplace('lua',2), () => {
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

    public SaveTypescript(filepath: string): void {

        writeFile(filepath, Typescript.classDeclare.replace(/FRlib/gi, ProjectTree.LibraryName), () => {
            appendFile(filepath, Typescript.globals, () => {
                appendFile(filepath, TemplateReplace('ts',0), () => {
                    appendFile(filepath, Typescript.endglobals, () => {
                        appendFile(filepath, Typescript.constructorInit, () => {
                            appendFile(filepath, generalOptions('typescript'), () => {
                                appendFile(filepath, TemplateReplace('ts',2), () => {
                                    appendFile(filepath, Typescript.endconstructor_library, () => {
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

    public run(): void {

        ProjectTree.saveGeneralOptions();

        const saveParams = remote.dialog.showSaveDialog({
            filters: [
                { name: 'JASS file', extensions: ['j'] },
                { name: 'LUA file', extensions: ['lua'] },
                { name: 'Typescript file', extensions: ['ts'] }
            ], properties: ['createDirectory']
        });

        saveParams.then((saveData: SaveDialogReturnValue) => {

            const filepathsections = saveData.filePath.split('.');
            const fileExtension = filepathsections[filepathsections.length - 1];

            if (saveData.canceled) return;

            switch (fileExtension) {
                case 'j': this.SaveJASS(saveData.filePath); break;
                case 'lua': this.SaveLUA(saveData.filePath); break;
                case 'ts': this.SaveTypescript(saveData.filePath); break;
                default: remote.dialog.showErrorBox("Invalid file extension", "You have selected an invalid file extension."); break;
            }

        });

    }
}

/** 0 for globals, 1 for Function Creation (NOT USED FOR TEXT FRAME), 2 for initialization of each frame*/
export function TemplateReplace(lang: 'jass'|'lua'|'ts', kind: number): string {
    try {
        let temp;
        switch(lang) {
            case ('jass'): temp = JASS; break;
            case ('lua'): temp = LUA; break;
            case ('ts'): temp = Typescript; break;
        }

        let text: string;
        let sumText = ""
        for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
            if (el.type == 0) { //Origin
                continue;
            }
            let isArray = false;
            let isArrayMain = false;
            
            if(el.getName().indexOf('[') >= 0) {
                isArray = true;
                if(el.getName().indexOf('[00') >= 0) isArrayMain = true;
            }


            //globals or initial declaration
            if (kind == 0) {

                //array
                if(isArray) {
                    
                    if(isArrayMain) { //main instance
                        if (el.type == FrameType.BUTTON) {
                            text = temp.declaresBUTTONArray
                        } else {
                            text = temp.declaresArray
                        }
                        if (lang == 'jass' || lang == 'lua' ) {
                            if (el.custom instanceof CustomImage) text += temp.declaresFUNCTIONALITYArray;
                        }
                    } else { //secondary instance
                        continue;
                    }

                //single instance; not array
                } else {
                    if (el.type == FrameType.BUTTON) {
                        text = temp.declaresBUTTON
                    } else {
                        text = temp.declares
                    }
                    if (lang == 'jass' || lang == 'lua' ) {
                        if (el.custom instanceof CustomImage) text += temp.declaresFUNCTIONALITY;
                    }
                }

            } else if (kind == 1 && lang != 'ts') {
                if (el.custom instanceof CustomText) continue;
                if (el.type != FrameType.BROWSER_BUTTON && el.type != FrameType.SCRIPT_DIALOG_BUTTON && el.type != FrameType.BUTTON && el.type != FrameType.INVIS_BUTTON) continue;

                text = temp.TriggerButtonDisableStart
                if (el.custom instanceof CustomImage && el.custom.getTrigVar() == "") {
                    text += temp.TriggerButtonDisableEnd
                } else {
                    text += temp.TriggerVariableInit
                    text += temp.TriggerButtonDisableEnd
                }
            } else if (kind == 2) {
                let functionality = false
                if (el.custom instanceof CustomImage && el.custom.getTrigVar() != "") functionality = true;
                switch(lang) {
                    case ('jass'): text = JassGetTypeText(el.type, true); break;
                    case ('lua'): text = LuaGetTypeText(el.type, true); break;
                    case ('ts'): text = TypescriptGetTypeText(el.type, true); break; //always true. maybe give option for users to make it false
                }
                
            }

            let textEdit = text.replace(/FRlib/gi, ProjectTree.LibraryName)
            

            if(isArray) {
                if(kind == 0) { //if declaring, delete index
                    textEdit = textEdit.replace(/FRvar/gi, el.getName().replace('[00]', '')) //FRvar to skip array renaming
                } else {
                    if(lang == 'ts' && el.getName().indexOf('[0') >= 0) textEdit = textEdit.replace(/FRvar/gi, el.getName().replace('[0','[')); //solution to Octal literals
                    else textEdit = textEdit.replace(/FRvar/gi, el.getName());

                }
                textEdit = textEdit.replace(/FRvrr/gi, el.getName().replace('[', '').replace(']', '')) //mainly for FRvrrFunc (suffix present)
            } else {
                textEdit = textEdit.replace(/FRvar/gi, el.getName()) //FRvar to skip array renaming
                textEdit = textEdit.replace(/FRvrr/gi, el.getName())
            }

            if (el.custom instanceof CustomImage) textEdit = textEdit.replace(/TRIGvar/gi, el.custom.getTrigVar())
            if (kind == 0) {
                sumText += textEdit;
                continue;
            }

            if (el) {
                if (el.getParent()) {
                    if(lang == 'jass' || lang == 'lua') textEdit = textEdit.replace("OWNERvar", (el.getParent().getName() == 'Origin') ? 'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : el.getParent().getName());
                    else if(lang == 'ts') {
                        if(el.getParent().getName().indexOf('[0') >= 0) textEdit = textEdit.replace("OWNERvar", (el.getParent().getName() == 'Origin') ? 'Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0)' : "this."+el.getParent().getName().replace('[0','['));
                        else textEdit = textEdit.replace("OWNERvar", (el.getParent().getName() == 'Origin') ? 'Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0)' : "this."+el.getParent().getName());

                    }
                }
            }
            textEdit = textEdit.replace("TOPLEFTXvar", `${(el.custom.getLeftX()).toPrecision(6)}`)
            textEdit = textEdit.replace("TOPLEFTYvar", `${(el.custom.getBotY() + el.custom.getHeight()).toPrecision(6)}`)
            textEdit = textEdit.replace("BOTRIGHTXvar", `${(el.custom.getLeftX() + el.custom.getWidth()).toPrecision(6)}`)
            textEdit = textEdit.replace("BOTRIGHTYvar", `${(el.custom.getBotY()).toPrecision(6)}`)

            switch (el.custom.constructor) {
                case (CustomImage):
                    textEdit = textEdit.replace("PATHvar", '"' + (el.custom as CustomImage).getWc3Texture() + '"');
                    textEdit = textEdit.replace("TRIGvar", '"' + (el.custom as CustomImage).getTrigVar() + '"');
                    textEdit = textEdit.replace("TEXTvar",  '"' + el.custom.getText().replace(/\n/gi, "\\n") + '"');
                    break;

                case (CustomText):
                    textEdit = textEdit.replace("TEXTvar", '"|cff' + (el.custom as CustomText).getColor().slice(1) + (el.custom as CustomText).getText().replace(/\n/gi, "\\n") + '|r"');
                    textEdit = textEdit.replace("FRscale", `${(1 / 0.7 * (el.custom as CustomText).getScale() - 0.428).toPrecision(3)}`) //y = 1/0.7 x - 0.428, where x is (app scale);
                    break;
            }

            sumText += textEdit;
        }
        return sumText;
    } catch (e) { alert(e) }
}


function generalOptions(type: 'lua' | 'jass' | 'typescript') {
    let sumText = ""
    if (type == 'jass') {
        if (ProjectTree.HideGameUI) sumText += JASS.HideGameUI;
        if (ProjectTree.HideHeroBar) sumText += JASS.HideHeroBar;
        if (ProjectTree.HideMiniMap) sumText += JASS.HideMiniMap;
        if (ProjectTree.HideResources) sumText += JASS.HideResources;
        if (ProjectTree.HideButtonBar) sumText += JASS.HideButtonBar;
        if (ProjectTree.HidePortrait) sumText += JASS.HidePortrait;
        if (ProjectTree.HideChat) sumText += JASS.HideChat;
    } else if (type == 'lua' || type == 'typescript') {
        if (ProjectTree.HideGameUI) sumText += LUA.HideGameUI;
        if (ProjectTree.HideHeroBar) sumText += LUA.HideHeroBar;
        if (ProjectTree.HideMiniMap) sumText += LUA.HideMiniMap;
        if (ProjectTree.HideResources) sumText += LUA.HideResources;
        if (ProjectTree.HideButtonBar) sumText += LUA.HideButtonBar;
        if (ProjectTree.HidePortrait) sumText += LUA.HidePortrait;
        if (ProjectTree.HideChat) sumText += LUA.HideChat;
    }

    return sumText + "\n";
}


function JassGetTypeText(type: FrameType, functionality: boolean): string {

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

function LuaGetTypeText(type: FrameType, functionality: boolean): string {

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

function TypescriptGetTypeText(type: FrameType, functionality: boolean): string {

    switch (type) {
        case FrameType.BACKDROP:
            return Typescript.backdrop

        case FrameType.BUTTON:
            if (functionality) return Typescript.button + Typescript.ButtonTriggerSetup;
            return Typescript.button

        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return Typescript.ScriptDialogButton + Typescript.ButtonTriggerSetup;
            return Typescript.ScriptDialogButton

        case FrameType.BROWSER_BUTTON:
            if (functionality) return Typescript.BrowserButton + Typescript.ButtonTriggerSetup;
            return Typescript.BrowserButton

        case FrameType.CHECKLIST_BOX:
            return Typescript.CheckListBox

        case FrameType.ESC_MENU_BACKDROP:
            return Typescript.EscMenuBackdrop

        case FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE:
            return Typescript.OptionsPopupMenuBackdropTemplate

        case FrameType.QUEST_BUTTON_BASE_TEMPLATE:
            return Typescript.QuestButtonBaseTemplate

        case FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE:
            return Typescript.QuestButtonDisabledBackdropTemplate

        case FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE:
            return Typescript.QuestButtonPushedBackdropTemplate

        case FrameType.QUEST_CHECKBOX:
            return Typescript.QuestCheckBox

        case FrameType.INVIS_BUTTON:
            if (functionality) return Typescript.InvisButton + Typescript.ButtonTriggerSetup;
            return Typescript.InvisButton

        case FrameType.TEXT_FRAME:
            return Typescript.TextFrame

    }
    return ""
}