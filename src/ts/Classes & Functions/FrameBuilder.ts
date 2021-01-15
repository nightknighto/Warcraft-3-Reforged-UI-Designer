import { CustomImage } from "./CustomImage";
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
        let frame = new CustomImage('Frame ' + FrameBuilder.framesCreated , el, this.imageSource);
        ProjectTree.AddImage(frame);
        ImageFunctions(frame);
    }

}