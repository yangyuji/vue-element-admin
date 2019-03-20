import Vue from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // reset css
import App from './App'
import router from './router'
import store from './store'
import './mock'
import './permission' // permission control
import './debug' // 错误日志收集

Vue.use(ElementUI, {
  size: 'small' // default: medium
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
