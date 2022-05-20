import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import { MainWindow } from './window/main'
import * as appHook from './init-app-event'
import setMenu from './init-menu'
import setTray from './init-tray'
import initIpc from './init-ipc'

const main = new MainWindow()
// Disable GPU Acceleration for Windows 7 禁用硬件加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

appHook.singleInstanceHook(() => {
  main.create()
  setMenu()
  setTray(main)
  initIpc()
})

appHook.activateHook(() => {
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
    main.show()
  }
})
appHook.secondInstanceHook(() => {
  main.show()
  // 当运行第二个实例时,将会聚焦到myWindow这个窗口
})

appHook.beforeQuitHook(() => {
  main.close()
})

appHook.allClosedHook()
