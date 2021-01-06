"use strict";
exports.__esModule = true;
exports.TemplateReplace = void 0;
var Templates_1 = require("../Templates/Templates");
var CustomImage_1 = require("./CustomImage");
var Elements_1 = require("../Constants.ts/Elements");
/**0 for globals, 1 the body */
function TemplateReplace(kind) {
    try {
        var text = void 0;
        var sumText = "";
        for (var _i = 0, _a = CustomImage_1.CustomImage.Array; _i < _a.length; _i++) {
            var el = _a[_i];
            if (kind == 0) {
                if (el.type == 'button') {
                    text = Templates_1.JASS.declaresBUTTON;
                }
                else {
                    text = Templates_1.JASS.declares;
                }
            }
            else {
                alert('type is' + el.type);
                eval("text = JASS." + el.type);
                alert("text = JASS." + el.type);
            }
            alert('step 2.1');
            var textEdit = text.replace(/FRvar/gi, el.name);
            alert('step 2.2');
            if (kind == 0) {
                sumText += textEdit;
                continue;
            }
            alert('step 3');
            if (el.parentIndex == 0)
                textEdit = textEdit.replace("OWNERvar", "BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)");
            alert('step 4');
            textEdit = textEdit.replace("TOPLEFTXvar", "" + ((el.element.offsetLeft - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 0.8).toPrecision(6));
            textEdit = textEdit.replace("TOPLEFTYvar", "" + ((Elements_1.coordsIMG.getBoundingClientRect().bottom - el.element.getBoundingClientRect().top) / Elements_1.coordsIMG.height * 0.6).toPrecision(6));
            alert('step 5');
            textEdit = textEdit.replace("BOTRIGHTXvar", "" + ((el.element.offsetLeft - Elements_1.coordsIMG.getBoundingClientRect().x + el.element.width) / Elements_1.coordsIMG.offsetWidth * 0.8).toPrecision(6));
            textEdit = textEdit.replace("BOTRIGHTYvar", "" + ((Elements_1.coordsIMG.getBoundingClientRect().bottom - el.element.getBoundingClientRect().bottom) / Elements_1.coordsIMG.height * 0.6).toPrecision(6));
            textEdit = textEdit.replace("PATHvar", '"' + el.texturePath + '"');
            sumText += textEdit;
            alert('step 6');
        }
        return sumText;
    }
    catch (e) {
        alert(e);
    }
}
exports.TemplateReplace = TemplateReplace;
//# sourceMappingURL=Generate Functions.js.map