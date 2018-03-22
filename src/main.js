import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wx from 'weixin-js-sdk'
Vue.use(VueAxios, axios, wx)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
