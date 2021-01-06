"use strict";
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
exports.__esModule = true;
exports.JASS = void 0;
var fs_1 = require("fs");
var electron_1 = require("electron");
var Elements_1 = require("./Constants.ts/Elements");
var Mini_Functions_1 = require("./Classes & Functions/Mini-Functions");
var CustomImage_1 = require("./Classes & Functions/CustomImage");
var Generate_Functions_1 = require("./Classes & Functions/Generate Functions");
var Insert_1 = require("./Classes & Functions/Insert");
var ImageFunctions_1 = require("./Classes & Functions/ImageFunctions");
var JASS;
(function (JASS) {
    JASS.globals = "globals \n";
    JASS.declares = "framehandle FRvar = null \n";
    JASS.declaresBUTTON = "framehandle FRvarButton = null \n framehandle FRvarBackdrop = null \n";
    JASS.endglobals = "endglobals \n";
    JASS.library = "library REFORGEDUIMAKER initializer init \n private function init takes nothing returns nothing \n";
    JASS.backdrop = 'set FRvar = BlzCreateFrameByType("BACKDROP", " FRvar ", OWNERvar, "", 1) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n call BlzFrameSetTexture(FRvar, PATHvar, 0, true) \n';
    JASS.button = 'set FRvarButton = BlzCreateFrame("ScriptDialogButton", OWNERvar, 0, 0) \n call BlzFrameSetAbsPoint(FRvarButton, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvarButton, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n set FRvarBackdrop = BlzCreateFrameByType("BACKDROP", "FRvarBackdrop", FRvarButton, "", 1) \n call BlzFrameSetAllPoints(FRvarBackdrop, FRvarButton) \n call BlzFrameSetTexture(FRvarBackdrop, PATHvar, 0, true) \n';
    JASS.ScriptDialogButton = 'set FRvar = BlzCreateFrame("ScriptDialogButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.BrowserButton = 'set FRvar = BlzCreateFrame("BrowserButton", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.CheckListBox = 'set FRvar = BlzCreateFrame("CheckListBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.EscMenuBackdrop = 'set FRvar = BlzCreateFrame("EscMenuBackdrop", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.OptionsPopupMenuBackdropTemplate = 'set FRvar = BlzCreateFrame("OptionsPopupMenuBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.QuestButtonBaseTemplate = 'set FRvar = BlzCreateFrame("QuestButtonBaseTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.QuestButtonDisabledBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonDisabledBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.QuestButtonPushedBackdropTemplate = 'set FRvar = BlzCreateFrame("QuestButtonPushedBackdropTemplate", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.QuestCheckBox = 'set FRvar = BlzCreateFrame("QuestCheckBox", OWNERvar,0,0) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar) \n call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar) \n';
    JASS.endlibrary = "endfunction \n endlibrary \n";
})(JASS = exports.JASS || (exports.JASS = {}));
window.addEventListener('mousemove', function (e) {
    var ss = "";
    if (e.clientX >= Elements_1.coordsIMG.getBoundingClientRect().x && e.clientX <= Elements_1.coordsIMG.getBoundingClientRect().right && e.clientY >= Elements_1.coordsIMG.getBoundingClientRect().y && e.clientY <= Elements_1.coordsIMG.getBoundingClientRect().bottom) {
        ss = "Game X/Y: (" + Math.floor((e.clientX - Elements_1.coordsIMG.getBoundingClientRect().x) / Elements_1.coordsIMG.offsetWidth * 800) + ", " + Math.floor(((780 - (e.clientY - Elements_1.coordsIMG.getBoundingClientRect().y)) / Elements_1.coordsIMG.offsetHeight * 600)) + ")";
    }
    Elements_1.coordsTEXT.innerText = ss + "\n    e.client: (" + e.clientX + ", " + e.clientY + ")\n    coordsIMG.Rect: (" + Elements_1.coordsIMG.getBoundingClientRect().x + ", " + Elements_1.coordsIMG.getBoundingClientRect().bottom + ")";
});
Elements_1.formIMG.addEventListener("submit", function (e) {
    e.preventDefault();
    var el = document.createElement("img");
    var img = new CustomImage_1.CustomImage(el, Elements_1.input.files);
    var posx1 = 0, posy1 = 0, posx2 = 0, posy2 = 0;
    ImageFunctions_1.ImageFunctions(img, posx1, posy1, posx2, posy2);
});
Elements_1.formWIDTH.oninput = function () {
    if (CustomImage_1.focusIMG) {
        if (+Elements_1.formWIDTH.value < 20) {
            CustomImage_1.focusIMG.element.width = 20 / 800 * Elements_1.coordsIMG.width;
            Mini_Functions_1.debug("Minimum Width: 20");
        }
        else
            CustomImage_1.focusIMG.element.width = +Elements_1.formWIDTH.value / 800 * Elements_1.coordsIMG.width;
    }
};
Elements_1.formHEIGHT.oninput = function () {
    if (CustomImage_1.focusIMG) {
        if (+Elements_1.formHEIGHT.value < 20) {
            CustomImage_1.focusIMG.element.height = 20 / 600 * Elements_1.coordsIMG.height;
            Mini_Functions_1.debug("Minimum Height: 20");
        }
        else
            CustomImage_1.focusIMG.element.height = +Elements_1.formHEIGHT.value / 600 * Elements_1.coordsIMG.height;
    }
};
//Element Name: 2 parts
//1: prevents first character from being a number, prevents symbols
// eslint-disable-next-line no-useless-escape
var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
Elements_1.formNAME.oninput = function () {
    var text = Elements_1.formNAME.value;
    //checks only the first character if it is number or not
    if (+text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
        Elements_1.formNAME.value = "";
        Mini_Functions_1.debug("Name can't start with a number");
    }
    //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
    if (format.test(text)) {
        Elements_1.formNAME.value = text.slice(0, text.length - 1);
        Mini_Functions_1.debug("Special Characters refused");
    }
};
//2: changes the element name
Elements_1.formNAME.onchange = function () {
    CustomImage_1.focusIMG.UpdateName(Elements_1.formNAME.value);
    Mini_Functions_1.debug('Name Changed to "' + CustomImage_1.focusIMG.name + '"');
};
//Element Type
Elements_1.formTYPE.onchange = function (e) {
    CustomImage_1.focusIMG.type = Elements_1.formTYPE.selectedOptions[0].value;
    Mini_Functions_1.debug('type is ' + CustomImage_1.focusIMG.type);
};
//Element Parent
Elements_1.formPARENT.onchange = function () {
    CustomImage_1.focusIMG.parentIndex = Elements_1.formPARENT.selectedIndex;
};
//Element X,Y
Elements_1.formX.oninput = function () {
    var loc = Elements_1.formX.value;
    CustomImage_1.focusIMG.element.style.left = (+loc * Elements_1.coordsIMG.width) / 800 + Elements_1.coordsIMG.x + "px";
};
Elements_1.formY.oninput = function () {
    var loc = Elements_1.formY.value;
    CustomImage_1.focusIMG.element.style.top = Elements_1.coordsIMG.height - ((+loc * Elements_1.coordsIMG.height) / 600 + Elements_1.coordsIMG.y) + "px";
};
Elements_1.formTEXTURE.onchange = function () {
    CustomImage_1.focusIMG.texturePath = Elements_1.formTEXTURE.value;
    Mini_Functions_1.debug('Texture Path Changed.');
};
//step 2: Delete event comes from main.ts
//step 1 inside class
electron_1.ipcRenderer.on('Delete', function () {
    CustomImage_1.focusIMG.Delete();
});
Elements_1.Generate.onclick = function () {
    fs_1.writeFile('experiment.txt', JASS.globals, function () {
        fs_1.appendFile('experiment.txt', Generate_Functions_1.TemplateReplace(0), function () {
            fs_1.appendFile('experiment.txt', JASS.endglobals, function () {
                fs_1.appendFile('experiment.txt', JASS.library, function () {
                    fs_1.appendFile('experiment.txt', Generate_Functions_1.TemplateReplace(1), function () {
                        fs_1.appendFile('experiment.txt', JASS.endlibrary, function () {
                            alert("File Created in Output folder");
                        });
                    });
                });
            });
        });
    });
};
Insert_1.Insert.Init();
//# sourceMappingURL=renderer.js.map
//required:
//something visible on the selected image to know that it is selected
//a field for the variable that will have its value changed when frame event occurs
//duplicate option for elements
//undo option
//mouse cursor change before drag or resize
//# sourceMappingURL=renderer.js.map