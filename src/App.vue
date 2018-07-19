<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view :token="token" :showErrMsg="showErrMsg"></router-view>
    </transition>
    <p id="err" v-show="showErr" v-bind:style="styleObject">{{errMsg}}</p>
    <div class="mask-common mask1" v-show="showLongErr">
      <div class="alert-wrap" v-show="showLongErr">
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
      errMsg: '',
      timer: null,
      styleObject: {}
    }
  },
  created: function () {
    this.getToken()
    this.receiveToken()
  },
  mounted () {
    var vue = this
    window.addEventListener('touchmove', function (event) {
      event.stopPropagation()
      vue.showErr ? vue.showErr = false : null
    }, false)
  },
  methods: {
    getToken: function () {
      var that = this
      if (location.href.indexOf('bean') !== -1 && location.href.indexOf('token') !== -1) {
        that.token = that.$route.query.token
      }
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
    showErrMsg (msg, isLong, setErrStyle) {
      clearTimeout(this.timer)
      this.showErr = false
      var that = this
      setErrStyle ? this.styleObject = setErrStyle : null
      if (isLong) {
        that.showLongErr = true
        that.errMsg = msg
      } else {
        that.showErr = true
        that.errMsg = msg
        that.timer = setTimeout(function () {
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
Vue.directive('client-height', function (el, binding) {
  function setHeight () {
    el.style.height = document.documentElement.clientHeight + 'px'
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
  @import 'css/golden-mask.css';
  .router-fade-enter-active, .router-fade-leave-active {
	  transition: opacity .3s;
	}
  .router-fade-enter, .router-fade-leave-active {
	  opacity: 0;
	}
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
    margin: 3rem auto;
    z-index: 100000000;
  }
  .mask1 .alert-wrap .text {
    height: 1.8rem;
    line-height: 1.5;
    font-size: .24rem;
    padding: .6rem .2rem 0;
    border-bottom: 1px solid #ddd;
    border-radius: .2rem .2rem 0 0;
    background-color: #fff;
  }
  .mask1 .alert-wrap .i-know {
    color: #505ee0;
    font-size: .28rem;
    line-height: .8rem;
    background-color: #fff;
    border-radius: 0 0 .2rem .2rem;
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
