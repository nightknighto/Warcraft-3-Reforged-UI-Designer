import { workspace, debugGameCoordinates } from '../Constants/Elements'
import { ProjectTree } from './ProjectTree';
import { debug } from './Mini-Functions'
import { remote } from 'electron';

export class GUIEvents {

    static DisplayGameCoords(ev: MouseEvent) {
        const horizontalMargin = 240/1920*workspace.width

        let gameCoordsString: string;
        let workspaceRect: DOMRect = workspace.getBoundingClientRect();

        if (ev.x >= workspaceRect.left + horizontalMargin && ev.x <= workspaceRect.right - horizontalMargin
            && ev.y >= workspaceRect.top && ev.y <= workspaceRect.bottom) {

            let gameX = Math.floor((ev.x - workspaceRect.left - horizontalMargin) / (workspace.width - 2*240/1920*workspace.width) * 800)/1000;
            let gameY = Math.floor(600-((ev.y - workspaceRect.top) / workspace.offsetHeight * 600))/1000
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
        let focusedImage = ProjectTree.GetSelectedFrame().getImage();

        if (this.CheckInputValue(+inputElement.value)) {

            focusedImage.element.width = 20 / 800 * workspace.width;

        }

        else
            focusedImage.element.width = +inputElement.value / 800 * workspace.width

    }

    static InputHeight(ev: Event) {

        let inputElement = ev.target as HTMLInputElement;
        let focusedImage = ProjectTree.GetSelectedFrame().getImage();

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

        ProjectTree.GetSelectedFrame().getImage().UpdateName(inputElement.value);
        debug('Name changed to "' + inputElement.value);

    }

    static ChangeType(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        ProjectTree.GetSelectedFrame().getImage().type = selectElement.selectedOptions[0].value;
        debug('Type changed to ' + selectElement.selectedOptions[0].value);
    }
    
    static ChangeParent(ev: Event){

        let selectElement = ev.target as HTMLSelectElement;

        //needs some index to CustomImage to whatever bullshit going on.
        //ProjectTree.GetSelectedImage().parent = selectElement.selectedOption[0].value;

    }

    static InputCoordinateX(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        ProjectTree.GetSelectedFrame().getImage().element.style.left = `${(+loc * workspace.width) / 800 + workspace.x}px`

    }

    static InputCoordinateY(ev: Event){

        const loc = (ev.target as HTMLInputElement).value;

        ProjectTree.GetSelectedFrame().getImage().element.style.top = `${workspace.height - ((+loc * workspace.height) / 600 + workspace.y)}px`

    }

    static InputTexture(ev: Event){

        let inputElement = ev.target as HTMLInputElement;

        ProjectTree.GetSelectedFrame().getImage().texturePath = inputElement.value;
        debug('Texture changed.');

    }

    static DeleteSelectedImage(ev: Event){

        ProjectTree.RemoveFrame(ProjectTree.GetSelectedFrame())

    }

    static CloseApplication(ev: Event){

        remote.app.quit();

    }

    static MaximizeWindow(ev: Event){

        const window = remote.getCurrentWindow();
        //cannot unmaximize...
        if(window.isMaximized()){
            window.unmaximize();
            console.log("Unmaximized");
        }
        else{
            window.maximize();
            console.log("Maximized");
        }
    }

    static MinimizeWindow(ev: Event){

        remote.getCurrentWindow().minimize();

    }

    static DragWindow(ev: Event){

        const window = remote.getCurrentWindow();
        //Dragging functionality goes here

    }

}