/**
 * 异步ipc类型
 */
type AsyncIpcApi<T> = {
  [K in keyof T]: (...args: any) => Promise<Unpacked<T[K]>>
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

/**
 * 获取函数类型的键
 */
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never // 返回函数的键
}[keyof T]

// invoke函数
type InvokeFn = (...args: any[]) => Promise<any>
