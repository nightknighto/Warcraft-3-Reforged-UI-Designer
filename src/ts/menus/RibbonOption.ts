
export class RibbonOption{

    private name : string;

    public constructor(name : string){

        this.name = name;

    }

    public CreateHTMLElement() : HTMLElement{

        let div = document.createElement('div');

        div.setAttribute('class', 'ribbonOption');
        div.innerText = this.name;

        return div;

    }


}