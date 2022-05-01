import { FrameMLText } from './FrameMLText'

// FRvar to skip array renaming, FRvrr to include array renaming
// mainly used for stuff like FRvrrFunc, basically name being followed by a suffix

///////////////////////////
// Specify Global Frames //
///////////////////////////

// Origin Frames
const OriginWorld = FrameMLText.fromOrigin('ORIGIN_FRAME_WORLD_FRAME')
const OriginGameUI = FrameMLText.fromOrigin('ORIGIN_FRAME_GAME_UI')
// const OriginHeroBar = FrameMLText.fromOrigin('ORIGIN_FRAME_HERO_BAR')
// const OriginMinimap = FrameMLText.fromOrigin('ORIGIN_FRAME_MINIMAP')
// const OriginPortrait = FrameMLText.fromOrigin('ORIGIN_FRAME_PORTRAIT')
// const OriginChatMsg = FrameMLText.fromOrigin('ORIGIN_FRAME_CHAT_MSG')

// Frames from Names
// const FrameConsoleUIBackdrop = FrameMLText.fromName('ConsoleUIBackdrop')
// const FrameResourceBarFrame = FrameMLText.fromName('ResourceBarFrame')
// const FrameUpperButtonBarFrame = FrameMLText.fromName('UpperButtonBarFrame')

///////////////////////////
// Specify Custom Frames //
///////////////////////////

// Backdrop
const BackdropMLT = FrameMLText.newFrameByType('FRvar', 'BACKDROP', 'OWNERvar', 1, 1, 'BACKDROP', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setTexture('PATHvar', 0, true)

// Button + Backdrop
const Button1MLT = FrameMLText.newFrame('FRvar', 'IconButtonTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
const Button2MLT = FrameMLText.newFrameByType('BackdropFRvar', 'BackdropFRvar', Button1MLT, 0, 0, 'BACKDROP', '')
    .setAllPoints(Button1MLT)
    .setTexture('PATHvar', 0, true)

// Dialog Button
const ScriptDialogButtonMLT = FrameMLText.newFrame('FRvar', 'ScriptDialogButton', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')
    .setScale('FRscale')

// Browser Button
const BrowserButtonMLT = FrameMLText.newFrame('FRvar', 'BrowserButton', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')
    .setScale('FRscale')

// Check List Box
const CheckListBoxMLT = FrameMLText.newFrame('FRvar', 'CheckListBox', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Esc Menu Backdrop
const EscMenuBackdropMLT = FrameMLText.newFrame('FRvar', 'EscMenuBackdrop', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Options Popup Menu Backdrop Template
const OptionsPopupMenuBackdropTemplateMLT = FrameMLText.newFrame('FRvar', 'OptionsPopupMenuBackdropTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Quest Button Base Backdrop Template
const QuestButtonBaseTemplateMLT = FrameMLText.newFrame('FRvar', 'QuestButtonBaseTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Quest Button Disabled Backdrop Template
const QuestButtonDisabledBackdropTemplateMLT = FrameMLText.newFrame('FRvar', 'QuestButtonDisabledBackdropTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Quest Button Pushed Backdrop Template
const QuestButtonPushedBackdropTemplateMLT = FrameMLText.newFrame('FRvar', 'QuestButtonPushedBackdropTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Quest Check Box
const QuestCheckBoxMLT = FrameMLText.newFrame('FRvar', 'QuestCheckBox', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Invisible Button
const InvisButtonMLT = FrameMLText.newFrame('FRvar', 'IconButtonTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')

// Text Frame
const TextFrameMLT = FrameMLText.newFrameByType('FRvar', 'name', 'OWNERvar', 0, 0, 'TEXT', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')
    .setEnabled(false)
    .setScale('FRscale')
    .setTextAlignment('ALIGN_VER', 'ALIGN_HOR')

// Horizontal Bar
const HorizontalBarMLT = FrameMLText.newFrameByType('FRvar', 'name', 'OWNERvar', 0, 0, 'SIMPLESTATUSBAR', '')
    .setTexture('PATHvar', 0, true)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setValue(100)

// Horizontal Bar + Background
const HorizontalBarWiBackground1MLT = FrameMLText.newFrameByType('BackFRvar', 'BackFRvar', OriginWorld, 0, 0, 'BACKDROP', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setTexture('BACKvar', 0, true)
const HorizontalBarWiBackground2MLT = FrameMLText.newFrameByType('FRvar', '', HorizontalBarWiBackground1MLT, 0, 0, 'SIMPLESTATUSBAR', '')
    .setTexture('PATHvar', 0, true)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setValue(50)

// Horizontal Bar + Text
const HorizontalBarWiText1MLT = FrameMLText.newFrameByType('FRvar', '', OriginWorld, 0, 0, 'SIMPLESTATUSBAR', '')
    .setTexture('PATHvar', 0, true)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setValue(100)
const HorizontalBarWiText2MLT = FrameMLText.newFrameByType('TextFRvar', 'name', OriginGameUI, 0, 0, 'TEXT', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')
    .setEnabled(false)
    .setScale('FRscale')
    .setTextAlignment('ALIGN_VER', 'ALIGN_HOR')

// Horizontal Bar + Background + Text
const HorizontalBarWiBackground_Text1MLT = FrameMLText.newFrameByType('BackFRvar', 'BackFRvar', OriginWorld, 0, 0, 'BACKDROP', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setTexture('BACKvar', 0, true)
const HorizontalBarWiBackground_Text2MLT = FrameMLText.newFrameByType('FRvar', '', HorizontalBarWiBackground_Text1MLT, 0, 0, 'SIMPLESTATUSBAR', '')
    .setTexture('PATHvar', 0, true)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setValue(100)
const HorizontalBarWiBackground_Text3MLT = FrameMLText.newFrameByType('TextFRvar', 'name', OriginGameUI, 0, 0, 'TEXT', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')
    .setEnabled(false)
    .setScale('FRscale')
    .setTextAlignment('ALIGN_VER', 'ALIGN_HOR')

// Text Area
const TextAreaMLT = FrameMLText.newFrameByType('FRvar', 'name', 'OWNERvar', 0, 0, 'TEXTAREA', '')
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')

// Edit Box
const EditBoxMLT = FrameMLText.newFrame('FRvar', 'EscMenuEditBoxTemplate', 'OWNERvar', 0, 0)
    .setAbsPoint('FRAMEPOINT_TOPLEFT', 'TOPLEFTXvar', 'TOPLEFTYvar')
    .setAbsPoint('FRAMEPOINT_BOTTOMRIGHT', 'BOTRIGHTXvar', 'BOTRIGHTYvar')
    .setText('TEXTvar')

// Tooltip Owner Button
const TooltipOwnerButtonMLT = FrameMLText.newEmpty('OWNERvar').setToolTip('FRvar')

// Tooltip Owner Other
const TooltipOwnerOtherMLT = FrameMLText.newFrameByType('TooltipFRvar', '', 'OWNERvar', 0, 0, 'FRAME', '').setAllPoints('OWNERvar').setToolTip('FRvar')

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
    static globals = 'globals \n'

    static declares = 'framehandle FRvar = null \n'
    // static declaresArray = "framehandle array FRvar\n"
    static declaresWiTooltip = 'framehandle FRvar = null \nframehandle TooltipFRvar = null \n'
    // static declaresArrayWiTooltip = "framehandle array FRvar \nframehandle array TooltipFRvar \n"
    static declaresBUTTON = 'framehandle FRvar = null \n framehandle BackdropFRvar = null \n'
    // static declaresBUTTONArray = "framehandle array FRvar \n framehandle array BackdropFRvar \n"
    static declaresHorBarBack = 'framehandle FRvar = null \nframehandle BackFRvar = null \n'
    static declaresHorBarText = 'framehandle FRvar = null \nframehandle TextFRvar = null \n'
    static declaresHorBarBack_Text = 'framehandle FRvar = null \nframehandle BackFRvar = null \nframehandle TextFRvar = null \n'

    static declaresFUNCTIONALITY = 'trigger TriggerFRvar = null \n'
    // static declaresFUNCTIONALITYArray = "trigger array TriggerFRvar \n"

    static declaresFUNCTIONALITYcheckbox = 'trigger TriggerChFRvar = null \n'
    // static declaresFUNCTIONALITYArraycheckbox = "trigger array TriggerChFRvar \n"

    static endglobals = 'endglobals \n \n'

    static library = 'library FRlib initializer init \n'
    static libraryInit = 'private function init takes nothing returns nothing \n'

    static TriggerButtonDisableStart =
        'function FRvrrFunc takes nothing returns nothing \ncall BlzFrameSetEnable(FRvar, false) \ncall BlzFrameSetEnable(FRvar, true) \n'
    static TriggerVariableInit = 'set TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n'
    static TriggerButtonDisableEnd = 'endfunction \n \n'

    static TriggerCheckboxStart = 'function FRvrrChFunc takes nothing returns nothing \n'
    static TriggerCheckboxTrig = 'if BlzGetTriggerFrameEvent() == FRAMEEVENT_CHECKBOX_CHECKED then\nset TRIGvar = 2\nelse \nset TRIGvar = 1\nendif\n'
    static TriggerCheckboxEnd = 'endfunction \n \n'

    static backdrop = BackdropMLT.jass()
    static button = Button1MLT.jass() + Button2MLT.jass()
    static ScriptDialogButton = ScriptDialogButtonMLT.jass()
    static BrowserButton = BrowserButtonMLT.jass()
    static CheckListBox = CheckListBoxMLT.jass()
    static EscMenuBackdrop = EscMenuBackdropMLT.jass()
    static OptionsPopupMenuBackdropTemplate = OptionsPopupMenuBackdropTemplateMLT.jass()
    static QuestButtonBaseTemplate = QuestButtonBaseTemplateMLT.jass()
    static QuestButtonDisabledBackdropTemplate = QuestButtonDisabledBackdropTemplateMLT.jass()
    static QuestButtonPushedBackdropTemplate = QuestButtonPushedBackdropTemplateMLT.jass()
    static QuestCheckBox = QuestCheckBoxMLT.jass()
    static InvisButton = InvisButtonMLT.jass()
    static TextFrame = TextFrameMLT.jass()
    static HorizontalBar = HorizontalBarMLT.jass()
    static HorizontalBarWiBackground = HorizontalBarWiBackground1MLT.jass() + HorizontalBarWiBackground2MLT.jass()
    static HorizontalBarWiText = HorizontalBarWiText1MLT.jass() + HorizontalBarWiText2MLT.jass()
    static HorizontalBarWiBackground_Text =
        HorizontalBarWiBackground_Text1MLT.jass() + HorizontalBarWiBackground_Text2MLT.jass() + HorizontalBarWiBackground_Text3MLT.jass()
    static TextArea = TextAreaMLT.jass()
    static EditBox = EditBoxMLT.jass()

    static TooltipOwnerButton = TooltipOwnerButtonMLT.jass()
    static TooltipOwnerOther = TooltipOwnerOtherMLT.jass()

    static TriggerVariableFinalButton =
        'set TriggerFRvar = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \n call TriggerAddAction(TriggerFRvar, function FRvrrFunc) \n'
    static TriggerVariableCheckbox =
        'set TriggerChFRvar = CreateTrigger() \n call BlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \ncall BlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \n call TriggerAddAction(TriggerChFRvar, function FRvrrChFunc) \n'

    static endlibrary = 'endfunction \nendlibrary\n'

    static HideGameUI = 'call BlzHideOriginFrames(true) \ncall BlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    static HideHeroBar = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n'
    static HideMiniMap = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    static HideResources = 'call BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    static HideButtonBar = 'call BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    static HidePortrait = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    static HideChat = 'call BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'
    static LoadTOC = 'call BlzLoadTOCFile("name.toc")'
}

export class LUA implements I_Templates {
    static globals = ''

    static declares = 'FRvar = nil \n'
    static declaresWiTooltip = 'FRvar = nil \n'
    // static declaresArray = "FRvar = {} \n"
    // static declaresArrayWiTooltip = "FRvar = {} \n"
    static declaresBUTTON = 'FRvar = nil \nBackdropFRvar = nil \n'
    // static declaresBUTTONArray = "FRvar = {} \nBackdropFRvar = {} \n"
    static declaresHorBarBack = 'FRvar = nil \nBackFRvar = nil \n'
    static declaresHorBarText = 'FRvar = nil \nTextFRvar = nil \n'
    static declaresHorBarBack_Text = 'FRvar = nil \nBackFRvar = nil \nTextFRvar = nil \n'

    static declaresFUNCTIONALITY = 'TriggerFRvar = nil \n'
    // static declaresFUNCTIONALITYArray = "TriggerFRvar = {} \n"

    static endglobals = ''

    static library = 'FRlib = {}\n'
    static libraryInit = 'FRlib.Initialize = function()\n'
    static TriggerButtonDisableStart = 'FRlib.FRvrrFunc = function() \nBlzFrameSetEnable(FRvar, false) \nBlzFrameSetEnable(FRvar, true) \n'
    static TriggerVariableInit = 'globals.TRIGvar = GetConvertedPlayerId(GetTriggerPlayer()) \n'
    static TriggerButtonDisableEnd = 'end \n \n'

    static backdrop = BackdropMLT.lua()

    static button = Button1MLT.lua() + Button2MLT.lua()

    static ScriptDialogButton = ScriptDialogButtonMLT.lua()
    static BrowserButton = BrowserButtonMLT.lua()
    static CheckListBox = CheckListBoxMLT.lua()
    static EscMenuBackdrop = EscMenuBackdropMLT.lua()
    static OptionsPopupMenuBackdropTemplate = OptionsPopupMenuBackdropTemplateMLT.lua()
    static QuestButtonBaseTemplate = QuestButtonBaseTemplateMLT.lua()
    static QuestButtonDisabledBackdropTemplate = QuestButtonDisabledBackdropTemplateMLT.lua()
    static QuestButtonPushedBackdropTemplate = QuestButtonPushedBackdropTemplateMLT.lua()
    static QuestCheckBox = QuestCheckBoxMLT.lua()
    static InvisButton = InvisButtonMLT.lua()
    static TextFrame = TextFrameMLT.lua()
    static HorizontalBar = HorizontalBarMLT.lua()
    static HorizontalBarWiBackground = HorizontalBarWiBackground1MLT.lua() + HorizontalBarWiBackground2MLT.lua()
    static HorizontalBarWiText = HorizontalBarWiText1MLT.lua() + HorizontalBarWiText2MLT.lua()
    static HorizontalBarWiBackground_Text =
        HorizontalBarWiBackground_Text1MLT.lua() + HorizontalBarWiBackground_Text2MLT.lua() + HorizontalBarWiBackground_Text3MLT.lua()
    static TextArea = TextAreaMLT.lua()
    static EditBox = EditBoxMLT.lua()

    static TooltipOwnerButton = TooltipOwnerButtonMLT.lua()
    static TooltipOwnerOther = TooltipOwnerOtherMLT.lua()

    static TriggerVariableButton =
        'TriggerFRvar = CreateTrigger() \nBlzTriggerRegisterFrameEvent(TriggerFRvar, FRvar, FRAMEEVENT_CONTROL_CLICK) \nTriggerAddAction(TriggerFRvar, FRlib.FRvrrFunc) \n'
    static TriggerVariableCheckbox =
        'TriggerChFRvar = CreateTrigger() \nBlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \nBlzTriggerRegisterFrameEvent(TriggerChFRvar, FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \nTriggerAddAction(TriggerChFRvar, function() \nif BlzGetTriggerFrameEvent() == FRAMEEVENT_CHECKBOX_CHECKED then\nTRIGvar = 2\nelse \nTRIGvar = 1\nend\nend) \n \n'

    static endlibrary = 'end\n'

    static HideGameUI = 'BlzHideOriginFrames(true) \nBlzFrameSetSize(BlzGetFrameByName("ConsoleUIBackdrop",0), 0, 0.0001)\n'
    static HideHeroBar = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_HERO_BAR,0), false)\n'
    static HideMiniMap = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_MINIMAP,0), false)\n'
    static HideResources = 'BlzFrameSetVisible(BlzGetFrameByName("ResourceBarFrame",0), false)\n'
    static HideButtonBar = 'BlzFrameSetVisible(BlzGetFrameByName("UpperButtonBarFrame",0), false)\n'
    static HidePortrait = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0), false)\n'
    static HideChat = 'BlzFrameSetVisible(BlzGetOriginFrame(ORIGIN_FRAME_CHAT_MSG, 0), false)\n'
    static LoadTOC = 'BlzLoadTOCFile("name.toc")'
}

export class Typescript implements I_Templates {
    static classDeclare =
        'export class FRlib {\n  protected static instance: FRlib\n\n  static getInstance() {\n    if (!FRlib.instance) FRlib.instance = new FRlib()\n    return FRlib.instance\n  }\n'

    static globals = '\n'

    static declares = '   FRvar: Frame\n'
    // static declaresArray = "   FRvar: Frame[] = []\n"
    static declaresBUTTON = '   FRvar: Frame\n   BackdropFRvar: Frame \n'
    // static declaresBUTTONArray = "   FRvar: Frame[] = []\n   BackdropFRvar: Frame[] = [] \n"
    static declaresHorBarBack = 'FRvar: Frame \nBackFRvar: Frame \n'
    static declaresHorBarText = 'FRvar: Frame \nTextFRvar: Frame \n'
    static declaresHorBarBack_Text = 'FRvar: Frame \nBackFRvar: Frame \nTextFRvar: Frame \n'

    static endglobals = '\n'

    static constructorInit = '  private constructor() {\n      let t: Trigger;\n\n'

    static backdrop = BackdropMLT.ts('  ')
    static button = Button1MLT.ts('  ') + Button2MLT.ts('  ')

    static ScriptDialogButton = ScriptDialogButtonMLT.ts('  ')
    static BrowserButton = BrowserButtonMLT.ts('  ')
    static CheckListBox = CheckListBoxMLT.ts('  ')
    static EscMenuBackdrop = EscMenuBackdropMLT.ts('  ')
    static OptionsPopupMenuBackdropTemplate = OptionsPopupMenuBackdropTemplateMLT.ts('  ')
    static QuestButtonBaseTemplate = QuestButtonBaseTemplateMLT.ts('  ')
    static QuestButtonDisabledBackdropTemplate = QuestButtonDisabledBackdropTemplateMLT.ts('  ')
    static QuestButtonPushedBackdropTemplate = QuestButtonPushedBackdropTemplateMLT.ts('  ')
    static QuestCheckBox = QuestCheckBoxMLT.ts('  ')
    static InvisButton = InvisButtonMLT.ts('  ')
    static TextFrame = TextFrameMLT.ts('  ')
    static HorizontalBar = HorizontalBarMLT.ts('  ')
    static HorizontalBarWiBackground = HorizontalBarWiBackground1MLT.ts('  ') + HorizontalBarWiBackground2MLT.ts('  ')
    static HorizontalBarWiText = HorizontalBarWiText1MLT.ts('  ') + HorizontalBarWiText2MLT.ts('  ')
    static HorizontalBarWiBackground_Text =
        HorizontalBarWiBackground_Text1MLT.ts('  ') + HorizontalBarWiBackground_Text2MLT.ts('  ') + HorizontalBarWiBackground_Text3MLT.ts('  ')
    static TextArea = TextAreaMLT.ts('  ')
    static EditBox = EditBoxMLT.ts('  ')

    static TooltipOwnerButton = TooltipOwnerButtonMLT.ts('  ')
    static TooltipOwnerOther = TooltipOwnerOtherMLT.ts('  ')

    static ButtonTriggerSetup =
        't = new Trigger() \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CONTROL_CLICK) \nt.addAction( () => {\nthis.FRvar.enabled = false \nthis.FRvar.enabled = true \n})\n'
    static TriggerVariableCheckbox =
        't = new Trigger() \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CHECKBOX_CHECKED) \nt.triggerRegisterFrameEvent(this.FRvar, FRAMEEVENT_CHECKBOX_UNCHECKED) \nt.addAction( () => {\nif(BlzGetTriggerFrameEvent() === FRAMEEVENT_CHECKBOX_CHECKED) {\n// Actions\n} else {\n// Actions\n}\n})\n'

    static endconstructor_library = '}\n\n}\n'
}
