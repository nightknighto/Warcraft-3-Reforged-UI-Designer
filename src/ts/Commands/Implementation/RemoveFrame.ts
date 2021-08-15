import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";

export default class RemoveFrame{

    private frame: FrameComponent;

    public constructor(frame: FrameComponent){
        this.frame = frame;
    }

    public action(): void{

        this.frame.destroy();

    }

}