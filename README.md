# Electron-templa

## 软硬环境

### 研发环境

Node版本 >=14.17.0

#### 设置npm镜像

安装electron依赖时，会通过 electron-download 下载当前电脑对应平台的Electron 的预编译二进制文件，因为网络问题推荐安装electron依赖前设置npm镜像

```shell
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```

## 快速上手

```shell

# 安装依赖
pnpm install

# 开发
pnpm run dev

# 打包生成主进程、注入脚本、web文件到dist目录
pnpm run build

# 打包生成windows平台exe
pnpm run build:win

# 打包生成Mac平台dmg
pnpm run build:mac

# 提交
pnpm run commit

```
## 架构

### 项目架构设计

### 文件目录


## 图标问题

运行scripts/icon.sh前需要安装`icoutils`工具，用来生成图标

```shell
brew install icoutils
```

```shell
└── resources
    ├── icon 
    │   ├── icon.icns # mac 安装包图标
    │   ├── icon.ico  # win 安装包图标 、 托盘图标
    │   ├── icon.png  # mac 托盘图标
    │   └── icon@2x.png # mac 托盘2倍图标
    └── icon.png      # 替换此图标，运行sh scripts/icon.sh将生成icon文件夹对应系统图标
```

## 开发

### 规范

#### IPC通讯

出于性能与安全考虑，本项目不推荐使用`remote`和在`renderer`进程调用node。
请将node.js调用通过ipc通信的方式调用所有ipc通讯以异步为主。

通讯的接口会通过`preload`注入到`renderer`进程。

在`packages/preload/global.d.ts`通过类型推断，可在`renderer`代码编写时获取到对应的类型提示
##### 双向通讯 renderer进程  <=> main进程

在渲染进程中调用时需要主进程异步回复的

示例： 打开浏览器

renderer进程
```vue
<script setup lang="ts">
const getAppInfo = async () => {
  let res = await window.electronApi.getAppInfo()
  console.log(res)
}
</script>

<template>
  <el-button type="primary" @click="getAppInfo">获取app信息</el-button>
</template>

```

main进程
```ts
export type AppInvoke = {
  getAppInfo: () => AppInfo
}

export const appInvoke: AppInvoke = {
  getAppInfo: () => ({
    title: pkg.title,
    description: pkg.description,
    homepage: pkg.homepage,
    versions: pkg.version,
    copyright: pkg.copyright,
  })
}
```

preload
```ts
contextBridge.exposeInMainWorld('electronApi', {
  getAppInfo: () => ipcRenderer.invoke('getAppInfo')
})
```

##### 单向通讯 renderer进程 => main进程

在渲染进程中调用时无需回复的

```vue
<script setup lang="ts">

const setTitle = () => {
  window.electronApi.setTitle('测试')
}
</script>

<template>
  <el-button type="success" @click="setTitle">修改标题</el-button>
</template>

```

main进程
```ts
export type WindowHandler = {
  setTitle: (event: Electron.IpcMainEvent, title: string) => void
}

export const windowHandler: WindowHandler = {
  setTitle: (event: Electron.IpcMainEvent, title) => {
    getWin(event.sender.id)?.setTitle(title)
  },
}
```

preload
```ts
contextBridge.exposeInMainWorld('electronApi', {
  setTitle: (title:string) => ipcRenderer.on('getAppInfo', title)
})
```
##### 单向通讯 main进程 => renderer进程

主进程触发，渲染进程监听

main进程
```ts
win.webContents.on('did-finish-load', () => {
  // 监听加载结束事件
  win?.webContents.send('preload-loaded')
})
```

preload
```ts
contextBridge.exposeInMainWorld('handler', {
  preloadLoaded: (callback: () => void) => {
    ipcRenderer.on('preload-loaded', callback)
  },
})
```

renderer
```ts
window.handler.preloadLoaded(() => {
  console.log("页面加载完成后主进程会触发此监听")
})
```

