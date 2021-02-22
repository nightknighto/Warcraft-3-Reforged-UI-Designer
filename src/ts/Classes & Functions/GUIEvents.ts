import { debugGameCoordinates, workspaceImage, panelButton, treeButton } from '../Constants/Elements'
import { Editor } from '../Editor/Editor'
import { UpdateFields } from './UpdateFields'

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
            gameCoordsString = `Game X/Y: (${gameX} , ${gameY}). Client X/Y: (${ev.clientX}, ${ev.clientY})`;
            debugGameCoordinates.innerText = gameCoordsString;

        }

    }


    static DeleteSelectedImage(){
        let projectTree = Editor.GetDocumentEditor().projectTree;

        //projectTree.RemoveFrame(projectTree.GetSelectedFrame());
        let parent = projectTree.GetSelectedFrame().GetParent().RemoveChild(projectTree.GetSelectedFrame(), true)
        UpdateFields(null)
    }

    static PanelOpenClose() {
        let panel = document.getElementById("panelParameters")
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
    
    static TreeOpenClose() {
        let panel = document.getElementById("panelTree")
        if(panel.style.visibility == "visible") {
            panel.style.visibility = "hidden"
            treeButton.style.visibility = "visible"
        } else {
            panel.style.visibility = "visible"
        }
    }

}