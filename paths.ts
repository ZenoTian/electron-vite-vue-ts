import { join } from 'path'

export const root = join(__dirname, '.')

export const renderSrc = join(__dirname, './packages/renderer/src')

export const logo = join(__dirname, `./resources/icon${process.platform === 'win32'?'ico':'icns'}`)
