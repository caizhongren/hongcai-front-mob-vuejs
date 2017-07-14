
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
      this.b = this.$route.query.business
      this.amount = this.$route.query.amount
      this.number = this.$route.query.number
      bridgeUtil.setupWebViewJavascriptBridge()
      window.vue = this
      window.onload = function () {
        if (window.vue.b === 'TRANSFER') {
          window.vue.getCoupon()
        } else if (!window.vue.amount) {
          window.vue.connectNative({'business': window.vue.b})
        } else {
          window.vue.connectNative({'business': window.vue.b, 'amount': window.vue.amount})
        }
      }
    },
    methods: {
      connectNative: function (dataList) {
        bridgeUtil.webConnectNative('HCNative_SuccessCallback', '', dataList, function (response) {
        }, function (response) {})
      },
      getCoupon: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon'
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            var dataList = {
              'business': that.b,
              'amount': that.amount
            }
            if (response.data.coupon) {
              that.coupon.type = response.data.coupon.type
              that.coupon.value = response.data.coupon.value
              dataList = {
                'business': that.b,
                'amount': that.amount,
                'coupon': that.coupon
              }
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
