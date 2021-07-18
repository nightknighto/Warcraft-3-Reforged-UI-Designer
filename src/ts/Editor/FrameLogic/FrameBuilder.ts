import { FrameType } from "./FrameType";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";
import { debugText } from "../../Classes & Functions/Mini-Functions";
import SaveContainer from "../../Persistence/SaveContainer";
import { FrameComponent } from "./FrameComponent";
import { CustomImage } from "./CustomImage";

export class FrameBuilder implements ICallableDivInstance{

    public static frameNumber = 1;

    public width = 0.20;
    public height = 0.20;
    public x = 0.250;
    public y = 0.250;
    public name = 'Frame';
    public type : FrameType = FrameType.BACKDROP;
    public texture = "";
    
    public constructor(){ return this; }

    //Used for ICallableDivInstance, aka Insert Menu
    public Run() : void{
        
        const name = this.name;

        this.name += `${FrameBuilder.frameNumber++}`;
        Editor.GetDocumentEditor().projectTree.AppendToSelected(this);

        this.name = name;
        debugText('Element Created')
    }

    public load(container: SaveContainer) : void{

        const projectTree = Editor.GetDocumentEditor().projectTree;
        const originallySelectedFrame = projectTree.GetSelectedFrame();

        if (!container.hasKey(FrameComponent.SAVE_KEY_NAME)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(FrameComponent.SAVE_KEY_TYPE)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_BOTY)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_HEIGHT)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_LEFTX)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_TEXT)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_TEXTURE_DISK_PATH)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_TEXTURE_WC3_PATH)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_TRIGGER_VARIABLE_NAME)) {console.error("Could not parse JSON."); return; }
        if (!container.hasKey(CustomImage.SAVE_KEY_WIDTH)) {console.error("Could not parse JSON."); return; }


        this.name = container.load(FrameComponent.SAVE_KEY_NAME);
        this.type = container.load(FrameComponent.SAVE_KEY_TYPE);
        this.texture = container.load(CustomImage.SAVE_KEY_TEXTURE_DISK_PATH);
        this.x = container.load(CustomImage.SAVE_KEY_LEFTX);
        this.y = container.load(CustomImage.SAVE_KEY_BOTY);
        this.height = container.load(CustomImage.SAVE_KEY_HEIGHT);
        this.width = container.load(CustomImage.SAVE_KEY_WIDTH);

        const FrameComp = projectTree.AppendToSelected(this)
        FrameComp.image.load(container)


        projectTree.Select(FrameComp);

        if(container.hasKey(FrameComponent.SAVE_KEY_CHILDREN))
            for(const frameData of container.load(FrameComponent.SAVE_KEY_CHILDREN))
                new FrameBuilder().load(frameData);
        

        projectTree.Select(originallySelectedFrame);

    }

}