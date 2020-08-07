import Vue from 'vue'
import App from './App.vue'

import {router} from "./routers.js"
import store from './store'


import elementUI from './element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  elementUI,
  render: h => h(App),
}).$mount('#app')
