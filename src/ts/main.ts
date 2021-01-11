import { app, BrowserWindow, ipcMain, screen} from "electron";
import * as path from "path";

import { ContextMenu } from './menus/contextMenu';
import { ActionBar } from './menus/actionbar';

let mainWindow : BrowserWindow;
let contextMenu : ContextMenu;
let actionBar : ActionBar;

const minWindowWidth = 1024;
const minWindowHeight = 1280;

function initialize() {

  let windowSize = screen.getPrimaryDisplay().bounds;

  mainWindow = createWindow(windowSize.width, windowSize.height);
  contextMenu = new ContextMenu(mainWindow);
  actionBar = new ActionBar(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./index.html"));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  setupEvents();

  mainWindow.maximize();
}
function createWindow(windowWidth: number, windowHeight: number) :  BrowserWindow{
  // Create the browser window.

  let browserWindow = new BrowserWindow({
    height: windowHeight,
    width: windowWidth,
    minWidth: minWindowWidth,
    minHeight: minWindowHeight,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    resizable: true,
    movable: true,
    frame: false,
  });
  
  return browserWindow;
}

function setupEvents(){

  ipcMain.on('show-context-menu', () => {
    contextMenu.showContextMenu();
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  initialize();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) initialize();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.