import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon
import './permission' // permission control
// import './mock' // simulation data
import util from './utils/utils'
//有赞移动端UI
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(util);
Vue.use(Vant);

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
