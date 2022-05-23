import { ipcMain } from 'electron'
import { InvokeKeys, appInvoke } from './ipc/app-invoke'
import { HandlerKeys, windowHandler } from './ipc/window-handler'

export default (): void => {
  // 双向通讯
  const appActionAsyncKeys = Object.keys(appInvoke) as InvokeKeys[]
  appActionAsyncKeys.forEach((key) => {
    ipcMain.handle(key, appInvoke[key])
  })

  // renderer => main
  const keys = Object.keys(windowHandler) as HandlerKeys
  keys.forEach((key) => {
    ipcMain.on(key, windowHandler[key])
  })
}
