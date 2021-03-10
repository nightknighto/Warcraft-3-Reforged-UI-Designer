/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomImage } from "./CustomImage";
import { FrameBuilder } from "./FrameBuilder";
import { FrameType } from "./FrameType";

export class FrameComponent{

    private children : FrameComponent[];
    public readonly image : CustomImage;
    public readonly treeElement : HTMLElement;
    public ParentOption : HTMLOptionElement;

    private name : string;
    public GetName() : string{
        return this.name;
    }

    public SetName(newName : string) : void{
        this.name = newName;
        (this.treeElement.firstChild as HTMLElement).innerText = newName;
        if(this.ParentOption) this.ParentOption.text = newName;
    }

    public type : FrameType;

    public constructor(frameBuildOptions : FrameBuilder){try{
        
        const ul : HTMLElement = document.createElement('ul');
        const li : HTMLElement = document.createElement('li');
        
        li.innerText = frameBuildOptions.name;
        ul.append(li);

        this.type = frameBuildOptions.type;
        this.name = frameBuildOptions.name;
        this.treeElement = ul;
        this.children = [];
        this.image = new CustomImage(this,frameBuildOptions.texture,frameBuildOptions.width, frameBuildOptions.height, frameBuildOptions.x, frameBuildOptions.y);
        
        console.log("Again, needs to be a cleaner way to doing 'as any' fetching.");
        (ul as any).frameComponent = this;

    }catch(e){alert('FrameComp Const: '+e)}}

    private AppendFrame(frame : FrameComponent) : void{
        this.children.push(frame);
        this.treeElement.append(frame.treeElement);
    }

    public CreateAsChild(newFrame : FrameBuilder) : FrameComponent{
        const newChild = new FrameComponent(newFrame);
        
        this.AppendFrame(newChild);

        return newChild;
    }

    public Destroy() : void{

        const parent = this.GetParent();

        for(const child of this.children) {
            parent.AppendFrame(child);
        }

        this.treeElement.remove();
        if(this.image != null) this.image.Delete();
    }

    public static GetFrameComponent(ProjectTreeElement : HTMLElement) : FrameComponent{

        console.log("'As any' fetching of frameComponents from HTMLElements");
        return (ProjectTreeElement as any).frameComponent;

    }

    public GetChildren() : FrameComponent[]{
        return this.children;
    }

    public GetParent() : FrameComponent{
        return FrameComponent.GetFrameComponent(this.treeElement.parentElement);
    }
}