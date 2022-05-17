/// 在 global.d.ts 全局声明中使用 import 或 export 语法，
/// typescript 认为此类型声明文件为模块类型声明,因此会导致全局声明无效

import { InvokeHandler } from '../main/ipc/appAction'

// 引入.ts文件中用global.d.ts的AsyncIpcApi<InvokeHandler>工具类型处理的类型会失效
// import { ElectronApi } from './index'

declare global {
  interface Window {
    // electronApi: ElectronApi
    electronApi: AsyncIpcApi<InvokeHandler>
    removeLoading: () => void
  }
}

/**
 * 异步ipc类型
 */
// 这里全局的AsyncIpcApi的工具类型会失效，不得不重写一份
type AsyncIpcApi<T> = {
  // 这里全局的Unpacked的工具类型却有效
  [K in keyof T]: (...args: any) => Promise<Unpacked<T[K]>>
}
