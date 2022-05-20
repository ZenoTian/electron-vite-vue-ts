/**
 * 通过invoke的调用，需要返回给renderer的
 */

import { shell } from 'electron'
import pkg from '~/package.json'

export type AppInvoke = {
  openExternal: (
    event: Electron.IpcMainInvokeEvent,
    url: string
  ) => Promise<void>
  getAppInfo: () => AppInfo
}

export type InvokeKeys = FunctionPropertyNames<AppInvoke>

export interface AppInfo {
  title: string
  description: string
  homepage: string
  versions: string
  copyright: string
}

export const appInvoke: AppInvoke = {
  openExternal: (event, url) => shell.openExternal(url),
  getAppInfo: () => ({
    title: pkg.title,
    description: pkg.description,
    homepage: pkg.homepage,
    versions: pkg.version,
    copyright: pkg.copyright,
  }),
}
