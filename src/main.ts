import './assets/main.css'
// import 'vuestic-ui/css'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import 'material-design-icons-iconfont/dist/material-design-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuestic({ config: {} }))

app.mount('#app')
