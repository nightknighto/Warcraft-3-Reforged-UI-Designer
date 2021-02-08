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

        this.inputElementWidth.onchange              = ParameterEditor.InputWidth;
        this.inputElementHeight.onchange             = ParameterEditor.InputHeight;
        this.inputElementName.oninput               = ParameterEditor.InputName;
        this.inputElementName.onchange              = ParameterEditor.ChangeName;
        this.selectElementType.onchange             = ParameterEditor.ChangeType;
        this.selectElementParent.onchange           = ParameterEditor.ChangeParent;
        this.inputElementCoordinateX.onchange       = ParameterEditor.InputCoordinateX;
        this.inputElementCoordinateY.onchange       = ParameterEditor.InputCoordinateY;
        this.inputElementTexture.onchange           = ParameterEditor.InputTexture;

    }
    
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

        } else {
            focusedImage.element.width = +inputElement.value / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)
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

        } else {
            focusedImage.element.style.top = `${focusedImage.element.offsetTop + focusedImage.element.height - +inputElement.value*rect.height/0.6}px`
            focusedImage.element.style.height = `${+inputElement.value / 0.6 * workspace.getBoundingClientRect().height}px`;
        }


    }catch(e) {alert(e)};}

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

    static ChangeName(ev: Event){ try{

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().SetName(inputElement.value);
        debug('Name changed to "' + inputElement.value);

    }catch(e){alert(e)}}

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

    }catch(e){alert(e)}}

    static InputTexture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        Editor.GetDocumentEditor().projectTree.GetSelectedFrame().image.SetTexture(inputElement.value);
        debug('Texture changed.');

    }
}