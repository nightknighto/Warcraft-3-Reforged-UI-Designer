import { CustomImage } from './CustomImage';

export class ProjectTree{

    private static images : CustomImage[] = [];
    private static currentSelectedIndex = 0;

    static GetIndex( image: CustomImage) : number{

        return this.images.indexOf(image);

    }

    static AddImage( image: CustomImage) {
        this.images.push(image);
    }

    static RemoveImage( image: CustomImage){

        let index = this.GetIndex(image);

        if(index == -1) return;

        this.images.slice(index, 1);

    }

    static PopulateSelect( selectMenu : HTMLSelectElement){

        for(let index = length-1 ; index >= 0; index--){

            selectMenu.remove(index);

        }

        for(let image of this.images){
            selectMenu.add(image.toOption());
        }
        
    }

    static SelectImage (image : CustomImage){

        let index = this.GetIndex(image);

        if (index == -1) return;

        this.currentSelectedIndex = index;

    }

    static GetSelectedImage () : CustomImage{
        return this.images[this.currentSelectedIndex];
    }

    static getImages() : CustomImage[]{
        return ProjectTree.images;
    }

}