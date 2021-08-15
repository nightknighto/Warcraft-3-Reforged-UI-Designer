import { Queue } from 'queue-typescript';
import { CustomImage } from './FrameLogic/CustomImage';
import { FrameComponent } from './FrameLogic/FrameComponent';
import { FrameBuilder } from './FrameLogic/FrameBuilder';
import { FrameType } from './FrameLogic/FrameType';
import { Editor } from './Editor';
import Saveable from '../Persistence/Saveable';
import SaveContainer from '../Persistence/SaveContainer';
import { GUIEvents } from '../Classes & Functions/GUIEvents';
import { CustomText } from './FrameLogic/CustomText';

export class ProjectTree implements IterableIterator<FrameComponent>, Saveable {

    public static readonly SAVE_KEY_ORIGIN_CHILDREN = "frames";
    public static readonly SAVE_KEY_LIBRARY_NAME = "LibraryName";
    public static readonly SAVE_KEY_HIDE_GAMEUI = "GameUI";
    public static readonly SAVE_KEY_HIDE_HEROBAR = "HeroBar";
    public static readonly SAVE_KEY_HIDE_MINIMAP = "MiniMap";
    public static readonly SAVE_KEY_HIDE_RESOURCES = "Resources";
    public static readonly SAVE_KEY_HIDE_BUTTONBAR = "ButtonBar";
    public static readonly SAVE_KEY_HIDE_PORTRAIT = "Portrait";
    public static readonly SAVE_KEY_HIDE_CHAT = "Chat";

    public readonly rootFrame: FrameComponent;
    public readonly panelTree: HTMLElement;
    private selectedFrame: FrameComponent;

    public static LibraryName = "REFORGEDUIMAKER"
    public static HideGameUI = false;
    public static HideHeroBar = false;
    public static HideMiniMap = false;
    public static HideResources = false;
    public static HideButtonBar = false;
    public static HidePortrait = false;
    public static HideChat = false;

    public static saveGeneralOptions(): void {

        const par = Editor.GetDocumentEditor().parameterEditor
        ProjectTree.LibraryName = par.inputLibraryName.value;
        ProjectTree.HideGameUI = par.checkboxGameUI.checked
        ProjectTree.HideHeroBar = par.checkboxHeroBar.checked
        ProjectTree.HideMiniMap = par.checkboxMiniMap.checked
        ProjectTree.HideResources = par.checkboxResources.checked
        ProjectTree.HideButtonBar = par.checkboxButtonBar.checked
        ProjectTree.HidePortrait = par.checkboxPortrait.checked
        ProjectTree.HideChat = par.checkboxChat.checked
    }

    public constructor() {

        const originBuilder: FrameBuilder = new FrameBuilder(false);

        originBuilder.name = 'Origin';
        originBuilder.type = FrameType.ORIGIN;
        originBuilder.width = 0;
        originBuilder.height = 0;
        originBuilder.x = 0;
        originBuilder.y = 0;
        originBuilder.z = 30;

        this.rootFrame = new FrameComponent(originBuilder);
        this.rootFrame.setName('Origin')
        this.selectedFrame = this.rootFrame;

        this.panelTree = document.getElementById('panelTreeView');

        for (let i = this.panelTree.children.length - 1; i >= 0; i--) {

            this.panelTree.removeChild(this.panelTree.children[i]);

        }

        this.panelTree.appendChild(this.rootFrame.treeElement);

    }

    public save(container: SaveContainer): void {

        const originChildrenArray = [];

        for (const frame of this.rootFrame.getChildren()) {

            const frameSaveContainer = new SaveContainer(null);
            frame.save(frameSaveContainer);
            originChildrenArray.push(frameSaveContainer);

        }

        container.save(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN, originChildrenArray);
        container.save(ProjectTree.SAVE_KEY_LIBRARY_NAME, ProjectTree.LibraryName);
        container.save(ProjectTree.SAVE_KEY_HIDE_GAMEUI, ProjectTree.HideGameUI);
        container.save(ProjectTree.SAVE_KEY_HIDE_HEROBAR, ProjectTree.HideHeroBar);
        container.save(ProjectTree.SAVE_KEY_HIDE_MINIMAP, ProjectTree.HideMiniMap);
        container.save(ProjectTree.SAVE_KEY_HIDE_RESOURCES, ProjectTree.HideResources);
        container.save(ProjectTree.SAVE_KEY_HIDE_BUTTONBAR, ProjectTree.HideButtonBar);
        container.save(ProjectTree.SAVE_KEY_HIDE_PORTRAIT, ProjectTree.HidePortrait);
        container.save(ProjectTree.SAVE_KEY_HIDE_CHAT, ProjectTree.HideChat);

    }

    public appendToSelected(newFrame: FrameBuilder): FrameComponent {
        if (this.selectedFrame == null) {
            newFrame.z = this.rootFrame.custom.getZIndex() + this.rootFrame.getChildren().length + 1;
            return this.rootFrame.createAsChild(newFrame);
        }
        else {
            newFrame.z = this.selectedFrame.custom.getZIndex() + this.selectedFrame.getChildren().length + 1;
            return this.selectedFrame.createAsChild(newFrame);
        }
    }

    public getSelectedFrame(): FrameComponent {
        return this.selectedFrame;
    }

    public select(frame: FrameComponent | CustomImage | CustomText | HTMLImageElement | HTMLDivElement | HTMLElement): void {

        //should go to workspace class?
        if (this.selectedFrame != null) this.selectedFrame.custom.getElement().style.outlineColor = "rgba(0, 230, 64, 0.4)" //green

        if (frame instanceof FrameComponent) this.selectedFrame = frame;
        else if (frame instanceof CustomImage) this.selectedFrame = frame.getFrameComponent()
        else if (frame instanceof CustomText) this.selectedFrame = frame.getFrameComponent()
        else if (frame instanceof HTMLImageElement) this.selectedFrame = CustomImage.GetCustomImageFromHTMLImageElement(frame).getFrameComponent();
        else if (frame instanceof HTMLDivElement) this.selectedFrame = CustomText.GetCustomTextFromHTMLDivElement(frame).getFrameComponent();
        else if (frame instanceof HTMLElement) this.selectedFrame = FrameComponent.GetFrameComponent(frame);
        else {
            this.selectedFrame = null;
            return;
        }

        this.selectedFrame.custom.getElement().style.outlineColor = 'rgba(242, 38, 19, 0.4)'; //red

        Editor.GetDocumentEditor().parameterEditor.updateFields(this.selectedFrame);

    }

    public load(container: SaveContainer): void {

        if (container.hasKey(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN)) {
            //Clear the entire project tree first.
            for (const el of Editor.GetDocumentEditor().projectTree.getIterator()) {
                if (el.type == 0) { //Origin
                    continue;
                }
                el.destroy()
            }

            const frames = container.load(ProjectTree.SAVE_KEY_ORIGIN_CHILDREN);

            for (const frameData of frames) {

                const frameBuilder = new FrameBuilder(true);
                frameBuilder.load(frameData as SaveContainer);

            }
            GUIEvents.RefreshElements()

            ProjectTree.LibraryName = container.load(ProjectTree.SAVE_KEY_LIBRARY_NAME);
            ProjectTree.HideGameUI = container.load(ProjectTree.SAVE_KEY_HIDE_GAMEUI);
            ProjectTree.HideHeroBar = container.load(ProjectTree.SAVE_KEY_HIDE_HEROBAR);
            ProjectTree.HideMiniMap = container.load(ProjectTree.SAVE_KEY_HIDE_MINIMAP);
            ProjectTree.HideResources = container.load(ProjectTree.SAVE_KEY_HIDE_RESOURCES);
            ProjectTree.HideButtonBar = container.load(ProjectTree.SAVE_KEY_HIDE_BUTTONBAR);
            ProjectTree.HidePortrait = container.load(ProjectTree.SAVE_KEY_HIDE_PORTRAIT);
            ProjectTree.HideChat = container.load(ProjectTree.SAVE_KEY_HIDE_CHAT);


            //this should happen after those values are loaded
            const par = Editor.GetDocumentEditor().parameterEditor
            par.inputLibraryName.value = ProjectTree.LibraryName
            par.checkboxGameUI.checked = ProjectTree.HideGameUI
            par.checkboxHeroBar.checked = ProjectTree.HideHeroBar
            par.checkboxMiniMap.checked = ProjectTree.HideMiniMap
            par.checkboxResources.checked = ProjectTree.HideResources
            par.checkboxButtonBar.checked = ProjectTree.HideButtonBar
            par.checkboxPortrait.checked = ProjectTree.HidePortrait
            par.checkboxChat.checked = ProjectTree.HideChat
        }
        else {
            console.error("Could not parse JSON");
        }


    }

    //Iterator
    private iteratorQueue: Queue<FrameComponent>;

    public getIterator(): IterableIterator<FrameComponent> {

        this.iteratorQueue = new Queue<FrameComponent>();
        const tempQueue = new Queue<FrameComponent>();
        let currentNode: FrameComponent;

        this.iteratorQueue.enqueue(this.rootFrame);
        tempQueue.enqueue(this.rootFrame);

        do {
            currentNode = tempQueue.dequeue();

            for (const child of currentNode.getChildren()) {
                tempQueue.enqueue(child);
                this.iteratorQueue.enqueue(child);
            }

        } while (tempQueue.front != null);

        return this;
    }

    [Symbol.iterator](): IterableIterator<FrameComponent> {
        return this;
    }

    public next(): { done: boolean, value: FrameComponent } {
        const returnValue = this.iteratorQueue.dequeue();

        return {
            done: (returnValue == null) ? (true) : (false),
            value: returnValue
        };

    }
}