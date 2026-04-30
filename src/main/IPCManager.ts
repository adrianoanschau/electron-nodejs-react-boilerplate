import { ipcMain } from 'electron'

export class IPCManager {
  static registerService(channel: string, service: any) {
    // Registra cada método do serviço como um canal IPC
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(service))
    
    methods.forEach(method => {
      if (method !== 'constructor') {
        ipcMain.handle(`${channel}:${method}`, (_, ...args) => service[method](...args))
      }
    })
  }
}
