import { getWin } from './../untils'

/**
 * 针对window的操作
 * 通过ipcRenderer.send的触发
 */

export type WindowHandler = {
  setTitle: (event: Electron.IpcMainEvent, title: string) => void
}

export type HandlerKeys = FunctionPropertyNames<WindowHandler>[]

export const windowHandler: WindowHandler = {
  setTitle: (event: Electron.IpcMainEvent, title) => {
    getWin(event.sender.id)?.setTitle(title)
  },
}
