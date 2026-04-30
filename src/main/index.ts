import { app, BrowserWindow } from 'electron'
import path from 'path'
import { IPCManager } from './config/IPCManager'
import { serviceRegistry } from './config/serviceRegistry'
import 'dotenv/config'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 960,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1a1a1a',
      symbolColor: '#f8f8fd',
      height: 45,
    },
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: true,
    }
  })

  Object.entries(serviceRegistry).forEach(([channel, instance]) => {
    IPCManager.registerService(channel, instance);
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
