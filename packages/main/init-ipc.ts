import { ipcMain, IpcMainEvent } from 'electron'
import { InvokeKeys } from './ipc/appAction'
import electronApi from './ipc/appAction'

export default (): void => {
  const appActionAsyncKeys = Object.keys(electronApi) as InvokeKeys[]
  appActionAsyncKeys.forEach((key) => {
    ipcMain.handle(key, electronApi[key])
  })
}
