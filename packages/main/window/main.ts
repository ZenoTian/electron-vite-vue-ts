import { AbstractWindow } from './abstract'

export class MainWindow extends AbstractWindow {
  public create() {
    this.createWindow(
      {
        entry: 'index',
        disableClose: true,
      },
      {
        title: '主窗口',
      }
    )
    return this
  }
}
