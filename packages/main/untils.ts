import { BrowserWindow, webContents } from 'electron'
import { isDevelopment } from '../common/runtime'

export const getWin = (id: number) => {
  const win = BrowserWindow.fromWebContents(webContents.fromId(id))
  if (isDevelopment && !win) {
    console.warn(`未找到匹配的Window窗口`)
  }
  return win
}
