import { isProduction } from '~/packages/common/runtime'
/**
 * 抽象类，用于统一行为
 */
// 抽象类，基础窗口
import { WindowOptions } from './constants'
import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron'
import { join } from 'path'
import * as event from './window-event'

export abstract class AbstractWindow {
  public window: BrowserWindow | null = null
  public options: WindowOptions | null = null

  public abstract create(
    option: BrowserWindowConstructorOptions
  ): AbstractWindow

  protected createWindow(
    windowOptions: WindowOptions,
    browserWindowOptions: BrowserWindowConstructorOptions
  ) {
    const window = new BrowserWindow({
      ...browserWindowOptions,
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs'),
      },
    })

    if (app.isPackaged || isProduction) {
      window.loadFile(
        //TODO: 直接在runtime里切换算了。这里用loadURL。切换为file://协议
        join(__dirname, `../renderer/${windowOptions.entry}.html`)
      )
    } else {
      const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
      window.loadURL(`${url}/${windowOptions.entry}`)
    }

    this.options = windowOptions
    this.window = window

    event.windowHookClose(this.window, this.options)
    event.windowHookClosed(this.window, () => {
      this.close()
    })
    event.windowOpenDevTools(this.window)
    event.windowReadyToShow(this.window)

    return this
  }

  public show() {
    if (this.window?.isMinimized()) this.window.restore()
    this.window?.show()
  }

  public close() {
    if (!this.window?.isDestroyed()) {
      this.options && (this.options.disableClose = false)
      this.window?.close()
    }
  }
}
