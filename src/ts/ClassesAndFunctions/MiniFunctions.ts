import { Editor } from '../Editor/Editor'
import { ParameterEditor } from '../Editor/ParameterEditor'
import { ProjectTree } from '../Editor/ProjectTree'

export function debugText(stuff: string): void {
    try {
        Editor.getInstance().debugLine.innerText = stuff
        const selected = ProjectTree.getSelected()

        if (selected) {
            //update Element Panel
            ParameterEditor.getInstance().updateFields(selected)
        }
    } catch (error) {
        console.log(error)
    }
}

/**This will divide the number by 1000, then set precision to 5 */
export function InputEdit(value: number): string {
    return (value / 1000).toFixed(5)
}
