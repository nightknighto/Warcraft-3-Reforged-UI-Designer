/* eslint-disable @typescript-eslint/no-explicit-any */
import { debugText } from "../../Classes & Functions/Mini-Functions";
import { FrameComponent } from "./FrameComponent";
import { Editor } from "../Editor";
import { ImageFunctions } from "../../Classes & Functions/ImageFunctions";
import SaveContainer from "../../Persistence/SaveContainer";
import FrameBaseContent from "./FrameBaseContent";

export class CustomImage extends FrameBaseContent {

    public static readonly SAVE_KEY_TEXTURE_DISK_PATH = "textureDiskPath";
    public static readonly SAVE_KEY_TEXTURE_WC3_PATH = "textureWc3Path"

    private textureDiskPath: string;
    private textureWc3Path: string;

    public getElement(): HTMLImageElement {
        return this.element as HTMLImageElement;
    }

    public getDiskTexture(): string {
        return this.textureDiskPath;
    }

    public setDiskTexture(newTexturePath: string): void {
        this.textureDiskPath = newTexturePath;
        (this.element as HTMLImageElement).src = newTexturePath;
    }

    public setWc3Texture(newTexturePath: string): void {
        this.textureWc3Path = newTexturePath;
    }

    public getWc3Texture(): string {
        return this.textureWc3Path;
    }

    public setText(Text: string): void {
        this.text = Text;
    }

    public constructor(frameComponent: FrameComponent, width: number, height: number, x: number, y: number, z: number, texturePath: string, wc3TexturePath: string) {
        try {

            const element = document.createElement('img');
            super(frameComponent, element, width, height, x, y, z);

            this.setDiskTexture(texturePath);
            this.setWc3Texture(wc3TexturePath);

            ImageFunctions(this);

            (this.element as any).customImage = this;

        } catch (e) { alert(e) }
    }

    public save(container: SaveContainer): void {

        super.save(container);
        container.save(CustomImage.SAVE_KEY_TEXTURE_DISK_PATH, this.textureDiskPath);
        container.save(CustomImage.SAVE_KEY_TEXTURE_WC3_PATH, this.textureWc3Path);

    }

    public delete(): void {

        this.element.remove()
        Editor.GetDocumentEditor().projectTree.select(null);

        debugText("Deleted CustomImage Object")
    }

    public static GetCustomImageFromHTMLImageElement(imageElement: HTMLImageElement): CustomImage {
        return (imageElement as any).customImage;
    }

}