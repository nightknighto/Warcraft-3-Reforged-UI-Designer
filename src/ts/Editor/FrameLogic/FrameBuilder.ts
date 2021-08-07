import { FrameType } from "./FrameType";
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance";
import { Editor } from "../Editor";
import { debugText } from "../../Classes & Functions/Mini-Functions";
import SaveContainer from "../../Persistence/SaveContainer";
import { FrameComponent } from "./FrameComponent";
import { CustomImage } from "./CustomImage";
import { GUIEvents } from "../../Classes & Functions/GUIEvents";
import { CustomText } from "./CustomText";
import FrameBaseContent from "./FrameBaseContent";

export class FrameBuilder implements ICallableDivInstance {

    public static frameNumber = 1;

    public width = 0.20;
    public height = 0.20;
    public x = 0.250;
    public y = 0.250;
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

    //Used for ICallableDivInstance, aka Insert Menu
    public run(): void {

        const name = this.name;

        if(this.autoId){
            if(FrameBuilder.frameNumber / 10 < 10){
                this.name += "0" + `${FrameBuilder.frameNumber++}`;
            }
            else{
                this.name += `${FrameBuilder.frameNumber++}`;
            }
        }
        
        Editor.GetDocumentEditor().projectTree.appendToSelected(this);

        this.name = name;
        debugText('Element Created')

        GUIEvents.RefreshElements()
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

            this.scale = container.load(CustomText.SAVE_KEY_SCALE);
            this.color = container.load(CustomText.SAVE_KEY_COLOR);

        }

        const frameComponent = projectTree.appendToSelected(this)

        projectTree.select(frameComponent);

        if (container.hasKey(FrameComponent.SAVE_KEY_CHILDREN))
            for (const frameData of container.load(FrameComponent.SAVE_KEY_CHILDREN))
                new FrameBuilder(false).load(frameData);


        projectTree.select(originallySelectedFrame);

    }

}