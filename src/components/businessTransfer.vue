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
    name: 'businessTransfer',
    data () {
      return {
        amount: 0,
        coupon: {
          type: 1,
          value: 2
        },
        business: '',
        token: ''
      }
    },
    created: function () {
      this.business = this.$route.params.business
      this.amount = this.$route.query.amount
      this.number = this.$route.query.number
      this.token = this.$route.query.token
      bridgeUtil.setupWebViewJavascriptBridge()
      this.token && this.business ? this.getCoupon() : null
    },
    methods: {
      toNative: function (nativeFnName) {
        bridgeUtil.webConnectNative(nativeFnName, '', {
          amout: this.amount,
          number: this.number,
          coupon: this.coupon
        }, function (response) {}, function (response) {})
      },
      getCoupon: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon?token=' + that.token
        }).then((response) => {
          if (response && response.data.ret !== -1) {
            that.coupon = response.data.coupon
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
