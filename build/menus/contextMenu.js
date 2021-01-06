"use strict";
exports.__esModule = true;
exports.ContextMenu = void 0;
var electron_1 = require("electron");
var ContextMenu = /** @class */ (function () {
    function ContextMenu(mainWindow) {
        this.mainWindow = mainWindow;
        this.contextMenu = new electron_1.Menu();
        this.populateContextMenu();
    }
    ContextMenu.prototype.populateContextMenu = function () {
        var _this = this;
        var item = new electron_1.MenuItem({ label: 'Delete', id: 'Delete' });
        item.click = function () { _this.mainWindow.webContents.send('Delete'); };
        this.contextMenu.append(item);
    };
    ContextMenu.prototype.showContextMenu = function () {
        this.contextMenu.popup();
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=contextMenu.js.map