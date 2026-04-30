import { contextBridge, ipcRenderer } from 'electron'
import pkg from '../../package.json';

contextBridge.exposeInMainWorld('api', {
  status: 'online',
  version: pkg.version,
  invoke: (channel: string, method: string, ...args: any[]) => 
    ipcRenderer.invoke(`${channel}:${method}`, ...args)
})
