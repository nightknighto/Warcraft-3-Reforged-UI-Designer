import { debugText, InputEdit } from "./Mini-Functions"
import { Editor } from "../Editor/Editor";
import { CustomText } from "../Editor/FrameLogic/CustomText";

export function TextFunctions(div: CustomText) : void{

    const workspaceImage = Editor.GetDocumentEditor().workspaceImage;

    div.getElement().onmousedown = function (e) {
        const horizontalMargin = 240/1920*workspaceImage.width;

        Editor.GetDocumentEditor().projectTree.select(div);
        
        let posx1 = e.clientX;
        let posy1 = e.clientY;
        let posx2 = 0;
        let posy2 = 0;
        
        //debug((e.clientY - img.getElement().getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - div.getElement().getBoundingClientRect().x) > 5 && (e.clientX - div.getElement().getBoundingClientRect().x) < div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < div.getElement().offsetHeight - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;

                debugText('drag')
                if (((div.getElement().offsetLeft - posx2) - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / workspaceImage.offsetWidth * 800 >= 0 && ((div.getElement().offsetLeft - posx2 + div.getElement().offsetWidth) - (workspaceImage.getBoundingClientRect().x - horizontalMargin)) / workspaceImage.offsetWidth * 800 <= 800) {
                    div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`;
                }

                if (workspaceImage.getBoundingClientRect().bottom - (div.getElement().getBoundingClientRect().bottom - posy2) >= 0 && workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) <= 0) {
                    div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`;
                }
                inputElementsUpdate(div)
            }
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 || (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                //right and bottom edge: just resize
                if((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5) {
                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText(`(${div.getElement().offsetWidth}, ${div.getElement().offsetHeight})`);
                        debugText('resize right')
                        if ((div.getElement().offsetWidth - posx2) * 0.8 / workspaceImage.width <= .01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 +'px';
                        }
                        else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < div.getElement().offsetLeft + (div.getElement().offsetWidth - posx2)) {
                            null;
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth - posx2 +'px';
                        }
    
                        inputElementsUpdate(div)
                    };
                }

                if((e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText(`(${div.getElement().offsetWidth}, ${div.getElement().offsetHeight})`);
                        debugText('resize bot')
    
                        if ((div.getElement().offsetHeight - posy2) * 600 / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${10 * workspaceImage.height / 600}px`;
                        }
                        else if (workspaceImage.getBoundingClientRect().bottom < div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posy2)) {
                            null;
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posy2}px`;
                        }
                        inputElementsUpdate(div)
                    };
                }

                //corner
                if((e.clientX - div.getElement().getBoundingClientRect().x) > div.getElement().offsetWidth - 5 && (e.clientY - div.getElement().getBoundingClientRect().y) > div.getElement().offsetHeight - 5) { 
                    window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debugText(`(${div.getElement().offsetWidth}, ${div.getElement().offsetHeight})`);
                    if ((div.getElement().offsetWidth - posx2) * 800 / workspaceImage.width <= 10) {
                        div.getElement().style.width = 10 * workspaceImage.width / 800 +'px';
                    }
                    else if (workspaceImage.getBoundingClientRect().right - horizontalMargin < div.getElement().offsetLeft + (div.getElement().offsetWidth - posx2)) {
                        null;
                    }
                    else {
                        div.getElement().style.width = div.getElement().offsetWidth - posx2 +'px';
                    }

                    if ((div.getElement().offsetHeight - posy2) * 600 / workspaceImage.height <= 10) {
                        div.getElement().style.height = `${10 * workspaceImage.height / 600}px`;
                    }
                    else if (workspaceImage.getBoundingClientRect().bottom < div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posy2)) {
                        null;
                    }
                    else {
                        div.getElement().style.height = `${div.getElement().offsetHeight - posy2}px`;
                    }
                    inputElementsUpdate(div)
                };}


            } else if((e.clientX - div.getElement().getBoundingClientRect().x) < 5 || (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {
                //top and left edge: resize and drag

                if((e.clientX - div.getElement().getBoundingClientRect().x) < 5){

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posx1 = e.clientX;
                        debugText('resize left')
    
                        if ((div.getElement().offsetWidth + posx2) * 0.8 / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = 0.01 * workspaceImage.width / 0.8 +'px';
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > div.getElement().offsetLeft - posx2) {
                            null;
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth + posx2 +'px';
                            div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`;
                        }

                        // img.getElement().offsetHeight = img.getElement().offsetHeight + posy2
                        // img.getElement().style.width = img.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                    };
                }

                if((e.clientY - div.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posy2 = posy1 - e.clientY;
                        posy1 = e.clientY;
                        debugText('resize top');
    
                        if ((div.getElement().offsetHeight + posy2) * 0.6 / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${0.01 * workspaceImage.height / 0.6}`;
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2) > 0) {
                            null;
                            debugText('resize top MAX');
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posy2}px`;
                            div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`;
                        }
                        // img.getElement().style.height = img.getElement().offsetHeight + posy2
                        // img.getElement().style.width = img.getElement().offsetWidth + posx2
                        inputElementsUpdate(div)
                    };
                }

                //corner
                if((e.clientX - div.getElement().getBoundingClientRect().x) < 5 && (e.clientY - div.getElement().getBoundingClientRect().y) < 5) {

                    window.onmousemove = function (e) {
                        posx2 = posx1 - e.clientX;
                        posy2 = posy1 - e.clientY;
                        posx1 = e.clientX;
                        posy1 = e.clientY;
                        debugText(div.getElement().style.height);
    
                        if ((div.getElement().offsetWidth + posx2) * 800 / workspaceImage.width <= 10) {
                            div.getElement().style.width = 10 * workspaceImage.width / 800 +'px';
                        }
                        else if ((workspaceImage.getBoundingClientRect().x + horizontalMargin) > div.getElement().offsetLeft - posx2) {
                            null;
                        }
                        else {
                            div.getElement().style.width = div.getElement().offsetWidth + posx2 +'px';
                            div.getElement().style.left = `${div.getElement().offsetLeft - posx2}px`;
                        }

                        if ((div.getElement().offsetHeight + posy2) * 600 / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${10 * workspaceImage.height / 600}px`
                        }
                        else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posy2)) {
                            null;
                        }
                        else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posy2}px`;
                            div.getElement().style.top = `${div.getElement().offsetTop - posy2}px`;
                        }
                        // img.getElement().style.height = img.getElement().offsetHeight + posy2
                        // img.getElement().style.width = img.getElement().offsetWidth + posx2
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

        const editor = Editor.GetDocumentEditor();
        const workspaceImage = editor.workspaceImage;
        const parameterEditor = editor.parameterEditor;
        const horizontalMargin = 240/1920*workspaceImage.width

        parameterEditor.inputElementWidth.value = InputEdit((div.getElement().offsetWidth * 800 / (workspaceImage.width - 2*horizontalMargin)));
        div.setWidth(+parameterEditor.inputElementWidth.value)
        parameterEditor.inputElementHeight.value = InputEdit(div.getElement().offsetHeight * 600 / workspaceImage.height);
        div.setHeight(+parameterEditor.inputElementHeight.value)
        parameterEditor.inputElementCoordinateX.value = `${InputEdit((div.getElement().offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2*horizontalMargin) * 800)}`;
        div.setLeftX(+parameterEditor.inputElementCoordinateX.value)
        parameterEditor.inputElementCoordinateY.value = `${InputEdit((workspaceImage.getBoundingClientRect().bottom - div.getElement().getBoundingClientRect().bottom) / workspaceImage.height * 600)}`;
        div.setBotY(+parameterEditor.inputElementCoordinateY.value)

}