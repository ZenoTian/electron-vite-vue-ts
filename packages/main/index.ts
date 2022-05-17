import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import * as mainWin from './window/main'
import setMenu from './menu'
import setTray from './tray'
import initIpc from './init-ipc'

// Disable GPU Acceleration for Windows 7 禁用硬件加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// 单实例
const lock = app.requestSingleInstanceLock()

if (!lock) {
  // 退出
  app.quit()
  process.exit(0)
} else {
  app.whenReady().then(() => {
    mainWin.createWindow()
    setMenu()
    setTray()
    initIpc()
  })

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    mainWin.show()
  })

  app.on('window-all-closed', () => {
    // window时如果全部关闭就退出 app
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    /**
     * 当应用被激活
     * 首次启动应用程序
     * 尝试在应用程序已运行时
     * 单击应用程序的坞站或任务栏图标
     */
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      mainWin.createWindow()
    }
  })

  app.on('before-quit', () => {
    mainWin.close()
  })
}
