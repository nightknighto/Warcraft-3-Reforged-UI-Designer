/* eslint-disable @typescript-eslint/no-namespace */
export namespace JASS{
    export const globals = "globals \n"

    export const declares = "framehandle FRvar = null \n"
    export const declaresBUTTON = "framehandle FRvar = null \n framehandle FRvarBackdrop = null \n"

    export const declaresFUNCTIONALITY = "trigger FRvarTrigger = null \n"

    export const endglobals = "endglobals \n \n"

    export const library = "library FRlib initializer init \n"
    export const libraryInit = "private function init takes nothing returns nothing \n"
    export const TriggerButtonDisableStart = 'function FRvarFunc takes nothing returns nothing \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetEnable(FRvar, true) \n'
    export const TriggerVariableInit = 'set TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n'
    export const TriggerButtonDisableEnd = 'endfunction \n \n'

    export const backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'
    
    export const button = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set FRvarBackdrop = BlzCreateFrameByType("BACKDROP", "FRvarBackdrop", FRvar, "", 1) \n call BlzFrameSetAllPoints(FRvarBackdrop, FRvar) \n call BlzFrameSetTexture(FRvarBackdrop, PATHvar, 0, true) \n'
    
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

    export const TriggerVariableFinal = 'set FRvarTrigger = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(FRvarTrigger, FRvar, FRAMEEVENT_CONTROL_CLICK) \n call TriggerAddAction(FRvarTrigger, function FRvarFunc) \n'

    export const endlibrary = "endfunction \nendlibrary\n"


    export const HideGameUI = 'call BlzHideOriginFrames(true) \ncall BlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    export const HideHeroBar = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    export const HideMiniMap = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
}

export namespace LUA{
    export const globals = ""

    export const declares = "FRvar = nil \n"
    export const declaresBUTTON = "FRvar = nil \nFRvarBackdrop = nil \n"

    export const declaresFUNCTIONALITY = "FRvarTrigger = nil \n"

    export const endglobals = ""

    export const library = "FRlib = {}\n"
    export const libraryInit = "FRlib.Initialize = function()\n"
    export const TriggerButtonDisableStart = 'FRlib.FRvarFunc = function() \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetEnable(FRvar, true) \n'
    export const TriggerVariableInit = "globals.TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n"
    export const TriggerButtonDisableEnd = 'end \n \n'

    export const backdrop = 'FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'
    
    export const button = 'FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nFRvarBackdrop = BlzCreateFrameByType("BACKDROP", "FRvarBackdrop", FRvar, "", 1) \nBlzFrameAllPoints(FRvarBackdrop, FRvar) \nBlzFrameSetTexture(FRvarBackdrop, PATHvar, 0, true) \n'
    
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


    export const TriggerVariableFinal = 'FRvarTrigger = CreateTrigger() \nBlzTriggerRegisterFrameEvent(FRvarTrigger, FRvar, FRAMEEVENT_CONTROL_CLICK) \nTriggerAddAction(FRvarTrigger, FRlib.FRvarFunc) \n'

    export const endlibrary = "end\n"


    export const HideGameUI = 'BlzHideOriginFrames(true) \nBlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    export const HideHeroBar = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    export const HideMiniMap = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
}
