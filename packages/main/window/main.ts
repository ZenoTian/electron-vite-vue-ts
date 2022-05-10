import { app, BrowserWindow } from 'electron'
import { join } from 'path'

let win: BrowserWindow | null = null
let quitApp = false

export function createWindow() {
  win = new BrowserWindow({
    title: '主窗口',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs')
    },
  })

  win.on('close', (e) => {
    // app关闭窗口时最小化不退出app，隐藏
    if (quitApp) {
      // 只有通过托盘退出时退出
      win = null
    } else {
      e.preventDefault()
      win?.hide()
    }
  })

  win.on('ready-to-show', () => {
    win?.show()
  })

  if (app.isPackaged || process.env.NODE_ENV === 'production') {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
    win.loadURL(url)
    win.webContents.openDevTools()
  }
}

export function show() {
  if (win?.isMinimized()) win.restore()
  win?.show()
}

export function close() {
  quitApp = true
  win?.close()
}
