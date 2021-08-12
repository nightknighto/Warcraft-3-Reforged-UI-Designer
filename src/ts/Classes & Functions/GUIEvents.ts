import { Editor } from '../Editor/Editor';
import { FrameBuilder } from '../Editor/FrameLogic/FrameBuilder';
import { debugText } from '../Classes & Functions/Mini-Functions';
import { CustomText } from '../Editor/FrameLogic/CustomText';
import { CustomImage } from '../Editor/FrameLogic/CustomImage';
import { FrameComponent } from '../Editor/FrameLogic/FrameComponent';

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
        const projectTree = Editor.GetDocumentEditor().projectTree;

        projectTree.getSelectedFrame().destroy();
    }

    static DuplicationAction(main: FrameComponent): FrameComponent{
        const frameBuilder =  new FrameBuilder(true)
        frameBuilder.type = main.type;
        
        const newFrame = main.getParent().createAsChild(frameBuilder,1);
        Object.keys(newFrame.custom).forEach( prop => {
            if(prop != 'frameComponent' && prop != 'element') newFrame.custom[prop] = main.custom[prop];
        })

        newFrame.custom.setText(main.custom.getText())
        if(newFrame.custom instanceof CustomImage) {
            newFrame.custom.setTrigVar((main.custom as CustomImage).getTrigVar())
            newFrame.custom.setDiskTexture((main.custom as CustomImage).getDiskTexture())
            newFrame.custom.setWc3Texture((main.custom as CustomImage).getWc3Texture())
            
        } else if(newFrame.custom instanceof CustomText) {
            newFrame.custom.setColor((main.custom as CustomText).getColor())
            newFrame.custom.setScale((main.custom as CustomText).getScale())
        }

        return newFrame
    }

    static DuplicateSelectedImage() : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();

        // const frameBuilder =  new FrameBuilder()
        // frameBuilder.type = selected.type;
        // if(selected.custom instanceof CustomImage) {
        //     frameBuilder.texture = selected.custom.getDiskTexture()
        // }
        

        // const newFrame = selected.getParent().createAsChild(frameBuilder,1);
        // Object.keys(newFrame.custom).forEach( prop => {
        //     if(prop != 'frameComponent' && prop != 'element') newFrame.custom[prop] = selected.custom[prop];
        // })

        const newFrame = GUIEvents.DuplicationAction(selected)
        newFrame.setName(selected.getName() + 'Copy');

        newFrame.custom.setLeftX(selected.custom.getLeftX()+0.03)
        newFrame.custom.setBotY(selected.custom.getBotY()-0.03)

        // if(newFrame.custom instanceof CustomImage) {
        //     newFrame.setTri((selected.custom as CustomImage).getDiskTexture())gVar
        // }
        
        projectTree.select(newFrame);
        Editor.GetDocumentEditor().parameterEditor.updateFields(newFrame);
        GUIEvents.RefreshElements()
        
        debugText('Duplicated.')
    }catch(e){alert(e)}}
    
    static DuplicateArrayCircular(CenterX: number, CenterY: number, radius: number, count: number, initAng: number) : void{try{
        const projectTree = Editor.GetDocumentEditor().projectTree;
        const selected = projectTree.getSelectedFrame();
        const parent = selected.getParent()
        
        const angDisp = Math.PI * 2 / count;
        let i;
        for(i = 0; i < count; i++) {
            // const frameBuilder =  new FrameBuilder()
            // frameBuilder.type = selected.type;
            // //frameBuilder.texture = selected.custom.element.src

            // const newFrame = parent.createAsChild(frameBuilder,1);
            // Object.keys(newFrame.custom).forEach( prop => {
            //     if(prop != 'frameComponent' && prop != 'element') newFrame.custom[prop] = selected.custom[prop];
            // })

            const newFrame = this.DuplicationAction(selected)
            newFrame.setName(selected.getName() + 'C['+i+']');

            const newX = CenterX + (radius)*Math.cos(initAng + angDisp*i)
            const newY = CenterY + (radius)*Math.sin(initAng + angDisp*i)
            newFrame.custom.setLeftX(newX) 
            newFrame.custom.setBotY(newY)
        }
        
        selected.setName(selected.getName()+"C["+(i+1)+"]")
        projectTree.select(selected);
        //Editor.GetDocumentEditor().parameterEditor.UpdateFields(newFrame);
        GUIEvents.RefreshElements()
        
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
                const newFrame = this.DuplicationAction(selected)
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
        GUIEvents.RefreshElements()
        
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

    static RefreshElements() : void {

        const editor = Editor.GetDocumentEditor();

        for(const el of editor.projectTree.getIterator()) {
          if(el.type == 0) { //base
            continue;
          }
          
          const image = el.custom.getElement()
          const rect = editor.workspaceImage.getBoundingClientRect() 
          const workspace = Editor.GetDocumentEditor().workspaceImage
          const horizontalMargin = 240/1920*rect.width
      
          const x = el.custom.getLeftX();
          const y = el.custom.getBotY();
          const w = el.custom.getWidth();
          const h = el.custom.getHeight();
      
          image.style.width = w / 0.8 * (workspace.width-2*horizontalMargin) + "px"
          image.style.height = `${+h / 0.6 * workspace.getBoundingClientRect().height}px`;

          image.style.left = `${ x*(rect.width-2*horizontalMargin)/0.8 + rect.left + horizontalMargin}px`
          image.style.top = `${rect.bottom - y*rect.height/0.6 - image.offsetHeight - 120}px`

          if(el.custom instanceof CustomText) {
              image.style.fontSize = (el.custom.getScale()) * rect.width / 100 + "px"
          }
      
        }
      }

}