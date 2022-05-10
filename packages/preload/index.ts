import { domReady } from './utils'
import { useLoading } from './loading'
import { contextBridge } from 'electron'

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

contextBridge.exposeInMainWorld('removeLoading',removeLoading )


