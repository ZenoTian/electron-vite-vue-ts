import '../styles/about.scss'

window.addEventListener('DOMContentLoaded', () => {
  window.handler.preloadLoaded(async (event) => {
    window.removeLoading()

    const app = await window.electronApi.getAppInfo()

    const open = () => {
      console.log(app['homepage'])
      window.electronApi.openExternal(app['homepage'])
    }

    const icon = document.querySelector('.icon') as HTMLImageElement
    icon.addEventListener('click', open)

    const title = document.querySelector('.title') as HTMLElement
    title.innerText = app.title
    title.addEventListener('click', open)

    const homepage = document.querySelector('.homepage') as HTMLElement
    homepage.innerText = app.homepage
    homepage.addEventListener('click', open)

    const description = document.querySelector('.description') as HTMLElement
    description.innerText = app.description

    const versions = document.querySelector('.versions') as HTMLElement
    versions.innerText = app.versions
    const copyright = document.querySelector('.copyright') as HTMLElement
    copyright.innerText = app.copyright
  })
})
