import { FrameComponent } from './FrameComponent';
import { UpdateFields } from './UpdateFields';

export class ProjectTree{

    private static rootFrame : FrameComponent;
    private static selectedFrame : FrameComponent;

    static Initialize() {

        ProjectTree.rootFrame = new FrameComponent(null)
        ProjectTree.selectedFrame = ProjectTree.rootFrame;

    }

    static AppendToSelected( frame: FrameComponent) {

        this.selectedFrame.append(frame);
        UpdateFields(null)

    }

    static RemoveFrame( frame: FrameComponent){

        this.rootFrame.removeChild(frame);

    }

    static SelectImage (image : HTMLElement){

        ProjectTree.selectedFrame = this.rootFrame.frameComponentFromImageDiv(image);

    }

    static GetSelectedFrame () : FrameComponent{
        return ProjectTree.selectedFrame;
    }

    static GetRootFrame() : FrameComponent{
        return ProjectTree.rootFrame;
    }
}