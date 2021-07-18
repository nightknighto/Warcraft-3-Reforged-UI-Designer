export default class SaveContainer{

    private data = {};

    public constructor(){
        return this;
    }

    // eslint-disable-next-line
    public save(key : string, value : any) : void{
        this.data[key] = value;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(key : string) : any{
        return this.data[key];
    }

    public remove(key : string) : void{
        this.data[key] = undefined;
    }

    public hasKey(key : string) : boolean{
        return this.data[key] != undefined
    }

    public exportToJSON() : string{
        return JSON.stringify(this.data);
    }

}