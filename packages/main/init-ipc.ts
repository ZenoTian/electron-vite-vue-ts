import { ipcMain } from 'electron'
import { InvokeHandler } from './ipc/appAction'
import electronApi from './ipc/appAction'

export default (): void => {
  const appActionAsyncKeys = Object.keys(
    electronApi
  ) as FunctionPropertyNames<InvokeHandler>[]
  appActionAsyncKeys.forEach((key) => {
    ipcMain.handle(key, electronApi[key])
  })
}
