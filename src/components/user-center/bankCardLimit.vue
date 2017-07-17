<template>
  <div class="banklimit-list" v-auto-height>
    <ul class="display-bl margin-auto">
      <li class="titles">
        <div><p class="display-inb bank-names">支持银行</p><p class="display-inb limits">单笔/单日/单月</p></div>
      </li>
      <li class="clearfix" v-for="(card, index) in bankLimit">
        <div>
          <p class="display-inb bank-name"><img v-bind:src="card.bankCardImg" alt="">{{card.bankName}}</p>
          <p class="display-inb limit">{{card.singleLimit < 0 ? '不限': card.singleLimit % 10000 === 0 ? card.singleLimit / 10000 + 'w' : card.singleLimit}}/{{card.dayLimit < 0 ? '不限': card.dayLimit % 10000 === 0 ? card.dayLimit / 10000 + 'w' : card.dayLimit}}/{{card.monthLimit < 0 ? '不限': card.monthLimit % 10000 === 0 ? card.monthLimit / 10000 + 'w' : card.monthLimit}}</p>
        </div>
      </li>
    </ul>
    <img class="bottom_bg" src="../../images/common-bg.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'bankCardLimit',
    data () {
      return {
        bankLimit: Array
      }
    },
    created: function () {
      this.getBankLimit()
    },
    methods: {
      getBankLimit: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/bankcard/rechargeBankLimits'
        })
        .then(function (res) {
          that.bankLimit = res.data
          for (var i = 0; i < that.bankLimit.length; i++) {
            that.bankLimit[i].bankCardImg = '.../../../static/images/' + that.bankLimit[i].bankCode + '.png'
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bottom_bg {
    vertical-align: bottom;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .banklimit-list {
    position: relative;
  }
  .banklimit-list .titles {
    border-bottom: 1px solid #fa6943;
    color: #fa6943;
    font-size: .3rem;
  }
  .banklimit-list ul {
    padding-bottom: 1.5rem;
    min-height: 9rem;
  }
  .banklimit-list li {
    height: 1.1rem;
    line-height: 1.1rem;
  }
  .banklimit-list li .bank-name {
    width: 43%;
    text-align: center;
    color: #666;
    font-size: .26rem;
    padding-left: .2rem;
  }
  .banklimit-list li .bank-names {
    width: 50%;
    text-align: center;
  }
  .bank-name img {
    vertical-align: middle;
    margin-right: .2rem;
    width: 25%;
  }
  .banklimit-list li .limits {
    width: 50%;
    text-align: center;
  }
  .banklimit-list li .limit {
    width: 55%;
    text-align: center;
    padding-left: .3rem;
  }
</style>
