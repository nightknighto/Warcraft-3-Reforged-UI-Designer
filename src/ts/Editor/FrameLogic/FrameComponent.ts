/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "../Editor";
import { CustomImage } from "./CustomImage";
import { FrameBuilder } from "./FrameBuilder";
import { FrameType } from "./FrameType";

export class FrameComponent{

    private children : FrameComponent[];
    public readonly image : CustomImage;
    public readonly treeElement : HTMLElement;
    public parentOption : HTMLOptionElement;

    private name : string;
    public GetName() : string{
        return this.name;
    }

    public SetName(newName : string) : void{
        this.name = newName;
        (this.treeElement.firstChild as HTMLElement).innerText = newName;
        if(this.parentOption) this.parentOption.text = newName;
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
        this.parentOption = document.createElement('option');
        this.parentOption.text = this.name;

        console.log("Again, needs to be a cleaner way to doing 'as any' fetching.");
        (ul as any).frameComponent = this;

        li.onclick = () => {
            Editor.GetDocumentEditor().projectTree.Select(this);
        }

    }catch(e){alert('FrameComp Const: '+e)}}

    private AppendFrame(frame : FrameComponent) : void{

        this.children.push(frame);
        this.treeElement.append(frame.treeElement);

    }

    public RemoveFrame(whatFrame : FrameComponent) : boolean{

        const childIndex = this.children.indexOf(whatFrame);

        if(childIndex == -1) return false;

            this.children.splice(childIndex,1);

        return true;

    }

    public CreateAsChild(newFrame : FrameBuilder) : FrameComponent{
        const newChild = new FrameComponent(newFrame);
        
        this.AppendFrame(newChild);

        return newChild;
    }

    public Destroy() : void{

        const parent = this.GetParent();
        parent.RemoveFrame(this);

        for(const child of this.children) {
            parent.AppendFrame(child);
        }

        this.treeElement.remove();
        if(this.image != null) this.image.Delete();
        if(this.parentOption != null) this.parentOption.remove();
        
        Editor.GetDocumentEditor().parameterEditor.UpdateFields(null);
    }
    
    public MakeParentTo(newChild : FrameComponent) : boolean{

        if(newChild == this) return false;

        let traverseNode : FrameComponent = this; 
        let previousNode : FrameComponent = this;

        do{
            
            if(traverseNode == newChild) {

                newChild.RemoveFrame(previousNode);
                newChild.GetParent().AppendFrame(previousNode);
                
                break;
            }

            previousNode = traverseNode;
            traverseNode = traverseNode.GetParent();

        }while(traverseNode != null);

        newChild.GetParent().RemoveFrame(newChild);
        this.AppendFrame(newChild);

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