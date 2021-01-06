import { CustomImage, focusIMG, FocusIMGchange } from "./CustomImage";
import { UpdateFields } from "./UpdateFields"
import { coordsIMG, formX, formY, formWIDTH, formHEIGHT } from "../Constants.ts/Elements";
import { debug } from "./Mini-Functions"

export function ImageFunctions(img: CustomImage, posx1: number, posy1: number, posx2: number, posy2: number) {
    img.element.onmousedown = function (e) {
        posx1 = e.clientX;
        posy1 = e.clientY;
        if(focusIMG)
            focusIMG.element.style.outlineStyle = 'none';
        FocusIMGchange(img);
        UpdateFields(focusIMG);
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.element.getBoundingClientRect().x) > 25 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 25 && (e.clientY - img.element.getBoundingClientRect().y) > 25 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 25) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;
                debug(`(${img.element.offsetLeft},${img.element.offsetTop})`);
                if (((img.element.offsetLeft - posx2) - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800 >= 0 && ((img.element.offsetLeft - posx2 + img.element.width) - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800 <= 800) {
                    img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                }

                if (coordsIMG.getBoundingClientRect().bottom - (img.element.offsetTop - posy2 + img.element.height) >= 0 && coordsIMG.getBoundingClientRect().top - (img.element.offsetTop - posy2) <= 0) {
                    img.element.style.top = `${img.element.offsetTop - posy2}px`;
                }
                formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800}`;
                formY.value = `${(coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / coordsIMG.height * 600}`;
            };
        }
        else {
            //at edge, so resize
            //now determine which edges
            if ((e.clientX - img.element.getBoundingClientRect().x) > img.element.width - 25 || (e.clientY - img.element.getBoundingClientRect().y) > img.element.height - 25) {
                //right and bottom edge: just resize
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(`(${img.element.width}, ${img.element.height})`);
                    if ((img.element.width - posx2) * 800 / coordsIMG.width <= 20) {
                        img.element.width = 20 * coordsIMG.width / 800;
                    }
                    else if (coordsIMG.getBoundingClientRect().right < img.element.x + (img.element.width - posx2)) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width - posx2;
                    }

                    if ((img.element.height - posy2) * 600 / coordsIMG.height <= 20) {
                        img.element.height = 20 * coordsIMG.height / 600;
                    }
                    else if (coordsIMG.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height - posy2;
                    }


                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString();
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString();

                };
            }
            else {
                //top and left edge: resize and drag
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    debug(+img.element.style.height);

                    if ((img.element.width + posx2) * 800 / coordsIMG.width <= 20) {
                        img.element.width = 20 * coordsIMG.width / 800;
                    }
                    else if (coordsIMG.getBoundingClientRect().x > img.element.x - posx2) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width + posx2;
                        img.element.style.left = `${img.element.offsetLeft - posx2}px`;
                    }
                    if ((img.element.height + posy2) * 600 / coordsIMG.height <= 20) {
                        img.element.height = 20 * coordsIMG.height / 600;
                    }
                    else if (coordsIMG.getBoundingClientRect().y > img.element.y - posy2) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height + posy2;
                        img.element.style.top = `${img.element.offsetTop - posy2}px`;
                    }
                    // img.element.height = img.element.height + posy2
                    // img.element.width = img.element.width + posx2
                    formWIDTH.value = (img.element.width * 800 / coordsIMG.width).toString();
                    formHEIGHT.value = (img.element.height * 600 / coordsIMG.height).toString();
                    formX.value = `${(img.element.offsetLeft - coordsIMG.getBoundingClientRect().x) / coordsIMG.offsetWidth * 800}`;
                    formY.value = `${(coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / coordsIMG.height * 600}`;
                };
            }


        }
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };


    };
    return { posx1, posy1, posx2, posy2 };
} 