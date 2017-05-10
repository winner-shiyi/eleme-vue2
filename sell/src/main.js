import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(VueRouter)

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: {
//     App
//   }
// })
let app = Vue.extend(App)

let router = new VueRouter()

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})
router.start(app, '#app')

router.go('/goods')
