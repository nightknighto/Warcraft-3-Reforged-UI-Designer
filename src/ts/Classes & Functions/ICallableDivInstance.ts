/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class ICallableDivInstance{

    public Run : (() => void);

    public static Call(ev : Event) : void{
        (ev.target as any).instance.Run();
    }

    public static Setup(element : any, object : ICallableDivInstance) : void{
        element.instance = object;
    }

}