import { app, BrowserWindow } from 'electron'
import Main from './Main'

Main.init(app, BrowserWindow, { width: 1500, height: 950, devTools: true })
