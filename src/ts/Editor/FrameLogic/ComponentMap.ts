import CustomComplex from './CustomComplex'
import { FrameComponent } from './FrameComponent'

// export interface HTMLElement extends HTMLElement {
//     frameComponent: FrameComponent
//     parentElement: HTMLElement
// }

export class FrameMap {
    private static instance?: FrameMap

    static getInstance() {
        if (!FrameMap.instance) FrameMap.instance = new FrameMap()
        return FrameMap.instance
    }

    frameComponent: WeakMap<HTMLElement, FrameComponent>
    customComplex: WeakMap<HTMLDivElement, CustomComplex>

    private constructor() {
        this.frameComponent = new WeakMap()
        this.customComplex = new WeakMap()
    }
}
