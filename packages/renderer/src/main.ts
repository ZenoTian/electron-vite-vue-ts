import { createApp } from 'vue'
import App from './App.vue'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'normalize.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    window.removeLoading()
  })
