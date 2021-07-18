import { debugGameCoordinates, workspaceImage, panelButton, treeButton } from '../Constants/Elements';
import { Editor } from '../Editor/Editor';
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder';
import { debugText } from '../Classes & Functions/Mini-Functions';

export class GUIEvents {

    static DisplayGameCoords(ev: MouseEvent) : void {
        const horizontalMargin = 240/1920*workspaceImage.width

        let gameCoordsString: string;
        const workspaceRect: DOMRect = workspaceImage.getBoundingClientRect();

        if (ev.x >= workspaceRect.left + horizontalMargin && ev.x <= workspaceRect.right - horizontalMargin
            && ev.y >= workspaceRect.top && ev.y <= workspaceRect.bottom) {

            const gameX = Math.floor((ev.x - workspaceRect.left - horizontalMargin) / (workspaceImage.width - 2*240/1920*workspaceImage.width) * 800)/1000;
            const gameY = Math.floor(600-((ev.y - workspaceRect.top) / workspaceImage.offsetHeight * 600))/1000
            gameCoordsString = `Game X/Y: (${gameX} , ${gameY}). Client X/Y: (${ev.clientX}, ${ev.clientY})`;
            debugGameCoordinates.innerText = gameCoordsString;

        }

    }


    static DeleteSelectedImage() : void{
        const projectTree = Editor.GetDocumentEditor().projectTree;

        projectTree.RemoveFrame(projectTree.GetSelectedFrame());
    }

    static DuplicateSelectedImage() : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.GetSelectedFrame();

        const frameBuilder =  new FrameBuilder()
        frameBuilder.type = selected.type;
        frameBuilder.texture = selected.image.element.src
        frameBuilder.name = selected.GetName() + 'Copy';

        const newFrame = selected.GetParent().CreateAsChild(frameBuilder);
        Object.keys(newFrame.image).forEach( prop => {
            if(prop != 'frameComponent' && prop != 'element') newFrame.image[prop] = selected.image[prop];
        })

        newFrame.image.SetLeftX(selected.image.LeftX+0.03)
        newFrame.image.SetBotY(selected.image.BotY-0.03)
        
        projectTree.Select(newFrame);
        Editor.GetDocumentEditor().parameterEditor.UpdateFields(newFrame);
        GUIEvents.RefreshElements()
        
        debugText('Duplicated.')
    }catch(e){alert(e)}}
    
    static DuplicateArrayCircular(CenterX: number, CenterY: number, radius: number, count: number, initAng: number) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.GetSelectedFrame();
        const parent = selected.GetParent()
        
        const angDisp = Math.PI * 2 / count;
        for(let i = 0; i < count; i++) {
            const frameBuilder =  new FrameBuilder()
            frameBuilder.type = selected.type;
            frameBuilder.texture = selected.image.element.src
            frameBuilder.name = selected.GetName() + 'Circ'+i;

            const newFrame = parent.CreateAsChild(frameBuilder);
            Object.keys(newFrame.image).forEach( prop => {
                if(prop != 'frameComponent' && prop != 'element') newFrame.image[prop] = selected.image[prop];
            })

            //const width = newFrame.image.width;
            //const height = newFrame.image.height;

            const newX = CenterX + (radius)*Math.cos(initAng + angDisp*i)
            const newY = CenterY + (radius)*Math.sin(initAng + angDisp*i)
            newFrame.image.SetLeftX(newX) 
            newFrame.image.SetBotY(newY)
        }
        
        projectTree.Select(selected);
        //Editor.GetDocumentEditor().parameterEditor.UpdateFields(newFrame);
        GUIEvents.RefreshElements()
        
        debugText('Duplicated Circular.')
    }catch(e){alert(e)}}

    static DuplicateArrayTable(LeftX: number, TopY: number, rows: number, columns: number, gapX: number, gapY: number) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.GetSelectedFrame();
        const parent = selected.GetParent()
        
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++){
                if(i == 0 && j == 0) continue;
                const frameBuilder =  new FrameBuilder()
                frameBuilder.type = selected.type;
                frameBuilder.texture = selected.image.element.src
                frameBuilder.name = selected.GetName() + 'Table'+i+j;

                const newFrame = parent.CreateAsChild(frameBuilder);
                Object.keys(newFrame.image).forEach( prop => {
                    if(prop != 'frameComponent' && prop != 'element') newFrame.image[prop] = selected.image[prop];
                })

                const width = newFrame.image.width;
                const height = newFrame.image.height;

                const newX = LeftX + (width + gapX)*j 
                const newY = TopY + height - (height + gapY)*i
                newFrame.image.SetLeftX(newX) 
                newFrame.image.SetBotY(newY)
            }
        }
        
        projectTree.Select(selected);
        //Editor.GetDocumentEditor().parameterEditor.UpdateFields(newFrame);
        GUIEvents.RefreshElements()
        
        debugText('Duplicated Table form.')
    }catch(e){alert(e)}}

    static PanelOpenClose() : void {
        const panel = document.getElementById("panelParameters")
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
        if(panel.style.visibility == "visible") {
            panel.style.visibility = "hidden"
            treeButton.style.visibility = "visible"
        } else {
            panel.style.visibility = "visible"
        }
    }

    static RefreshElements() : void {
        for(const el of Editor.GetDocumentEditor().projectTree.GetIterator()) {
          if(el.type == 0) { //base
            continue;
          }
          
          const image = el.image.element
          const rect = workspaceImage.getBoundingClientRect() 
          const workspace = Editor.GetDocumentEditor().workspaceImage
          const horizontalMargin = 240/1920*rect.width
      
          const x = el.image.LeftX
          const y = el.image.BotY
          const w = el.image.width
          const h = el.image.height
      
          image.width = w / 0.8 * (Editor.GetDocumentEditor().workspaceImage.width-2*horizontalMargin)
          image.style.height = `${+h / 0.6 * workspace.getBoundingClientRect().height}px`;
      
          image.style.left = `${ x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
          image.style.top = `${rect.bottom - y*rect.height/0.6 - image.height - 120}px`
      
        }
      }

}