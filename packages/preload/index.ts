import { domReady } from './utils'
import { useLoading } from './loading'
import { contextBridge, ipcRenderer } from 'electron'
import { InvokeKeys } from '../main/ipc/appAction'
import invoke from '../main/ipc/appAction'

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

contextBridge.exposeInMainWorld('removeLoading', removeLoading)

const api: Partial<Record<InvokeKeys, InvokeFn>> = {}
const appActionAsyncKeys = Object.keys(invoke) as InvokeKeys[]
appActionAsyncKeys.forEach((channel) => {
  api[channel] = (...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  }
})

contextBridge.exposeInMainWorld('electronApi', api)

contextBridge.exposeInMainWorld('handler', {
  preloadLoaded: (callback: () => void) => {
    ipcRenderer.on('preload-loaded', callback)
  },
})
