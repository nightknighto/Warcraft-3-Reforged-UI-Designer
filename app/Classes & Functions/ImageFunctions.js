"use strict";
exports.__esModule = true;
exports.ImageFunctions = void 0;
var CustomImage_1 = require("./CustomImage");
var UpdateFields_1 = require("./UpdateFields");
var Elements_1 = require("../Constants.ts/Elements");
var Mini_Functions_1 = require("./Mini-Functions");
function ImageFunctions(img, posx1, posy1, posx2, posy2) {
    img.element.onmousedown = function (e) {
        posx1 = e.clientX;
        posy1 = e.clientY;
        if (CustomImage_1.focusIMG)
            CustomImage_1.focusIMG.element.style.outlineStyle = 'none';
        CustomImage_1.FocusIMGchange(img);
        UpdateFields_1.UpdateFields(CustomImage_1.focusIMG);
        //debug((e.clientY - img.element.getBoundingClientRect().y))
        //check whether it is drag or resize
        if ((e.clientX - img.element.getBoundingClientRect().x) > 25 && (e.clientX - img.element.getBoundingClientRect().x) < img.element.width - 25 && (e.clientY - img.element.getBoundingClientRect().y) > 25 && (e.clientY - img.element.getBoundingClientRect().y) < img.element.height - 25) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posx2 = posx1 - e.clientX;
                posy2 = posy1 - e.clientY;
                posx1 = e.clientX;
                posy1 = e.clientY;
                Mini_Functions_1.debug("(" + img.element.offsetLeft + "," + img.element.offsetTop + ")");
                if (((img.element.offsetLeft - posx2) - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800 >= 0 && ((img.element.offsetLeft - posx2 + img.element.width) - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800 <= 800) {
                    img.element.style.left = img.element.offsetLeft - posx2 + "px";
                }
                if (Elements_1.coordsIMG.getBoundingClientRect().bottom - (img.element.offsetTop - posy2 + img.element.height) >= 0 && Elements_1.coordsIMG.getBoundingClientRect().top - (img.element.offsetTop - posy2) <= 0) {
                    img.element.style.top = img.element.offsetTop - posy2 + "px";
                }
                Elements_1.formX.value = "" + (img.element.offsetLeft - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800;
                Elements_1.formY.value = "" + (Elements_1.coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / Elements_1.coordsIMG.height * 600;
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
                    Mini_Functions_1.debug("(" + img.element.width + ", " + img.element.height + ")");
                    if ((img.element.width - posx2) * 800 / Elements_1.coordsIMG.width <= 20) {
                        img.element.width = 20 * Elements_1.coordsIMG.width / 800;
                    }
                    else if (Elements_1.coordsIMG.getBoundingClientRect().right < img.element.x + (img.element.width - posx2)) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width - posx2;
                    }
                    if ((img.element.height - posy2) * 600 / Elements_1.coordsIMG.height <= 20) {
                        img.element.height = 20 * Elements_1.coordsIMG.height / 600;
                    }
                    else if (Elements_1.coordsIMG.getBoundingClientRect().bottom < img.element.y + (img.element.height - posy2)) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height - posy2;
                    }
                    Elements_1.formWIDTH.value = (img.element.width * 800 / Elements_1.coordsIMG.width).toString();
                    Elements_1.formHEIGHT.value = (img.element.height * 600 / Elements_1.coordsIMG.height).toString();
                };
            }
            else {
                //top and left edge: resize and drag
                window.onmousemove = function (e) {
                    posx2 = posx1 - e.clientX;
                    posy2 = posy1 - e.clientY;
                    posx1 = e.clientX;
                    posy1 = e.clientY;
                    Mini_Functions_1.debug(+img.element.style.height);
                    if ((img.element.width + posx2) * 800 / Elements_1.coordsIMG.width <= 20) {
                        img.element.width = 20 * Elements_1.coordsIMG.width / 800;
                    }
                    else if (Elements_1.coordsIMG.getBoundingClientRect().x > img.element.x - posx2) {
                        null;
                    }
                    else {
                        img.element.width = img.element.width + posx2;
                        img.element.style.left = img.element.offsetLeft - posx2 + "px";
                    }
                    if ((img.element.height + posy2) * 600 / Elements_1.coordsIMG.height <= 20) {
                        img.element.height = 20 * Elements_1.coordsIMG.height / 600;
                    }
                    else if (Elements_1.coordsIMG.getBoundingClientRect().y > img.element.y - posy2) {
                        null;
                    }
                    else {
                        img.element.height = img.element.height + posy2;
                        img.element.style.top = img.element.offsetTop - posy2 + "px";
                    }
                    // img.element.height = img.element.height + posy2
                    // img.element.width = img.element.width + posx2
                    Elements_1.formWIDTH.value = (img.element.width * 800 / Elements_1.coordsIMG.width).toString();
                    Elements_1.formHEIGHT.value = (img.element.height * 600 / Elements_1.coordsIMG.height).toString();
                    Elements_1.formX.value = "" + (img.element.offsetLeft - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800;
                    Elements_1.formY.value = "" + (Elements_1.coordsIMG.getBoundingClientRect().bottom - img.element.getBoundingClientRect().bottom) / Elements_1.coordsIMG.height * 600;
                };
            }
        }
        window.onmouseup = function () {
            window.onmousemove = null;
            window.onmouseup = null;
        };
    };
    return { posx1: posx1, posy1: posy1, posx2: posx2, posy2: posy2 };
}
exports.ImageFunctions = ImageFunctions;
//# sourceMappingURL=ImageFunctions.js.map