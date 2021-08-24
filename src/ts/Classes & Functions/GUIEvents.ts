import { Editor } from '../Editor/Editor';
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder';
import { debugText } from '../Classes & Functions/Mini-Functions';
import CreateFrame from '../Commands/Implementation/CreateFrame';
import RemoveFrame from '../Commands/Implementation/RemoveFrame';
import DuplicateArrayCircular from '../Commands/Implementation/DuplicateArrayCircular';
import DuplicateArrayTable from '../Commands/Implementation/DuplicateArrayTable';

export class GUIEvents {
    static isInteracting = false

    static DisplayGameCoords(ev: MouseEvent) : void {

        const editor = Editor.GetDocumentEditor();
        const workspaceImage = editor.workspaceImage;

        const horizontalMargin = 240/1920*workspaceImage.width

        let gameCoordsString: string;
        const workspaceRect: DOMRect = workspaceImage.getBoundingClientRect();

        if (ev.x >= workspaceRect.left + horizontalMargin && ev.x <= workspaceRect.right - horizontalMargin
            && ev.y >= workspaceRect.top && ev.y <= workspaceRect.bottom) {

            const gameX = Math.floor((ev.x - workspaceRect.left - horizontalMargin) / (workspaceImage.width - 2*240/1920*workspaceImage.width) * 800)/1000;
            const gameY = Math.floor(600-((ev.y - workspaceRect.top) / workspaceImage.offsetHeight * 600))/1000
            gameCoordsString = `Game X/Y: (${gameX} , ${gameY})`;
            editor.debugGameCoordinates.innerText = gameCoordsString;

        }

    }

    static DeleteSelectedImage() : void{
        
        const command = new RemoveFrame(Editor.GetDocumentEditor().projectTree.getSelectedFrame());
        command.action();

    }

    static DuplicateSelectedImage() : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        const builder = FrameBuilder.copy(selected);

        builder.x = builder.x + 0.03;
        builder.y = builder.y - 0.03;
        builder.name += "Copy";
        
        const command = new CreateFrame(selected.getParent(), builder);
        command.action();

        debugText('Duplicated.')

    }catch(e){alert(e)}}
    
    static DuplicateArrayCircular(centerX: number, centerY: number, radius: number, count: number, initAng: number, ownerArray: boolean) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        
        const command = new DuplicateArrayCircular(selected, centerX, centerY, radius, count, initAng, ownerArray);
        command.action();
        
        debugText('Duplicated Circular.')
    }catch(e){alert(e)}}

    static DuplicateArrayTable(leftX: number, topY: number, rows: number, columns: number, gapX: number, gapY: number, ownerArray: boolean) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        
        const command = new DuplicateArrayTable(selected, rows, columns, leftX, topY, gapX, gapY, ownerArray);
        command.action();
        
        debugText('Duplicated Table form.')
    }catch(e){alert(e)}}

    static PanelOpenClose() : void {
        const panel = Editor.GetDocumentEditor().parameterEditor.panelParameters;
        const panelButton = Editor.GetDocumentEditor().panelButton;


        if(panel.style.visibility == "visible") {
            // panel.style.minWidth = "0";
            // panel.style.width = "0";
            panel.style.visibility = "hidden"
            panelButton.style.visibility = "visible"
            document.getElementById("img").style.display = "none"
            document.getElementById("imgBUTTON").style.display = "none"

        } else {
            // panel.style.minWidth = panelDefaultminSize;
            // panel.style.width = panelDefaultSize;
            panel.style.visibility = "visible"
            document.getElementById("img").style.display = "initial"
            document.getElementById("imgBUTTON").style.display = "initial"
        }
    }
    
    static TreeOpenClose() : void {
        const panel = document.getElementById("panelTree")
        const treeButton = Editor.GetDocumentEditor().treeButton;
        if(panel.style.visibility == "visible") {
            panel.style.visibility = "hidden"
            treeButton.style.visibility = "visible"
        } else {
            panel.style.visibility = "visible"
        }
    }

}