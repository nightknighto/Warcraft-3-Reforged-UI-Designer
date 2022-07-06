import SaveContainer from "../../../Persistence/SaveContainer"
import { ProjectTree } from "../../ProjectTree"
import { FrameBuilder } from "../FrameBuilder"
import { FrameComponent } from "../FrameComponent"

export default abstract class BaseArray{
    protected ownerArray: boolean
    protected elements: FrameComponent[] = []
    protected arrayName: string;
    
    abstract create(): void;
    abstract destroy(): void

        public renameArray(name: string): void {
            this.elements.forEach( (el, i) => {
                // To keep the 'T' OR 'C' in the name
                el.setName(name + el.getName().substring(el.getName().indexOf('[')-1))
            })
            this.arrayName = name
        }

    public getArrayName(): string {
        return this.elements[0].getName().substring(0, this.elements[0].getName().indexOf('[')-1)
    }

    public abstract cloneProps(target: FrameComponent): void

    getUnselectedElement(): FrameComponent {
        for( const el of this.elements ) {
            if(ProjectTree.getSelected() != el) {
                return el
            }
        }
    }

    abstract save(container: SaveContainer): void
    
}