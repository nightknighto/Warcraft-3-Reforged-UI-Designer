"use strict";
exports.__esModule = true;
exports.UpdateFields = void 0;
var Elements_1 = require("../Constants.ts/Elements");
/**
 *
 * @param focusIMG : CustomImage
 */
function UpdateFields(focusIMG) {
    for (var _i = 0, ParentOptions_1 = Elements_1.ParentOptions; _i < ParentOptions_1.length; _i++) {
        var el = ParentOptions_1[_i];
        el.hidden = false;
    }
    focusIMG.parentOption.hidden = true;
    focusIMG.element.style.outlineStyle = "dashed";
    focusIMG.element.style.outlineColor = "red";
    focusIMG.element.style.outlineOffset = "-3px";
    Elements_1.formPARENT.selectedIndex = focusIMG.parentIndex;
    Elements_1.formNAME.value = focusIMG.name;
    Elements_1.formWIDTH.value = focusIMG.element.width * 800 / Elements_1.coordsIMG.width + "";
    Elements_1.formHEIGHT.value = focusIMG.element.height * 600 / Elements_1.coordsIMG.height + "";
    Elements_1.formX.value = "" + (focusIMG.element.offsetLeft - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800;
    Elements_1.formY.value = "" + (Elements_1.coordsIMG.getBoundingClientRect().bottom - focusIMG.element.getBoundingClientRect().bottom) / Elements_1.coordsIMG.height * 600;
    Elements_1.formTEXTURE.value = focusIMG.texturePath;
    if (!focusIMG.typeEditable) {
        Elements_1.formTYPE.disabled = true;
    }
    else {
        Elements_1.formTYPE.disabled = false;
    }
}
exports.UpdateFields = UpdateFields;
//# sourceMappingURL=UpdateFields.js.map