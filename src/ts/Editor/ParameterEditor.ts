/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { debug } from '../Classes & Functions/Mini-Functions'
import { Editor } from './Editor';
import { workspaceImage } from '../Constants/Elements';

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
    public readonly btnElementTextureBrowse     : HTMLButtonElement;
    public readonly inputElementWC3Texture   : HTMLInputElement;
    public readonly inputElementText            : HTMLInputElement;
    public readonly inputElementTrigVar         : HTMLInputElement;

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
        this.btnElementTextureBrowse                = document.getElementById('buttonBrowseTexture') as HTMLButtonElement;
        this.inputElementWC3Texture              = document.getElementById('elementWC3Texture') as HTMLInputElement;
        this.inputElementText                       = document.getElementById('elementText') as HTMLInputElement;
        this.inputElementTrigVar                    = document.getElementById('elementTrigVar') as HTMLInputElement;

        this.inputElementWidth.disabled             = true
        this.inputElementHeight.disabled            = true
        this.inputElementName.disabled              = true
        this.selectElementType.disabled             = true
        this.selectElementParent.disabled           = true
        this.inputElementCoordinateX.disabled       = true
        this.inputElementCoordinateY.disabled       = true
        this.inputElementDiskTexture.disabled       = true
        this.btnElementTextureBrowse.disabled       = true
        this.inputElementWC3Texture.disabled     = true
        this.inputElementText.disabled              = true
        this.inputElementTrigVar.disabled           = true
        

        this.inputElementWidth.onchange              = ParameterEditor.InputWidth;
        this.inputElementHeight.onchange             = ParameterEditor.InputHeight;
        this.inputElementName.oninput               = ParameterEditor.InputName;
        this.inputElementName.onchange              = ParameterEditor.ChangeName;
        this.selectElementType.onchange             = ParameterEditor.ChangeType;
        this.selectElementParent.onchange           = ParameterEditor.ChangeParent;
        this.inputElementCoordinateX.onchange       = ParameterEditor.InputCoordinateX;
        this.inputElementCoordinateY.onchange       = ParameterEditor.InputCoordinateY;
        this.inputElementDiskTexture.onchange           = ParameterEditor.InputDiskTexture;
        this.inputElementWC3Texture.onchange       = ParameterEditor.InputWC3Texture;
        this.inputElementText.onchange                = ParameterEditor.InputText;
        this.inputElementTrigVar.onchange             = ParameterEditor.InputTrigVar;

    }
    
    /** checks whether value is smaller than 0.2. True if smaller. */
    private static CheckInputValue(value : number) : boolean{

        let result = value < 0.02;
        if(result){

            debug("Minimum Value is 0.02.");
        }
        
        return result;

    }

    static InputWidth(ev: Event) {

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;
        let workspace = Editor.GetDocumentEditor().workspaceImage
        let rect = workspaceImage.getBoundingClientRect()
        const horizontalMargin = 240/1920*rect.width

        if(+inputElement.value > 0.8) {
            debug("Input refused. Width is limited to 0 and 0.8.")
            return
        }

        if(focusedImage.element.getBoundingClientRect().left + +inputElement.value / 0.8 * (workspace.width-2*horizontalMargin) > workspace.getBoundingClientRect().right-horizontalMargin) {
            debug("Input refused. Image right edge will be out of screen.")
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

    static InputHeight(ev: Event) {try{

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;
        let workspace = Editor.GetDocumentEditor().workspaceImage
        let rect = workspaceImage.getBoundingClientRect()

        if(+inputElement.value > 0.6) {
            debug("Input refused. Height is limited to 0 and 0.6.")
            return
        }

        if(focusedImage.element.getBoundingClientRect().bottom - +inputElement.value / 0.6 * workspace.height < workspace.getBoundingClientRect().top) {
            debug("Input refused. Image top edge will be out of screen.")
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


    }catch(e) {alert(e)};}

    private static format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 
    static InputName(ev: Event){

        const inputElement = ev.target as HTMLInputElement;
        const text = inputElement.value;

        //checks only the first character if it is number or not
        if (+text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
            inputElement.value = ""
            debug("Name can't start with a number")
        }

        //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
        if (this.format.test(text)) {
            inputElement.value = text.slice(0, text.length - 1)
            debug("Special Characters refused")
        }

    }

    static ChangeName(ev: Event){ try{

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().SetName(inputElement.value);
        debug('Name changed to "' + inputElement.value+'"');

    }catch(e){alert(e)}}

    static ChangeType(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type = +selectElement.selectedOptions[0].value;

        let typeText = ""
        if(Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type == 1) typeText = "Backdrop";
        if(Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type == 2) typeText = "Button";
        debug('Type changed to ' + typeText);
    }
    
    static ChangeParent(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        //
        //selectElement.options.item(0).selected
        //needs some index to CustomImage to whatever bullshit going on.
        //ProjectTree.GetSelectedImage().parent = selectElement.selectedOption[0].value;

    }

    static InputCoordinateX(ev: Event){
        const loc = (ev.target as HTMLInputElement).value;
        let rect = workspaceImage.getBoundingClientRect()
        let image = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element
        const horizontalMargin = 240/1920*rect.width

        if(+loc > 0.8) {
            debug("Input refused. X coordinate is limited to 0 and 0.8.")
            return
        }
        if(+loc + image.getBoundingClientRect().width/(rect.width-2*horizontalMargin)*0.8 > 0.8) {
            debug("Input refused. Image right edge will be out of screen.")
            return
        }

        debug(`${ +loc*rect.width/0.8 + rect.left + horizontalMargin}px`)
        image.style.left = `${ +loc*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetLeftX(+loc)

    }

    static InputCoordinateY(ev: Event){ try{

        const loc = (ev.target as HTMLInputElement).value;
        let rect = workspaceImage.getBoundingClientRect()
        let image = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element

        if(+loc > 0.6) {
            debug("Input refused. Y coordinate is limited to 0 and 0.6.")
            return
        }
        if(+loc + image.getBoundingClientRect().height/rect.height*0.6 > 0.6) {
            debug("Input refused. Image top edge will be out of screen.")
            return
        }
        //alert(`${rect.bottom}, ${+loc*rect.height/0.6}, ${image.height}, ${rect.bottom - +loc*rect.height/0.6 - image.height}`)
        image.style.top = `${rect.bottom - +loc*rect.height/0.6 - image.height - 120}px`
        //Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element.style.bottom = `${Editor.GetDocumentEditor().workspaceImage.height - ((+loc * Editor.GetDocumentEditor().workspaceImage.height) / 600 + Editor.GetDocumentEditor().workspaceImage.y)}px`
        //image.style.top = `${workspaceImage.height - ((+loc * workspaceImage.height) / 0.6 + workspaceImage.y)}px`
        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetBotY(+loc)

    }catch(e){alert(e)}}

    static InputDiskTexture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetDiskTexture(inputElement.value);
        debug('Disk Texture changed.');

    }
    
    static InputWC3Texture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetWC3Texture(inputElement.value);
        debug('WC3 Texture changed.');

    }
        
    static InputText(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetText(inputElement.value);
        debug("Text changed.");

    }
            
    static InputTrigVar(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetTrigVar(inputElement.value);
        debug("Triggered Variable changed.");

    }
}