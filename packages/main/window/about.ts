import { join } from 'path'
import { BrowserWindow, app } from 'electron'
import { isProduction, aboutEnrty } from '~/packages/common/runtime'

let win: BrowserWindow | null = null

export default function openAboutWindow() {
  if (win !== null) {
    win.focus()
    return win
  }
  win = new BrowserWindow({
    width: 300,
    height: 300,
    useContentSize: true, // 不包含边框
    titleBarStyle: 'hiddenInset',
    movable: true,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
    },
  })

  if (isProduction) {
    win.loadFile(aboutEnrty)
  } else {
    win.loadURL(aboutEnrty)
    win.webContents.openDevTools()
  }

  win.setMenu(null)

  win.once('closed', () => {
    win = null
  })

  win.webContents.once('dom-ready', () => {
    win?.webContents.send('about-window:info', {})
  })

  win.webContents.on('did-finish-load', () => {
    // 监听加载结束事件
    win?.webContents.send('preload-loaded')
  })

  return win
}
