import { workspace, debugGameCoordinates } from '../Constants/Elements'
import ProjectTree from './ProjectTree';
import { debug } from './Mini-Functions'

export class GUIEvents {

    static DisplayGameCoords(ev: MouseEvent) {

        let gameCoordsString: string;
        let workspaceRect: DOMRect = workspace.getBoundingClientRect();

        if (ev.x >= workspaceRect.left && ev.x <= workspaceRect.right
            && ev.y >= workspaceRect.top && ev.y <= workspaceRect.bottom) {

            let gameX = Math.floor((ev.x - workspaceRect.left) / workspace.offsetLeft * 800);
            let gameY = Math.floor(((780 - (ev.y - workspaceRect.top)) / workspace.offsetHeight * 600))
            gameCoordsString = 'Game X/Y: (' + gameX + ' , ' + gameY + ')';
            debugGameCoordinates.innerText = gameCoordsString;

        }

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
        let focusedImage = ProjectTree.GetSelectedImage();

        if (this.CheckInputValue(+inputElement.value)) {

            focusedImage.element.width = 20 / 800 * workspace.width;

        }

        else
            focusedImage.element.width = +inputElement.value / 800 * workspace.width

    }

    static InputHeight(ev: Event) {

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = ProjectTree.GetSelectedImage();

        if (this.CheckInputValue(+inputElement.value)) {

            focusedImage.element.height = 20 / 600 * workspace.height;

        }

        else
            focusedImage.element.height = +inputElement.value / 600 * workspace.height;


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

        ProjectTree.GetSelectedImage().UpdateName(inputElement.value);
        debug('Name changed to "' + inputElement.value);

    }

    static ChangeType(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        ProjectTree.GetSelectedImage().type = selectElement.selectedOptions[0].value;
        debug('Type changed to ' + selectElement.selectedOptions[0].value);
    }
    
    static ChangeParent(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        //needs some index to CustomImage to whatever bullshit going on.
        //ProjectTree.GetSelectedImage().parent = selectElement.selectedOption[0].value;

    }

    static InputCoordinateX(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        ProjectTree.GetSelectedImage().element.style.left = `${(+loc * workspace.width) / 800 + workspace.x}px`

    }

    static InputCoordinateY(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        ProjectTree.GetSelectedImage().element.style.top = `${workspace.height - ((+loc * workspace.height) / 600 + workspace.y)}px`

    }

    static InputTexture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        ProjectTree.GetSelectedImage().texturePath = inputElement.value;
        debug('Texture changed.');

    }

    static DeleteSelectedImage(ev: Event){

        ProjectTree.RemoveImage(ProjectTree.GetSelectedImage())

    }

}