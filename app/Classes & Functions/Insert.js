"use strict";
exports.__esModule = true;
exports.Insert = void 0;
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-namespace */
var electron_1 = require("electron");
var CustomImage_1 = require("./CustomImage");
var ImageFunctions_1 = require("./ImageFunctions");
/**kinds: 0 for declare, 1 for backdrop and Inserts? */
var Insert;
(function (Insert) {
    function Init() {
        electron_1.ipcRenderer.on('Insert', function (e, i) {
            var el = document.createElement('img');
            var src = './files/images/';
            switch (i) {
                case 0:
                    src += 'ScriptDialogButton.png';
                    break;
                case 1:
                    src += 'BrowserButton.png';
                    break;
                case 2:
                    src += 'QuestCheckBox.png';
                    break;
                case 3:
                    src += 'CheckListBox.png';
                    break;
                case 4:
                    src += 'OptionsPopupMenuBackdropTemplate.png';
                    break;
                case 5:
                    src += 'QuestButtonBaseTemplate.png';
                    break;
                case 6:
                    src += 'QuestButtonPushedBackdropTemplate.png';
                    break;
                case 7:
                    src += 'QuestButtonDisabledBackdropTemplate.png';
                    break;
                case 8:
                    src += 'EscMenuBackdrop.png';
                    break;
                case 9:
                    src += '';
                    break;
                case 10:
            }
            var img = new CustomImage_1.CustomImage(el, src);
            var type = src.slice(15);
            type = type.slice(0, type.length - 4);
            img.type = type;
            img.typeEditable = false;
            ImageFunctions_1.ImageFunctions(img, 0, 0, 0, 0);
        });
    }
    Insert.Init = Init;
})(Insert = exports.Insert || (exports.Insert = {}));
//# sourceMappingURL=Insert.js.map