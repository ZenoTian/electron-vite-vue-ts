import { domReady } from './utils'
import { useLoading } from './loading'
import { contextBridge, ipcRenderer } from 'electron'
import { InvokeHandler } from '../main/ipc/appAction'
import invoke from '../main/ipc/appAction'

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

contextBridge.exposeInMainWorld('removeLoading', removeLoading)

type handlerKeys = FunctionPropertyNames<InvokeHandler>
const api: Partial<Record<handlerKeys, InvokeFn>> = {}
const appActionAsyncKeys = Object.keys(invoke) as handlerKeys[]
appActionAsyncKeys.forEach((channel) => {
  console.log('channel', channel)
  api[channel] = (...args: any[]) => ipcRenderer.invoke(channel, args)
})
contextBridge.exposeInMainWorld('electronAPI', api)
