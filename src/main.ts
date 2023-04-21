import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.dark.css'
import './assets/main.css'

const appVersion = import.meta.env.DEV
  ? 'Developer Build'
  : VITE_APP_COMMIT_SHA
  ? VITE_APP_COMMIT_SHA.substring(0, 10)
  : 'SHA not available'

console.log(
  `%c YTMV %c Version 2.0.0-${appVersion}`,
  'font-weight: bold; color: #E45B00; background: #2483B0; padding: 5px;',
  'color: black; background: #0699DC; padding: 5px;'
)

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
