import { CustomImage, focusIMG, FocusIMGchange } from "./CustomImage";
import { UpdateFields } from "./UpdateFields"
import { debug, InputEdit } from "./Mini-Functions"
import { workspace, inputElementCoordinateX, inputElementCoordinateY, inputElementHeight, inputElementWidth } from "../Constants/Elements"

let horizontalMargin = 240/1920*workspace.width //width changes so this variable is changed

export function ImageFunctions(img: CustomImage) {
    img.element.onmousedown = function (e) {
        horizontalMargin = 240/1920*workspace.width //refresh the value

        let posx1 = e.clientX;
        let posy1 = e.clientY;
        let posx2 = 0;
        let posy2 = 0;
        if(focusIMG)
            focusIMG.element.style.outlineStyle = 'none';
        FocusIMGchange(img);
        UpdateFields(focusIMG);
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.element.getBoundingClientRect().x) > 5 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 5 && (e.clientY - img.element.getBoundingClientRect().y) > 5 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 5) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;

                debug(`(${img.element.offsetLeft},${img.element.offsetTop})`);
                if (((img.element.offsetLeft - posx2) - (workspace.getBoundingClientRect().x + horizontalMargin)) / workspace.offsetWidth * 800 >= 0 && ((img.element.offsetLeft - posx2 + img.element.width) - (workspace.getBoundingClientRect().x - horizontalMargin)) / workspace.offsetWidth * 800 <= 800) {
                    img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                }

                if (workspace.getBoundingClientRect().bottom - (img.element.offsetTop - posy2 + img.element.height) >= 0 && workspace.getBoundingClientRect().top - (img.element.offsetTop - posy2) <= 0) {
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
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(`(${img.element.width}, ${img.element.height})`);
                    if ((img.element.width - posx2) * 800 / workspace.width <= 20) {
                        img.element.width = 20 * workspace.width / 800;
                    }
                    else if (workspace.getBoundingClientRect().right - horizontalMargin < img.element.x + (img.element.width - posx2)) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width - posx2;
                    }

                    if ((img.element.height - posy2) * 600 / workspace.height <= 20) {
                        img.element.height = 20 * workspace.height / 600;
                    }
                    else if (workspace.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height - posy2;
                    }
                    inputElementsUpdate(img)
                };
            } else {
                //top and left edge: resize and drag
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(+img.element.style.height);

                    if ((img.element.width + posx2) * 800 / workspace.width <= 20) {
                        img.element.width = 20 * workspace.width / 800;
                    }
                    else if ((workspace.getBoundingClientRect().x + horizontalMargin) > img.element.x - posx2) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width + posx2;
                        img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                    }
                    if ((img.element.height + posy2) * 600 / workspace.height <= 20) {
                        img.element.height = 20 * workspace.height / 600;
                    }
                    else if (workspace.getBoundingClientRect().y > img.element.y - posy2) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height + posy2;
                        img.element.style.top = `${img.element.offsetTop - posy2}px`;
                    }
                    // img.element.height = img.element.height + posy2
                    // img.element.width = img.element.width + posx2
                    inputElementsUpdate(img)
                };
            }
        }


        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };


    };
} 

function inputElementsUpdate(img: CustomImage) {
    inputElementWidth.value = InputEdit((img.element.width * 800 / (workspace.width - 2*horizontalMargin)));
    inputElementHeight.value = InputEdit(img.element.height * 600 / workspace.height);
    inputElementCoordinateX.value = `${InputEdit((img.element.offsetLeft - (workspace.getBoundingClientRect().x + horizontalMargin)) / (workspace.width - 2*horizontalMargin) * 800)}`;
    inputElementCoordinateY.value = `${InputEdit((workspace.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / workspace.height * 600)}`;
}