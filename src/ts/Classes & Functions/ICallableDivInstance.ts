/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class ICallableDivInstance {
    public run: () => void

    public static call(ev: Event): void {
        ;((ev.currentTarget as any).instance as ICallableDivInstance).run()
    }

    public static setup(element: any, object: ICallableDivInstance): void {
        element.instance = object
    }
}
