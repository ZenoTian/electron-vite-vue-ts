import { root } from '../../common/runtime'
import { join } from 'path'
/**
 * 全局通用的ipc操作
 */

import { shell } from 'electron'
import pkg from '~/package.json'

export type InvokeHandler = {
  openExternal: (
    event: Electron.IpcMainInvokeEvent,
    url: string
  ) => Promise<void>
  getAppInfo: (event: Electron.IpcMainInvokeEvent) => AppInfo
}

export type InvokeKeys = FunctionPropertyNames<InvokeHandler>
export interface AppInfo {
  title: string
  description: string
  homepage: string
  versions: string
  copyright: string
}

export default <InvokeHandler>{
  openExternal: (event, url) => shell.openExternal(url),
  getAppInfo: () => ({
    title: pkg.title,
    description: pkg.description,
    homepage: pkg.homepage,
    versions: pkg.version,
    copyright: pkg.copyright,
  }),
}
