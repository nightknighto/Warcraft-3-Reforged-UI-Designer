"use strict";
exports.__esModule = true;
exports.CustomImage = exports.FocusIMGchange = exports.focusIMG = void 0;
var Elements_1 = require("../Constants.ts/Elements");
var electron_1 = require("electron");
var UpdateFields_1 = require("./UpdateFields");
var Mini_Functions_1 = require("./Mini-Functions");
exports.focusIMG = null;
function FocusIMGchange(img) {
    exports.focusIMG = img;
}
exports.FocusIMGchange = FocusIMGchange;
var CustomImage = /** @class */ (function () {
    function CustomImage(element, inputFile) {
        var _this = this;
        this.parentIndex = 0; //GAME_UI
        this.texturePath = "";
        this.type = "backdrop";
        this.typeEditable = true;
        try {
            this.element = element;
            if (typeof inputFile === 'string')
                this.element.src = inputFile;
            else
                this.element.src = URL.createObjectURL(inputFile[0]);
            this.element.height = 300;
            this.element.width = 200;
            this.element.draggable = false;
            this.element.style.position = "absolute";
            this.element.style.top = '400px';
            this.element.style.left = '900px';
            CustomImage.number++;
            this.name = "Element" + CustomImage.number;
            CustomImage.Array.push(this);
            this.parentOption = document.createElement("option");
            this.parentOption.text = this.name;
            Elements_1.formPARENT.add(this.parentOption);
            Elements_1.ParentOptions.push(this.parentOption);
            this.parentOption.value = Elements_1.ParentOptions.indexOf(this.parentOption) + "";
            //step 1: event sent to main.ts to display the menu.
            this.element.oncontextmenu = function () {
                if (exports.focusIMG)
                    exports.focusIMG.element.style.outlineStyle = 'none';
                exports.focusIMG = _this;
                UpdateFields_1.UpdateFields(exports.focusIMG);
                electron_1.ipcRenderer.send('show-context-menu');
            };
            Elements_1.imgCONT.appendChild(this.element);
            if (exports.focusIMG)
                exports.focusIMG.element.style.outlineStyle = 'none';
            exports.focusIMG = this;
            UpdateFields_1.UpdateFields(exports.focusIMG);
        }
        catch (e) {
            alert(e);
        }
    }
    CustomImage.prototype.UpdateName = function (text) {
        this.name = text;
        this.parentOption.text = text;
    };
    CustomImage.prototype.Delete = function () {
        var id = Elements_1.ParentOptions.indexOf(this.parentOption);
        Elements_1.formPARENT.remove(id + 1);
        Elements_1.ParentOptions.splice(id, 1);
        this.parentOption.remove();
        this.element.remove();
        for (var _i = 0, _a = CustomImage.Array; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.parentIndex == id + 1) {
                el.parentIndex = 0;
            }
            else if (el.parentIndex > id + 1) {
                el.parentIndex--;
            }
        }
        CustomImage.Array.splice(CustomImage.Array.indexOf(this), 1);
        for (var _b = 0, ParentOptions_1 = Elements_1.ParentOptions; _b < ParentOptions_1.length; _b++) {
            var el = ParentOptions_1[_b];
            el.value = Elements_1.ParentOptions.indexOf(el) + "";
        }
        Mini_Functions_1.debug("Deleted Element");
        Elements_1.formNAME.value = "";
    };
    CustomImage.number = 0;
    CustomImage.Array = [];
    return CustomImage;
}());
exports.CustomImage = CustomImage;
//# sourceMappingURL=CustomImage.js.map