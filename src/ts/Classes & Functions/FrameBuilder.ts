import { CustomImage } from "./CustomImage";
import { FrameComponent } from "./FrameComponent";
import { ICallableDivInstance } from "./ICallableDivInstance";
import { ImageFunctions } from "./ImageFunctions";
import { ProjectTree } from "./ProjectTree";

export class FrameBuilder implements ICallableDivInstance{

    private static framesCreated = 0;

    private imageSource : string;
    

    public constructor(imageFilename : string){

        this.imageSource = imageFilename;

    }

    public Run(){

        let el = document.createElement('img');
        let frameImage = new CustomImage('Frame ' + FrameBuilder.framesCreated , el, this.imageSource);
        let frame = new FrameComponent(frameImage);
        ProjectTree.AppendToSelected(frame);
        ImageFunctions(frameImage);
    }

}