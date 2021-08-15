import { Editor } from '../Editor/Editor';
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder';
import { debugText } from '../Classes & Functions/Mini-Functions';
import CreateFrame from '../Commands/Implementation/CreateFrame';
import RemoveFrame from '../Commands/Implementation/RemoveFrame';
import DuplicateArrayCircular from '../Commands/Implementation/DuplicateArrayCircular';

export class GUIEvents {

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
            gameCoordsString = `Game X/Y: (${gameX} , ${gameY}). Client X/Y: (${ev.clientX}, ${ev.clientY})`;
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
        
        const command = new CreateFrame(selected.getParent(), builder);
        const newFrame = command.action();

        projectTree.select(newFrame);
        debugText('Duplicated.')

    }catch(e){alert(e)}}
    
    static DuplicateArrayCircular(centerX: number, centerY: number, radius: number, count: number, initAng: number) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        
        const command = new DuplicateArrayCircular(selected, centerX, centerY, radius, count, initAng);
        command.action();
        
        debugText('Duplicated Circular.')
    }catch(e){alert(e)}}

    static DuplicateArrayTable(LeftX: number, TopY: number, rows: number, columns: number, gapX: number, gapY: number) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        const parent = selected.getParent()
        
        let ind = 0;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++){
                if(i == 0 && j == 0) continue;
                // const frameBuilder =  new FrameBuilder()
                // frameBuilder.type = selected.type;
                // //frameBuilder.texture = selected.custom.element.src

                // const newFrame = parent.createAsChild(frameBuilder,1);
                // Object.keys(newFrame.custom).forEach( prop => {
                //     if(prop != 'frameComponent' && prop != 'element') newFrame.custom[prop] = selected.custom[prop];
                // })

                ind++;
                const builder = FrameBuilder.copy(selected)
                const newFrame = parent.createAsChild(builder);
                newFrame.setName(selected.getName() + 'T['+ind+']');

                const width = newFrame.custom.getWidth();
                const height = newFrame.custom.getHeight();

                const newX = LeftX + (width + gapX)*j 
                const newY = TopY + height - (height + gapY)*i
                newFrame.custom.setLeftX(newX) 
                newFrame.custom.setBotY(newY)
            }
        }
        
        selected.setName(selected.getName()+"T[00]")
        projectTree.select(selected);
        //Editor.GetDocumentEditor().parameterEditor.UpdateFields(newFrame);
        
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