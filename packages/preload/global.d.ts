import { ElectronApi } from '../main/api/common'

export {}

declare global {
  interface Window {
    electronApi: ElectronApi
    removeLoading: () => void
  }
}
