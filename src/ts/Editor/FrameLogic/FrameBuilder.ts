import { FrameType } from "./FrameType";
import { Editor } from "../Editor";
import SaveContainer from "../../Persistence/SaveContainer";
import { FrameComponent } from "./FrameComponent";
import { CustomImage } from "./CustomImage";
import { CustomText } from "./CustomText";
import FrameBaseContent from "./FrameBaseContent";

export class FrameBuilder{

    public static frameNumber = 1;

    public width = 0.20;
    public height = 0.20;
    public x = 0.250;
    public y = 0.250;
    public z = 1;
    public name = 'Frame';
    public type: FrameType = FrameType.BACKDROP;
    public texture = "";
    public wc3Texture = "";
    public trigVar = "";
    public text = "Text";
    public scale = 1;
    public color = "#FFFFFF";
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
        if (!container.hasKey(FrameBaseContent.SAVE_KEY_TEXT)) { console.error("Could not parse JSON."); return; }

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
        this.text = container.load(CustomText.SAVE_KEY_TEXT);

        if (this.type != FrameType.TEXT_FRAME) {
            if (!container.hasKey(CustomImage.SAVE_KEY_TEXTURE_DISK_PATH)) { console.error("Could not parse JSON."); return; }
            if (!container.hasKey(CustomImage.SAVE_KEY_TEXTURE_WC3_PATH)) { console.error("Could not parse JSON."); return; }
            if (!container.hasKey(CustomImage.SAVE_KEY_TRIGGER_VARIABLE_NAME)) { console.error("Could not parse JSON."); return; }

            this.texture = container.load(CustomImage.SAVE_KEY_TEXTURE_DISK_PATH);
            this.wc3Texture = container.load(CustomImage.SAVE_KEY_TEXTURE_WC3_PATH);
            this.trigVar = container.load(CustomImage.SAVE_KEY_TRIGGER_VARIABLE_NAME);
        }
        else {
            if (!container.hasKey(CustomText.SAVE_KEY_SCALE)) { console.error("Could not parse JSON."); return; }
            if (!container.hasKey(CustomText.SAVE_KEY_COLOR)) { console.error("Could not parse JSON."); return; }

            try{
                this.scale = container.load(CustomText.SAVE_KEY_SCALE);
                this.color = container.load(CustomText.SAVE_KEY_COLOR);
            }catch(e) {alert("Loading Error: Text Frame Options Missing.");}

        }

        const frameComponent = projectTree.appendToSelected(this)
        
        try{
            frameComponent.tooltip = container.load(FrameComponent.SAVE_KEY_TOOLTIP);
            frameComponent.custom.getElement().style.outlineColor = "rgba(220, 242, 19, 0.5)" //yellow
        }catch(e) {alert("Loading Error: Tooltip Info")}

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

        if(frame.custom instanceof CustomImage){
            frameBuilder.trigVar = frame.custom.getTrigVar();
            frameBuilder.texture = frame.custom.getDiskTexture();
            frameBuilder.wc3Texture = frame.custom.getWc3Texture();
        }
        else if(frame.custom instanceof CustomText){
            frameBuilder.color = frame.custom.getColor();
            frameBuilder.scale = frame.custom.getScale();
        }

        return frameBuilder;

    }

    public static copy(frame : FrameComponent | FrameBuilder) : FrameBuilder{
        
        if(frame instanceof FrameComponent) return FrameBuilder.copyFrame(frame);
        else return FrameBuilder.copyBuilder(frame);

    }

}