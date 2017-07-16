
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
        userOrder: {},
        b: ''
      }
    },
    created: function () {
      this.b = this.$route.query.business
      this.amount = this.$route.query.amount
      this.number = this.$route.query.number
      if (this.token && this.token !== '') {
        if (this.b === 'TRANSFER') {
          this.getCoupon(1)
        } else if (!this.amount) {
          this.connectNative({'business': this.b})
        } else if (this.b === 'RECHARGE_AUTH_TENDER') {
          this.getUserOrder()
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
            this.getCoupon(1)
          } else if (!this.amount) {
            this.connectNative({'business': this.b})
          } else if (this.b === 'RECHARGE_AUTH_TENDER') {
            this.getUserOrder()
          } else {
            this.connectNative({'business': this.b, 'amount': this.amount})
          }
        }
      }
    },
    methods: {
      connectNative: function (dataList) {
        bridgeUtil.webConnectNative('HCNative_SuccessCallback', '', dataList, function (response) {
        }, function (response) {})
      },
      getCoupon: function (status) {
        var that = this
        console.log(that.token)
        that.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orderCoupon?token=' + that.token
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            var dataList = {
              'business': that.b,
              'amount': that.amount,
              'status': status
            }
            if (status === 1) {
              if (response.data.coupon) {
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
      getUserOrder: function () {
        var that = this
        // 支付成功 status 2 || 3 ||4
        this.$http({
          url: '/hongcai/rest/orders/' + that.number + '/orders?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            this.userOrder = res.data
            if (res.data.status === 2 || res.data.status === 3 || res.data.status === 4) {
              this.getCoupon(1)
            } else {
              this.getCoupon(0)
            }
          }
          setTimeout(function () {
            if (!this.userOrder.status) {
              this.getOrderStatas()
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
