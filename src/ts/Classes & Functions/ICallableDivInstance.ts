export abstract class ICallableDivInstance{

    public Run : Function;

    public static Call(ev : Event){
        (ev.target as any).instance.Run();
    }

    public static Setup(element : any, object : ICallableDivInstance){
        element.instance = object;
    }

}