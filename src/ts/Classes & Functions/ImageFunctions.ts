import { CustomImage } from "../Editor/FrameLogic/CustomImage";
import { debugText, InputEdit } from "./Mini-Functions"
import { workspaceImage, inputElementCoordinateX, inputElementCoordinateY, inputElementHeight, inputElementWidth } from "../Constants/Elements"
import { Editor } from "../Editor/Editor";

let horizontalMargin = 240/1920*workspaceImage.width //width changes so this variable is changed

export function ImageFunctions(img: CustomImage) : void{
    img.getElement().onmousedown = function (e) {
        horizontalMargin = 240/1920*workspaceImage.width //refresh the value

        Editor.GetDocumentEditor().projectTree.Select(img);
        
        let posx1 = e.clientX;
        let posy1 = e.clientY;
        let posx2 = 0;
        let posy2 = 0;
        
        //debug((e.clientY - img.getElement().getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.getElement().getBoundingClientRect().x) > 5 && (e.clientX - img.getElement().getBoundingClientRect().x) < img.getElement().width - 5 && (e.clientY - img.getElement().getBoundingClientRect().y) > 5 && (e.clientY - img.getElement().getBoundingClientRect().y) < img.getElement().height - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;

                debugText(`(${img.getElement().offsetLeft},${img.getElement().offsetTop})`);
                debugText('drag')
                if (((img.getElement().offsetLeft - posx2) - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / workspaceImage.offsetWidth * 800 >= 0 && ((img.getElement().offsetLeft - posx2 + img.getElement().width) - (workspaceImage.getBoundingClientRect().x - horizontalMargin)) / workspaceImage.offsetWidth * 800 <= 800) {
                    img.getElement().style.left = `${img.getElement().offsetLeft - posx2}px`;
                }

                if (workspaceImage.getBoundingClientRect().bottom - (img.getElement().getBoundingClientRect().bottom - posy2) >= 0 && workspaceImage.getBoundingClientRect().top - (img.getElement().getBoundingClientRect().top - posy2) <= 0) {
                    img.getElement().style.top = `${img.getElement().offsetTop - posy2}px`;
                }
                inputElementsUpdate(img)
            }
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - img.getElement().getBoundingClientRect().x) > img.getElement().width - 5 || (e.clientY - img.getElement().getBoundingClientRect().y) > img.getElement().height - 5) {
                //right and bottom edge: just resize
                if((e.clientX - img.getElement().getBoundingClientRect().x) > img.getElement().width - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText(`(${img.getElement().width}, ${img.getElement().height})`);
                        debugText('resize right')
                        if ((img.getElement().width - posx2) * 0.8 / workspaceImage.width <= .02) {
                            img.getElement().style.width = 0.02 * workspaceImage.width / 0.8 + "px";
                        }
                        else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < img.getElement().x + (img.getElement().width - posx2)) {
                            null;
                        }
                        else {
                            img.getElement().style.width = img.getElement().width - posx2 + "px";
                        }
    
                        inputElementsUpdate(img)
                    };
                }

                if((e.clientY - img.getElement().getBoundingClientRect().y) > img.getElement().height - 5) {
                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText(`(${img.getElement().width}, ${img.getElement().height})`);
                        debugText('resize bot')
    
                        if ((img.getElement().height - posy2) * 600 / workspaceImage.height <= 20) {
                            img.getElement().style.height = `${20 * workspaceImage.height / 600}px`;
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < img.getElement().y + (img.getElement().height - posy2)) {
                            null;
                        }
                        else {
                            img.getElement().style.height = `${img.getElement().height - posy2}px`;
                        }
                        inputElementsUpdate(img)
                    };
                }

                //corner
                if((e.clientX - img.getElement().getBoundingClientRect().x) > img.getElement().width - 5 && (e.clientY - img.getElement().getBoundingClientRect().y) > img.getElement().height - 5) { 
                    window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debugText(`(${img.getElement().width}, ${img.getElement().height})`);
                    if ((img.getElement().offsetWidth - posx2) * 800 / workspaceImage.width <= 20) {
                        img.getElement().style.width = 20 * workspaceImage.width / 800 + "px";
                    }
                    else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < img.getElement().x + (img.getElement().width - posx2)) {
                        null;
                    }
                    else {
                        img.getElement().style.width = img.getElement().width - posx2 + "px";
                    }

                    if ((img.getElement().height - posy2) * 600 / workspaceImage.height <= 20) {
                        img.getElement().style.height = `${20 * workspaceImage.height / 600}px`;
                    }
                    else if (workspaceImage.getBoundingClientRect().bottom < img.getElement().y + (img.getElement().height - posy2)) {
                        null;
                    }
                    else {
                        img.getElement().style.height = `${img.getElement().height - posy2}px`;
                    }
                    inputElementsUpdate(img)
                };}


            } else if((e.clientX - img.getElement().getBoundingClientRect().x) < 5 || (e.clientY - img.getElement().getBoundingClientRect().y) < 5) {
                //top and left edge: resize and drag

                if((e.clientX - img.getElement().getBoundingClientRect().x) < 5){

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText('resize left')
    
                        if ((img.getElement().width + posx2) * 0.8 / workspaceImage.width <= 0.02) {
                            img.getElement().style.width = 0.02 * workspaceImage.width / 0.8 + "px";
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > img.getElement().x - posx2) {
                            null;
                        }
                        else {
                            img.getElement().style.width = `${img.getElement().offsetWidth + posx2}px`
                            img.getElement().style.left = `${img.getElement().offsetLeft - posx2}px`;
                        }

                        // img.getElement().height = img.getElement().height + posy2
                        // img.getElement().width = img.getElement().width + posx2
                        inputElementsUpdate(img)
                    };
                }

                if((e.clientY - img.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText('resize top');
    
                        if ((img.getElement().height + posy2) * 0.6 / workspaceImage.height <= 0.02) {
                            img.getElement().style.height = `${0.02 * workspaceImage.height / 0.6}`;
                        }
                        else if (workspaceImage.getBoundingClientRect().y > img.getElement().y - posy2) {
                            null;
                        }
                        else {
                            img.getElement().style.height = `${img.getElement().height + posy2}px`;
                            img.getElement().style.top = `${img.getElement().offsetTop - posy2}px`;
                        }
                        // img.getElement().style.height = img.getElement().height + posy2
                        // img.getElement().width = img.getElement().width + posx2
                        inputElementsUpdate(img)
                    };
                }

                //corner
                if((e.clientX - img.getElement().getBoundingClientRect().x) < 5 && (e.clientY - img.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posy2 = posy1 - e.clientY;
                        posx1 = e.clientX;
                        posy1 = e.clientY;
                        debugText(img.getElement().style.height);
    
                        if ((img.getElement().width + posx2) * 800 / workspaceImage.width <= 20) {
                            img.getElement().style.width = 20 * workspaceImage.width / 800 + "px";
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > img.getElement().x - posx2) {
                            null;
                        }
                        else {
                            img.getElement().style.width = `${img.getElement().offsetWidth + posx2}px`
                            img.getElement().style.left = `${img.getElement().offsetLeft - posx2}px`;
                        }
                        if ((img.getElement().height + posy2) * 600 / workspaceImage.height <= 20) {
                            img.getElement().style.height = `${20 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().y > img.getElement().y - posy2) {
                            null;
                        }
                        else {
                            img.getElement().style.height = `${img.getElement().height + posy2}px`;
                            img.getElement().style.top = `${img.getElement().offsetTop - posy2}px`;
                        }
                        // img.getElement().style.height = img.getElement().height + posy2
                        // img.getElement().width = img.getElement().width + posx2
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
    inputElementWidth.value = InputEdit((img.getElement().width * 800 / (workspaceImage.width - 2*horizontalMargin)));
    img.setWidth(+inputElementWidth.value)
    inputElementHeight.value = InputEdit(img.getElement().height * 600 / workspaceImage.height);
    img.setHeight(+inputElementHeight.value)
    inputElementCoordinateX.value = `${InputEdit((img.getElement().offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2*horizontalMargin) * 800)}`;
    img.setLeftX(+inputElementCoordinateX.value)
    inputElementCoordinateY.value = `${InputEdit((workspaceImage.getBoundingClientRect().bottom - img.getElement().getBoundingClientRect().bottom) / workspaceImage.height * 600)}`;
    img.setBotY(+inputElementCoordinateY.value)
}