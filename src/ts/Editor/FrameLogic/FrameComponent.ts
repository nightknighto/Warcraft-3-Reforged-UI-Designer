/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomImage } from "./CustomImage";
import { FrameBuilder } from "./FrameBuilder";
import { FrameType } from "./FrameType";

export class FrameComponent{

    private children : FrameComponent[];
    public readonly image : CustomImage;
    public readonly treeElement : HTMLElement;
    public ParentOption : HTMLOptionElement;

    public exist = true;
    private name : string;
    private static nameNumber = 0;

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
        
        li.innerText = frameBuildOptions.name+FrameComponent.nameNumber;
        ul.append(li);

        this.type = frameBuildOptions.type;
        this.name = frameBuildOptions.name+FrameComponent.nameNumber;
        this.treeElement = ul;
        this.children = [];
        this.image = new CustomImage(this,frameBuildOptions.texture,frameBuildOptions.width, frameBuildOptions.height, frameBuildOptions.x, frameBuildOptions.y);
        
        console.log("Again, needs to be a cleaner way to doing 'as any' fetching.");
        (ul as any).frameComponent = this;

        FrameComponent.nameNumber++;
    }catch(e){alert('FrameComp Const: '+e)}}

    public Append(childFrame : FrameComponent) : void{

        this.children.push(childFrame);
        this.treeElement.append(childFrame.treeElement);

    }

    /**If deleing = true, deletes the element. 
     * If false, then just removes from children, used to migrate to another parent */
    public RemoveChild(childFrame : FrameComponent, deleting : boolean) : void{

        const index = this.children.indexOf(childFrame);
        if(deleting) {
            childFrame.exist = false;

            if(index == -1){

                for(const child of this.children){

                    child.RemoveChild(childFrame, true);

                }

                return;
            }

            childFrame.RemoveAll();

            this.treeElement.removeChild(childFrame.treeElement);
            if(childFrame.image != null) childFrame.image.Delete();
        }
        this.children.splice(index, 1);
        
    }

    public RemoveAll() : void{

        for(const child of this.children){
            child.RemoveAll();
            child.treeElement.remove();
            child.exist = false;
            if(child.image != null) child.image.Delete();
        }

        this.children = [];

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