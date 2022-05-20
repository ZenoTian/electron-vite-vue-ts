/// 在 global.d.ts 全局声明中使用 import 或 export 语法，
/// typescript 认为此类型声明文件为模块类型声明,因此会导致全局声明无效

import { AppInvoke } from '../main/ipc/app-invoke'
import { WindowHandler } from '../main/ipc/window-handler'

// 引入.ts文件中用global.d.ts的AsyncIpcApi<AppInvoke>工具类型处理的类型会失效
// import { ElectronApi } from './index'

type ElectronApi = AsyncIpcApi<AppInvoke> & syncIpcApi<WindowHandler>

declare global {
  interface Window {
    electronApi: ElectronApi
    handler: {
      preloadLoaded: (
        callback: (event: Electron.IpcRendererEvent) => void
      ) => void
    }
    removeLoading: () => void
  }
}

/**
 * 异步ipc类型
 * TODO: 参数推断
 */
type AsyncIpcApi<T> = {
  [K in keyof T]: (...args: any) => Promise<Unpacked<T[K]>>
}

/**
 * ipc单向通讯
 */
type syncIpcApi<T> = {
  [K in keyof T]: (...args: any) => Unpacked<T[K]>
}
/**
 * 类型拆箱，返回对象键对应的类型
 */
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
