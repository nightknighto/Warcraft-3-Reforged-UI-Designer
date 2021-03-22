import { CustomImage } from "../Editor/FrameLogic/CustomImage";
import { debugText, InputEdit } from "./Mini-Functions"
import { workspaceImage, inputElementCoordinateX, inputElementCoordinateY, inputElementHeight, inputElementWidth } from "../Constants/Elements"
import { Editor } from "../Editor/Editor";

let horizontalMargin = 240/1920*workspaceImage.width //width changes so this variable is changed

export function ImageFunctions(img: CustomImage) : void{
    img.element.onmousedown = function (e) {
        horizontalMargin = 240/1920*workspaceImage.width //refresh the value

        Editor.GetDocumentEditor().projectTree.Select(img);
        
        let posx1 = e.clientX;
        let posy1 = e.clientY;
        let posx2 = 0;
        let posy2 = 0;
        
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.element.getBoundingClientRect().x) > 5 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 5 && (e.clientY - img.element.getBoundingClientRect().y) > 5 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;

                debugText(`(${img.element.offsetLeft},${img.element.offsetTop})`);
                debugText('drag')
                if (((img.element.offsetLeft - posx2) - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / workspaceImage.offsetWidth * 800 >= 0 && ((img.element.offsetLeft - posx2 + img.element.width) - (workspaceImage.getBoundingClientRect().x - horizontalMargin)) / workspaceImage.offsetWidth * 800 <= 800) {
                    img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                }

                if (workspaceImage.getBoundingClientRect().bottom - (img.element.getBoundingClientRect().bottom - posy2) >= 0 && workspaceImage.getBoundingClientRect().top - (img.element.getBoundingClientRect().top - posy2) <= 0) {
                    img.element.style.top = `${img.element.offsetTop - posy2}px`;
                }
                inputElementsUpdate(img)
            }
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 5 || (e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 5) {
                //right and bottom edge: just resize
                if((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText(`(${img.element.width}, ${img.element.height})`);
                        debugText('resize right')
                        if ((img.element.width - posx2) * 0.8 / workspaceImage.width <= .02) {
                            img.element.width = 0.02 * workspaceImage.width / 0.8;
                        }
                        else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < img.element.x + (img.element.width - posx2)) {
                            null;
                        }
                        else {
                            img.element.width = img.element.width - posx2;
                        }
    
                        inputElementsUpdate(img)
                    };
                }

                if((e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 5) {
                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText(`(${img.element.width}, ${img.element.height})`);
                        debugText('resize bot')
    
                        if ((img.element.height - posy2) * 600 / workspaceImage.height <= 20) {
                            img.element.style.height = `${20 * workspaceImage.height / 600}px`;
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                            null;
                        }
                        else {
                            img.element.style.height = `${img.element.height - posy2}px`;
                        }
                        inputElementsUpdate(img)
                    };
                }

                //corner
                if((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 5 && (e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 5) { 
                    window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debugText(`(${img.element.width}, ${img.element.height})`);
                    if ((img.element.width - posx2) * 800 / workspaceImage.width <= 20) {
                        img.element.width = 20 * workspaceImage.width / 800;
                    }
                    else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < img.element.x + (img.element.width - posx2)) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width - posx2;
                    }

                    if ((img.element.height - posy2) * 600 / workspaceImage.height <= 20) {
                        img.element.style.height = `${20 * workspaceImage.height / 600}px`;
                    }
                    else if (workspaceImage.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                        null;
                    }
                    else {
                        img.element.style.height = `${img.element.height - posy2}px`;
                    }
                    inputElementsUpdate(img)
                };}


            } else if((e.clientX - img.element.getBoundingClientRect().x) < 5 || (e.clientY - img.element.getBoundingClientRect().y) < 5) {
                //top and left edge: resize and drag

                if((e.clientX - img.element.getBoundingClientRect().x) < 5){

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText('resize left')
    
                        if ((img.element.width + posx2) * 0.8 / workspaceImage.width <= 0.02) {
                            img.element.width = 0.02 * workspaceImage.width / 0.8;
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > img.element.x - posx2) {
                            null;
                        }
                        else {
                            img.element.width = img.element.width + posx2;
                            img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                        }

                        // img.element.height = img.element.height + posy2
                        // img.element.width = img.element.width + posx2
                        inputElementsUpdate(img)
                    };
                }

                if((e.clientY - img.element.getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText('resize top');
    
                        if ((img.element.height + posy2) * 0.6 / workspaceImage.height <= 0.02) {
                            img.element.style.height = `${0.02 * workspaceImage.height / 0.6}`;
                        }
                        else if (workspaceImage.getBoundingClientRect().y > img.element.y - posy2) {
                            null;
                        }
                        else {
                            img.element.style.height = `${img.element.height + posy2}px`;
                            img.element.style.top = `${img.element.offsetTop - posy2}px`;
                        }
                        // img.element.style.height = img.element.height + posy2
                        // img.element.width = img.element.width + posx2
                        inputElementsUpdate(img)
                    };
                }

                //corner
                if((e.clientX - img.element.getBoundingClientRect().x) < 5 && (e.clientY - img.element.getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posy2 = posy1 - e.clientY;
                        posx1 = e.clientX;
                        posy1 = e.clientY;
                        debugText(img.element.style.height);
    
                        if ((img.element.width + posx2) * 800 / workspaceImage.width <= 20) {
                            img.element.width = 20 * workspaceImage.width / 800;
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > img.element.x - posx2) {
                            null;
                        }
                        else {
                            img.element.width = img.element.width + posx2;
                            img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                        }
                        if ((img.element.height + posy2) * 600 / workspaceImage.height <= 20) {
                            img.element.style.height = `${20 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().y > img.element.y - posy2) {
                            null;
                        }
                        else {
                            img.element.style.height = `${img.element.height + posy2}px`;
                            img.element.style.top = `${img.element.offsetTop - posy2}px`;
                        }
                        // img.element.style.height = img.element.height + posy2
                        // img.element.width = img.element.width + posx2
                        inputElementsUpdate(img)
                    };
                }
                
            }
        }


        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };


    };
} 

function inputElementsUpdate(img: CustomImage) {
    inputElementWidth.value = InputEdit((img.element.width * 800 / (workspaceImage.width - 2*horizontalMargin)));
    img.SetWidth(+InputEdit((img.element.width * 800 / (workspaceImage.width - 2*horizontalMargin))))
    inputElementHeight.value = InputEdit(img.element.height * 600 / workspaceImage.height);
    img.SetHeight(+InputEdit(img.element.height * 600 / workspaceImage.height))
    inputElementCoordinateX.value = `${InputEdit((img.element.offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2*horizontalMargin) * 800)}`;
    img.SetLeftX(+InputEdit((img.element.offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2*horizontalMargin) * 800))
    inputElementCoordinateY.value = `${InputEdit((workspaceImage.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / workspaceImage.height * 600)}`;
    img.SetBotY(+InputEdit((workspaceImage.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / workspaceImage.height * 600))
}