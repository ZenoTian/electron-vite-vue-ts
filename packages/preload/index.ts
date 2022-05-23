import { domReady } from './utils'
import { useLoading } from './loading'
import { contextBridge, ipcRenderer } from 'electron'
import { InvokeKeys, appInvoke } from '../main/ipc/app-invoke'
import { windowHandler, HandlerKeys } from '../main/ipc/window-handler'

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

contextBridge.exposeInMainWorld('removeLoading', removeLoading)

const api: {
  [key: string]: (args: any[]) => any
} = {}

Object.keys(appInvoke).forEach((channel) => {
  api[channel] = (...args: any[]) => ipcRenderer.invoke(channel, ...args)
})

Object.keys(windowHandler).forEach((channel) => {
  api[channel] = (...args: any[]) => ipcRenderer.send(channel, ...args)
})

contextBridge.exposeInMainWorld('electronApi', api)

/**
 * TODO: handler的实参如何推断
 */
contextBridge.exposeInMainWorld('handler', {
  preloadLoaded: (callback: () => void) => {
    ipcRenderer.on('preload-loaded', callback)
  },
})
