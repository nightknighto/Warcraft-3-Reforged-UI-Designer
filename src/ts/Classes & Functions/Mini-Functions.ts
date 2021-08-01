import { Editor } from "../Editor/Editor";

export function debugText(stuff: string) : void{

    Editor.GetDocumentEditor().debugLine.innerText = stuff;
}

/**This will divide the number by 1000, then set precision to 4 */
export function InputEdit(value: number) : string {
    return (value /1000).toPrecision(4)
}