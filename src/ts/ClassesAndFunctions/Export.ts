import { JASS, LUA, Typescript, Wurst } from '../Templates/Templates'
import { ICallableDivInstance } from './ICallableDivInstance'
import { writeFileSync } from 'fs'
import { FrameType } from '../Editor/FrameLogic/FrameType'
import { FrameRequire } from '../Editor/FrameLogic/FrameRequire'
import { SaveDialogReturnValue, remote, clipboard } from 'electron'
import { ProjectTree } from '../Editor/ProjectTree'
import CustomComplex from '../Editor/FrameLogic/CustomComplex'
import { debugText } from './MiniFunctions'

// writes data into file and copies text to clipboard
async function finalizeExport(data: string, filepath: string | null, FDFs: string[], sendMessage = true) {
    try {
        if (filepath) {
            writeFileSync(filepath, data)
        }

        window.focus()

        clipboard.writeText(data)

        if (sendMessage) {
            alert(
                `Code copied to clipboard.${
                    filepath
                        ? `
    File created at ` + filepath
                        : ''
                }${
                    FDFs.length > 0
                        ? `
    TOC file created at ${filepath?.split('.')[0]}TOC.toc ... Put it in your map and delete the "war3mapImported\\" prefix.`
                        : ''
                }`
            )
        } else {
            debugText(`Code copied to clipboard.${filepath ? ' File created at ' + filepath : ''}${FDFs.length > 0 ? 'TOC file created.' : ''}`)
        }
    } catch (e) {
        alert('error: ' + e)
    }
}

export type TLanguage = 'jass' | 'lua' | 'ts' | 'wurst'

function getFDFsList(): string[] {
    const FDFsRequired: string[] = []
    const ft = FrameType
    for (const el of ProjectTree.getInstance().getIterator()) {
        let require = ''
        switch (el.type) {
            case ft.TEXTAREA:
                require = FrameRequire.TEXTAREA
                break
            case ft.EDITBOX:
                require = FrameRequire.EDITBOX
                break
        }

        if (require !== '') {
            if (FDFsRequired.indexOf(require) < 0) {
                FDFsRequired.push(require)
            }
        }
    }

    return FDFsRequired
}

/**Creates the TOC file and fills it with the FDFs.*/
function createTOCfile(filepath: string | null, FDFsRequired: string[]) {
    if (FDFsRequired.length > 0) {
        if (filepath !== null) {
            const f = filepath.split('.') //splits into 2 parts, part 1 is path before the .jass or lua, and part 2 is jass or lua
            const TOCpath = f[0] + 'TOC' + '.toc'
            writeFileSync(TOCpath, FDFsRequired.join('\n') + '\n ')
        }
    }
}

export class Export implements ICallableDivInstance {
    private saveToFile = false
    private lang: TLanguage = 'jass'
    private sendMessage: boolean

    constructor(saveToFile: boolean, lang: TLanguage, sendMessage = true) {
        this.saveToFile = saveToFile
        this.lang = lang
        this.sendMessage = sendMessage
    }

    public Save(filepath: string | null): void {
        const FDFs = getFDFsList()
        let tocName = ''
        if (filepath !== null) {
            createTOCfile(filepath, FDFs)
            tocName = filepath.split('\\').pop() ?? ''
            tocName = tocName.split('.')[0]
            tocName = tocName + 'TOC'
        }

        let data
        if (this.lang == 'jass') {
            data = JASS.globals
            data += TemplateReplace('jass', 0)
            data += JASS.endglobals
            data += JASS.library.replace(/FRlib/gi, ProjectTree.LibraryName)
            data += TemplateReplace('jass', 1)
            data += JASS.libraryInit
            data += generalOptions('jass')
            if (FDFs.length > 0) data += JASS.LoadTOC.replace('name', tocName)
            data += TemplateReplace('jass', 2)
            data += JASS.endlibrary
        }

        if (this.lang == 'lua') {
            data = LUA.globals
            data += TemplateReplace('lua', 0)
            data += LUA.endglobals
            data += LUA.library.replace(/FRlib/gi, ProjectTree.LibraryName)
            data += TemplateReplace('lua', 1)
            data += LUA.libraryInit.replace(/FRlib/gi, ProjectTree.LibraryName)
            data += generalOptions('lua')
            if (FDFs.length > 0) data += LUA.LoadTOC.replace('name', tocName)
            data += TemplateReplace('lua', 2)
            data += LUA.endlibrary
        }

        if (this.lang == 'ts') {
            data = Typescript.classDeclare.replace(/FRlib/gi, ProjectTree.LibraryName)
            data += Typescript.globals
            data += TemplateReplace('ts', 0)
            data += Typescript.endglobals
            data += Typescript.constructorInit
            data += generalOptions('typescript')
            if (FDFs.length > 0) data += LUA.LoadTOC.replace('name', tocName)
            data += TemplateReplace('ts', 2)
            data += Typescript.endconstructor_library
        }

        if (this.lang == 'wurst') {
            data = Wurst.classDeclare.replace(/FRlib/gi, ProjectTree.LibraryName)
            data += Wurst.globals
            data += TemplateReplace('wurst', 0)
            data += Wurst.endglobals
            data += Wurst.constructorInit
            data += generalOptions('wurst')
            if (FDFs.length > 0) data += LUA.LoadTOC.replace('name', tocName)
            data += TemplateReplace('wurst', 2)
            data += Wurst.endconstructor_library
        }

        finalizeExport(data, filepath, FDFs, this.sendMessage)
    }

    public run(): void {
        ProjectTree.saveGeneralOptions()

        if (this.saveToFile) {
            let saveParams

            if (this.lang == 'jass') {
                saveParams = remote.dialog.showSaveDialog({
                    filters: [{ name: 'JASS file', extensions: ['j'] }],
                    properties: ['createDirectory'],
                })
            }

            if (this.lang == 'lua') {
                saveParams = remote.dialog.showSaveDialog({
                    filters: [{ name: 'LUA file', extensions: ['lua'] }],
                    properties: ['createDirectory'],
                })
            }

            if (this.lang == 'ts') {
                saveParams = remote.dialog.showSaveDialog({
                    filters: [{ name: 'Typescript file', extensions: ['ts'] }],
                    properties: ['createDirectory'],
                })
            }

            if (this.lang == 'wurst') {
                saveParams = remote.dialog.showSaveDialog({
                    filters: [{ name: 'Wurst file', extensions: ['wurst'] }],
                    properties: ['createDirectory'],
                })
            }

            saveParams.then((saveData: SaveDialogReturnValue) => {
                const filepathsections = saveData.filePath?.split('.') ?? ''
                const fileExtension = filepathsections[filepathsections.length - 1]

                if (saveData.canceled || !saveData.filePath) return

                if (this.lang == 'jass')
                    switch (fileExtension) {
                        case 'j':
                            this.Save(saveData.filePath)
                            break
                        default:
                            remote.dialog.showErrorBox('Invalid file extension', 'You have selected an invalid file extension.')
                            break
                    }

                if (this.lang == 'lua')
                    switch (fileExtension) {
                        case 'lua':
                            this.Save(saveData.filePath)
                            break
                        default:
                            remote.dialog.showErrorBox('Invalid file extension', 'You have selected an invalid file extension.')
                            break
                    }

                if (this.lang == 'ts')
                    switch (fileExtension) {
                        case 'ts':
                            this.Save(saveData.filePath)
                            break
                        default:
                            remote.dialog.showErrorBox('Invalid file extension', 'You have selected an invalid file extension.')
                            break
                    }

                if (this.lang == 'wurst')
                    switch (fileExtension) {
                        case 'wurst':
                            this.Save(saveData.filePath)
                            break
                        default:
                            remote.dialog.showErrorBox('Invalid file extension', 'You have selected an invalid file extension.')
                            break
                    }
            })
        } else {
            const FDFs = getFDFsList()
            if (FDFs.length > 0) {
                alert('This library needs to create external files. Please use Export As instead.')
            } else {
                this.Save(null)
            }
        }
    }
}

/** 0 for globals, 1 for Function Creation (NOT USED FOR TEXT FRAME), 2 for initialization of each frame*/
export function TemplateReplace(lang: TLanguage, kind: number) {
    try {
        let temp
        switch (lang) {
            case 'jass':
                temp = JASS
                break
            case 'lua':
                temp = LUA
                break
            case 'ts':
                temp = Typescript
                break
            case 'wurst':
                temp = Wurst
                break
        }

        let text = ''
        let sumText = ''
        for (const el of ProjectTree.getInstance().getIterator()) {
            const parent = el.getParent()
            if (el.type == 0) {
                //Origin
                continue
            }
            let isArray = false
            let isArrayMain = false

            if (el.getName().indexOf('[') >= 0) {
                isArray = true
                if (el.getName().indexOf('[00') >= 0) isArrayMain = true
            }

            //globals or initial declaration
            if (kind == 0) {
                if (isArray && !isArrayMain) continue

                switch (el.type) {
                    case FrameType.BUTTON:
                        text = temp.declaresBUTTON
                        break
                    case FrameType.HOR_BAR_BACKGROUND:
                        text = temp.declaresHorBarBack
                        break
                    case FrameType.HOR_BAR_TEXT:
                        text = temp.declaresHorBarText
                        break
                    case FrameType.HOR_BAR_BACKGROUND_TEXT:
                        text = temp.declaresHorBarBack_Text
                        break
                    default:
                        text = temp.declares
                        if (temp == JASS && el.getTooltip()) {
                            text = JASS.declaresWiTooltip
                        }
                        break
                }

                if (lang == 'jass' || lang == 'lua') {
                    if (el.type == FrameType.CHECKBOX) {
                        if (temp == JASS) text += JASS.declaresFUNCTIONALITYcheckbox
                    } else text += temp.declaresFUNCTIONALITY
                }

                if (isArray) {
                    if (temp == LUA) text = text.replace(/nil/gi, '{}')
                    if (temp == Typescript) text = text.replace(/Frame/gi, 'Frame[] = []')
                    if (temp == JASS) text = text.replace(/(\w*)FRvar = null/gi, ` array \$1FRvar`)
                }
            } else if (kind == 1 && lang != 'ts') {
                text = ''
                if (
                    el.type != FrameType.BROWSER_BUTTON &&
                    el.type != FrameType.SCRIPT_DIALOG_BUTTON &&
                    el.type != FrameType.BUTTON &&
                    el.type != FrameType.INVIS_BUTTON &&
                    el.type != FrameType.CHECKBOX
                )
                    continue

                if (el.type != FrameType.CHECKBOX) {
                    text = temp.TriggerButtonDisableStart
                    if (el.custom.getTrigVar() == '') {
                        text += temp.TriggerButtonDisableEnd
                    } else {
                        text += temp.TriggerVariableInit
                        text += temp.TriggerButtonDisableEnd
                    }
                } else if (temp == JASS) {
                    text = JASS.TriggerCheckboxStart
                    if (el.custom.getTrigVar() == '') {
                        text += JASS.TriggerCheckboxEnd
                    } else {
                        text += JASS.TriggerCheckboxTrig
                        text += JASS.TriggerCheckboxEnd
                    }
                }
            } else if (kind == 2) {
                switch (lang) {
                    case 'jass':
                        text = JassGetTypeText(el.type, true)
                        break
                    case 'lua':
                        text = LuaGetTypeText(el.type, true)
                        break
                    case 'ts':
                        text = TypescriptGetTypeText(el.type, true)
                        break
                    case 'wurst':
                        text = WurstGetTypeText(el.type, true)
                        break //always true. maybe give option for users to make it false
                }

                if (el.getTooltip()) {
                    const t = parent?.type
                    if (t == FrameType.BUTTON || t == FrameType.INVIS_BUTTON || t == FrameType.BROWSER_BUTTON || t == FrameType.SCRIPT_DIALOG_BUTTON) {
                        text += temp.TooltipOwnerButton
                    } else {
                        //for LUA, TS: add local variables
                        if (isArray && isArrayMain) {
                            if (temp == LUA) text += 'Tooltip' + el.getName().replace('[00]', '') + ' = {} \n'
                            if (temp == Typescript) text += 'let Tooltip' + el.getName().replace('[00]', '') + ' = [] \n'
                        }
                        text += temp.TooltipOwnerOther
                    }
                }
            }

            let textEdit = text.replace(/FRlib/gi, ProjectTree.LibraryName)

            if (isArray) {
                if (kind == 0) {
                    //if declaring, delete index
                    textEdit = textEdit.replace(/FRvar/gi, el.getName().replace('[00]', '')) //FRvar to skip array renaming
                } else {
                    if (el.getName().indexOf('[0') >= 0) textEdit = textEdit.replace(/FRvar/gi, el.getName().replace('[0', '['))
                    //solution to Octal literals
                    else textEdit = textEdit.replace(/FRvar/gi, el.getName())
                }
                textEdit = textEdit.replace(/FRvrr/gi, el.getName().replace('[', '').replace(']', '')) //mainly for FRvrrFunc (suffix present)
            } else {
                textEdit = textEdit.replace(/FRvar/gi, el.getName()) //FRvar to skip array renaming
                textEdit = textEdit.replace(/FRvrr/gi, el.getName())
            }

            if (el.custom instanceof CustomComplex && el.custom.getTrigVar() != '') textEdit = textEdit.replace(/TRIGvar/gi, el.custom.getTrigVar())
            if (kind == 0) {
                sumText += textEdit
                continue
            }

            if (el.custom.getIsRelative() && parent && parent?.type !== FrameType.ORIGIN) {
                if (lang === 'jass' || lang === 'lua') {
                    textEdit = textEdit.replace(
                        /BlzFrameSetAbsPoint\(([\w|\d|\[|\]]*), (\w*), (\w*), (\w*)\)/gi,
                        `BlzFrameSetPoint(\$1, \$2, OWNERvar, \$2, \$3, \$4)`
                    )
                } else if (lang === 'ts') {
                    textEdit = textEdit.replace(/setAbsPoint\((\w*), (\w*), (\w*)\)/gi, `setPoint($1, OWNERvar, $1, $2, $3)`)
                }
                const par = parent.custom
                textEdit = textEdit.replace(/TOPLEFTXvar/gi, `${(el.custom.getLeftX() - par.getLeftX()).toFixed(5)}`)
                textEdit = textEdit.replace(/TOPLEFTYvar/gi, `${(el.custom.getBotY() + el.custom.getHeight() - (par.getBotY() + par.getHeight())).toFixed(5)}`)
                textEdit = textEdit.replace(/BOTRIGHTXvar/gi, `${(el.custom.getLeftX() + el.custom.getWidth() - (par.getLeftX() + par.getWidth())).toFixed(5)}`)
                textEdit = textEdit.replace(/BOTRIGHTYvar/gi, `${(el.custom.getBotY() - par.getBotY()).toFixed(5)}`)
            }

            if (el) {
                if (parent) {
                    if (lang == 'jass' || lang == 'lua') {
                        if (parent.getName().indexOf('[0') >= 0) {
                            textEdit = textEdit.replace(
                                /OWNERvar/gi,
                                parent.getName() == 'Origin' ? 'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : parent.getName().replace('[0', '[')
                            )
                        } else {
                            textEdit = textEdit.replace(
                                /OWNERvar/gi,
                                parent.getName() == 'Origin' ? 'BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)' : parent.getName()
                            )
                        }
                    } else if (lang == 'ts') {
                        if (parent.getName().indexOf('[0') >= 0)
                            textEdit = textEdit.replace(
                                /OWNERvar/gi,
                                parent.getName() == 'Origin' ? 'Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0)' : 'this.' + parent.getName().replace('[0', '[')
                            )
                        else
                            textEdit = textEdit.replace(
                                /OWNERvar/gi,
                                parent.getName() == 'Origin' ? 'Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0)' : 'this.' + parent.getName()
                            )
                    } else if (lang == 'wurst') {
                        if (parent.getName().indexOf('[0') >= 0)
                            textEdit = textEdit.replace(/OWNERvar/gi, parent.getName() == 'Origin' ? 'GAME_UI' : parent.getName().replace('[0', '['))
                        else textEdit = textEdit.replace(/OWNERvar/gi, parent.getName() == 'Origin' ? 'GAME_UI' : parent.getName())
                    }
                }
            }
            if (el.world_frame) {
                textEdit = textEdit.replace('ORIGIN_FRAME_GAME_UI', 'ORIGIN_FRAME_WORLD_FRAME')
                textEdit = textEdit.replace('GAME_UI', 'WORLD_UI')
            }

            if (ProjectTree.OriginMode == 'worldframe') {
                textEdit = textEdit.replace(/ORIGIN_FRAME_GAME_UI/gi, 'ORIGIN_FRAME_WORLD_FRAME')
                textEdit = textEdit.replace(/GAME_UI/gi, 'WORLD_UI')
            } else if (ProjectTree.OriginMode == 'consoleui') {
                // Lua + Jass
                textEdit = textEdit.replace(/BlzGetOriginFrame\(ORIGIN_FRAME_GAME_UI, 0\)/gi, 'BlzGetFrameByName("ConsoleUIBackdrop", 0)')
                textEdit = textEdit.replace(/BlzGetOriginFrame\(ORIGIN_FRAME_WORLD_FRAME, 0\)/gi, 'BlzGetFrameByName("ConsoleUIBackdrop", 0)')

                // Typescript
                textEdit = textEdit.replace(/Frame.fromOrigin\(ORIGIN_FRAME_GAME_UI, 0\)/gi, 'Frame.fromName("ConsoleUIBackdrop",0)')
                textEdit = textEdit.replace(/Frame.fromOrigin\(ORIGIN_FRAME_WORLD_FRAME, 0\)/gi, 'Frame.fromName("ConsoleUIBackdrop",0)')

                // Wurst
                textEdit = textEdit.replace(/GAME_UI/gi, 'getFrame("ConsoleUIBackdrop",0)')
                textEdit = textEdit.replace(/WORLD_UI/gi, 'getFrame("ConsoleUIBackdrop",0)')
            }

            textEdit = textEdit.replace(/TOPLEFTXvar/gi, `${el.custom.getLeftX().toFixed(6)}`)
            textEdit = textEdit.replace(/TOPLEFTYvar/gi, `${(el.custom.getBotY() + el.custom.getHeight()).toFixed(6)}`)
            textEdit = textEdit.replace(/BOTRIGHTXvar/gi, `${(el.custom.getLeftX() + el.custom.getWidth()).toFixed(6)}`)
            textEdit = textEdit.replace(/BOTRIGHTYvar/gi, `${el.custom.getBotY().toFixed(6)}`)

            textEdit = textEdit.replace(/PATHvar/gi, '"' + el.custom.getWc3Texture('normal') + '"')
            textEdit = textEdit.replace(/BACKvar/gi, '"' + el.custom.getWc3Texture('back') + '"')
            if (el.custom.getTrigVar() != '') textEdit = textEdit.replace('TRIGvar', '"' + el.custom.getTrigVar() + '"')
            // textEdit = textEdit.replace("TEXTvar",  '"' + el.custom.getText().replace(/\n/gi, "\\n") + '"');
            textEdit = textEdit.replace(/TEXTvar/gi, '"|cff' + el.custom.getColor().slice(1) + el.custom.getText().replace(/\n/gi, '\\n') + '|r"')
            textEdit = textEdit.replace(/FRscale/gi, `${((1 / 0.7) * el.custom.getScale() - 0.428).toFixed(3)}`) //y = 1/0.7 x - 0.428, where x is (app scale);

            let align_ver = 'TEXT_JUSTIFY_TOP'
            switch (el.custom.getVerAlign()) {
                case 'start':
                    align_ver = 'TEXT_JUSTIFY_TOP'
                    break
                case 'center':
                    align_ver = 'TEXT_JUSTIFY_CENTER'
                    break
                case 'flex-end':
                    align_ver = 'TEXT_JUSTIFY_BOTTOM'
                    break
            }
            textEdit = textEdit.replace('ALIGN_VER', align_ver)

            let align_hor = 'TEXT_JUSTIFY_LEFT'
            switch (el.custom.getHorAlign()) {
                case 'left':
                    align_hor = 'TEXT_JUSTIFY_LEFT'
                    break
                case 'center':
                    align_hor = 'TEXT_JUSTIFY_MIDDLE'
                    break
                case 'right':
                    align_hor = 'TEXT_JUSTIFY_RIGHT'
                    break
            }
            textEdit = textEdit.replace('ALIGN_HOR', align_hor)

            sumText += textEdit
        }
        return sumText
    } catch (e) {
        alert(e)
    }
}

function generalOptions(type: 'lua' | 'jass' | 'typescript' | 'wurst') {
    let sumText = ''
    if (type == 'jass') {
        if (ProjectTree.HideGameUI) sumText += JASS.HideGameUI
        if (ProjectTree.HideHeroBar) sumText += JASS.HideHeroBar
        if (ProjectTree.HideMiniMap) sumText += JASS.HideMiniMap
        if (ProjectTree.HideResources) sumText += JASS.HideResources
        if (ProjectTree.HideButtonBar) sumText += JASS.HideButtonBar
        if (ProjectTree.HidePortrait) sumText += JASS.HidePortrait
        if (ProjectTree.HideChat) sumText += JASS.HideChat
    } else if (type == 'lua' || type == 'typescript' || type == 'wurst') {
        if (ProjectTree.HideGameUI) sumText += LUA.HideGameUI
        if (ProjectTree.HideHeroBar) sumText += LUA.HideHeroBar
        if (ProjectTree.HideMiniMap) sumText += LUA.HideMiniMap
        if (ProjectTree.HideResources) sumText += LUA.HideResources
        if (ProjectTree.HideButtonBar) sumText += LUA.HideButtonBar
        if (ProjectTree.HidePortrait) sumText += LUA.HidePortrait
        if (ProjectTree.HideChat) sumText += LUA.HideChat
    }

    return sumText + '\n'
}

function JassGetTypeText(type: FrameType, functionality: boolean): string {
    switch (type) {
        case FrameType.BACKDROP:
            return JASS.backdrop

        case FrameType.BUTTON:
            if (functionality) return JASS.button + JASS.TriggerVariableFinalButton
            return JASS.button

        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return JASS.ScriptDialogButton + JASS.TriggerVariableFinalButton
            return JASS.ScriptDialogButton

        case FrameType.BROWSER_BUTTON:
            if (functionality) return JASS.BrowserButton + JASS.TriggerVariableFinalButton
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

        case FrameType.CHECKBOX:
            if (functionality) return JASS.QuestCheckBox + JASS.TriggerVariableCheckbox
            return JASS.QuestCheckBox

        case FrameType.INVIS_BUTTON:
            if (functionality) return JASS.InvisButton + JASS.TriggerVariableFinalButton
            return JASS.InvisButton

        case FrameType.TEXT_FRAME:
            return JASS.TextFrame

        case FrameType.HORIZONTAL_BAR:
            return JASS.HorizontalBar

        case FrameType.HOR_BAR_BACKGROUND:
            return JASS.HorizontalBarWiBackground

        case FrameType.HOR_BAR_TEXT:
            return JASS.HorizontalBarWiText

        case FrameType.HOR_BAR_BACKGROUND_TEXT:
            return JASS.HorizontalBarWiBackground_Text

        case FrameType.TEXTAREA:
            return JASS.TextArea

        case FrameType.EDITBOX:
            return JASS.EditBox
    }
    return ''
}

function LuaGetTypeText(type: FrameType, functionality: boolean): string {
    switch (type) {
        case FrameType.BACKDROP:
            return LUA.backdrop

        case FrameType.BUTTON:
            if (functionality) return LUA.button + LUA.TriggerVariableButton
            return LUA.button

        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return LUA.ScriptDialogButton + LUA.TriggerVariableButton
            return LUA.ScriptDialogButton

        case FrameType.BROWSER_BUTTON:
            if (functionality) return LUA.BrowserButton + LUA.TriggerVariableButton
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

        case FrameType.CHECKBOX:
            if (functionality) return LUA.QuestCheckBox + LUA.TriggerVariableCheckbox
            return LUA.QuestCheckBox

        case FrameType.INVIS_BUTTON:
            if (functionality) return LUA.InvisButton + LUA.TriggerVariableButton
            return LUA.InvisButton

        case FrameType.TEXT_FRAME:
            return LUA.TextFrame

        case FrameType.HORIZONTAL_BAR:
            return LUA.HorizontalBar

        case FrameType.HOR_BAR_BACKGROUND:
            return LUA.HorizontalBarWiBackground

        case FrameType.HOR_BAR_TEXT:
            return LUA.HorizontalBarWiText

        case FrameType.HOR_BAR_BACKGROUND_TEXT:
            return LUA.HorizontalBarWiBackground_Text

        case FrameType.TEXTAREA:
            return LUA.TextArea

        case FrameType.EDITBOX:
            return LUA.EditBox
    }
    return ''
}

function TypescriptGetTypeText(type: FrameType, functionality: boolean): string {
    switch (type) {
        case FrameType.BACKDROP:
            return Typescript.backdrop

        case FrameType.BUTTON:
            if (functionality) return Typescript.button + Typescript.ButtonTriggerSetup
            return Typescript.button

        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return Typescript.ScriptDialogButton + Typescript.ButtonTriggerSetup
            return Typescript.ScriptDialogButton

        case FrameType.BROWSER_BUTTON:
            if (functionality) return Typescript.BrowserButton + Typescript.ButtonTriggerSetup
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

        case FrameType.CHECKBOX:
            if (functionality) return Typescript.QuestCheckBox + Typescript.TriggerVariableCheckbox
            return Typescript.QuestCheckBox

        case FrameType.INVIS_BUTTON:
            if (functionality) return Typescript.InvisButton + Typescript.ButtonTriggerSetup
            return Typescript.InvisButton

        case FrameType.TEXT_FRAME:
            return Typescript.TextFrame

        case FrameType.HORIZONTAL_BAR:
            return Typescript.HorizontalBar

        case FrameType.HOR_BAR_BACKGROUND:
            return Typescript.HorizontalBarWiBackground

        case FrameType.HOR_BAR_TEXT:
            return Typescript.HorizontalBarWiText

        case FrameType.HOR_BAR_BACKGROUND_TEXT:
            return Typescript.HorizontalBarWiBackground_Text

        case FrameType.TEXTAREA:
            return Typescript.TextArea

        case FrameType.EDITBOX:
            return Typescript.EditBox
    }
    return ''
}

function WurstGetTypeText(type: FrameType, functionality: boolean): string {
    switch (type) {
        case FrameType.BACKDROP:
            return Wurst.backdrop

        case FrameType.BUTTON:
            if (functionality) return Wurst.button + Wurst.ButtonTriggerSetup
            return Wurst.button

        case FrameType.SCRIPT_DIALOG_BUTTON:
            if (functionality) return Wurst.ScriptDialogButton + Wurst.ButtonTriggerSetup
            return Wurst.ScriptDialogButton

        case FrameType.BROWSER_BUTTON:
            if (functionality) return Wurst.BrowserButton + Wurst.ButtonTriggerSetup
            return Wurst.BrowserButton

        case FrameType.CHECKLIST_BOX:
            return Wurst.CheckListBox

        case FrameType.ESC_MENU_BACKDROP:
            return Wurst.EscMenuBackdrop

        case FrameType.OPTIONS_POPUP_MENU_BACKDROP_TEMPLATE:
            return Wurst.OptionsPopupMenuBackdropTemplate

        case FrameType.QUEST_BUTTON_BASE_TEMPLATE:
            return Wurst.QuestButtonBaseTemplate

        case FrameType.QUEST_BUTTON_DISABLED_BACKDROP_TEMPLATE:
            return Wurst.QuestButtonDisabledBackdropTemplate

        case FrameType.QUEST_BUTTON_PUSHED_BACKDROP_TEMPLATE:
            return Wurst.QuestButtonPushedBackdropTemplate

        case FrameType.CHECKBOX:
            if (functionality) return Wurst.QuestCheckBox + Wurst.TriggerVariableCheckbox
            return Wurst.QuestCheckBox

        case FrameType.INVIS_BUTTON:
            if (functionality) return Wurst.InvisButton + Wurst.ButtonTriggerSetup
            return Wurst.InvisButton

        case FrameType.TEXT_FRAME:
            return Wurst.TextFrame

        case FrameType.HORIZONTAL_BAR:
            return Wurst.HorizontalBar

        case FrameType.HOR_BAR_BACKGROUND:
            return Wurst.HorizontalBarWiBackground

        case FrameType.HOR_BAR_TEXT:
            return Wurst.HorizontalBarWiText

        case FrameType.HOR_BAR_BACKGROUND_TEXT:
            return Wurst.HorizontalBarWiBackground_Text

        case FrameType.TEXTAREA:
            return Wurst.TextArea

        case FrameType.EDITBOX:
            return Wurst.EditBox
    }
    return ''
}
