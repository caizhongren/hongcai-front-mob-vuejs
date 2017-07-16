<template>
  <div id="app">
    <!-- <ul id="footer">
      <router-link to="/">
        <li>
          <img src="./images/footer/answer1.png" alt="" width="22%">
          <div>问答</div>
        </li>
      </router-link>
      <router-link :to="{name: 'ProjectDetail',params: {number: 1}}">
        <li>
          <img src="./images/footer/article2.png" alt="" width="20%">
          <div>文章</div>
        </li>
      </router-link>
      <li>
        <router-link to="/user-center">
          <img src="./images/footer/me2.png" alt="" width="22%">
          <div>我</div>
        </router-link>
      </li>
    </ul> -->
    <router-view :token="token"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import {bridgeUtil, Utils} from './service/Utils'
import * as custom from './filters/custom'

export default {
  name: 'app',
  data () {
    return {
      token: ''
    }
  },
  created: function () {
    bridgeUtil.setupWebViewJavascriptBridge()
    var that = this
    window.addEventListener('load', function () {
      bridgeUtil.webConnectNative('HCNative_GetToken', '', {}, function (res) {
        that.token = Utils.isAndroid() ? JSON.parse(res).token : res.token
        console.log(token)
      }, null)
    })
  }
}
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.directive('auto-height', function (el, binding) {
  function setHeight () {
    el.style.height = window.innerHeight + 'px'
  }
  setHeight()
  window.addEventListener('load', function () {
    setHeight()
  }, window.addEventListener('resize', function () {
    setHeight()
  }))
})
</script>

<style lang="css">
  @import 'css/common.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #footer {
    height: 53px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 8px 0 3px;
    border-top: 1px solid #eee;
    z-index: 9999999;
  }
  ul#footer li {
    float: left;
    width: 33.33%;
  }
  
</style>
