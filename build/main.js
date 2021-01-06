"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var contextMenu_1 = require("./menus/contextMenu");
var actionbar_1 = require("./menus/actionbar");
var mainWindow;
var contextMenu;
var actionBar;
function initialize() {
    mainWindow = createWindow();
    contextMenu = new contextMenu_1.ContextMenu(mainWindow);
    actionBar = new actionbar_1.ActionBar(mainWindow);
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "./index.html"));
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    setupEvents();
    mainWindow.maximize();
}
function createWindow() {
    // Create the browser window.
    var browserWindow = new electron_1.BrowserWindow({
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
        width: 1000,
        resizable: false,
        movable: false
    });
    return browserWindow;
}
function setupEvents() {
    electron_1.ipcMain.on('show-context-menu', function () {
        contextMenu.showContextMenu();
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
    initialize();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            initialize();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map