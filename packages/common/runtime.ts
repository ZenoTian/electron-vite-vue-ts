import { platform } from 'os'
import { join } from 'path'

export const isMac = platform() === 'darwin'
export const isWin = platform() === 'win32'

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

export const root = join(__dirname, '../../')

export const renderSrc = join(__dirname, '../renderer/src')

export const resourcesDir = join(root, '/resources')

export const trayLogo = join(resourcesDir, `/icon${isWin ? 'ico' : 'icns'}`)

const devUrl = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

export const fileEntry = (fileName: string): string =>
  isProduction
    ? join(__dirname, `../renderer/${fileName}`)
    : `${devUrl}/${fileName}`

export const mainEnrty = fileEntry('index.html')

export const aboutEnrty = fileEntry('about.html')

export const preload = join(root, '../preload/index.cjs')
