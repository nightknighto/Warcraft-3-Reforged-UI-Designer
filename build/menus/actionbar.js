"use strict";
exports.__esModule = true;
exports.ActionBar = void 0;
var electron_1 = require("electron");
var ActionBar = /** @class */ (function () {
    function ActionBar(mainWindow) {
        this.mainWindow = mainWindow;
        this.menu = new electron_1.Menu();
        this.menu.append(new electron_1.MenuItem({ role: 'fileMenu' }));
        this.menu.append(new electron_1.MenuItem({ role: 'editMenu' }));
        this.menu.append(this.createInsertMenu());
        this.menu.append(new electron_1.MenuItem({ role: 'viewMenu' }));
        this.menu.append(new electron_1.MenuItem({ role: 'windowMenu' }));
        this.menu.append(new electron_1.MenuItem({ role: 'appMenu' }));
        electron_1.Menu.setApplicationMenu(this.menu);
    }
    ActionBar.prototype.createInsertMenu = function () {
        var _this = this;
        var insertMenu = new electron_1.MenuItem({
            label: 'Insert',
            submenu: [
                {
                    label: 'ScriptDialogButton',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 0);
                    }
                },
                {
                    label: 'BrowserButton',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 1);
                    }
                },
                {
                    label: 'QuestCheckBox',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 2);
                    }
                },
                {
                    label: 'CheckListBox',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 3);
                    }
                },
                {
                    label: 'OptionsPopupMenuBackdrop',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 4);
                    }
                },
                {
                    label: 'QuestButtonBaseTemplate',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 5);
                    }
                },
                {
                    label: 'QuestButtonPushedBackdropTemplate',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 6);
                    }
                },
                {
                    label: 'QuestButtonDisabledBackdropTemplate',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 7);
                    }
                },
                {
                    label: 'EscMenuBackdrop',
                    click: function () {
                        _this.mainWindow.webContents.send('Insert', 8);
                    }
                },
            ]
        });
        return insertMenu;
    };
    return ActionBar;
}());
exports.ActionBar = ActionBar;
//# sourceMappingURL=actionbar.js.map