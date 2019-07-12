import Vue from 'vue'
import App from './App'
import router from './router'

import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 依赖配置好的axios
import axios from './http'

import './assets/css/global.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ELEMENT)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
