/* eslint-disable @typescript-eslint/no-namespace */
export namespace JASS{
    export const globals = "globals \n"

    export const declares = "framehandle FRvar = null \n"
    export const declaresBUTTON = "framehandle FRvar = null \n framehandle FRvarBackdrop = null \n"

    export const declaresFUNCTIONALITY = "trigger FRvarTrigger = null \n"

    export const endglobals = "endglobals \n \n"

    export const library = "library REFORGEDUIMAKER initializer init \n"
    export const libraryInit = "private function init takes nothing returns nothing \n"
    export const TriggerVariableInit = 'function FRvarFunc takes nothing returns nothing \n set TRIGvar = 1 \n endfunction \n \n'

    export const backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'
    
    export const button = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set FRvarBackdrop = BlzCreateFrameByType("BACKDROP", "FRvarBackdrop", FRvar, "", 1) \n call BlzFrameSetAllPoints(FRvarBackdrop, FRvar) \n call BlzFrameSetTexture(FRvarBackdrop, PATHvar, 0, true) \n set FRvarTrigger = CreateTrigger() \n'
    
    export const ScriptDialogButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \n '
    export const BrowserButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \n'
    export const CheckListBox = 'set FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const EscMenuBackdrop = 'set FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const OptionsPopupMenuBackdropTemplate = 'set FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonBaseTemplate = 'set FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonDisabledBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestButtonPushedBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    export const QuestCheckBox = 'set FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'

    export const TriggerVariableFinal = 'set FRvarTrigger = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(FRvarTrigger, FRvar, FRAMEEVENT_CONTROL_CLICK) \n call TriggerAddAction(FRvarTrigger, function FRvarFunc) \n'

    export const endlibrary = "endfunction \n endlibrary \n"
}
