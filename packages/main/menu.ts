import { app, Menu } from 'electron'
// import about from './window/about'

export default function setMenu() {
  if (process.platform === 'darwin') {
    const appMenu = Menu.buildFromTemplate([
      {
        label: app.name,
        submenu: [
          {
            label: 'About',
            // click: about,
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      },
      { role: 'fileMenu' },
      { role: 'windowMenu' },
      { role: 'editMenu' },
    ])
    app.applicationMenu = appMenu
  } else if (process.platform === 'win32') {
    // windows上一般不设置上方的menu
    app.applicationMenu = Menu.buildFromTemplate([])
  }
}
