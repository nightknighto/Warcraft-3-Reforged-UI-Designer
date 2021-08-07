/* eslint-disable @typescript-eslint/no-namespace */
//FRvar to skip array renaming, FRvrr to include array renaming
//mainly used for stuff like FRvrrFunc, basically name being followed by a suffix

export namespace JASS {
    export const globals = "globals \n"

    export const declares = "framehandle FRvar = null \n"
    export const declaresArray = "framehandle array FRvar\n"
    export const declaresBUTTON = "framehandle FRvar = null \n framehandle BackdropFRvar = null \n"
    export const declaresBUTTONArray = "framehandle array FRvar \n framehandle array BackdropFRvar \n"

    export const declaresFUNCTIONALITY = "trigger TriggerFRvar = null \n"
    export const declaresFUNCTIONALITYArray = "trigger array TriggerFRvar \n"

    export const endglobals = "endglobals \n \n"

    export const library = "library FRlib initializer init \n"
    export const libraryInit = "private function init takes nothing returns nothing \n"
    export const TriggerButtonDisableStart = 'function FRvrrFunc takes nothing returns nothing \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetEnable(FRvar, true) \n'
    export const TriggerVariableInit = 'set TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n'
    export const TriggerButtonDisableEnd = 'endfunction \n \n'

    export const backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'

    export const button = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set BackdropFRvar = BlzCreateFrameByType("BACKDROP", "BackdropFRvar", FRvar, "", 1) \n call BlzFrameSetAllPoints(BackdropFRvar, FRvar) \n call BlzFrameSetTexture(BackdropFRvar, PATHvar, 0, true) \n'

    export const ScriptDialogButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \n '
    export const BrowserButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \n'
    export const CheckListBox = 'set FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const EscMenuBackdrop = 'set FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const OptionsPopupMenuBackdropTemplate = 'set FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonBaseTemplate = 'set FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonDisabledBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonPushedBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestCheckBox = 'set FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const InvisButton = 'set FRvar = BlzCreateFrameByType("GLUEBUTTON", "name", OWNERvar, "",0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const TextFrame = `set FRvar = BlzCreateFrameByType("TEXT", "name", OWNERvar, "", 0) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetText(FRvar, TEXTvar) \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetScale(FRvar, FRscale) \n`

    export const TriggerVariableFinal = 'set TriggerFRvar = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \n call TriggerAddAction(TriggerFRvar, function FRvrrFunc) \n'

    export const endlibrary = "endfunction \nendlibrary\n"


    export const HideGameUI = 'call BlzHideOriginFrames(true) \ncall BlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    export const HideHeroBar = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    export const HideMiniMap = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    export const HideResources = 'call BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    export const HideButtonBar = 'call BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    export const HidePortrait = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    export const HideChat = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'
}

 


export namespace LUA {
    export const globals = ""

    export const declares = "FRvar = nil \n"
    export const declaresArray = "FRvar = {} \n"
    export const declaresBUTTON = "FRvar = nil \nBackdropFRvar = nil \n"
    export const declaresBUTTONArray = "FRvar = {} \nBackdropFRvar = {} \n"

    export const declaresFUNCTIONALITY = "TriggerFRvar = nil \n"
    export const declaresFUNCTIONALITYArray = "TriggerFRvar = {} \n"

    export const endglobals = ""

    export const library = "FRlib = {}\n"
    export const libraryInit = "FRlib.Initialize = function()\n"
    export const TriggerButtonDisableStart = 'FRlib.FRvrrFunc = function() \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetEnable(FRvar, true) \n'
    export const TriggerVariableInit = "globals.TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n"
    export const TriggerButtonDisableEnd = 'end \n \n'

    export const backdrop = 'FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'

    export const button = 'FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBackdropFRvar = BlzCreateFrameByType("BACKDROP", "BackdropFRvar", FRvar, "", 1) \nBlzFrameSetAllPoints(BackdropFRvar, FRvar) \nBlzFrameSetTexture(BackdropFRvar, PATHvar, 0, true) \n'

    export const ScriptDialogButton = 'FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \n '
    export const BrowserButton = 'FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \n'
    export const CheckListBox = 'FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const EscMenuBackdrop = 'FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const OptionsPopupMenuBackdropTemplate = 'FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonBaseTemplate = 'FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonDisabledBackdropTemplate = 'FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonPushedBackdropTemplate = 'FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestCheckBox = 'FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const InvisButton = 'FRvar = BlzCreateFrameByType("GLUEBUTTON", "name", OWNERvar, "",0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const TextFrame = `FRvar = BlzCreateFrameByType("TEXT", "name", OWNERvar, "", 0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetScale(FRvar, FRscale) \n`


    export const TriggerVariableFinal = 'TriggerFRvar = CreateTrigger() \nBlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \nTriggerAddAction(TriggerFRvar, FRlib.FRvrrFunc) \n'

    export const endlibrary = "end\n"


    export const HideGameUI = 'BlzHideOriginFrames(true) \nBlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    export const HideHeroBar = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    export const HideMiniMap = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    export const HideResources = 'BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    export const HideButtonBar = 'BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    export const HidePortrait = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    export const HideChat = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'

}

 


export namespace Typescript {
    export const classDeclare = "export class FRlib {\n"

    export const globals = "\n"

    export const declares = "   FRvar: Frame\n"
    export const declaresArray = "   FRvar: Frame[] = []\n"
    export const declaresBUTTON = "   FRvar: Frame\n   BackdropFRvar: Frame \n"
    export const declaresBUTTONArray = "   FRvar: Frame[] = []\n   BackdropFRvar: Frame[] = [] \n"

    export const endglobals = "\n"

    export const constructorInit = "   constructor() {\n      let t: Trigger;\n\n"

    export const backdrop = 'this.FRvar = new Frame(" this.FRvar ", OWNERvar, 1, 1, "BACKDROP", "") \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.FRvar.setTexture(PATHvar, 0, true) \n'

    export const button = 'this.FRvar = new Frame("ScriptDialogButton", OWNERvar, 0, 0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.BackdropFRvar = new Frame(" this.BackdropFRvar ", this.FRvar, 1, 1, "BACKDROP", "") \nthis.BackdropFRvar.setAllPoints(this.FRvar) \nthis.BackdropFRvar.setTexture(PATHvar, 0, true) \n'

    export const ScriptDialogButton = 'this.FRvar = new Frame("ScriptDialogButton", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.FRvar.text = TEXTvar \n '
    export const BrowserButton = 'this.FRvar = new Frame("ScriptDialogButton", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.FRvar.text = TEXTvar \n'
    export const CheckListBox = 'this.FRvar = new Frame("CheckListBox", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const EscMenuBackdrop = 'this.FRvar = new Frame("EscMenuBackdrop", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const OptionsPopupMenuBackdropTemplate = 'this.FRvar = new Frame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonBaseTemplate = 'this.FRvar = new Frame("QuestButtonBaseTemplate", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonDisabledBackdropTemplate = 'this.FRvar = new Frame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonPushedBackdropTemplate = 'this.FRvar = new Frame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestCheckBox = 'this.FRvar = new Frame("QuestCheckBox", OWNERvar,0,0) \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const InvisButton = 'this.FRvar = new Frame("FRvar", OWNERvar, 0,0, "GLUEBUTTON", "") \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const TextFrame = `this.FRvar = new Frame("FRvar", OWNERvar, 0,0, "TEXT", "") \nthis.FRvar.setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nthis.FRvar.setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.FRvar.text = TEXTvar \nthis.FRvar.enabled = false \nthis.FRvar.setScale(FRscale) \n`


    export const ButtonTriggerSetup = 't = new Trigger() \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CONTROL_CLICK) \nt.addAction( () => {\nthis.FRvar.enabled = false \nthis.FRvar.enabled = true \n})\n'

    export const endconstructor_library = "}\n\n}\n"
}