import { BrowserWindow, ipcMain, shell } from 'electron'

import { ContextMenu } from './Editor/Menus/contextMenu'

export interface WindowProps {
    width?: number
    height?: number
    minWidth?: number
    minHeight?: number
    devTools?: boolean
}
export default class Main {
    private static instance?: Main

    static init(app: Electron.App, browserWindow: typeof BrowserWindow, props?: WindowProps) {
        if (!Main.instance) Main.instance = new Main(app, browserWindow, props)
        return Main.instance
    }
    static getInstance() {
        return Main.instance
    }

    mainWindow: Electron.BrowserWindow
    application: Electron.App
    BrowserWindow: typeof BrowserWindow
    contextMenu: ContextMenu

    minWindowWidth = 1024
    minWindowHeight = 640
    windowWidth = this.minWindowWidth
    windowHeight = this.minWindowHeight
    devTools = false

    private constructor(app: Electron.App, browserWindow: typeof BrowserWindow, props?: WindowProps) {
        if (props) {
            this.devTools = props.devTools ?? this.devTools
            if (props.width) this.windowWidth = props.width + (this.devTools ? 700 : 0)
            if (props.height) this.windowHeight = props.height
            if (props.minWidth) this.minWindowWidth = props.minWidth
            if (props.minHeight) this.minWindowHeight = props.minHeight
        }

        this.BrowserWindow = browserWindow
        this.application = app
        this.application.on('ready', () => {
            this.onReady()
        })
        this.application.on('window-all-closed', () => {
            this.onWindowAllClosed()
        })
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.application.quit()
        }
    }

    private onClose() {
        // Dereference the window object.
        this.mainWindow = null
    }

    private onReady() {
        // and load the index.html of the app.
        // this.mainWindow.loadFile(path.join(__dirname, './index.html'))
        // Open the DevTools.

        this.mainWindow = new this.BrowserWindow({
            height: this.windowHeight,
            width: this.windowWidth,
            minWidth: this.minWindowWidth,
            minHeight: this.minWindowHeight,
            webPreferences: {
                preload: 'file://' + __dirname + 'preload.js',
                nodeIntegration: true,
                nodeIntegrationInSubFrames: true,
                webviewTag: true,
                // webSecurity: false,
                // allowRunningInsecureContent: true,
            },
            resizable: true,
            movable: true,
            titleBarStyle: 'hidden',
            frame: false,
        })

        this.mainWindow.loadURL('file://' + __dirname + '/index.html')
        if (this.devTools) this.mainWindow.webContents.openDevTools()
        // this.mainWindow.on('closed', this.onClose)

        this.contextMenu = new ContextMenu(this.mainWindow)

        ipcMain.on('show-context-menu', () => {
            this.contextMenu.showContextMenu()
        })

        //following code makes links open in external browser
        this.mainWindow.webContents.on('new-window', function (e, url) {
            e.preventDefault()
            shell.openExternal(url)
        })

        //following code allows external URLs to be played in iframes
        this.mainWindow.webContents.session.webRequest.onHeadersReceived({ urls: ['*://*/*'] }, (details, callback) => {
            Object.keys(details.responseHeaders!)
                .filter((x) => x.toLowerCase() === 'x-frame-options')
                .map((x) => delete details.responseHeaders![x])

            callback({
                cancel: false,
                responseHeaders: details.responseHeaders,
            })
        })
    }
}
