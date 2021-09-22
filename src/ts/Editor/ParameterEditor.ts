import { debugText } from '../Classes & Functions/Mini-Functions'
import { Editor } from './Editor';
import { InputEdit } from "../Classes & Functions/Mini-Functions";
import { FrameComponent } from './FrameLogic/FrameComponent';
import { FrameType } from './FrameLogic/FrameType';
import { CustomImage } from './FrameLogic/CustomImage';
import { CustomText } from './FrameLogic/CustomText';
import ChangeFrameName from '../Commands/Implementation/ChangeFrameName';
import ChangeFrameWidth from '../Commands/Implementation/ChangeFrameWidth';
import Actionable from '../Commands/Actionable';
import ChangeFrameHeight from '../Commands/Implementation/ChangeFrameHeight';
import ChangeFrameType from '../Commands/Implementation/ChangeFrameType';
import ChangeFrameParent from '../Commands/Implementation/ChangeFrameParent';
import ChangeFrameTooltip from '../Commands/Implementation/ChangeFrameTooltip';
import ChangeFrameX from '../Commands/Implementation/ChangeFrameX';
import ChangeFrameY from '../Commands/Implementation/ChangeFrameY';

export class ParameterEditor {

    public readonly parameterPanel: HTMLElement;
    public readonly panelParameters: HTMLElement;
    public readonly inputElementName: HTMLInputElement
    public readonly selectElementType: HTMLSelectElement;
    public readonly selectElementParent: HTMLSelectElement;
    public readonly checkboxElementTooltip: HTMLInputElement;
    public readonly inputElementWidth: HTMLInputElement;
    public readonly inputElementHeight: HTMLInputElement;
    public readonly inputElementCoordinateX: HTMLInputElement;
    public readonly inputElementCoordinateY: HTMLInputElement;
    public readonly inputElementDiskTexture: HTMLInputElement;
    public readonly fileElementTextureBrowse: HTMLInputElement;
    public readonly inputElementWC3Texture: HTMLInputElement;
    public readonly inputElementText: HTMLInputElement;
    public readonly inputElementTrigVar: HTMLInputElement;
    public readonly inputElementTextBig: HTMLInputElement;
    public readonly inputElementTextScale: HTMLInputElement;
    public readonly inputElementTextColor: HTMLInputElement;
    public readonly buttonElementTextureBrowse: HTMLButtonElement;
    public readonly inputLibraryName: HTMLInputElement;
    public readonly checkboxGameUI: HTMLInputElement;
    public readonly checkboxHeroBar: HTMLInputElement;
    public readonly checkboxMiniMap: HTMLInputElement;
    public readonly checkboxResources: HTMLInputElement;
    public readonly checkboxButtonBar: HTMLInputElement;
    public readonly checkboxPortrait: HTMLInputElement;
    public readonly checkboxChat: HTMLInputElement;

    public readonly fieldTexture: HTMLDivElement;
    public readonly fieldType: HTMLDivElement;
    public readonly fieldFunctionalityFull: HTMLDivElement;
    public readonly fieldFunctionalityText: HTMLDivElement;
    public readonly fieldFunctionalityVar: HTMLDivElement;
    public readonly fieldGeneral: HTMLDivElement;
    public readonly fieldElement: HTMLDivElement;
    public readonly fieldTextFrame: HTMLDivElement;
    public readonly fieldTooltip: HTMLDivElement;


    public constructor() {

        this.panelParameters = document.getElementById('panelParameters') as HTMLElement;
        this.inputElementName = document.getElementById('elementName') as HTMLInputElement;
        this.selectElementType = document.getElementById('elementType') as HTMLSelectElement;
        this.selectElementParent = document.getElementById('elementParent') as HTMLSelectElement;
        this.checkboxElementTooltip = document.getElementById('elementTooltip') as HTMLInputElement;
        this.inputElementWidth = document.getElementById('elementWidth') as HTMLInputElement;
        this.inputElementHeight = document.getElementById('elementHeight') as HTMLInputElement;
        this.inputElementCoordinateX = document.getElementById('elementCoordinateX') as HTMLInputElement;
        this.inputElementCoordinateY = document.getElementById('elementCoordinateY') as HTMLInputElement;
        this.inputElementDiskTexture = document.getElementById('elementDiskTexture') as HTMLInputElement;
        this.fileElementTextureBrowse = document.getElementById('buttonBrowseTexture') as HTMLInputElement;
        this.inputElementWC3Texture = document.getElementById('elementWC3Texture') as HTMLInputElement;
        this.inputElementText = document.getElementById('elementText') as HTMLInputElement;
        this.inputElementTextBig = document.getElementById('elementTextBig') as HTMLInputElement;
        this.inputElementTextScale = document.getElementById('elementTextScale') as HTMLInputElement;
        this.inputElementTextColor = document.getElementById('elementTextColor') as HTMLInputElement;
        this.inputElementTrigVar = document.getElementById('elementTrigVar') as HTMLInputElement;
        this.buttonElementTextureBrowse = document.getElementById('buttonBrowseTexture') as HTMLButtonElement;
        this.inputLibraryName = document.getElementById('generalLibName') as HTMLInputElement;
        this.checkboxGameUI = document.getElementById('generalGameUI') as HTMLInputElement;
        this.checkboxHeroBar = document.getElementById('generalHeroBar') as HTMLInputElement;
        this.checkboxMiniMap = document.getElementById('generalMiniMap') as HTMLInputElement;
        this.checkboxResources = document.getElementById('generalResources') as HTMLInputElement;
        this.checkboxButtonBar = document.getElementById('generalButtonBar') as HTMLInputElement;
        this.checkboxPortrait = document.getElementById('generalPortrait') as HTMLInputElement;
        this.checkboxChat = document.getElementById('generalChat') as HTMLInputElement;

        this.fieldTexture = document.getElementById('FieldTexture') as HTMLDivElement;
        this.fieldType = document.getElementById('FieldType') as HTMLDivElement;
        this.fieldTooltip = document.getElementById('FieldTooltip') as HTMLDivElement;
        this.fieldFunctionalityFull = document.getElementById('FieldFunctionalityFull') as HTMLDivElement;
        this.fieldFunctionalityText = document.getElementById('FieldFunctionalityText') as HTMLDivElement;
        this.fieldFunctionalityVar = document.getElementById('FieldFunctionalityVar') as HTMLDivElement;
        this.fieldGeneral = document.getElementById('FieldGeneral') as HTMLDivElement;
        this.fieldElement = document.getElementById('FieldElement') as HTMLDivElement;
        this.fieldTextFrame = document.getElementById('FieldFunctionalityTextFrame') as HTMLDivElement;


        this.inputElementWidth.disabled = true
        this.inputElementHeight.disabled = true
        this.inputElementName.disabled = true
        this.selectElementType.disabled = true
        this.selectElementParent.disabled = true
        this.inputElementCoordinateX.disabled = true
        this.inputElementCoordinateY.disabled = true
        this.inputElementDiskTexture.disabled = true
        this.fileElementTextureBrowse.disabled = true
        this.inputElementWC3Texture.disabled = true
        this.inputElementText.disabled = true
        this.inputElementTrigVar.disabled = true

        this.inputElementWidth.onchange = ParameterEditor.InputWidth;
        this.inputElementHeight.onchange = ParameterEditor.InputHeight;
        this.inputElementName.oninput = ParameterEditor.InputName;
        this.inputElementName.onchange = ParameterEditor.ChangeName;
        this.selectElementType.onchange = ParameterEditor.ChangeType;
        this.selectElementParent.onchange = ParameterEditor.ChangeParent;
        this.checkboxElementTooltip.onchange = ParameterEditor.ChangeTooltip;
        this.inputElementCoordinateX.onchange = ParameterEditor.InputCoordinateX;
        this.inputElementCoordinateY.onchange = ParameterEditor.InputCoordinateY;
        this.inputElementDiskTexture.onchange = ParameterEditor.TextInputDiskTexture;
        this.fileElementTextureBrowse.onchange = ParameterEditor.ButtonInputDiskTexture;
        this.inputElementWC3Texture.oninput = ParameterEditor.InputWC3Texture;
        this.inputElementText.oninput = ParameterEditor.InputText;
        this.inputElementTextBig.oninput = ParameterEditor.InputText;
        this.inputElementTextScale.onchange = ParameterEditor.InputTextScale;
        this.inputElementTextColor.onchange = ParameterEditor.InputTextColor;
        this.inputElementTrigVar.oninput = ParameterEditor.InputTrigVar;

    }

    /** checks whether value is smaller than 0.1. True if smaller. */
    private static CheckInputValue(value: number): boolean {

        const result = value < 0.01;
        if (result) {

            debugText("Minimum Value is 0.01.");
        }

        return result;

    }

    static InputWidth(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        const focusedFrame = Editor.GetDocumentEditor().projectTree.getSelectedFrame();
        const focusedCustom = focusedFrame.custom;
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspace.getBoundingClientRect()
        const horizontalMargin = Editor.getInnerMargin()
        const actualMargin = Editor.getActualMargin()
        alert(Editor.getActualMarginLimits().min+", "+Editor.getActualMarginLimits().max)

        if (+inputElement.value > Editor.getActualMarginLimits().max || +inputElement.value < Editor.getActualMarginLimits().min) {
            debugText(`Input refused. Width is limited to ${Editor.getActualMarginLimits().min} and ${Editor.getActualMarginLimits().max}.`)
            return
        }

        if (focusedCustom.getElement().getBoundingClientRect().left + +inputElement.value / 0.8 * (workspace.width - 2 * horizontalMargin) > workspace.getBoundingClientRect().right - actualMargin) {
            debugText(`Input refused. Image right edge will be out of screen.`)
            return
        }

        let command : Actionable;

        if (ParameterEditor.CheckInputValue(+inputElement.value)) {
            command = new ChangeFrameWidth(focusedFrame, 0.01);
        } else {
            command = new ChangeFrameWidth(focusedFrame, +inputElement.value);
        }
        command.action();

    }

    static InputHeight(ev: Event): void {
        try {

            const inputElement = ev.target as HTMLInputElement;
            const focusedFrame = Editor.GetDocumentEditor().projectTree.getSelectedFrame();
            const focusedCustom = focusedFrame.custom;
            const workspace = Editor.GetDocumentEditor().workspaceImage

            if (+inputElement.value > 0.6 || +inputElement.value < 0) {
                debugText(`Input refused. Height is limited to 0 and 0.6.`)
                return
            }

            if (focusedCustom.getElement().getBoundingClientRect().bottom - +inputElement.value / 0.6 * workspace.height < workspace.getBoundingClientRect().top) {
                debugText(`Input refused. Image top edge will be out of screen.`)
                return
            }

            let command: Actionable;
            if (ParameterEditor.CheckInputValue(+inputElement.value)) {
                command = new ChangeFrameHeight(focusedFrame, 0.01);
            } else {
                command = new ChangeFrameHeight(focusedFrame, +inputElement.value);
            }
            command.action();

        } catch (e) { alert(e) }
    }

    static InputName(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        const text = inputElement.value;

        //checks only the first character if it is number or not
        if (+text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
            inputElement.value = ""
            debugText("Name can't start with a number")
        }

        //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
        if (/[`!@#$%^&*()_+\-={};':"\\|,.<>/?~]/.test(text)) {
            inputElement.value = text.slice(0, text.length - 1)
            debugText("Special Characters refused")
        }

    }

    static ChangeName(ev: Event): void {
        try {

            const inputElement = ev.target as HTMLInputElement;
            let text = inputElement.value;
            const projectTree = Editor.GetDocumentEditor().projectTree;
            let nulIndexFound = false;

            if (/.*\[[0-9]\]/.test(text)) {

                inputElement.value = text.slice(0, text.length - 2) + "0" + text.slice(text.length - 2);
                text = inputElement.value;
                debugText("Modified index.")

            }

            const isArray = /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9])*\[[0-9][0-9]+\]$/.test(text);
            if (!(isArray || /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9])*$/.test(text))) {
                debugText("Invalid name");
                return;
            }

            if (isArray) {
                const index = text.search(/\[/)
                const index2 = text.search("]");

                if (index >= 0) {

                    if (Number.parseInt(text.slice(index+1, index2)) == 0)
                        nulIndexFound = true;

                }
            }

            const endingIndex = text.search(/\[/);

            for (const frame of projectTree.getIterator()) {

                if (frame == projectTree.getSelectedFrame()) {
                    continue;
                }

                if (frame.getName().localeCompare(text) == 0) {
                    debugText("Name already taken.")
                    return;
                }


                if (isArray && !nulIndexFound) {
                    const endingIndex2 = frame.getName().search(/\[/)

                    if (text.slice(0, endingIndex).localeCompare(frame.getName().slice(0, endingIndex2)) == 0) {

                        const index = frame.getName().search(/\[/)
                        const index2 = frame.getName().search("]");

                        if (index >= 0) {

                            if (Number.parseInt(frame.getName().slice(index+1, index2)) == 0)
                                nulIndexFound = true;
                        }
                    }

                }
            }

            if (isArray && !nulIndexFound) {
                debugText("Cannot have a frame array without a 0 indexed frame");
                return;
            }

            const command = new ChangeFrameName(projectTree.getSelectedFrame(), text);
            command.action();

            debugText('Name changed to "' + text + '"');

        } catch (e) { alert(e) }
    }

    static ChangeType(ev: Event): void {

        const selectElement = ev.target as HTMLSelectElement;

        const selected = Editor.GetDocumentEditor().projectTree.getSelectedFrame()

        const command = new ChangeFrameType(selected, +selectElement.selectedOptions[0].value)
        command.action();

        let typeText = ""
        if (selected.type == 1) typeText = "Backdrop";
        if (selected.type == 2) typeText = "Button";
        debugText('Type changed to ' + typeText);

        Editor.GetDocumentEditor().parameterEditor.updateFields(selected);

    }

    static ChangeParent(ev: Event): void {
        try {

            const selectElement = ev.target as HTMLSelectElement;
            const selectedFrame = Editor.GetDocumentEditor().projectTree.getSelectedFrame()

            for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
                if (!el.parentOption) continue;

                if (el.parentOption == selectElement.selectedOptions[0]) {

                    const command = new ChangeFrameParent(selectedFrame, el);
                    command.action();
                    break;

                }
            }
            debugText("Parent changed to " + selectedFrame.getParent().getName())

        } catch (e) { alert(e) }
    }

    static ChangeTooltip(ev: Event): void {
        const val = (ev.target as HTMLInputElement).checked;
        const selectedFrame = Editor.GetDocumentEditor().projectTree.getSelectedFrame()

        const command = new ChangeFrameTooltip(selectedFrame, val);
        command.action();

        if(val) debugText("Is now a Tooltip")
        else debugText("No longer a Tooltip")
    }

    static InputCoordinateX(ev: Event): void {
        const loc = (ev.target as HTMLInputElement).value;
        const editor = Editor.GetDocumentEditor();
        const rect = editor.workspaceImage.getBoundingClientRect()
        const image = editor.projectTree.getSelectedFrame().custom.getElement()
        const horizontalMargin = Editor.getInnerMargin()

        if (+loc > Editor.getActualMarginLimits().max || +loc < Editor.getActualMarginLimits().min) {
            debugText(`Input refused. X coordinate is limited to ${Editor.getActualMarginLimits().min} and ${Editor.getActualMarginLimits().max}`)
            return
        }
        if (+loc + image.getBoundingClientRect().width / (rect.width - 2 * horizontalMargin) * 0.8 > Editor.getActualMarginLimits().max) {
            debugText("Input refused. Image right edge will be out of screen.")
            return
        }

        const command = new ChangeFrameX(Editor.GetDocumentEditor().projectTree.getSelectedFrame(), +loc);
        command.action();

    }

    static InputCoordinateY(ev: Event): void {
        try {

            const loc = (ev.target as HTMLInputElement).value;
            const editor = Editor.GetDocumentEditor()
            const rect = editor.workspaceImage.getBoundingClientRect()
            const image = editor.projectTree.getSelectedFrame().custom.getElement()

            if (+loc > 0.6 || +loc < 0) {
                debugText(`Input refused. Y coordinate is limited to 0 and 0.6.`)
                return
            }
            if (+loc + image.getBoundingClientRect().height / rect.height * 0.6 > 0.6) {
                debugText("Input refused. Image top edge will be out of screen.")
                return
            }

            const command = new ChangeFrameY(Editor.GetDocumentEditor().projectTree.getSelectedFrame(), +loc);
        command.action();

        } catch (e) { alert(e) }
    }

    static TextInputDiskTexture(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;

        (Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom as CustomImage).setDiskTexture(inputElement.value);
        debugText('Disk Texture changed.');

    }

    static ButtonInputDiskTexture(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement;
        const path = URL.createObjectURL(inputElement.files[0])

        const editor = Editor.GetDocumentEditor();
        (editor.projectTree.getSelectedFrame().custom as CustomImage).setDiskTexture(path);

        editor.parameterEditor.inputElementDiskTexture.value = path;
        debugText("Disk Texture changed. However, the app can't know the path of this texture.")
    }

    static InputWC3Texture(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        let text = inputElement.value;
        text = text.replace(/(?<!\\)\\(?!\\)/g, "\\\\");
        inputElement.value = text

        ;(Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom as CustomImage).setWc3Texture(text);
        debugText('WC3 Texture changed.');

    }

    static InputText(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        const frameContent = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;

        frameContent.setText(inputElement.value);
        debugText("Text changed.");


    }

    static InputTrigVar(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;

        const frameBaseContent = Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom;

        let text = inputElement.value
        if(text.indexOf("udg_") != 0 && text.length > 0) {
            text = "udg_"+text
            console.log(text)
        }

        if (frameBaseContent instanceof CustomImage) {
            frameBaseContent.setTrigVar(text);
            debugText("Triggered Variable changed.");
        }

    }

    static InputTextScale(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        (Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom as CustomText).setScale(+inputElement.value);

    }

    static InputTextColor(ev: Event): void {

        const inputElement = ev.target as HTMLInputElement;
        (Editor.GetDocumentEditor().projectTree.getSelectedFrame().custom as CustomText).setColor(inputElement.value);

    }

    /**gives the instance */
    static inst(): ParameterEditor {
        return Editor.GetDocumentEditor().parameterEditor
    }

    public emptyFields(): void {
        this.inputElementWidth.value = ""
        this.inputElementHeight.value = ""
        this.inputElementName.value = ""
        this.selectElementType.value = ""
        this.selectElementParent.value = ""
        this.checkboxElementTooltip.checked = false
        this.inputElementCoordinateX.value = ""
        this.inputElementCoordinateY.value = ""
        this.inputElementDiskTexture.value = ""
        this.inputElementWC3Texture.value = ""
        this.inputElementText.value = ""
        this.inputElementTextBig.value = ""
        this.inputElementTextScale.value = ""
        this.inputElementTextColor.value = "#FFFFFF"
        this.inputElementTrigVar.value = ""

    }

    public disableFields(disable: boolean): void {
        this.inputElementWidth.disabled = disable
        this.inputElementHeight.disabled = disable
        this.inputElementName.disabled = disable
        this.selectElementType.disabled = disable
        this.selectElementParent.disabled = disable
        this.checkboxElementTooltip.disabled = disable
        this.inputElementCoordinateX.disabled = disable
        this.inputElementCoordinateY.disabled = disable
        this.inputElementDiskTexture.disabled = disable
        this.buttonElementTextureBrowse.disabled = disable
        this.inputElementWC3Texture.disabled = disable
        this.inputElementText.disabled = disable
        this.inputElementTrigVar.disabled = disable
    }

    public updateFields(frame: FrameComponent): void {
        try {

            const editor = Editor.GetDocumentEditor();

            const horizontalMargin = Editor.getInnerMargin()

            if (frame && frame != Editor.GetDocumentEditor().projectTree.rootFrame) {
                this.disableFields(false)
                this.setupLists(frame)
                this.inputElementName.value = frame.getName();

                if (frame.custom instanceof CustomImage) {
                    this.inputElementWidth.value = InputEdit(frame.custom.getElement().width * 800 / (editor.workspaceImage.width - 2 * horizontalMargin))
                    this.inputElementHeight.value = InputEdit(frame.custom.getElement().height * 600 / editor.workspaceImage.height)

                    this.inputElementDiskTexture.value = frame.custom.getDiskTexture()
                    this.inputElementWC3Texture.value = frame.custom.getWc3Texture()
                    this.inputElementTrigVar.value = frame.custom.getTrigVar()
                    this.inputElementText.value = frame.custom.getText()
                } else if (frame.custom instanceof CustomText) {
                    this.inputElementWidth.value = InputEdit(+frame.custom.getElement().offsetWidth * 800 / (editor.workspaceImage.width - 2 * horizontalMargin))
                    this.inputElementHeight.value = InputEdit(+frame.custom.getElement().offsetHeight * 600 / editor.workspaceImage.height)

                    this.inputElementTextScale.value = frame.custom.getScale() + ""
                    this.inputElementTextColor.value = frame.custom.getColor()
                    this.inputElementTextBig.value = frame.custom.getText()
                }

                this.inputElementCoordinateX.value = `${InputEdit((frame.custom.getElement().offsetLeft - editor.workspaceImage.getBoundingClientRect().x - horizontalMargin) / (editor.workspaceImage.width - 2 * horizontalMargin) * 800)}`;
                this.inputElementCoordinateY.value = `${InputEdit((editor.workspaceImage.getBoundingClientRect().bottom - frame.custom.getElement().getBoundingClientRect().bottom) / editor.workspaceImage.height * 600)}`;
                this.checkboxElementTooltip.checked = frame.getTooltip()

                this.fieldElement.style.display = "initial"
                this.fieldType.style.display = "initial"
                this.fieldTooltip.style.display = "none"
                this.fieldTexture.style.display = "initial"
                this.fieldFunctionalityFull.style.display = "initial"
                this.fieldFunctionalityText.style.display = "initial"
                this.fieldFunctionalityVar.style.display = "initial"
                this.fieldGeneral.style.display = "none"
                this.fieldTextFrame.style.display = "none"


                if (frame.type == FrameType.BACKDROP || frame.type == FrameType.BUTTON) {
                    this.selectElementType.selectedIndex = frame.type - 1
                    this.fieldFunctionalityText.style.display = "none"

                    if (frame.type == FrameType.BACKDROP) {
                        this.fieldFunctionalityFull.style.display = "none";
                        this.fieldTooltip.style.display = "initial"
                    }

                } else {
                    this.fieldType.style.display = "none"
                    this.fieldTexture.style.display = "none"

                    if (frame.type != FrameType.BROWSER_BUTTON && frame.type != FrameType.SCRIPT_DIALOG_BUTTON && frame.type != FrameType.TEXT_FRAME) {
                        if (frame.type == FrameType.INVIS_BUTTON) this.fieldFunctionalityText.style.display = "none";
                        else {
                            this.fieldFunctionalityFull.style.display = "none";
                            this.fieldTooltip.style.display = "initial";
                        }
                    }


                    else if (frame.type == FrameType.TEXT_FRAME) {
                        this.fieldTextFrame.style.display = "initial";
                        this.fieldFunctionalityText.style.display = "none";
                        this.fieldFunctionalityVar.style.display = "none";
                        this.fieldTooltip.style.display = "initial";
                    }
                }

                if(frame.getParent() == Editor.GetDocumentEditor().projectTree.rootFrame) {
                    this.fieldTooltip.style.display = "none";
                    frame.setTooltip(false);
                }
                
                if(frame.type == FrameType.HORIZONTAL_BAR) {
                    this.fieldTooltip.style.display = "none";
                    this.fieldTexture.style.display = "initial";
                }
                
                if(frame.type == FrameType.CHECKBOX) {
                    this.fieldFunctionalityFull.style.display = "initial";
                    this.fieldFunctionalityText.style.display = "none";
                    this.fieldFunctionalityVar.style.display = "initial";
                }

                let parentHasTooltip = false;
                for(const el of frame.getParent().getChildren()) {
                    if(el != frame && el.getTooltip()) {
                        parentHasTooltip = true;
                        break;
                    }
                }
                if(frame.getParent().getTooltip() || parentHasTooltip) {
                    this.checkboxElementTooltip.disabled = true
                    frame.setTooltip(false);
                }

                const n = frame.type;
                if (n != FrameType.BUTTON && n != FrameType.SCRIPT_DIALOG_BUTTON
                    && n != FrameType.BROWSER_BUTTON && n != FrameType.INVIS_BUTTON && n != FrameType.CHECKBOX) {
                    this.inputElementTrigVar.disabled = true
                    this.inputElementTrigVar.value = ""
                }

                if (n != FrameType.SCRIPT_DIALOG_BUTTON && n != FrameType.BROWSER_BUTTON) {
                    this.inputElementText.disabled = true
                    this.inputElementText.value = ""

                }

                const options = this.selectElementParent.options

                while (options.length > 0) {
                    options.remove(0);
                }

                let selected: HTMLOptionElement;
                for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {

                    if (el == frame) continue;
                    options.add(el.parentOption)
                    el.parentOption.selected = false;
                    if (frame.getParent() == el) selected = el.parentOption;
                }
                selected.selected = true;

            } else {
                this.disableFields(true)
                this.emptyFields()

                this.fieldElement.style.display = "none"
                this.fieldGeneral.style.display = "initial"

            }

        } catch (e) { alert(e) }
    }

    private readonly list = ['Red','Blue','Teal','Purple','Yellow','Orange','Green', 'Pink', 'Gray',
        'LightBlue','DArkGreen','Brown']

    setupLists(frame: FrameComponent) {
        const listEl = document.getElementById('WC3TextureList')
        listEl.innerHTML = ""

        if(frame.type == FrameType.HORIZONTAL_BAR) {
            for(let i = 0; i < this.list.length; i++) {
                const op = document.createElement('option')
                op.value = 'Replaceabletextures\\Teamcolor\\Teamcolor'+(i < 10? '0'+i:i)+'.blp'
                op.innerText = this.list[i]
                listEl.append(op)
            }
        }

    }
}