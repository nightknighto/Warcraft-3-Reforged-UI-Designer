import { BrowserWindow, Menu, MenuItem } from "electron";

export class ActionBar {

  private menu: Menu;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {

    this.mainWindow = mainWindow;

    this.menu = new Menu();

    this.menu.append(new MenuItem({ role: 'fileMenu' }));
    this.menu.append(new MenuItem({ role: 'editMenu' }));
    this.menu.append(this.createInsertMenu());
    this.menu.append(new MenuItem({ role: 'viewMenu' }));
    this.menu.append(new MenuItem({ role: 'windowMenu' }));
    this.menu.append(new MenuItem({ role: 'appMenu' }));

    Menu.setApplicationMenu(this.menu);
  }

  private createInsertMenu() : MenuItem {

    let insertMenu: MenuItem = new MenuItem(
      {
        label: 'Insert',
        submenu: [
          {
            label: 'ScriptDialogButton',
            click: () => {
              this.mainWindow.webContents.send('Insert', 0)
            },
          },
          {
            label: 'BrowserButton',
            click: () => {
              this.mainWindow.webContents.send('Insert', 1)
            },
          },
          {
            label: 'QuestCheckBox',
            click: () => {
              this.mainWindow.webContents.send('Insert', 2)
            },
          },
          {
            label: 'CheckListBox',
            click: () => {
              this.mainWindow.webContents.send('Insert', 3)
            },
          },
          {
            label: 'OptionsPopupMenuBackdrop',
            click: () => {
              this.mainWindow.webContents.send('Insert', 4)
            },
          },
          {
            label: 'QuestButtonBaseTemplate',
            click: () => {
              this.mainWindow.webContents.send('Insert', 5)
            },
          },
          {
            label: 'QuestButtonPushedBackdropTemplate',
            click: () => {
              this.mainWindow.webContents.send('Insert', 6)
            },
          },
          {
            label: 'QuestButtonDisabledBackdropTemplate',
            click: () => {
              this.mainWindow.webContents.send('Insert', 7)
            },
          },
          {
            label: 'EscMenuBackdrop',
            click: () => {
              this.mainWindow.webContents.send('Insert', 8)
            },
          },
          /*{
            label: 'Insert',
            click: () => {
              this.mainWindow.webContents.send('Insert', 9)
            },
          },
          {
            label: 'Insert',
            click: () => {
              this.mainWindow.webContents.send('Insert', 10)
            },
          },*/

        ]
      }
    )

    return insertMenu;
  }
}