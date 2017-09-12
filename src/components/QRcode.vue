<template>
  <div>
    <div v-show="isLogged">
      <div id="qrcode"></div>
      <div class='change' @click="getQrcodeUrl()">切换二维码</div>
    </div>
    <div v-show="!isLogged" class="loginForm" v-auto-height>
      <form name="loginForm">
        <input type="tel" class="mobile" name="mobile" placeholder="请输入手机号" v-model="user.mobile">
        <input type="text" id="password" name="password" placeholder="请设置登录密码" v-model="user.password">
        <button type="button" @click="login(user)">立即登录</button>
      </form>
    </div>
  </div>
</template>
<script>
  import {QRCode} from '../service/qrcode.js'
  import {Utils} from '../service/Utils'
  import {md5} from '../service/md5.js'
  export default {
    name: 'QRcode',
    data () {
      return {
        url: '',
        qrcode: Object,
        isLogged: true,
        user: {
          mobile: '',
          password: ''
        }
      }
    },
    watch: {
      isLogged: function (val) {
        if (val) {
          this.getQrcodeUrl()
        }
      }
    },
    mounted () {
      var that = this
      that.qrcode = new QRCode(document.getElementById('qrcode'), {
        text: that.url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })
    },
    props: ['showErrMsg'],
    created () {
      this.isLogged ? this.getQrcodeUrl() : null
    },
    methods: {
      getQrcodeUrl () {
        var that = this
        that.$http({
          methods: 'get',
          url: 'hongcai/rest/users/offline/code'
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            that.url = process.env.vue_domain + '/activity/register?f=50jia&code=' + response.data.code
            that.qrcode.makeCode(that.url)
            that.isLogged = true
          } else if (response.data.code === -1000) {
            that.isLogged = false
          }
        })
      },
      login (user) {
        var that = this
        if (!user.mobile || !user.password) {
          return
        }
        that.$http({
          method: 'get',
          url: process.env.WEB_DEFAULT_DOMAIN + '/siteUser/login?account=' + user.mobile + '&guestId=' + Utils.guestId(32, 16) + '&password=' + md5(user.password)
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            that.isLogged = true
            that.getQrcodeUrl()
          } else {
            that.showErrMsg('用户名或密码错误')
          }
        })
      }
    }
  }
</script>
<style scoped>
  #qrcode {
    margin: 1.5rem auto;
    padding: 0rem 1.4rem;
  }
  .change {
    width: 30%;
    margin: 0 auto;
    background: orange;
    height: .6rem;
    line-height: .65rem;
    border-radius: .5rem;
    color: #fff;
    font-size: .3rem;
  }
  .loginForm {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
  }
  .loginForm input {
    width: 70%;
    height: 0.7rem;
    font-size: .24rem;
    border: 1px solid #999;
    margin-bottom: .5rem;
    font-size: .26rem;
    color: #333;
    padding: .1rem .3rem;
  }
  button {
    width: 30%;
    color: #fff;
    background: orange;
    border: none;
    height: .6rem;
    border-radius: .5rem;
    font-size: .3rem;
  }
</style>
