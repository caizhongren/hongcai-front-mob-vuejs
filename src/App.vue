<template>
  <div id="app">
    <router-view :token="token" :showErrMsg="showErrMsg"></router-view>
    <p id="err" v-show="showErr">{{errMsg}}</p>
    <div class="mask-common mask1" v-show="showLongErr">
      <div class="alert-wrap">
        <div class="text">
          {{errMsg}}
        </div>
        <div class="i-know" @click="showLongErr = false">
          我知道了
        </div>
      </div>
    </div>
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
      token: '',
      showErr: false,
      showLongErr: false,
      errMsg: ''
    }
  },
  created: function () {
    this.getToken()
    this.receiveToken()
  },
  methods: {
    getToken: function () {
      var that = this
      bridgeUtil.webConnectNative('HCNative_GetToken', '', {}, function (res) {
        that.token = Utils.isAndroid() ? JSON.parse(res).token : res.token
      }, null)
    },
    receiveToken: function () {
      var that = this
      bridgeUtil.webConnectNative('', 'HCWeb_LoginSuccess', {}, function (res) {}, function (data) {
        that.token = Utils.isAndroid() ? JSON.parse(data).token : data.token
      })
    },
    showErrMsg (msg, isLong) {
      var that = this
      if (isLong) {
        that.showLongErr = true
        that.errMsg = msg
      } else {
        that.showErr = true
        that.errMsg = msg
        setTimeout(function () {
          that.showErr = false
          that.errMsg = ''
        }, 2000)
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getToken'
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
  #app .mask-common.mask1 {
    background-color: transparent;
  }
  .mask1 .alert-wrap {
    height: 2.5rem;
    width: 72%;
    background-color: transparent;
    font-size: .22rem;
    margin: 2rem auto;
    z-index: 100000000;
  }
  .mask1 .alert-wrap .text {
    height: 1.8rem;
    line-height: 1.5;
    font-size: .24rem;
    padding: .6rem .2rem 0;
    margin-bottom: .5px;
    border-radius: .2rem .2rem 0 0;
    background-color: #fff;
    opacity: 0.98;
  }
  .mask1 .alert-wrap .i-know {
    color: #505ee0;
    font-size: .28rem;
    line-height: .8rem;
    background-color: #fff;
    border-radius: 0 0 .2rem .2rem;
    opacity: 0.95;
  }
  ul#footer li {
    float: left;
    width: 33.33%;
  }
  /* 错误提示 */
  #err {
    position: fixed;
    top: 2.8rem;
    left: 1.4rem;
    right: 1.4rem;
    padding: .14rem 0;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: .2rem;
    text-align: center;
    font-size: .23rem;
    color: #fff;
    z-index: 10000000;
  }
</style>
