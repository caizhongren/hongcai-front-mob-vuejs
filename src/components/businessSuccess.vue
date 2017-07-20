
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
        rechargeAmount: 0,
        coupon: {},
        userOrder: {},
        b: ''
      }
    },
    created: function () {
      this.b = this.$route.query.business
      this.amount = this.$route.query.amount
      this.number = this.$route.query.number
      this.rechargeAmount = this.$route.query.rechargeAmount
      if (this.token && this.token !== '') {
        if (this.b === 'TRANSFER') {
          this.goTransfer(1)
        } else if (this.b === 'RECHARGE_AUTH_TENDER') {
          this.goRechargeAndTransfer()
        } else if (!this.amount) {
          this.connectNative({'business': this.b})
        } else {
          this.connectNative({'business': this.b, 'amount': this.amount})
        }
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '') {
          if (this.b === 'TRANSFER') {
            this.goTransfer(1)
          } else if (this.b === 'RECHARGE_AUTH_TENDER') {
            this.goRechargeAndTransfer()
          } else if (!this.amount) {
            this.connectNative({'business': this.b})
          } else {
            this.connectNative({'business': this.b, 'amount': this.amount})
          }
        }
      }
    },
    methods: {
      connectNative: function (dataList) {
        setTimeout(function () {
          bridgeUtil.webConnectNative('HCNative_SuccessCallback', '', dataList, function (response) {}, function (response) {})
        }, 1000)
      },
      goTransfer: function (status) {
        // 投资
        var that = this
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon?token=' + that.token
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            var dataList = that.b === 'RECHARGE_AUTH_TENDER' ? {
              'business': that.b,
              'status': status,
              'rechargeAmount': that.rechargeAmount
            } : {
              'business': that.b,
              'amount': that.amount
            }
            if (status === 1) {
              if (response.data.coupon) {
                alert(that.coupon + '3')
                that.coupon.type = response.data.coupon.type
                that.coupon.value = response.data.coupon.value
                dataList = {
                  'business': that.b,
                  'amount': that.amount,
                  'coupon': that.coupon,
                  'status': status
                }
              }
            }
            that.connectNative(dataList)
          }
        })
      },
      goRechargeAndTransfer: function () {
        // 充值并投资
        var that = this
        // 支付成功 status 2 || 3 ||4
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.userOrder = res.data
            // 投资成功
            if (res.data.status === 2 || res.data.status === 3 || res.data.status === 4) {
              that.goTransfer(1)
            } else {
              // 投资失败
              that.goTransfer(0)
            }
            return
          }
          setTimeout(function () {
            if (!that.userOrder.status) {
              // 如果没有订单状态再次请求
              that.goRechargeAndTransfer()
            }
          }, 1000)
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
