import { app, BrowserWindow } from 'electron'
import path from 'path'
import { IPCManager } from './IPCManager'
import { SupabaseProductRepository } from './repositories/SupabaseProductRepository'
import 'dotenv/config'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: true,
    }
  })

  const productRepo = new SupabaseProductRepository()
  IPCManager.registerService('products', productRepo)

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
