import { BrowserWindow } from 'electron'
import { WindowOptions } from './constants'
import { isDevelopment } from '~/packages/common/runtime'

export const windowHookClose = (
  window: BrowserWindow,
  options: WindowOptions
): void => {
  window.on('close', (e) => {
    if (options.disableClose) {
      e.preventDefault()
      window.minimize()
    } else {
      window.close()
    }
  })
}

export const windowHookClosed = (
  window: BrowserWindow,
  cb: () => void
): void => {
  window.on('closed', cb)
}

export const windowReadyToShow = (window: BrowserWindow): void => {
  window.on('ready-to-show', () => {
    window.show()
  })
}

export const windowOpenDevTools = (window: BrowserWindow): void => {
  window.webContents.once('dom-ready', () => {
    if (isDevelopment) {
      window.webContents.once('devtools-opened', () => {
        window.focus()
      })
      window.webContents.openDevTools()
    }
  })
}
