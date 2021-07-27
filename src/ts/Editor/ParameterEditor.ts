import { debugText } from '../Classes & Functions/Mini-Functions'
import { Editor } from './Editor';
import { InputEdit } from "../Classes & Functions/Mini-Functions";
import { FrameComponent } from './FrameLogic/FrameComponent';
import { FrameType } from './FrameLogic/FrameType';
import { CustomImage } from './FrameLogic/CustomImage';
import { CustomText } from './FrameLogic/CustomText';

export class ParameterEditor{

    public readonly parameterPanel              : HTMLElement;
    public readonly panelParameters             : HTMLElement;
    public readonly inputElementName            : HTMLInputElement 
    public readonly selectElementType           : HTMLSelectElement;
    public readonly selectElementParent         : HTMLSelectElement;
    public readonly inputElementWidth           : HTMLInputElement;
    public readonly inputElementHeight          : HTMLInputElement;
    public readonly inputElementCoordinateX     : HTMLInputElement;
    public readonly inputElementCoordinateY     : HTMLInputElement;
    public readonly inputElementDiskTexture     : HTMLInputElement;
    public readonly fileElementTextureBrowse    : HTMLInputElement;
    public readonly inputElementWC3Texture      : HTMLInputElement;
    public readonly inputElementText            : HTMLInputElement;
    public readonly inputElementTrigVar         : HTMLInputElement;
    public readonly inputElementTextBig         : HTMLInputElement;
    public readonly inputElementTextScale         : HTMLInputElement;
    public readonly inputElementTextColor         : HTMLInputElement;
    public readonly buttonElementTextureBrowse : HTMLButtonElement;
    public readonly inputLibraryName              : HTMLInputElement;
    public readonly checkboxGameUI              : HTMLInputElement;
    public readonly checkboxHeroBar              : HTMLInputElement;
    public readonly checkboxMiniMap              : HTMLInputElement;

    public readonly fieldTexture                : HTMLDivElement;
    public readonly fieldType                   : HTMLDivElement;
    public readonly fieldFunctionalityFull          : HTMLDivElement;
    public readonly fieldFunctionalityText          : HTMLDivElement;
    public readonly fieldFunctionalityVar          : HTMLDivElement;
    public readonly fieldGeneral                  : HTMLDivElement;
    public readonly fieldElement                  : HTMLDivElement;
    public readonly fieldTextFrame                  : HTMLDivElement;

    public constructor(){

        this.panelParameters                        = document.getElementById('panelParameters') as HTMLElement;
        this.inputElementName                       = document.getElementById('elementName') as HTMLInputElement;
        this.selectElementType                      = document.getElementById('elementType') as HTMLSelectElement;
        this.selectElementParent                    = document.getElementById('elementParent') as HTMLSelectElement;
        this.inputElementWidth                      = document.getElementById('elementWidth') as HTMLInputElement;
        this.inputElementHeight                     = document.getElementById('elementHeight') as HTMLInputElement;
        this.inputElementCoordinateX                = document.getElementById('elementCoordinateX') as HTMLInputElement;
        this.inputElementCoordinateY                = document.getElementById('elementCoordinateY') as HTMLInputElement;
        this.inputElementDiskTexture                = document.getElementById('elementDiskTexture') as HTMLInputElement;
        this.fileElementTextureBrowse               = document.getElementById('buttonBrowseTexture') as HTMLInputElement;
        this.inputElementWC3Texture                 = document.getElementById('elementWC3Texture') as HTMLInputElement;
        this.inputElementText                       = document.getElementById('elementText') as HTMLInputElement;
        this.inputElementTextBig                       = document.getElementById('elementTextBig') as HTMLInputElement;
        this.inputElementTextScale                       = document.getElementById('elementTextScale') as HTMLInputElement;
        this.inputElementTextColor                       = document.getElementById('elementTextColor') as HTMLInputElement;
        this.inputElementTrigVar                    = document.getElementById('elementTrigVar') as HTMLInputElement;
        this.buttonElementTextureBrowse            = document.getElementById('buttonBrowseTexture') as HTMLButtonElement;
        this.inputLibraryName                        = document.getElementById('generalLibName') as HTMLInputElement;
        this.checkboxGameUI                         = document.getElementById('generalGameUI') as HTMLInputElement;
        this.checkboxHeroBar                         = document.getElementById('generalHeroBar') as HTMLInputElement;
        this.checkboxMiniMap                        = document.getElementById('generalMiniMap') as HTMLInputElement;

        this.fieldTexture                           = document.getElementById('FieldTexture') as HTMLDivElement;
        this.fieldType                           = document.getElementById('FieldType') as HTMLDivElement;
        this.fieldFunctionalityFull                           = document.getElementById('FieldFunctionalityFull') as HTMLDivElement;
        this.fieldFunctionalityText                           = document.getElementById('FieldFunctionalityText') as HTMLDivElement;
        this.fieldFunctionalityVar                           = document.getElementById('FieldFunctionalityVar') as HTMLDivElement;
        this.fieldGeneral                           = document.getElementById('FieldGeneral') as HTMLDivElement;
        this.fieldElement                           = document.getElementById('FieldElement') as HTMLDivElement;
        this.fieldTextFrame                           = document.getElementById('FieldFunctionalityTextFrame') as HTMLDivElement;


        this.inputElementWidth.disabled             = true
        this.inputElementHeight.disabled            = true
        this.inputElementName.disabled              = true
        this.selectElementType.disabled             = true
        this.selectElementParent.disabled           = true
        this.inputElementCoordinateX.disabled       = true
        this.inputElementCoordinateY.disabled       = true
        this.inputElementDiskTexture.disabled       = true
        this.fileElementTextureBrowse.disabled      = true
        this.inputElementWC3Texture.disabled        = true
        this.inputElementText.disabled              = true
        this.inputElementTrigVar.disabled           = true
        

        this.inputElementWidth.onchange             = ParameterEditor.InputWidth;
        this.inputElementHeight.onchange            = ParameterEditor.InputHeight;
        this.inputElementName.oninput               = ParameterEditor.InputName;
        this.inputElementName.onchange              = ParameterEditor.ChangeName;
        this.selectElementType.onchange             = ParameterEditor.ChangeType;
        this.selectElementParent.onchange           = ParameterEditor.ChangeParent;
        this.inputElementCoordinateX.onchange       = ParameterEditor.InputCoordinateX;
        this.inputElementCoordinateY.onchange       = ParameterEditor.InputCoordinateY;
        this.inputElementDiskTexture.onchange       = ParameterEditor.TextInputDiskTexture;
        this.fileElementTextureBrowse.onchange      = ParameterEditor.ButtonInputDiskTexture;
        this.inputElementWC3Texture.oninput        = ParameterEditor.InputWC3Texture;
        this.inputElementText.oninput              = ParameterEditor.InputText;
        this.inputElementTextBig.oninput              = ParameterEditor.InputText;
        this.inputElementTextScale.onchange              = ParameterEditor.InputTextScale;
        this.inputElementTextColor.onchange              = ParameterEditor.InputTextColor;
        this.inputElementTrigVar.oninput           = ParameterEditor.InputTrigVar;

    }
    
    /** checks whether value is smaller than 0.2. True if smaller. */
    private static CheckInputValue(value : number) : boolean{

        const result = value < 0.02;
        if(result){

            debugText("Minimum Value is 0.02.");
        }
        
        return result;

    }

    static InputWidth(ev: Event) : void {

        const inputElement = ev.target as HTMLInputElement;
        const focusedCustom = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom;
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspace.getBoundingClientRect()
        const horizontalMargin = 240/1920*rect.width

        if(+inputElement.value > 0.8 || +inputElement.value < 0) {
            debugText("Input refused. Width is limited to 0 and 0.8.")
            return
        }

        if(focusedCustom.element.getBoundingClientRect().left + +inputElement.value / 0.8 * (workspace.width-2*horizontalMargin) > workspace.getBoundingClientRect().right-horizontalMargin) {
            debugText("Input refused. Image right edge will be out of screen.")
            return
        }

        if (ParameterEditor.CheckInputValue(+inputElement.value)) {
            if(focusedCustom instanceof CustomImage)
                focusedCustom.element.width = 0.02 / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin);
            else
                focusedCustom.element.style.width = `${0.02 / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)}px`;
            
            focusedCustom.SetWidth(0.02)

        } else {
            if(focusedCustom instanceof CustomImage)
                focusedCustom.element.width = +inputElement.value / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)
            else
                focusedCustom.element.style.width = +inputElement.value / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin) + "px"
            
            focusedCustom.SetWidth(+inputElement.value)
        }

    }

    static InputHeight(ev: Event) : void{try{

        const inputElement = ev.target as HTMLInputElement;
        const focusedCustom = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom;
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspace.getBoundingClientRect()

        if(+inputElement.value > 0.6 || +inputElement.value < 0) {
            debugText("Input refused. Height is limited to 0 and 0.6.")
            return
        }

        if(focusedCustom.element.getBoundingClientRect().bottom - +inputElement.value / 0.6 * workspace.height < workspace.getBoundingClientRect().top) {
            debugText("Input refused. Image top edge will be out of screen.")
            return
        }

        if (ParameterEditor.CheckInputValue(+inputElement.value)) {
            if(focusedCustom instanceof CustomImage)
                focusedCustom.element.style.top = `${focusedCustom.element.offsetTop + focusedCustom.element.height - +0.02*rect.height/0.6}px`
            else {
                //const height = focusedCustom.element.style.height.slice(0, focusedCustom.element.style.height.indexOf("p")-1)
                focusedCustom.element.style.top = `${focusedCustom.element.offsetTop + focusedCustom.element.offsetHeight - +0.02*rect.height/0.6}px`
            }
            
            focusedCustom.element.style.height = `${+0.02 / 0.6 * workspace.getBoundingClientRect().height}px`;
            focusedCustom.SetHeight(0.02)

        } else {
            if(focusedCustom instanceof CustomImage)
                focusedCustom.element.style.top = `${focusedCustom.element.offsetTop + focusedCustom.element.height - +inputElement.value*rect.height/0.6}px`
            else {                
                //const height = focusedCustom.element.style.height.slice(0, focusedCustom.element.style.height.indexOf("p")-1)
                focusedCustom.element.style.top = `${focusedCustom.element.offsetTop + focusedCustom.element.offsetHeight - +inputElement.value*rect.height/0.6}px`
            }
            
            focusedCustom.element.style.height = `${+inputElement.value / 0.6 * workspace.getBoundingClientRect().height}px`;
            focusedCustom.SetHeight(+inputElement.value)
        }


    }catch(e) {alert(e)}}

    private static format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/; 
    static InputName(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;
        const text = inputElement.value;

        //checks only the first character if it is number or not
        if (+text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
            inputElement.value = ""
            debugText("Name can't start with a number")
        }

        //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
        if (this.format.test(text)) {
            inputElement.value = text.slice(0, text.length - 1)
            debugText("Special Characters refused")
        }

    }

    static ChangeName(ev: Event) : void{ try{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().SetName(inputElement.value);
        debugText('Name changed to "' + inputElement.value+'"');

    }catch(e){alert(e)}}

    static ChangeType(ev: Event) : void{

        const selectElement = ev.target as HTMLSelectElement;

        const selected = Editor.GetDocumentEditor().projectTree.GetSelectedFrame()

        selected.type = +selectElement.selectedOptions[0].value;

        let typeText = ""
        if(selected.type == 1) typeText = "Backdrop";
        if(selected.type == 2) typeText = "Button";
        debugText('Type changed to ' + typeText);

        Editor.GetDocumentEditor().parameterEditor.UpdateFields(selected);
        
    }
    
    static ChangeParent(ev: Event) : void{try{

        const selectElement = ev.target as HTMLSelectElement;
        const selectedFrame = Editor.GetDocumentEditor().projectTree.GetSelectedFrame()

        for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
            if(!el.parentOption) continue;
            
            if(el.parentOption == selectElement.selectedOptions[0]) {

                el.MakeParentTo(selectedFrame);
                break;

            }
        }
        debugText("Parent changed to "+selectedFrame.GetParent().GetName())

    }catch(e){alert(e)}}

    static InputCoordinateX(ev: Event) : void{
        const loc = (ev.target as HTMLInputElement).value;
        const editor = Editor.GetDocumentEditor();
        const rect = editor.workspaceImage.getBoundingClientRect()
        const image = editor.projectTree.GetSelectedFrame().custom.element
        const horizontalMargin = 240/1920*rect.width

        if(+loc > 0.8 || +loc < 0) {
            debugText("Input refused. X coordinate is limited to 0 and 0.8.")
            return
        }
        if(+loc + image.getBoundingClientRect().width/(rect.width-2*horizontalMargin)*0.8 > 0.8) {
            debugText("Input refused. Image right edge will be out of screen.")
            return
        }

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom.SetLeftXWithElement(+loc)

    }

    static InputCoordinateY(ev: Event) : void{ try{

        const loc = (ev.target as HTMLInputElement).value;
        const editor = Editor.GetDocumentEditor();
        const rect = editor.workspaceImage.getBoundingClientRect()
        const image = editor.projectTree.GetSelectedFrame().custom.element

        if(+loc > 0.6 || +loc < 0) {
            debugText("Input refused. Y coordinate is limited to 0 and 0.6.")
            return
        }
        if(+loc + image.getBoundingClientRect().height/rect.height*0.6 > 0.6) {
            debugText("Input refused. Image top edge will be out of screen.")
            return
        }

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom.SetBotYWithElement(+loc)

    }catch(e){alert(e)}}

    static TextInputDiskTexture(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        (Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom as CustomImage).SetDiskTexture(inputElement.value);
        debugText('Disk Texture changed.');

    }

    static ButtonInputDiskTexture(ev: Event) : void{
        const inputElement = ev.target as HTMLInputElement;
        const path = URL.createObjectURL(inputElement.files[0])
        
        const editor = Editor.GetDocumentEditor();
        (editor.projectTree.GetSelectedFrame().custom as CustomImage).SetDiskTexture(path);

        editor.parameterEditor.inputElementDiskTexture.value = path;
        debugText("Disk Texture changed. However, the app can't know the path of this texture.")
    }
    
    static InputWC3Texture(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        (Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom as CustomImage).SetWC3Texture(inputElement.value);
        debugText('WC3 Texture changed.');

    }
        
    static InputText(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom.SetText(inputElement.value);
        debugText("Text changed.");

    }
            
    static InputTrigVar(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        (Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom as CustomImage).SetTrigVar(inputElement.value);
        debugText("Triggered Variable changed.");

    }
            
    static InputTextScale(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;
        (Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom as CustomText).setScale(+inputElement.value);

    }
            
    static InputTextColor(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;
        (Editor.GetDocumentEditor().projectTree.GetSelectedFrame().custom as CustomText).setColor(inputElement.value);

    }

    public EmptyFields() : void {
        this.inputElementWidth.value         = ""
        this.inputElementHeight.value        = ""
        this.inputElementName.value          = ""
        this.selectElementType.value         = ""
        this.selectElementParent.value       = ""
        this.inputElementCoordinateX.value   = ""
        this.inputElementCoordinateY.value   = ""
        this.inputElementDiskTexture.value   = ""
        this.inputElementWC3Texture.value    = ""
        this.inputElementText.value          = ""
        this.inputElementTextBig.value       = ""
        this.inputElementTextScale.value     = ""
        this.inputElementTextColor.value          = "#FFFFFF"
        this.inputElementTrigVar.value       = ""
    
    }

    public DisableFields(disable: boolean) : void {
        this.inputElementWidth.disabled             = disable
        this.inputElementHeight.disabled            = disable
        this.inputElementName.disabled              = disable
        this.selectElementType.disabled             = disable
        this.selectElementParent.disabled           = disable
        this.inputElementCoordinateX.disabled       = disable
        this.inputElementCoordinateY.disabled       = disable
        this.inputElementDiskTexture.disabled       = disable
        this.buttonElementTextureBrowse.disabled   = disable
        this.inputElementWC3Texture.disabled        = disable
        this.inputElementText.disabled              = disable
        this.inputElementTrigVar.disabled           = disable
    }

    public UpdateFields(frame: FrameComponent) : void { try{

        const editor = Editor.GetDocumentEditor();

        const horizontalMargin = 240/1920*editor.workspaceImage.width
    
        if(frame && frame != Editor.GetDocumentEditor().projectTree.rootFrame) {        
            this.DisableFields(false)
    
            this.inputElementName.value = frame.GetName();

            if(frame.custom instanceof CustomImage) {
                this.inputElementWidth.value = InputEdit(frame.custom.element.width * 800 / (editor.workspaceImage.width - 2*horizontalMargin))
                this.inputElementHeight.value = InputEdit(frame.custom.element.height * 600 / editor.workspaceImage.height)
                
                this.inputElementDiskTexture.value = frame.custom.GetTexture()
                this.inputElementWC3Texture.value = frame.custom.textureWC3Path
                this.inputElementTrigVar.value = frame.custom.TrigVar
            } else {
                this.inputElementWidth.value = InputEdit(+frame.custom.element.offsetWidth * 800 / (editor.workspaceImage.width - 2*horizontalMargin))
                this.inputElementHeight.value = InputEdit(+frame.custom.element.offsetHeight * 600 / editor.workspaceImage.height)
                
                this.inputElementTextScale.value = frame.custom.scale+""
                this.inputElementTextColor.value = frame.custom.color
            }

            this.inputElementCoordinateX.value = `${InputEdit((frame.custom.element.offsetLeft - editor.workspaceImage.getBoundingClientRect().x - horizontalMargin)/(editor.workspaceImage.width - 2*horizontalMargin) * 800) }`;
            this.inputElementCoordinateY.value = `${InputEdit((editor.workspaceImage.getBoundingClientRect().bottom - frame.custom.element.getBoundingClientRect().bottom)/editor.workspaceImage.height * 600)}`;
            this.inputElementText.value = frame.custom.text
            this.inputElementTextBig.value = frame.custom.text
            
            this.fieldElement.style.display = "initial"
            this.fieldType.style.display = "initial"
            this.fieldTexture.style.display = "initial"
            this.fieldFunctionalityFull.style.display = "initial"
            this.fieldFunctionalityText.style.display = "initial"
            this.fieldFunctionalityVar.style.display = "initial"
            this.fieldGeneral.style.display = "none"
            this.fieldTextFrame.style.display = "none"
            

            if(frame.type == FrameType.BACKDROP || frame.type == FrameType.BUTTON) {
                this.selectElementType.selectedIndex = frame.type - 1
                this.fieldFunctionalityText.style.display = "none"

                if(frame.type == FrameType.BACKDROP) this.fieldFunctionalityFull.style.display = "none";
            
            } else {
                this.fieldType.style.display = "none"
                this.fieldTexture.style.display = "none"

                if(frame.type != FrameType.BROWSER_BUTTON && frame.type != FrameType.SCRIPT_DIALOG_BUTTON && frame.type != FrameType.TEXT_FRAME) {
                    if(frame.type == FrameType.INVIS_BUTTON) this.fieldFunctionalityText.style.display = "none";
                    else this.fieldFunctionalityFull.style.display = "none";
                }

                
                else if(frame.type == FrameType.TEXT_FRAME) {
                    this.fieldTextFrame.style.display = "initial";
                    this.fieldFunctionalityText.style.display = "none";
                    this.fieldFunctionalityVar.style.display = "none";
                }
            }

            const n = frame.type;
            if(n != FrameType.BUTTON && n != FrameType.SCRIPT_DIALOG_BUTTON 
            && n != FrameType.BROWSER_BUTTON && n != FrameType.INVIS_BUTTON) {
                this.inputElementTrigVar.disabled = true
                this.inputElementTrigVar.value = ""
            }

            if(n != FrameType.SCRIPT_DIALOG_BUTTON && n != FrameType.BROWSER_BUTTON) {
                this.inputElementText.disabled = true
                this.inputElementText.value = ""

            }
    
            const options = this.selectElementParent.options
    
            while(options.length > 0){
                options.remove(0);
            }
            
            let selected: HTMLOptionElement;
            for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
    
                if(el == frame) continue;
                options.add(el.parentOption)
                el.parentOption.selected = false;
                if(frame.GetParent() == el) selected = el.parentOption;
            }
            selected.selected = true;
    
        } else {
            this.DisableFields(true)
            this.EmptyFields()
            
            this.fieldElement.style.display = "none"
            this.fieldGeneral.style.display = "initial"

        }
    
    }catch(e){alert(e)}
    }
}