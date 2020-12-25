import { app, BrowserWindow, ipcMain, MenuItem, Menu } from "electron";
import * as path from "path";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    width: 1000,
    resizable: false,
    movable: false,
  });
  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  
  const contextmenu = new Menu()
  let item = new MenuItem( { label: 'Delete', id: 'Delete'} )
  item.click = () => {mainWindow.webContents.send('Delete')}
  contextmenu.append(item)

  contextmenu.append(new MenuItem( { label: 'Hello'} ))
  contextmenu.append(new MenuItem( { label: 'Hello'} ))

  ipcMain.on('show-context-menu', () => {
    contextmenu.popup()
  })

  const menu = new Menu()
  menu.append(
    new MenuItem(
      {
        label: 'File', 
        submenu: [
          {
            label: 'Undo'
          },

          {
            label: 'third'
          }
        ]
      }
    )
  )

  menu.append(
    new MenuItem(
      {
        label: 'Actions', 
        submenu: [
          
          {
            label: 'Copy',
            role: "copy",
            enabled: false
          },
          
          {
            label: 'Paste',
            role: 'paste',
            enabled: false
          },

          {
            label: 'Delete',
            click: () => {
              mainWindow.webContents.send('Delete')
            }
          },

        ]
      }
    )
  )

  menu.append(
    new MenuItem(
      {
        label: 'Insert', 
        submenu: [
          {
            label: 'ScriptDialogButton',
            click: () => {
              mainWindow.webContents.send('Insert', 0)
            },
          },
          {
            label: 'BrowserButton',
            click: () => {
              mainWindow.webContents.send('Insert', 1)
            },
          },
          {
            label: 'QuestCheckBox',
            click: () => {
              mainWindow.webContents.send('Insert', 2)
            },
          },
          {
            label: 'CheckListBox',
            click: () => {
              mainWindow.webContents.send('Insert', 3)
            },
          },
          {
            label: 'OptionsPopupMenuBackdrop',
            click: () => {
              mainWindow.webContents.send('Insert', 4)
            },
          },
          {
            label: 'QuestButtonBaseTemplate',
            click: () => {
              mainWindow.webContents.send('Insert', 5)
            },
          },
          {
            label: 'QuestButtonPushedBackdropTemplate',
            click: () => {
              mainWindow.webContents.send('Insert', 6)
            },
          },
          {
            label: 'QuestButtonDisabledBackdropTemplate',
            click: () => {
              mainWindow.webContents.send('Insert', 7)
            },
          },
          {
            label: 'EscMenuBackdrop',
            click: () => {
              mainWindow.webContents.send('Insert', 8)
            },
          },
          /*{
            label: 'Insert',
            click: () => {
              mainWindow.webContents.send('Insert', 9)
            },
          },
          {
            label: 'Insert',
            click: () => {
              mainWindow.webContents.send('Insert', 10)
            },
          },*/

        ]
      }
    )
  )
  
  Menu.setApplicationMenu(menu);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
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
