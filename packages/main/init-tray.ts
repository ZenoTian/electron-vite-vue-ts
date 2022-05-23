import { MainWindow } from './window/main'
import { app, Menu, Tray } from 'electron'
import about from './window/about'
import * as path from 'path'

let tray: Tray

export default function setTray(main: MainWindow) {
  if (process.platform === 'darwin') {
    // Mac图片需要1倍图(32*32)2倍图@2x(64*64)
    tray = new Tray(path.resolve(__dirname, '../../resources/icon/icon.png'))
    tray.on('right-click', () => {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '显示',
          click: () => {
            main.show()
          },
        },
        {
          label: '退出',
          click: () => {
            app.quit()
          },
        },
      ])
      tray.popUpContextMenu(contextMenu)
    })
  } else if (process.platform === 'win32') {
    // 托盘win需要使用.ico文件
    tray = new Tray(path.resolve(__dirname, '../../resources/icon.ico'))
    // 右键菜单
    const contextMenu = Menu.buildFromTemplate([
      { label: '打开' + app.name, click: main.show },
      { label: '关于' + app.name, click: about },
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          app.quit()
        },
      },
    ])
    tray.setContextMenu(contextMenu)
  }
}
