/* eslint-disable @typescript-eslint/no-namespace */
//FRvar to skip array renaming, FRvrr to include array renaming
//mainly used for stuff like FRvrrFunc, basically name being followed by a suffix

export abstract class I_Templates {
    static ScriptDialogButton: string
    static BrowserButton: string
    static CheckListBox: string
    static EscMenuBackdrop: string
    static OptionsPopupMenuBackdropTemplate: string
    static QuestButtonBaseTemplate: string
    static QuestButtonDisabledBackdropTemplate: string
    static QuestButtonPushedBackdropTemplate: string
    static QuestCheckBox: string
    static InvisButton: string
    static TextFrame: string
    static HorizontalBar: string
    static HorizontalBarWiBackground: string
    static HorizontalBarWiText: string
    static HorizontalBarWiBackground_Text: string
    static TextArea: string
    static EditBox: string
}

export class JASS implements I_Templates {
    static globals = "globals \n"

    static declares = "framehandle FRvar = null \n"
    // static declaresArray = "framehandle array FRvar\n"
    static declaresWiTooltip = "framehandle FRvar = null \nframehandle TooltipFRvar = null \n"
    // static declaresArrayWiTooltip = "framehandle array FRvar \nframehandle array TooltipFRvar \n"
    static declaresBUTTON = "framehandle FRvar = null \n framehandle BackdropFRvar = null \n"
    // static declaresBUTTONArray = "framehandle array FRvar \n framehandle array BackdropFRvar \n"
    static declaresHorBarBack = "framehandle FRvar = null \nframehandle BackFRvar = null \n"
    static declaresHorBarText = "framehandle FRvar = null \nframehandle TextFRvar = null \n"
    static declaresHorBarBack_Text = "framehandle FRvar = null \nframehandle BackFRvar = null \nframehandle TextFRvar = null \n"

    static declaresFUNCTIONALITY = "trigger TriggerFRvar = null \n"
    // static declaresFUNCTIONALITYArray = "trigger array TriggerFRvar \n"

    static declaresFUNCTIONALITYcheckbox = "trigger TriggerChFRvar = null \n"
    // static declaresFUNCTIONALITYArraycheckbox = "trigger array TriggerChFRvar \n"

    static endglobals = "endglobals \n \n"

    static library = "library FRlib initializer init \n"
    static libraryInit = "private function init takes nothing returns nothing \n"

    static TriggerButtonDisableStart = 'function FRvrrFunc takes nothing returns nothing \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetEnable(FRvar, true) \n'
    static TriggerVariableInit = 'set TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n'
    static TriggerButtonDisableEnd = 'endfunction \n \n'

    static TriggerCheckboxStart = 'function FRvrrChFunc takes nothing returns nothing \n'
    static TriggerCheckboxTrig = 'if BlzGetTriggerFrameEvent() == FRAMEEVENT_CHECKBOX_CHECKED then\nset TRIGvar = 2\nelse \nset TRIGvar = 1\nendif\n'
    static TriggerCheckboxEnd = 'endfunction \n \n'

    static backdrop = '\nset FRvar = BlzCreateFrameByType("BACKDROP", "FRvar", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'

    static button = '\nset FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set BackdropFRvar = BlzCreateFrameByType("BACKDROP", "BackdropFRvar", FRvar, "", 1) \n call BlzFrameSetAllPoints(BackdropFRvar, FRvar) \n call BlzFrameSetTexture(BackdropFRvar, PATHvar, 0, true) \n'

    static ScriptDialogButton = '\nset FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \ncall BlzFrameSetScale(FRvar, FRscale) \n '
    static BrowserButton = '\nset FRvar = BlzCreateFrame("BrowserButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \ncall BlzFrameSetScale(FRvar, FRscale) \n'
    static CheckListBox = '\nset FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static EscMenuBackdrop = '\nset FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static OptionsPopupMenuBackdropTemplate = '\nset FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonBaseTemplate = '\nset FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonDisabledBackdropTemplate = '\nset FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonPushedBackdropTemplate = '\nset FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestCheckBox = '\nset FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static InvisButton = '\nset FRvar = BlzCreateFrameByType("GLUEBUTTON", "name", OWNERvar, "",0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static TextFrame = `\nset FRvar = BlzCreateFrameByType("TEXT", "name", OWNERvar, "", 0) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetText(FRvar, TEXTvar) \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetScale(FRvar, FRscale) \ncall BlzFrameSetTextAlignment(FRvar, ALIGN_VER, ALIGN_HOR) \n`
    static HorizontalBar = '\nset FRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", OWNERvar, "", 0) \ncall BlzFrameSetTexture(FRvar, PATHvar, 0, true) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetValue(FRvar, 100) \n'
    static HorizontalBarWiBackground = '\nset BackFRvar = BlzCreateFrameByType("BACKDROP", "BackFRvar", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 1) \n call BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(BackFRvar, BACKvar, 0, true) \nset FRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BackFRvar, "", 0) \ncall BlzFrameSetTexture(FRvar, PATHvar, 0, true) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetValue(FRvar, 50) \n'
    static HorizontalBarWiText = '\nset FRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 0) \ncall BlzFrameSetTexture(FRvar, PATHvar, 0, true) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetValue(FRvar, 100) \nset TextFRvar = BlzCreateFrameByType("TEXT", "name", BlzGetOriginFrame( ORIGIN_FRAME_GAME_UI, 0), "", 0) \ncall BlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetText(TextFRvar, TEXTvar) \ncall BlzFrameSetEnable(TextFRvar, false) \ncall BlzFrameSetScale(TextFRvar, FRscale) \ncall BlzFrameSetTextAlignment(TextFRvar, ALIGN_VER, ALIGN_HOR) \n'
    static HorizontalBarWiBackground_Text = '\nset BackFRvar = BlzCreateFrameByType("BACKDROP", "BackFRvar", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 1) \n call BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(BackFRvar, BACKvar, 0, true) \nset FRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BackFRvar, "", 0) \ncall BlzFrameSetTexture(FRvar, PATHvar, 0, true) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetValue(FRvar, 100) \nset TextFRvar = BlzCreateFrameByType("TEXT", "name", BlzGetOriginFrame( ORIGIN_FRAME_GAME_UI, 0), "", 0) \ncall BlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \ncall BlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \ncall BlzFrameSetText(TextFRvar, TEXTvar) \ncall BlzFrameSetEnable(TextFRvar, false) \ncall BlzFrameSetScale(TextFRvar, FRscale) \ncall BlzFrameSetTextAlignment(TextFRvar, ALIGN_VER, ALIGN_HOR) \n'
    static TextArea = `\nset FRvar = BlzCreateFrameByType("TEXTAREA", "name", OWNERvar, "EscMenuTextAreaTemplate", 0)\n  call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n    call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  call BlzFrameSetText(FRvar, TEXTvar)\n`
    static EditBox = '\nset FRvar = BlzCreateFrame("EscMenuEditBoxTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetText(FRvar, TEXTvar) \n'


    static TooltipOwnerButton = `call BlzFrameSetTooltip(OWNERvar, FRvar) \n`
    static TooltipOwnerOther = `set TooltipFRvar = BlzCreateFrameByType("FRAME", "", OWNERvar,"", 0) \ncall BlzFrameSetAllPoints(TooltipFRvar, OWNERvar) \ncall BlzFrameSetTooltip(TooltipFRvar, FRvar) \n`

    static TriggerVariableFinalButton = 'set TriggerFRvar = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \n call TriggerAddAction(TriggerFRvar, function FRvrrFunc) \n'
    static TriggerVariableCheckbox = 'set TriggerChFRvar = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \ncall BlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \n call TriggerAddAction(TriggerChFRvar, function FRvrrChFunc) \n'

    static endlibrary = "endfunction \nendlibrary\n"


    static HideGameUI = 'call BlzHideOriginFrames(true) \ncall BlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    static HideHeroBar = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    static HideMiniMap = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    static HideResources = 'call BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    static HideButtonBar = 'call BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    static HidePortrait = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    static HideChat = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'
    static LoadTOC = 'call BlzLoadTOCFile("name.toc")'
}

 


export class LUA implements I_Templates {
    static globals = ""

    static declares = "FRvar = nil \n"
    static declaresWiTooltip = "FRvar = nil \n"
    // static declaresArray = "FRvar = {} \n"
    // static declaresArrayWiTooltip = "FRvar = {} \n"
    static declaresBUTTON = "FRvar = nil \nBackdropFRvar = nil \n"
    // static declaresBUTTONArray = "FRvar = {} \nBackdropFRvar = {} \n"
    static declaresHorBarBack = "FRvar = nil \nBackFRvar = nil \n"
    static declaresHorBarText = "FRvar = nil \nTextFRvar = nil \n"
    static declaresHorBarBack_Text = "FRvar = nil \nBackFRvar = nil \nTextFRvar = nil \n"

    static declaresFUNCTIONALITY = "TriggerFRvar = nil \n"
    // static declaresFUNCTIONALITYArray = "TriggerFRvar = {} \n"
    
    static endglobals = ""

    static library = "FRlib = {}\n"
    static libraryInit = "FRlib.Initialize = function()\n"
    static TriggerButtonDisableStart = 'FRlib.FRvrrFunc = function() \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetEnable(FRvar, true) \n'
    static TriggerVariableInit = "globals.TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n"
    static TriggerButtonDisableEnd = 'end \n \n'
    
    static backdrop = '\nFRvar = BlzCreateFrameByType("BACKDROP", "FRvar", OWNERvar, "", 1) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \n'

    static button = '\nFRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBackdropFRvar = BlzCreateFrameByType("BACKDROP", "BackdropFRvar", FRvar, "", 1) \nBlzFrameSetAllPoints(BackdropFRvar, FRvar) \nBlzFrameSetTexture(BackdropFRvar, PATHvar, 0, true) \n'

    static ScriptDialogButton = '\nFRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \nBlzFrameSetScale(FRvar, FRscale) \n '
    static BrowserButton = '\nFRvar = BlzCreateFrame("BrowserButton", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \nBlzFrameSetScale(FRvar, FRscale) \n'
    static CheckListBox = '\nFRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static EscMenuBackdrop = '\nFRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static OptionsPopupMenuBackdropTemplate = '\nFRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonBaseTemplate = '\nFRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonDisabledBackdropTemplate = '\nFRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonPushedBackdropTemplate = '\nFRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestCheckBox = '\nFRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static InvisButton = '\nFRvar = BlzCreateFrameByType("GLUEBUTTON", "name", OWNERvar, "",0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static TextFrame = `\nFRvar = BlzCreateFrameByType("TEXT", "name", OWNERvar, "", 0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetScale(FRvar, FRscale) \nBlzFrameSetTextAlignment(FRvar, ALIGN_VER, ALIGN_HOR) \n`
    static HorizontalBar = '\nFRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", OWNERvar, "", 0) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetValue(FRvar, 100) \n'
    static HorizontalBarWiBackground = '\nBackFRvar = BlzCreateFrameByType("BACKDROP", "BackFRvar", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 1) \n BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n BlzFrameSetTexture(BackFRvar, BACKvar, 0, true) \nFRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BackFRvar, "", 0) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetValue(FRvar, 50) \n'
    static HorizontalBarWiText = '\nFRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 0) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetValue(FRvar, 100) \nTextFRvar = BlzCreateFrameByType("TEXT", "name", BlzGetOriginFrame( ORIGIN_FRAME_GAME_UI, 0), "", 0) \nBlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(TextFRvar, TEXTvar) \nBlzFrameSetEnable(TextFRvar, false) \nBlzFrameSetScale(TextFRvar, FRscale) \nBlzFrameSetTextAlignment(TextFRvar, ALIGN_VER, ALIGN_HOR) \n'
    static HorizontalBarWiBackground_Text = '\nBackFRvar = BlzCreateFrameByType("BACKDROP", "BackFRvar", BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), "", 1) \n BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n BlzFrameSetAbsPoint(BackFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n BlzFrameSetTexture(BackFRvar, BACKvar, 0, true) \nFRvar = BlzCreateFrameByType("SIMPLESTATUSBAR", "", BackFRvar, "", 0) \nBlzFrameSetTexture(FRvar, PATHvar, 0, true) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetValue(FRvar, 100) \nTextFRvar = BlzCreateFrameByType("TEXT", "name", BlzGetOriginFrame( ORIGIN_FRAME_GAME_UI, 0), "", 0) \nBlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(TextFRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(TextFRvar, TEXTvar) \nBlzFrameSetEnable(TextFRvar, false) \nBlzFrameSetScale(TextFRvar, FRscale) \nBlzFrameSetTextAlignment(TextFRvar, ALIGN_VER, ALIGN_HOR) \n'
    static TextArea = `FRvar = BlzCreateFrameByType("TEXTAREA", "name", OWNERvar, "EscMenuTextAreaTemplate", 0)\n   BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n    BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n   BlzFrameSetText(FRvar, TEXTvar)\n`
    static EditBox = '\nFRvar = BlzCreateFrame("EscMenuEditBoxTemplate", OWNERvar,0,0) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \nBlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nBlzFrameSetText(FRvar, TEXTvar) \n'



    static TooltipOwnerButton = `BlzFrameSetTooltip(OWNERvar, FRvar) \n`
    static TooltipOwnerOther = `TooltipFRvar = BlzCreateFrameByType("FRAME", "", OWNERvar,"", 0) \nBlzFrameSetAllPoints(TooltipFRvar, OWNERvar) \nBlzFrameSetTooltip(TooltipFRvar, FRvar) \n`

    static TriggerVariableButton = 'TriggerFRvar = CreateTrigger() \nBlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \nTriggerAddAction(TriggerFRvar, FRlib.FRvrrFunc) \n'
    static TriggerVariableCheckbox = 'TriggerChFRvar = CreateTrigger() \nBlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \nBlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \nTriggerAddAction(TriggerChFRvar, function() \nif BlzGetTriggerFrameEvent() == FRAMEEVENT_CHECKBOX_CHECKED then\nTRIGvar = 2\nelse \nTRIGvar = 1\nend\nend) \n \n'

    static endlibrary = "end\n"


    static HideGameUI = 'BlzHideOriginFrames(true) \nBlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    static HideHeroBar = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n';
    static HideMiniMap = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    static HideResources = 'BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    static HideButtonBar = 'BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    static HidePortrait = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    static HideChat = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'
    static LoadTOC = 'BlzLoadTOCFile("name.toc")'

}

 




export class Typescript implements I_Templates {
    static classDeclare =
      'export class FRlib {\n\n'
  
    static globals = '\n'
  
    static declares = '   FRvar: Frame\n'
    // static declaresArray = "   FRvar: Frame[] = []\n"
    static declaresBUTTON = '   FRvar: Frame\n   BackdropFRvar: Frame \n'
    // static declaresBUTTONArray = "   FRvar: Frame[] = []\n   BackdropFRvar: Frame[] = [] \n"
    static declaresHorBarBack = 'FRvar: Frame \nFRvarBack: Frame \n'
    static declaresHorBarText = 'FRvar: Frame \nFRvarText: Frame \n'
    static declaresHorBarBack_Text = 'FRvar: Frame \nFRvarBack: Frame \nFRvarText: Frame \n'
  
    static endglobals = '\n'
  
    static constructorInit = '  constructor() {\n      let t: Trigger;\n\n'
  
    static backdrop =
      '\nthis.FRvar = new Frame("this.FRvar", OWNERvar, 1, 1, "BACKDROP", "") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setTexture(PATHvar, 0, true) \n'
  
    static button =
      '\nthis.FRvar = new Frame("ScriptDialogButton", OWNERvar, 0, 0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \nthis.BackdropFRvar = new Frame(" this.BackdropFRvar ", this.FRvar, 1, 1, "BACKDROP", "") \nthis.BackdropFRvar.setAllPoints(this.FRvar) \nthis.BackdropFRvar.setTexture(PATHvar, 0, true) \n'
  
    static ScriptDialogButton =
      '\nthis.FRvar = new Frame("ScriptDialogButton", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n  .setScale(FRscale) \n '
    static BrowserButton =
      '\nthis.FRvar = new Frame("BrowserButton", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n  .setScale(FRscale) \n'
    static CheckListBox =
      '\nthis.FRvar = new Frame("CheckListBox", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static EscMenuBackdrop =
      '\nthis.FRvar = new Frame("EscMenuBackdrop", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static OptionsPopupMenuBackdropTemplate =
      '\nthis.FRvar = new Frame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonBaseTemplate =
      '\nthis.FRvar = new Frame("QuestButtonBaseTemplate", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonDisabledBackdropTemplate =
      '\nthis.FRvar = new Frame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestButtonPushedBackdropTemplate =
      '\nthis.FRvar = new Frame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static QuestCheckBox =
      '\nthis.FRvar = new Frame("QuestCheckBox", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static InvisButton =
      '\nthis.FRvar = new Frame("FRvar", OWNERvar, 0,0, "GLUEBUTTON", "") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n'
    static TextFrame = `\nthis.FRvar = new Frame("FRvar", OWNERvar, 0,0, "TEXT", "") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n  .setEnabled(false) \n  .setScale(FRscale) \nBlzFrameSetTextAlignment(this.FRvar.handle, ALIGN_VER, ALIGN_HOR) \n`
    static HorizontalBar =
      '\nthis.FRvar = new Frame("FRvar", OWNERvar, 0,0, "SIMPLESTATUSBAR", "") \n  .setTexture(PATHvar, 0, true) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setValue(100) \n'
    static HorizontalBarWiBackground =
      '\nthis.FRvarBack = new Frame("this.FRvarBack", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 1, 1, "BACKDROP", "") \n   .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n   .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n   .setTexture(BACKvar, 0, true) \nthis.FRvar = new Frame("this.FRvar", this.FRvarBack, 1, 1, "SIMPLESTATUSBAR", "") \n  .setTexture(PATHvar, 0, true) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setValue(50) \n'
    static HorizontalBarWiText =
      '\nthis.FRvar = new Frame("FRvar", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0, "SIMPLESTATUSBAR", "") \n  .setTexture(PATHvar, 0, true) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setValue(100) \nthis.FRvarText = new Frame("name", Frame.fromOrigin( ORIGIN_FRAME_GAME_UI, 0), 0, 0, "TEXT", "") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n  .setEnabled(false) \n  .setScale(FRscale) \nBlzFrameSetTextAlignment(this.FRvarText.handle, ALIGN_VER, ALIGN_HOR) \n'
    static HorizontalBarWiBackground_Text =
      '\nthis.FRvarBack = new Frame("this.FRvarBack", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 1, 1, "BACKDROP", "") \n   .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n   .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n   .setTexture(BACKvar, 0, true) \nthis.FRvar = new Frame("this.FRvar", this.FRvarBack, 1, 1, "SIMPLESTATUSBAR", "") \n  .setTexture(PATHvar, 0, true) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setValue(50) \nthis.FRvarText = new Frame("name", Frame.fromOrigin( ORIGIN_FRAME_GAME_UI, 0), 0, 0, "TEXT", "") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n  .setEnabled(false) \n  .setScale(FRscale) \nBlzFrameSetTextAlignment(this.FRvarText.handle, ALIGN_VER, ALIGN_HOR) \n'
    static TextArea = `\nthis.FRvar = new Frame("FRvar", OWNERvar, 0,0, "TEXTAREA", "EscMenuTextAreaTemplate") \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar) \n`
    static EditBox =
      '\nthis.FRvar = new Frame("EscMenuEditBoxTemplate", OWNERvar,0,0) \n  .setAbsPoint(FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n  .setAbsPoint(FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n  .setText(TEXTvar)\n'
  
    static TooltipOwnerButton = `OWNERvar.setTooltip(this.FRvar) \n`
    static TooltipOwnerOther = `const TooltipFRvar = new Frame("this.FRvar", OWNERvar, 1, 1, "FRAME", "") \nTooltipFRvar.setAllPoints(OWNERvar) \nTooltipFRvar.setTooltip(this.FRvar) \n`
  
    static ButtonTriggerSetup =
      't = new Trigger() \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CONTROL_CLICK) \nt.addAction( () => {\nthis.FRvar.enabled = false \nthis.FRvar.enabled = true \n})\n'
    static TriggerVariableCheckbox =
      't = new Trigger() \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \nt.addAction( () => {\nif(BlzGetTriggerFrameEvent() == FRAMEEVENT_CHECKBOX_CHECKED) {\n//actions\n} else {\n//actions\n}\n})\n'
  
    static endconstructor_library = '}\n\n}\n'
  }
  
  