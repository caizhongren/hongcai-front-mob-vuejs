import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wx from 'weixin-js-sdk'
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios, wx)
Vue.prototype.$axios = axios

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
var fundebug = require('fundebug-javascript')
fundebug.apikey = '2dc9a9abf8ec54b6444f6131cf9fa9accd3274d3a574df6c6669d323ad200e5f'
function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}
Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
