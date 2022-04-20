/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "../Editor";
import { FrameBuilder } from "./FrameBuilder";
import { FrameType } from "./FrameType & FrameRequire";
import Saveable from "../../Persistence/Saveable";
import SaveContainer from "../../Persistence/SaveContainer";
import CustomComplex from "./CustomComplex";
import FrameBaseContent from "./FrameBaseContent";
import { ProjectTree } from "../ProjectTree";
import ChangeFrameParent from "../../Commands/Implementation/ChangeFrameParent";
import { ParameterEditor } from "../ParameterEditor";

export class FrameComponent implements Saveable {

	public static readonly SAVE_KEY_NAME = "name";
	public static readonly SAVE_KEY_CHILDREN = "children";
	public static readonly SAVE_KEY_TYPE = "type";
	public static readonly SAVE_KEY_TOOLTIP = "tooltip";
	public static readonly SAVE_KEY_WORLDFRAME = "world_frame";

	private name: string;
	private children: FrameComponent[];
	public type: FrameType;
	private tooltip = false;

	public world_frame = false;

	public readonly custom: CustomComplex;
	public readonly treeElement: HTMLElement;
	public parentOption: HTMLOptionElement;
	readonly layerDiv: HTMLDivElement;
	// private orderInParent = 0; 

	public FieldsAllowed: ElementFieldsAllowed = JSON.parse(JSON.stringify(defaultFieldsAllowed))

	public setTooltip(on: boolean): FrameComponent {
		this.tooltip = on
		let color = ProjectTree.outlineUnSelected
		if (on) color = ProjectTree.outlineUnSelected_Tooltip

		if (ProjectTree.getSelected() != this) {
			this.custom.getElement().style.outlineColor = color
		}

		return this
	}

	public getTooltip(): boolean {
		return this.tooltip;
	}

	public getName(): string {
		return this.name;
	}

	public setName(newName: string): void {

		if (/.*\[[0-9]\]/.test(newName)) {
			const name1 = newName.slice(0, newName.length - 2);
			let name2 = newName.slice(newName.length - 2);
			name2 = "0" + name2;
			newName = name1 + name2;
		}

		this.name = newName;
		(this.treeElement.firstChild as HTMLElement).innerText = newName;
		if (this.parentOption) this.parentOption.text = newName;
	}

	public constructor (frameBuildOptions: FrameBuilder) {
		try {

			const ul: HTMLElement = document.createElement('ul');
			const li: HTMLElement = document.createElement('li');

			ul.append(li);

			this.treeElement = ul;
			this.treeElement.setAttribute('style', 'cursor: pointer;')
			this.children = [];
			this.parentOption = document.createElement('option');
			this.type = frameBuildOptions.type;
			this.layerDiv = document.createElement("div")
			this.custom = new CustomComplex(this, frameBuildOptions.width, frameBuildOptions.height, frameBuildOptions.x, frameBuildOptions.y, frameBuildOptions.z, frameBuildOptions);

			this.setName(frameBuildOptions.name);

			(ul as any).frameComponent = this;

			li.onclick = () => {
				Editor.GetDocumentEditor().projectTree.select(this);
			}

			this.setupAllowedFields()

			if (!ProjectTree.ShowBorders) this.custom.getElement().style.outlineWidth = "0px";

		} catch (e) { alert('FrameComp Construc: ' + e) }
	}

	public save(container: SaveContainer): void {

		container.save(FrameComponent.SAVE_KEY_NAME, this.name);
		container.save(FrameComponent.SAVE_KEY_TYPE, this.type);
		container.save(FrameComponent.SAVE_KEY_TOOLTIP, this.tooltip);
		container.save(FrameComponent.SAVE_KEY_WORLDFRAME, this.world_frame);
		this.custom.save(container);

		const childrenSaveArray = [];

		for (const child of this.children) {

			const childSaveContainer = new SaveContainer(null);
			child.save(childSaveContainer);
			childrenSaveArray.push(childSaveContainer);

		}

		if (childrenSaveArray.length > 0)
			container.save(FrameComponent.SAVE_KEY_CHILDREN, childrenSaveArray);

	}

	private appendFrame(frame: FrameComponent): void {

		// if(!this.layerDiv) {
		//     this.layerDiv = document.createElement("div")
		//     this.getParent().layerDiv.appendChild(this.layerDiv)
		// }

		// this.layerDiv.appendChild(frame.custom.getElement())

		this.layerDiv.appendChild(frame.layerDiv)

		this.children.push(frame);
		this.treeElement.append(frame.treeElement);

	}

	private removeFrame(whatFrame: FrameComponent): boolean {

		const childIndex = this.children.indexOf(whatFrame);

		if (childIndex == -1) return false;

		this.children.splice(childIndex, 1);

		return true;

	}

	public createAsChild(newFrame: FrameBuilder): FrameComponent {
		const newChild = new FrameComponent(newFrame);

		this.appendFrame(newChild);
		if (!newChild.FieldsAllowed.parent) {
			new ChangeFrameParent(newChild, ProjectTree.inst().rootFrame).pureAction()
		}

		ProjectTree.refreshElements()
		return newChild;
	}

	public destroy(): void {

		const parent = this.getParent();
		parent.removeFrame(this);

		for (const child of this.children) {
			parent.appendFrame(child);
		}

		this.treeElement.remove();
		if (this.custom != null) this.custom.delete();
		if (this.parentOption != null) this.parentOption.remove();

		Editor.GetDocumentEditor().parameterEditor.updateFields(null);
	}

	public makeAsParentTo(newChild: FrameComponent): boolean {
		if (newChild == this) return false;

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let traverseNode: FrameComponent = this;
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let previousNode: FrameComponent = this;

		do {

			if (traverseNode == newChild) {

				newChild.removeFrame(previousNode);
				newChild.getParent().appendFrame(previousNode);

				break;
			}

			previousNode = traverseNode;
			traverseNode = traverseNode.getParent();

		} while (traverseNode != null);

		newChild.getParent().removeFrame(newChild);
		this.appendFrame(newChild);

	}

	public static GetFrameComponent(ProjectTreeElement: HTMLElement): FrameComponent {

		return (ProjectTreeElement as any).frameComponent;

	}

	public getChildren(): FrameComponent[] {
		return this.children;
	}

	public getParent(): FrameComponent {
		return FrameComponent.GetFrameComponent(this.treeElement.parentElement);
	}

	public changeOrigin(world_frame: boolean): FrameComponent {
		let parent: FrameComponent = this
		while (1) {

			if (parent.getParent().type == FrameType.ORIGIN) {
				if (world_frame) parent.world_frame = true;
				else parent.world_frame = false;
				console.log('world_frame: ' + parent.world_frame)
				break;
			}
			parent = parent.getParent()
		}

		return this
	}

	setupAllowedFields() {
		const i = this.type
		const ft = FrameType
		const f = this.FieldsAllowed

		//reset to default
		Object.assign(this.FieldsAllowed, defaultFieldsAllowed)



		const allowText = () => {
			f.text = true
			f.color = true
			f.scale = true
		}

		switch (i) {
			case ft.BROWSER_BUTTON:
				allowText()
				f.trigVar = true
				f.tooltip = false
				break;
			case ft.BUTTON:
				f.trigVar = true
				f.tooltip = false
				f.textures = true
				f.type = true

				break;
			case ft.SCRIPT_DIALOG_BUTTON:
				allowText()
				f.trigVar = true
				f.tooltip = false

				break;
			case ft.INVIS_BUTTON:
				f.trigVar = true
				f.tooltip = false

				break;
			case ft.BACKDROP:
				f.textures = true;
				f.type = true;

				break;
			case ft.CHECKBOX:
				f.trigVar = true;
				break;
			case ft.TEXT_FRAME:
				allowText()
				f.text = false
				f.textBig = true
				f.textAlign = true;
				break;
			case ft.HORIZONTAL_BAR:
				f.textures = true;
				f.tooltip = false;
				break;
			case ft.HOR_BAR_BACKGROUND:
				f.textures = true;
				f.backTextures = true;
				f.tooltip = false
				f.parent = false
				break;
			case ft.HOR_BAR_TEXT:
				f.textures = true;
				allowText()
				f.textAlign = true
				f.tooltip = false
				f.parent = false
				break;
			case ft.HOR_BAR_BACKGROUND_TEXT:
				f.textures = true;
				f.backTextures = true;
				allowText()
				f.textAlign = true
				f.tooltip = false
				f.parent = false
				break;
			case ft.TEXTAREA:
				f.color = true;
				f.textBig = true;
				break;
			case ft.EDITBOX:
				f.text = true;
				break;
			// case ft.CHECKBOX:
			//     f.trigVar = true;
			//     break;
			// case ft.CHECKBOX:
			//     f.trigVar = true;
			//     break;
			// case ft.CHECKBOX:
			//     f.trigVar = true;
			//     break;

			default:
				break;
		}


	}

}


interface ElementFieldsAllowed {
	text: boolean
	textBig: boolean
	type: boolean
	color: boolean
	scale: boolean
	textAlign: boolean
	textures: boolean;
	backTextures: boolean;
	trigVar: boolean;
	/**Default is true */
	parent: boolean
	/**Default is true */
	tooltip: boolean;
}

const defaultFieldsAllowed: ElementFieldsAllowed = {
	parent: true,
	tooltip: true,

	color: false,
	scale: false,
	text: false,
	textBig: false,
	textAlign: false,
	textures: false,
	backTextures: false,
	trigVar: false,
	type: false
}