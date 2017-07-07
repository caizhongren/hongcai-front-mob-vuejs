
<template>
  <div class="transfer">
    <img src="../images/transfer.png" alt="" width="50%" class="display-bl">
    <p>处理中…</p>
    <p>请耐心等待哟～</p>
  </div>
</template>

<script>
  import {bridgeUtil} from '../service/Utils.js'
  export default {
    name: 'businessSuccess',
    data () {
      return {
        amount: 0,
        coupon: {},
        b: ''
      }
    },
    created: function () {
      this.b = this.$route.query.b
      this.amount = this.$route.query.amount
      this.number = this.$route.query.number
      bridgeUtil.setupWebViewJavascriptBridge()
      window.vue = this
      window.onload = function () {
        window.vue.b === 'TRANSFER' ? window.vue.getCoupon() : window.vue.connectNative({'business': window.vue.b, 'amount': window.vue.amount})
      }
    },
    methods: {
      connectNative: function (dataList) {
        console.log(1)
        bridgeUtil.webConnectNative('HCNative_SuccessCallback', '', dataList, function (response) {
        }, function (response) {})
      },
      getCoupon: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon?token=6261f5e1e9eb93e9479f8cf19c1b2e986ab535d7a0e01c51'
        }).then((response) => {
          if (response && response.data.ret !== -1) {
            if (response.data.coupon) {
              that.coupon.type = response.data.coupon.type
              that.coupon.value = response.data.coupon.value
            }
            var dataList = {}
            dataList = that.coupon.type ? {
              'business': that.b,
              'amount': that.amount,
              'number': that.number,
              'coupon': that.coupon
            } : {
              'business': that.b,
              'amount': that.amount,
              'number': that.number
            }
            that.connectNative(dataList)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.transfer {
    background-color: #fff;
  }*/
  p {
    color: #666;
    text-align: center;
    font-size: .28rem;
  }
  p:last-child {
    font-size: .24rem;
  }
  img {
    display: block;
    margin: 40% auto 5%;
  }
</style>
