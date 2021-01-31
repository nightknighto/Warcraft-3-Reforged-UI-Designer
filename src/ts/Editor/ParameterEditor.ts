import { debug } from '../Classes & Functions/Mini-Functions'
import { Editor } from './Editor';

export class ParameterEditor{

    public readonly parameterPanel              : HTMLElement;
    public readonly panelParameters             : HTMLElement;
    public readonly inputElementName            : HTMLInputElement 
    public readonly selectElementType           : HTMLSelectElement;
    public readonly selectElementParent         : HTMLSelectElement;
    public readonly inputElementWidth           : HTMLInputElement;
    public readonly inputElementHeight          : HTMLInputElement;
    public readonly inputElementCoordinates     : HTMLInputElement;
    public readonly inputElementCoordinateX     : HTMLInputElement;
    public readonly inputElementCoordinateY     : HTMLInputElement;
    public readonly inputElementTexture         : HTMLInputElement;
    public readonly btnElementTextureBrowse     : HTMLButtonElement;

    public constructor(){

        this.panelParameters                        = document.getElementById('panelParameters') as HTMLElement;
        this.inputElementName                       = document.getElementById('elementName') as HTMLInputElement;
        this.selectElementType                      = document.getElementById('elementType') as HTMLSelectElement;
        this.selectElementParent                    = document.getElementById('elementParent') as HTMLSelectElement;
        this.inputElementWidth                      = document.getElementById('elementWidth') as HTMLInputElement;
        this.inputElementHeight                     = document.getElementById('elementHeight') as HTMLInputElement;
        this.inputElementCoordinates                = document.getElementById('elementCoordinates') as HTMLInputElement;
        this.inputElementCoordinateX                = document.getElementById('elementCoordinateX') as HTMLInputElement;
        this.inputElementCoordinateY                = document.getElementById('elementCoordinateY') as HTMLInputElement;
        this.inputElementTexture                    = document.getElementById('elementTexture') as HTMLInputElement;
        this.btnElementTextureBrowse                = document.getElementById('buttonBrowseTexture') as HTMLButtonElement;

        this.inputElementWidth.disabled             = true
        this.inputElementHeight.disabled            = true
        this.inputElementName.disabled              = true
        this.selectElementType.disabled             = true
        this.selectElementParent.disabled           = true
        this.inputElementCoordinates.disabled       = true
        this.inputElementCoordinateX.disabled       = true
        this.inputElementCoordinateY.disabled       = true
        this.inputElementTexture.disabled           = true
        this.btnElementTextureBrowse.disabled       = true

        this.inputElementWidth.oninput              = ParameterEditor.InputWidth;
        this.inputElementHeight.oninput             = ParameterEditor.InputHeight;
        this.inputElementName.oninput               = ParameterEditor.InputName;
        this.inputElementName.onchange              = ParameterEditor.ChangeName;
        this.selectElementType.onchange             = ParameterEditor.ChangeType;
        this.selectElementParent.onchange           = ParameterEditor.ChangeParent;
        this.inputElementCoordinateX.onchange       = ParameterEditor.InputCoordinateX;
        this.inputElementCoordinateY.onchange       = ParameterEditor.InputCoordinateY;
        this.inputElementTexture.onchange           = ParameterEditor.InputTexture;

    }
    
    private static CheckInputValue(value : number) : boolean{

        let result = value < 20;
        if(result){

            debug("Minimal Value is 20.");
        }
        
        return !result;

    }

    static InputWidth(ev: Event) {

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;

        if (this.CheckInputValue(+inputElement.value)) {

            focusedImage.element.width = 20 / 800 * Editor.GetDocumentEditor().workspaceImage.width;

        }

        else
            focusedImage.element.width = +inputElement.value / 800 * Editor.GetDocumentEditor().workspaceImage.width

    }

    static InputHeight(ev: Event) {

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image;

        if (this.CheckInputValue(+inputElement.value)) {

            focusedImage.element.height = 20 / 600 * Editor.GetDocumentEditor().workspaceImage.height;

        }

        else
            focusedImage.element.height = +inputElement.value / 600 * Editor.GetDocumentEditor().workspaceImage.height;


    }

    private static format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 
    static InputName(ev: Event){

        let inputElement = ev.target as HTMLInputElement;
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

    static ChangeName(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().SetName(inputElement.value);
        debug('Name changed to "' + inputElement.value);

    }

    static ChangeType(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        throw "Needs a new class for this"
        //Editor.GetDocumentEditor().projectTree.GetSelectedFrame().type = selectElement.selectedOptions[0].value;
        debug('Type changed to ' + selectElement.selectedOptions[0].value);
    }
    
    static ChangeParent(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        //needs some index to CustomImage to whatever bullshit going on.
        //ProjectTree.GetSelectedImage().parent = selectElement.selectedOption[0].value;

    }

    static InputCoordinateX(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element.style.left = `${(+loc * Editor.GetDocumentEditor().workspaceImage.width) / 800 + Editor.GetDocumentEditor().workspaceImage.x}px`

    }

    static InputCoordinateY(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.element.style.top = `${Editor.GetDocumentEditor().workspaceImage.height - ((+loc * Editor.GetDocumentEditor().workspaceImage.height) / 600 + Editor.GetDocumentEditor().workspaceImage.y)}px`

    }

    static InputTexture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetTexture(inputElement.value);
        debug('Texture changed.');

    }
}