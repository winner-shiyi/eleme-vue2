import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

import routes from './routeConfig.js'

// 去webpack 配置 ，不需要写相对路径
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
