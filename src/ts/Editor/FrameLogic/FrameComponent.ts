/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "../Editor";
import { CustomImage } from "./CustomImage";
import { FrameBuilder } from "./FrameBuilder";
import { FrameType } from "./FrameType";
import Saveable from "../../Persistence/Saveable";
import SaveContainer from "../../Persistence/SaveContainer";
import { CustomText } from "./CustomText";
import FrameBaseContent from "./FrameBaseContent";

export class FrameComponent implements Saveable {

    public static readonly SAVE_KEY_NAME = "name";
    public static readonly SAVE_KEY_CHILDREN = "children";
    public static readonly SAVE_KEY_TYPE = "type";

    private name: string;
    private children: FrameComponent[];
    public type: FrameType;
    
    public readonly custom: FrameBaseContent;
    public readonly treeElement: HTMLElement;
    public parentOption: HTMLOptionElement;
    

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {

        if(!/.*[0-9][0-9]+/.test(newName)){
            const index = newName.search(/[0-9]+/);
            const name1 = newName.slice(0, index);
            let name2 = newName.slice(index);

            if(Number.parseInt(name2)/10 < 10){
                name2 = "0" + name2;
            }

            newName = name1 + name2;
        }

        this.name = newName;
        (this.treeElement.firstChild as HTMLElement).innerText = newName;
        if (this.parentOption) this.parentOption.text = newName;
    }

    public constructor(frameBuildOptions: FrameBuilder, zIndex : number) {
        try {

            const ul: HTMLElement = document.createElement('ul');
            const li: HTMLElement = document.createElement('li');

            ul.append(li);

            this.treeElement = ul;
            this.children = [];
            this.parentOption = document.createElement('option');
            if (this.type == FrameType.TEXT_FRAME)
                this.custom = new CustomText(this, frameBuildOptions.width, frameBuildOptions.height, frameBuildOptions.x, frameBuildOptions.y, zIndex, frameBuildOptions.text, frameBuildOptions.color, frameBuildOptions.scale);
            else
                this.custom = new CustomImage(this, frameBuildOptions.width, frameBuildOptions.height, frameBuildOptions.x, frameBuildOptions.y, zIndex, frameBuildOptions.text, frameBuildOptions.texture, frameBuildOptions.wc3Texture, frameBuildOptions.trigVar);

            this.setName(frameBuildOptions.name);
            this.type = frameBuildOptions.type;

            (ul as any).frameComponent = this;

            li.onclick = () => {
                Editor.GetDocumentEditor().projectTree.select(this);
            }

        } catch (e) { alert('FrameComp Const: ' + e) }
    }

    public save(container: SaveContainer): void {

        container.save(FrameComponent.SAVE_KEY_NAME, this.name);
        container.save(FrameComponent.SAVE_KEY_TYPE, this.type);
        this.custom.save(container);

        const childrenSaveArray = [];

        for (const child of this.children) {

            const childSaveContainer = new SaveContainer(null);
            child.save(childSaveContainer);
            childrenSaveArray.push(childSaveContainer);

        }

        if (childrenSaveArray.length > 0)
            container.save(FrameComponent.SAVE_KEY_CHILDREN, childrenSaveArray);

    }

    private appendFrame(frame: FrameComponent): void {

        this.children.push(frame);
        this.treeElement.append(frame.treeElement);

    }

    private removeFrame(whatFrame: FrameComponent): boolean {

        const childIndex = this.children.indexOf(whatFrame);

        if (childIndex == -1) return false;

        this.children.splice(childIndex, 1);

        return true;

    }

    public createAsChild(newFrame: FrameBuilder, zIndex : number): FrameComponent {
        const newChild = new FrameComponent(newFrame, zIndex);

        this.appendFrame(newChild);

        return newChild;
    }

    public destroy(): void {

        const parent = this.getParent();
        parent.removeFrame(this);

        for (const child of this.children) {
            parent.appendFrame(child);
        }

        this.treeElement.remove();
        if (this.custom != null) this.custom.delete();
        if (this.parentOption != null) this.parentOption.remove();

        Editor.GetDocumentEditor().parameterEditor.updateFields(null);
    }

    public makeParentTo(newChild: FrameComponent): boolean {

        if (newChild == this) return false;

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let traverseNode: FrameComponent = this;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let previousNode: FrameComponent = this;

        do {

            if (traverseNode == newChild) {

                newChild.removeFrame(previousNode);
                newChild.getParent().appendFrame(previousNode);

                break;
            }

            previousNode = traverseNode;
            traverseNode = traverseNode.getParent();

        } while (traverseNode != null);

        newChild.getParent().removeFrame(newChild);
        this.appendFrame(newChild);

    }

    public static GetFrameComponent(ProjectTreeElement: HTMLElement): FrameComponent {

        return (ProjectTreeElement as any).frameComponent;

    }

    public getChildren(): FrameComponent[] {
        return this.children;
    }

    public getParent(): FrameComponent {
        return FrameComponent.GetFrameComponent(this.treeElement.parentElement);
    }
}