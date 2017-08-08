<template>
  <div class="bank-custody-landing">
    <img src="../images/bank-deposits/custody01.png">
    <img src="../images/bank-deposits/custody02.png">
    <img src="../images/bank-deposits/custody03.png">
    <img src="../images/bank-deposits/custody04.png">
    <img src="../images/bank-deposits/custody05.png">
    <img src="../images/bank-deposits/custody06.png">
    <img src="../images/bank-deposits/custody07.png">
    <img src="../images/bank-deposits/custody08.png">
    <img src="../images/bank-deposits/custody09.png">
    <img src="../images/bank-deposits/custody10.png">
    <img src="../images/bank-deposits/custody11.png">
    <img src="../images/bank-deposits/custody12.png">
    <img src="../images/bank-deposits/custody13.png">
    <img src="../images/bank-deposits/custody14.png">
    <img src="../images/bank-deposits/custody15.png">
    <img src="../images/bank-deposits/custody16.png">
    <img src="../images/bank-deposits/custody17.png">
    <img src="../images/bank-deposits/custody18.png">
    <div class="toProcess">
      <img src="../images/bank-deposits/custody19.png">
      <div class="newUser" @click="toOpen();" v-show="!isLogged || userAuth.active === false">开通银行存管账户</div>  
    </div>
    <img src="../images/bank-deposits/custody20.png" v-show="!isLogged || userAuth.active === false">
  </div>
</template>

<script>
  import {bridgeUtil, Utils} from '../service/Utils'
  export default {
    name: 'BankCustody',
    data () {
      return {
        isLogged: Boolean,
        isAndroid: Utils.isAndroid(),
        userAuth: {
          active: Boolean,
          authStatus: Number
        }
      }
    },
    created: function () {
      this.token ? this.isLogged = true : this.isLogged = false
      this.token ? this.getUserAuth() : ''
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? this.getUserAuth() : null
        val && val !== '' ? this.isLogged = true : this.isLogged = false
      }
    },
    methods: {
      toLogin: function () {
        bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
      },
      getUserAuth: function () {
        this.$http({
          methods: 'get',
          url: '/hongcai/rest/users/0/userAuth?token=' + this.token
        }).then((response) => {
          this.userAuth = response.data
          console.log(this.userAuth.active)
          console.log(this.userAuth.authStatus)
        })
      },
      toOpen: function () {
        if (!this.token || this.token === '') {
          this.toLogin()
          return
        }
        bridgeUtil.webConnectNative('HCNative_CheckUserAuth', '', {}, function (response) {}, null)
      }
    }
  }
</script>

<style scoped>
  .bank-custody-landing img {
    width: 100%;
    vertical-align: top;
  }
  .bank-custody-landing .toProcess {
    position: relative;
  }
  .toProcess .newUser {
    width: 76%;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    bottom: 0rem;
    background: rgba(0,0,0,0.8);
    left: 12%;
    background: url('../images/bank-deposits/custody-btn.png') no-repeat center center;
    background-size: contain;
    left: 12%;
    color: #000;
    text-align: center;
  }
</style>
