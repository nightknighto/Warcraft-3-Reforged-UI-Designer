import { FrameType } from "./FrameType";
import { Editor } from "../Editor";
import SaveContainer from "../../Persistence/SaveContainer";
import { FrameComponent } from "./FrameComponent";
import CustomComplex, {CustomComplexProps} from "./CustomComplex";
import FrameBaseContent from "./FrameBaseContent";
import { ProjectTree } from "../ProjectTree";

export class FrameBuilder implements CustomComplexProps{

    public static frameNumber = 1;

    public width = 0.10;
    public height = 0.10;
    public x = 0.250;
    public y = 0.250;
    public z = 1;
    public name = 'Frame';
    public type: FrameType = FrameType.BACKDROP;
    public textureDiskPath = "";
    public textureWc3Path = "";
    public textureBackDiskPath = "";
    public textureBackWc3Path = ""
    public trigVar = "";
    public text = "Text";
    public scale = 1;
    public color = "#FFFFFF";
    public textHorAlign: "left" | "center" | "right" = "left"
    public textVerAlign: "center" | "start" | "flex-end" = "start"
    public autoId = false;

    public constructor(autoassignId : boolean) { 
        this.autoId = autoassignId;
    }

    public load(container: SaveContainer): void {

        const projectTree = Editor.GetDocumentEditor().projectTree;
        const originallySelectedFrame = projectTree.getSelectedFrame();

        if (!container.hasKey(FrameComponent.SAVE_KEY_NAME)) { console.error("Could not parse JSON."); return; }
        if (!container.hasKey(FrameComponent.SAVE_KEY_TYPE)) { console.error("Could not parse JSON."); return; }

        if (!container.hasKey(FrameBaseContent.SAVE_KEY_LEFTX)) { console.error("Could not parse JSON."); return; }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_BOTY)) { console.error("Could not parse JSON."); return; }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_HEIGHT)) { console.error("Could not parse JSON."); return; }
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_WIDTH)) { console.error("Could not parse JSON."); return; }

        this.name = container.load(FrameComponent.SAVE_KEY_NAME);
        this.type = container.load(FrameComponent.SAVE_KEY_TYPE);

        if(/.*[0-9]+/.test(this.name)){
            const index = this.name.search(/[0-9]+/);
            const frameNumber = Number.parseInt(this.name.slice(index));

            console.log(frameNumber);

            FrameBuilder.frameNumber = Math.max(FrameBuilder.frameNumber, frameNumber+1);
        }

        this.x = container.load(FrameBaseContent.SAVE_KEY_LEFTX);
        this.y = container.load(FrameBaseContent.SAVE_KEY_BOTY);
        this.height = container.load(FrameBaseContent.SAVE_KEY_HEIGHT);
        this.width = container.load(FrameBaseContent.SAVE_KEY_WIDTH);

        try{
            this.textureDiskPath = container.load(CustomComplex.SAVE_KEY_TEXTURE_DISK_PATH);
            this.textureWc3Path = container.load(CustomComplex.SAVE_KEY_TEXTURE_WC3_PATH);
            this.trigVar = container.load(CustomComplex.SAVE_KEY_TRIGGER_VARIABLE_NAME);
            this.textureBackDiskPath = container.load(CustomComplex.SAVE_KEY_TEXTURE_BACK_DISK_PATH)
            this.textureBackWc3Path = container.load(CustomComplex.SAVE_KEY_TEXTURE_BACK_WC3_PATH)
            console.log('textureDisk: '+this.textureDiskPath)
            console.log('textureWC3: '+this.textureWc3Path)
            console.log('textureBackDisk: '+this.textureBackDiskPath)
            console.log('textureBackWC3: '+this.textureBackWc3Path)
        }catch(e){alert('textures error: '+e)}
        // if (!container.hasKey(CustomComplex.SAVE_KEY_SCALE)) { console.error("Could not parse JSON."); return; }
        // if (!container.hasKey(CustomComplex.SAVE_KEY_COLOR)) { console.error("Could not parse JSON."); return; }

        try{
            this.text = container.load(CustomComplex.SAVE_KEY_TEXT);
            this.scale = container.load(CustomComplex.SAVE_KEY_SCALE);
            this.color = container.load(CustomComplex.SAVE_KEY_COLOR);
            this.textHorAlign = container.load(CustomComplex.SAVE_KEY_HorAlign)
            this.textVerAlign = container.load(CustomComplex.SAVE_KEY_VerAlign)
        }catch(e) {alert("Loading Error: Text Frame Options Missing.");}


        const frameComponent = projectTree.appendToSelected(this)
        
        try{
            frameComponent.setTooltip(container.load(FrameComponent.SAVE_KEY_TOOLTIP));
            frameComponent.custom.getElement().style.outlineColor = ProjectTree.outlineUnSelected_Tooltip
        }catch(e) {alert("Loading Error: Tooltip Info")}

        try{
            frameComponent.world_frame = container.load(FrameComponent.SAVE_KEY_WORLDFRAME);
        }catch(e) {console.log("Loading Error: world frame missing")}

        projectTree.select(frameComponent);

        if (container.hasKey(FrameComponent.SAVE_KEY_CHILDREN))
            for (const frameData of container.load(FrameComponent.SAVE_KEY_CHILDREN))
                new FrameBuilder(false).load(frameData);


        projectTree.select(originallySelectedFrame);

    }

    private static copyBuilder(frame : FrameBuilder) : FrameBuilder{

        const frameBuilder =  new FrameBuilder(false)

        for(const key in frameBuilder){
            frameBuilder[key] = frame[key];
        }
        
        return frameBuilder;

    }

    private static copyFrame(frame: FrameComponent): FrameBuilder{

        const frameBuilder =  new FrameBuilder(false)

        frameBuilder.name = frame.getName();
        frameBuilder.type = frame.type;
        frameBuilder.text = frame.custom.getText();
        frameBuilder.width = frame.custom.getWidth();
        frameBuilder.height = frame.custom.getHeight();
        frameBuilder.y = frame.custom.getBotY();
        frameBuilder.x = frame.custom.getLeftX();
        frameBuilder.z = frame.custom.getZIndex();
        frameBuilder.trigVar = frame.custom.getTrigVar();
        frameBuilder.textureDiskPath = frame.custom.getDiskTexture();
        frameBuilder.textureWc3Path = frame.custom.getWc3Texture();
        frameBuilder.textureBackDiskPath = frame.custom.getBackDiskTexture();
        frameBuilder.textureBackWc3Path = frame.custom.getBackWc3Texture();
        frameBuilder.color = frame.custom.getColor();
        frameBuilder.scale = frame.custom.getScale();
        frameBuilder.textHorAlign = frame.custom.getHorAlign()
        frameBuilder.textVerAlign = frame.custom.getVerAlign()

        return frameBuilder;

    }

    public static copy(frame : FrameComponent | FrameBuilder) : FrameBuilder{
        
        if(frame instanceof FrameComponent) return FrameBuilder.copyFrame(frame);
        else return FrameBuilder.copyBuilder(frame);

    }

}