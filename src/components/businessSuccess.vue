
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
      this.b === 'TRANSFER' ? this.getCoupon() : null
    },
    methods: {
      getCoupon: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon?token=6261f5e1e9eb93e9b49163c64298d8a736cee0025eb49263'
        }).then((response) => {
          if (response && response.data.ret !== -1) {
            if (response.data.coupon) {
              that.coupon.type = response.data.coupon.type
              that.coupon.value = response.data.coupon.value
            }
            var dataList = {}
            dataList = that.coupon.type ? dataList = {
              'business': that.b,
              'amount': that.amount,
              'number': that.number,
              'coupon': that.coupon
            } : {
              'business': that.b,
              'amount': that.amount,
              'number': that.number
            }
            bridgeUtil.webConnectNative('HCNative_SuccessCallback', '', dataList, function (response) {}, function (response) {})
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
