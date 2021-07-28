import { debugText, InputEdit } from "./Mini-Functions"
import { workspaceImage, inputElementCoordinateX, inputElementCoordinateY, inputElementHeight, inputElementWidth } from "../Constants/Elements"
import { Editor } from "../Editor/Editor";
import { CustomText } from "../Editor/FrameLogic/CustomText";

let horizontalMargin = 240/1920*workspaceImage.width //width changes so this variable is changed

export function TextFunctions(div: CustomText) : void{
    div.element.onmousedown = function (e) {
        horizontalMargin = 240/1920*workspaceImage.width //refresh the value

        Editor.GetDocumentEditor().projectTree.Select(div);
        
        let posx1 = e.clientX;
        let posy1 = e.clientY;
        let posx2 = 0;
        let posy2 = 0;
        
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - div.element.getBoundingClientRect().x) > 5 && (e.clientX - div.element.getBoundingClientRect().x) < div.element.offsetWidth - 5 && (e.clientY - div.element.getBoundingClientRect().y) > 5 && (e.clientY - div.element.getBoundingClientRect().y) < div.element.offsetHeight - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;

                debugText('drag')
                if (((div.element.offsetLeft - posx2) - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / workspaceImage.offsetWidth * 800 >= 0 && ((div.element.offsetLeft - posx2 + div.element.offsetWidth) - (workspaceImage.getBoundingClientRect().x - horizontalMargin)) / workspaceImage.offsetWidth * 800 <= 800) {
                    div.element.style.left = `${div.element.offsetLeft - posx2}px`;
                }

                if (workspaceImage.getBoundingClientRect().bottom - (div.element.getBoundingClientRect().bottom - posy2) >= 0 && workspaceImage.getBoundingClientRect().top - (div.element.getBoundingClientRect().top - posy2) <= 0) {
                    div.element.style.top = `${div.element.offsetTop - posy2}px`;
                }
                inputElementsUpdate(div)
            }
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - div.element.getBoundingClientRect().x) > div.element.offsetWidth - 5 || (e.clientY - div.element.getBoundingClientRect().y) > div.element.offsetHeight - 5) {
                //right and bottom edge: just resize
                if((e.clientX - div.element.getBoundingClientRect().x) > div.element.offsetWidth - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText(`(${div.element.offsetWidth}, ${div.element.offsetHeight})`);
                        debugText('resize right')
                        if ((div.element.offsetWidth - posx2) * 0.8 / workspaceImage.width <= .02) {
                            div.element.style.width = 0.02 * workspaceImage.width / 0.8 +'px';
                        }
                        else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < div.element.offsetLeft + (div.element.offsetWidth - posx2)) {
                            null;
                        }
                        else {
                            div.element.style.width = div.element.offsetWidth - posx2 +'px';
                        }
    
                        inputElementsUpdate(div)
                    };
                }

                if((e.clientY - div.element.getBoundingClientRect().y) > div.element.offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText(`(${div.element.offsetWidth}, ${div.element.offsetHeight})`);
                        debugText('resize bot')
    
                        if ((div.element.offsetHeight - posy2) * 600 / workspaceImage.height <= 20) {
                            div.element.style.height = `${20 * workspaceImage.height / 600}px`;
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < div.element.getBoundingClientRect().top + (div.element.offsetHeight - posy2)) {
                            null;
                        }
                        else {
                            div.element.style.height = `${div.element.offsetHeight - posy2}px`;
                        }
                        inputElementsUpdate(div)
                    };
                }

                //corner
                if((e.clientX - div.element.getBoundingClientRect().x) > div.element.offsetWidth - 5 && (e.clientY - div.element.getBoundingClientRect().y) > div.element.offsetHeight - 5) { 
                    window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debugText(`(${div.element.offsetWidth}, ${div.element.offsetHeight})`);
                    if ((div.element.offsetWidth - posx2) * 800 / workspaceImage.width <= 20) {
                        div.element.style.width = 20 * workspaceImage.width / 800 +'px';
                    }
                    else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < div.element.offsetLeft + (div.element.offsetWidth - posx2)) {
                        null;
                    }
                    else {
                        div.element.style.width = div.element.offsetWidth - posx2 +'px';
                    }

                    if ((div.element.offsetHeight - posy2) * 600 / workspaceImage.height <= 20) {
                        div.element.style.height = `${20 * workspaceImage.height / 600}px`;
                    }
                    else if (workspaceImage.getBoundingClientRect().bottom < div.element.getBoundingClientRect().top + (div.element.offsetHeight - posy2)) {
                        null;
                    }
                    else {
                        div.element.style.height = `${div.element.offsetHeight - posy2}px`;
                    }
                    inputElementsUpdate(div)
                };}


            } else if((e.clientX - div.element.getBoundingClientRect().x) < 5 || (e.clientY - div.element.getBoundingClientRect().y) < 5) {
                //top and left edge: resize and drag

                if((e.clientX - div.element.getBoundingClientRect().x) < 5){

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText('resize left')
    
                        if ((div.element.offsetWidth + posx2) * 0.8 / workspaceImage.width <= 0.02) {
                            div.element.style.width = 0.02 * workspaceImage.width / 0.8 +'px';
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > div.element.offsetLeft - posx2) {
                            null;
                        }
                        else {
                            div.element.style.width = div.element.offsetWidth + posx2 +'px';
                            div.element.style.left = `${div.element.offsetLeft - posx2}px`;
                        }

                        // img.element.offsetHeight = img.element.offsetHeight + posy2
                        // img.element.style.width = img.element.offsetWidth + posx2
                        inputElementsUpdate(div)
                    };
                }

                if((e.clientY - div.element.getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText('resize top');
    
                        if ((div.element.offsetHeight + posy2) * 0.6 / workspaceImage.height <= 0.02) {
                            div.element.style.height = `${0.02 * workspaceImage.height / 0.6}`;
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.element.getBoundingClientRect().top - posy2) > 0) {
                            null;
                            debugText('resize top MAX');
                        }
                        else {
                            div.element.style.height = `${div.element.offsetHeight + posy2}px`;
                            div.element.style.top = `${div.element.offsetTop - posy2}px`;
                        }
                        // img.element.style.height = img.element.offsetHeight + posy2
                        // img.element.style.width = img.element.offsetWidth + posx2
                        inputElementsUpdate(div)
                    };
                }

                //corner
                if((e.clientX - div.element.getBoundingClientRect().x) < 5 && (e.clientY - div.element.getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posy2 = posy1 - e.clientY;
                        posx1 = e.clientX;
                        posy1 = e.clientY;
                        debugText(div.element.style.height);
    
                        if ((div.element.offsetWidth + posx2) * 800 / workspaceImage.width <= 20) {
                            div.element.style.width = 20 * workspaceImage.width / 800 +'px';
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > div.element.offsetLeft - posx2) {
                            null;
                        }
                        else {
                            div.element.style.width = div.element.offsetWidth + posx2 +'px';
                            div.element.style.left = `${div.element.offsetLeft - posx2}px`;
                        }

                        if ((div.element.offsetHeight + posy2) * 600 / workspaceImage.height <= 20) {
                            div.element.style.height = `${20 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.element.getBoundingClientRect().top - posy2)) {
                            null;
                        }
                        else {
                            div.element.style.height = `${div.element.offsetHeight + posy2}px`;
                            div.element.style.top = `${div.element.offsetTop - posy2}px`;
                        }
                        // img.element.style.height = img.element.offsetHeight + posy2
                        // img.element.style.width = img.element.offsetWidth + posx2
                        inputElementsUpdate(div)
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

function inputElementsUpdate(div: CustomText) {

        inputElementWidth.value = InputEdit((div.element.offsetWidth * 800 / (workspaceImage.width - 2*horizontalMargin)));
        div.SetWidth(+inputElementWidth.value)
        inputElementHeight.value = InputEdit(div.element.offsetHeight * 600 / workspaceImage.height);
        div.SetHeight(+inputElementHeight.value)
        inputElementCoordinateX.value = `${InputEdit((div.element.offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2*horizontalMargin) * 800)}`;
        div.SetLeftX(+inputElementCoordinateX.value)
        inputElementCoordinateY.value = `${InputEdit((workspaceImage.getBoundingClientRect().bottom - div.element.getBoundingClientRect().bottom) / workspaceImage.height * 600)}`;
        div.SetBotY(+inputElementCoordinateY.value)

}