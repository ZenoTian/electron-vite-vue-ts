import { app } from 'electron'

export const singleInstanceHook = (callback: () => void) => {
  // 单实例
  const lock = app.requestSingleInstanceLock()

  if (!lock) {
    // 退出
    app.quit()
    process.exit(0)
  } else {
    app.whenReady().then(() => {
      callback()
    })
  }
}

export const allClosedHook = () => {
  app.on('window-all-closed', () => {
    // window时如果全部关闭就退出 app
    if (process.platform !== 'darwin') app.quit()
  })
}

export const secondInstanceHook = (callback: () => void) => {
  app.on('second-instance', () => {
    callback()
  })
}

export const beforeQuitHook = (callback: () => void) => {
  app.on('before-quit', () => {
    callback()
  })
}

export const activateHook = (callback: () => void) => {
  app.on('activate', () => {
    callback()
  })
}
