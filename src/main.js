import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import * as custom from './filters/custom'
Vue.prototype.$http = axios
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
