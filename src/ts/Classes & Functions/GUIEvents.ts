import { debugGameCoordinates, workspaceImage } from '../Constants/Elements'
import { Editor } from '../Editor/Editor'

const panelDefaultSize = document.getElementById("panelParameters").style.width
const panelDefaultminSize = document.getElementById("panelParameters").style.minWidth
const TreeDefaultSize = document.getElementById("panelTree").style.width

export class GUIEvents {

    static DisplayGameCoords(ev: MouseEvent) {
        const horizontalMargin = 240/1920*workspaceImage.width

        let gameCoordsString: string;
        let workspaceRect: DOMRect = workspaceImage.getBoundingClientRect();

        if (ev.x >= workspaceRect.left + horizontalMargin && ev.x <= workspaceRect.right - horizontalMargin
            && ev.y >= workspaceRect.top && ev.y <= workspaceRect.bottom) {

            let gameX = Math.floor((ev.x - workspaceRect.left - horizontalMargin) / (workspaceImage.width - 2*240/1920*workspaceImage.width) * 800)/1000;
            let gameY = Math.floor(600-((ev.y - workspaceRect.top) / workspaceImage.offsetHeight * 600))/1000
            gameCoordsString = 'Game X/Y: (' + gameX + ' , ' + gameY + ')';
            debugGameCoordinates.innerText = gameCoordsString;

        }

    }


    static DeleteSelectedImage(){
        let projectTree = Editor.GetDocumentEditor().projectTree;

        projectTree.RemoveFrame(projectTree.GetSelectedFrame());

    }

    static PanelOpenClose() {
        let panel = document.getElementById("panelParameters")
        let table = document.getElementById("tableParameters")
        if(panel.style.width == panelDefaultSize) {
            panel.style.minWidth = "0";
            panel.style.width = "0";
            table.style.display = "none"
            document.getElementById("img").style.display = "none"
            document.getElementById("imgBUTTON").style.display = "none"

        } else {
            panel.style.minWidth = panelDefaultminSize;
            panel.style.width = panelDefaultSize;
            table.style.display = "initial"
            document.getElementById("img").style.display = "initial"
            document.getElementById("imgBUTTON").style.display = "initial"
        }
    }
    
    static TreeOpenClose() {
        let panel = document.getElementById("panelTree")
        if(panel.style.width == TreeDefaultSize) {
            panel.style.width = "0";
        } else {
            panel.style.width = TreeDefaultSize;
        }
    }

}