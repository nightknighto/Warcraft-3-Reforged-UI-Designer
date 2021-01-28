import { CustomImage } from "./CustomImage";

export class FrameComponent implements IterableIterator<FrameComponent>{

    private static TreePanelDiv : HTMLElement;

    private children : FrameComponent[];
    private image : CustomImage;
    private treeItem : HTMLElement;

    public static SetTreePanelDiv(treePanel : HTMLElement){
        FrameComponent.TreePanelDiv = treePanel;
    }

    public constructor(frameImage : CustomImage){

        this.image = frameImage;
        
        let ul : HTMLElement = document.createElement('ul');
        let li : HTMLElement = document.createElement('li');

        ul.append(li);
        li.innerText = this.image.name || 'Origin';

        this.treeItem = ul;

    }
    
    [Symbol.iterator](): IterableIterator<FrameComponent> {
        return this;
    }

    public next(): {done: boolean, value : FrameComponent}{

        return{
            done: false,
            value: this};

        return{
            done: true,
            value: null
        }
    }

    public append(childFrame : FrameComponent){

        this.children.push(childFrame);
        this.treeItem.append(childFrame.treeItem);

    }

    public removeChild(childFrame : FrameComponent){

        let index = this.children.indexOf(childFrame);

        if(index == -1){

            for(let child of this.children){

                child.removeChild(childFrame);

            }

            return;
        }

        childFrame.removeAll();

        this.treeItem.removeChild(childFrame.treeItem);
        this.children.slice(index, 1);
        if(this.image != null) this.image.Delete();
        
    }

    public removeAll(){

        for(let child of this.children){
            child.removeAll();
            child.treeItem.remove();
            if(this.image != null) this.image.Delete();
        }

        this.children = [];

    }

    public frameComponentFromImageDiv(imageDiv : HTMLElement) : FrameComponent{

        if(this.image != null && imageDiv === this.image.element) return this; 

        for(let child of this.children){

            let result = child.frameComponentFromImageDiv(imageDiv);

            if(result != null) return result;

        }

        return null;

    }

    public executeMethod(execFunc : (frame : FrameComponent) => void){

        for(let child of this.children){
            child.executeMethod(execFunc);
            execFunc(child);
        }

    }

    public getImage() : CustomImage{

        return this.image;

    }
}