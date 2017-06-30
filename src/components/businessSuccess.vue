<template>
  <div class="business-success">
    <div class="overflow-hid">
      <img src="../images/success-re_03.png" width="30%">
      <p class="title">
        <strong v-if="page == 0">恭喜您，成功开通银行资金存管账户！</strong>
        <strong v-if="page === 1">恭喜您，成功充值{{amount}}元！</strong>
        <strong v-if="page === 2">恭喜您，成功提现{{amount}}元！</strong>
        <strong v-if="page === 3">恭喜您，成功投资{{amount}}元，<br><span class="text-center">开始计息！<span v-show="coupon.type == 1">额外加息{{coupon.value}}%</span><span  v-show="coupon.type == 2">额外奖励{{coupon.value}}元</span></span></strong>
        <strong v-if="page === 4">恭喜您，成功绑定银行卡！</strong>
        <strong v-if="page === 5">恭喜您，成功修改手机号！</strong>
        <strong v-if="page === 6">恭喜您，成功投资{{amount}}元！</strong>
        <strong v-if="page === 7">恭喜您，成功开通银行资金存管账户！</strong>
        <strong v-if="page === 8">恭喜您，成功解绑银行卡！</strong>
        <strong v-if="page === 9">恭喜您，成功申请解绑银行卡！</strong>
      </p>
      <div class="column">
        <div v-if="page == 0">
          <div class="one-half button button-primary" @click="toNative('HCNative_toProjectList')">
            <span>浏览项目</span>
          </div>
          <div class="one-half button button-primary" @click="toNative('HCNative_toRecharge')")>
            <span>充值</span>
          </div>
        </div>
        <div class="one-half button button-primary" v-if="page === 1" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <div class="one-half button button-primary" v-if="page === 2" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <!-- userCenter.credits -->
        <div class="one-half button button-primary" v-if="page === 3" @click="toNative('HCNative_toMyCredit')">
          <span>我的投资</span>
        </div>
        <div class="one-half button button-primary" v-if="page === 3" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <div class="one-half button button-primary" v-if="page === 4" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <div class="one-half button button-primary" v-if="page === 5" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <div class="one-half button button-primary" v-if="page === 6" @click="toNative('HCNative_toProjectList')">
          <span>浏览项目</span>
        </div>
        <div v-if="page === 7">
          <div class="one-half button button-primary" @click="toNative('HCNative_toProjectList')">
            <span>浏览项目</span>
          </div>
          <div class="one-half button button-primary" @click="toNative('HCNative_toUserCenter')">
            <span>我的账户</span>
          </div>
        </div>
        <div v-if="page === 8">
          <div class="one-half button button-primary" ui-sref="root.userCenter.setting">
            <span>绑定新银行卡</span>
          </div>
          <div class="one-half button button-primary" ui-sref="root.main">
            <span>逛逛首页</span>
          </div>
        </div>
        <div v-if="page === 9">
          <div class="one-half button button-primary" ui-sref="root.userCenter.account-overview">
            <span>我的账户</span>
          </div>
          <div class="one-half button button-primary" ui-sref="root.main">
            <span>逛逛首页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {bridgeUtil} from '../service/Utils.js'
  export default {
    name: 'home',
    data () {
      return {
        page: '0',
        amount: 0,
        coupon: {
          type: 1,
          value: 2
        },
        business: ''
      }
    },
    created: function () {
      this.business = this.$route.params.business
      this.amount = 9
      this.number = this.$route.query.number
      // console.log(this.amount)
      this.setBuiness()
      bridgeUtil.setupWebViewJavascriptBridge()
    },
    methods: {
      setBuiness: function () {
        if (this.business === 'RECHARGE') {
          this.page = 1
        } else if (this.business === 'WITHDRAW') {
          this.page = 2
        } else if (this.business === 'TRANSFER') {
          this.page = 3
          this.$http({
            method: 'get',
            url: '/hongcai/rest/orders/' + this.number + '/orderCoupon?token=be8e447ebfb61ea0f43846d540e4a21b27a38100517ff32c'
          }).then((response) => {
            if (response && response.data.ret !== -1) {
              console.log(response.data.coupon)
              this.coupon = response.data.coupon
            }
          })
        } else if (this.business === 'BIND_BANK_CARD') {
          this.page = 4
        } else if (this.business === 'RESET_MOBILE') {
          this.page = 5
        } else if (this.business === 'EXPERIENCE') {
          this.page = 6
        } else if (this.business === 'USER_ACTIVE') {
          this.page = 7
        } else if (this.business === 'UNBIND_BANKCARD') {
          this.page = 8
        } else if (this.business === 'UNBIND_BANK_CARD_ING') {
          this.page = 9
        }
      },
      setupWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
          return callback(window.WebViewJavascriptBridge)
        }
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function () {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      },
      connectWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
          return callback(window.WebViewJavascriptBridge)
        } else {
        }
      },
      toNative: function (nativeFnName) {
        bridgeUtil.webConnectNative('HCNative_toProjectList', '', {}, function (response) {}, function (response) {})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .business-success {
    background: #fff;
    padding: .8rem .2rem;
    overflow: hidden;
    text-align: center;
  }
  .title {
    padding: .4rem 0;
    font-size: .35rem;
    color: #333;
  }
  .column {
    width: 100%;
    float: left;
    box-sizing: border-box;
    padding: .5rem 0.2rem;
  }
  .one-half {
    width: 100%;
    float: left;
    font-size: .33rem;
    font-weight: bold;
    margin-bottom: .3rem;
  }
</style>
