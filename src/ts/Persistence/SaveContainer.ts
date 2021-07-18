export default class SaveContainer{

    private data : JSON;

    public constructor(){
        return this;
    }

    public save(key : string, value : any) : void{
        this.data[key] = value;
    }

    public load(key : string) : any{
        return this.data[key];
    }

    public remove(key : string) : void{
        this.data[key] = undefined;
    }

    public hasKey(key : string) : boolean{
        return this.data[key] != undefined
    }

    public exportToJSON() : JSON{
        return this.data;
    }

}