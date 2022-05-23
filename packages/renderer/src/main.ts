import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'element-plus/theme-chalk/src/message.scss'
import 'normalize.css'

window.handler.preloadLoaded(() => {
  console.log('窗口加载完成，preload脚本已注入')
})

createApp(App)
  .use(createPinia())
  .mount('#app')
  .$nextTick(() => {
    window.removeLoading()
  })
