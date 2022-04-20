import { Editor } from '../Editor/Editor'
import { ParameterEditor } from '../Editor/ParameterEditor'
import { ProjectTree } from '../Editor/ProjectTree'

export function debugText(stuff: string): void {
    Editor.GetDocumentEditor().debugLine.innerText = stuff

    if (ProjectTree.getSelected()) {
        //update Element Panel
        ParameterEditor.inst().updateFields(ProjectTree.getSelected())
    }
}

/**This will divide the number by 1000, then set precision to 5 */
export function InputEdit(value: number): string {
    return (value / 1000).toFixed(5)
}
