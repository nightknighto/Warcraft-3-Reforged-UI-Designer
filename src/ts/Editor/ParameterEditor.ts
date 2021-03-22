import { debugText } from '../Classes & Functions/Mini-Functions'
import { Editor } from './Editor';
import { workspaceImage } from '../Constants/Elements';
import * as Element from "../Constants/Elements";
import { InputEdit } from "../Classes & Functions/Mini-Functions";
import { FrameComponent } from './FrameLogic/FrameComponent';

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
    public readonly butttonElementTextureBrowse : HTMLButtonElement;

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
        this.inputElementTrigVar                    = document.getElementById('elementTrigVar') as HTMLInputElement;
        this.butttonElementTextureBrowse            = document.getElementById('buttonBrowseTexture') as HTMLButtonElement;

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
        this.inputElementWC3Texture.onchange        = ParameterEditor.InputWC3Texture;
        this.inputElementText.onchange              = ParameterEditor.InputText;
        this.inputElementTrigVar.onchange           = ParameterEditor.InputTrigVar;

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
        const focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspaceImage.getBoundingClientRect()
        const horizontalMargin = 240/1920*rect.width

        if(+inputElement.value > 0.8 || +inputElement.value < 0) {
            debugText("Input refused. Width is limited to 0 and 0.8.")
            return
        }

        if(focusedImage.element.getBoundingClientRect().left + +inputElement.value / 0.8 * (workspace.width-2*horizontalMargin) > workspace.getBoundingClientRect().right-horizontalMargin) {
            debugText("Input refused. Image right edge will be out of screen.")
            return
        }

        if (ParameterEditor.CheckInputValue(+inputElement.value)) {

            focusedImage.element.width = 0.02 / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin);
            focusedImage.SetWidth(0.02)

        } else {
            focusedImage.element.width = +inputElement.value / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)
            focusedImage.SetWidth(+inputElement.value)
        }

    }

    static InputHeight(ev: Event) : void{try{

        const inputElement = ev.target as HTMLInputElement;
        const focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;
        const workspace = Editor.GetDocumentEditor().workspaceImage
        const rect = workspaceImage.getBoundingClientRect()

        if(+inputElement.value > 0.6 || +inputElement.value < 0) {
            debugText("Input refused. Height is limited to 0 and 0.6.")
            return
        }

        if(focusedImage.element.getBoundingClientRect().bottom - +inputElement.value / 0.6 * workspace.height < workspace.getBoundingClientRect().top) {
            debugText("Input refused. Image top edge will be out of screen.")
            return
        }

        if (ParameterEditor.CheckInputValue(+inputElement.value)) {

            focusedImage.element.style.top = `${focusedImage.element.offsetTop + focusedImage.element.height - +0.02*rect.height/0.6}px`
            focusedImage.element.style.height = `${+0.02 / 0.6 * workspace.getBoundingClientRect().height}px`;
            focusedImage.SetHeight(0.02)

        } else {
            focusedImage.element.style.top = `${focusedImage.element.offsetTop + focusedImage.element.height - +inputElement.value*rect.height/0.6}px`
            focusedImage.element.style.height = `${+inputElement.value / 0.6 * workspace.getBoundingClientRect().height}px`;
            focusedImage.SetHeight(+inputElement.value)
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

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type = +selectElement.selectedOptions[0].value;

        let typeText = ""
        if(Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type == 1) typeText = "Backdrop";
        if(Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type == 2) typeText = "Button";
        debugText('Type changed to ' + typeText);
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
        debugText(selectedFrame.GetParent().GetName())

    }catch(e){alert(e)}}

    static InputCoordinateX(ev: Event) : void{
        const loc = (ev.target as HTMLInputElement).value;
        const rect = workspaceImage.getBoundingClientRect()
        const image = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element
        const horizontalMargin = 240/1920*rect.width

        if(+loc > 0.8 || +loc < 0) {
            debugText("Input refused. X coordinate is limited to 0 and 0.8.")
            return
        }
        if(+loc + image.getBoundingClientRect().width/(rect.width-2*horizontalMargin)*0.8 > 0.8) {
            debugText("Input refused. Image right edge will be out of screen.")
            return
        }

        debugText(`${ +loc*rect.width/0.8 + rect.left + horizontalMargin}px`)
        image.style.left = `${ +loc*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetLeftX(+loc)

    }

    static InputCoordinateY(ev: Event) : void{ try{

        const loc = (ev.target as HTMLInputElement).value;
        const rect = workspaceImage.getBoundingClientRect()
        const image = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element

        if(+loc > 0.6 || +loc < 0) {
            debugText("Input refused. Y coordinate is limited to 0 and 0.6.")
            return
        }
        if(+loc + image.getBoundingClientRect().height/rect.height*0.6 > 0.6) {
            debugText("Input refused. Image top edge will be out of screen.")
            return
        }
        //alert(`${rect.bottom}, ${+loc*rect.height/0.6}, ${image.height}, ${rect.bottom - +loc*rect.height/0.6 - image.height}`)
        image.style.top = `${rect.bottom - +loc*rect.height/0.6 - image.height - 120}px`
        //Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element.style.bottom = `${Editor.GetDocumentEditor().workspaceImage.height - ((+loc * Editor.GetDocumentEditor().workspaceImage.height) / 600 + Editor.GetDocumentEditor().workspaceImage.y)}px`
        //image.style.top = `${workspaceImage.height - ((+loc * workspaceImage.height) / 0.6 + workspaceImage.y)}px`
        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetBotY(+loc)

    }catch(e){alert(e)}}

    static TextInputDiskTexture(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetDiskTexture(inputElement.value);
        debugText('Disk Texture changed.');

    }

    static ButtonInputDiskTexture(ev: Event) : void{
        const inputElement = ev.target as HTMLInputElement;
        const path = URL.createObjectURL(inputElement.files[0])
        

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetDiskTexture(path);
        
        Element.inputElementDiskTexture.value = path
        debugText("Disk Texture changed. However, the app can't know the path of this texture.")
    }
    
    static InputWC3Texture(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetWC3Texture(inputElement.value);
        debugText('WC3 Texture changed.');

    }
        
    static InputText(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetText(inputElement.value);
        debugText("Text changed.");

    }
            
    static InputTrigVar(ev: Event) : void{

        const inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetTrigVar(inputElement.value);
        debugText("Triggered Variable changed.");

    }

    public EmptyFields() {
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
        this.inputElementTrigVar.value       = ""
    
    }

    public DisableFields(disable: boolean) {
        this.inputElementWidth.disabled             = disable
        this.inputElementHeight.disabled            = disable
        this.inputElementName.disabled              = disable
        this.selectElementType.disabled             = disable
        this.selectElementParent.disabled           = disable
        this.inputElementCoordinateX.disabled       = disable
        this.inputElementCoordinateY.disabled       = disable
        this.inputElementDiskTexture.disabled       = disable
        this.butttonElementTextureBrowse.disabled   = disable
        this.inputElementWC3Texture.disabled        = disable
        this.inputElementText.disabled              = disable
        this.inputElementTrigVar.disabled           = disable
    }

    public UpdateFields(frame: FrameComponent) : void { try{
        const horizontalMargin = 240/1920*Element.workspaceImage.width
    
        if(frame && frame != Editor.GetDocumentEditor().projectTree.rootFrame) {        
            this.DisableFields(false)
    
            this.inputElementName.value = frame.GetName();
            this.inputElementWidth.value = InputEdit(frame.image.element.width * 800 / (Element.workspaceImage.width - 2*horizontalMargin))
            this.inputElementHeight.value = InputEdit(frame.image.element.height * 600 / Element.workspaceImage.height)
            this.inputElementCoordinateX.value = `${InputEdit((frame.image.element.offsetLeft - Element.workspaceImage.getBoundingClientRect().x - horizontalMargin)/(Element.workspaceImage.width - 2*horizontalMargin) * 800) }`;
            this.inputElementCoordinateY.value = `${InputEdit((Element.workspaceImage.getBoundingClientRect().bottom - frame.image.element.getBoundingClientRect().bottom)/Element.workspaceImage.height * 600)}`;
            this.inputElementDiskTexture.value = frame.image.GetTexture()
            this.inputElementWC3Texture.value = frame.image.textureWC3Path
            this.inputElementText.value = frame.image.text
            this.inputElementTrigVar.value = frame.image.TrigVar
            
            if(frame.type == 1 || frame.type == 2) {
                Element.selectElementType.disabled = false
                Element.selectElementType.selectedIndex = frame.type - 1
            } else {
                Element.selectElementType.disabled = true
            }
    
            const options = Element.selectElementParent.options
    
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
        }
    
    }catch(e){alert(e)}
    }
}