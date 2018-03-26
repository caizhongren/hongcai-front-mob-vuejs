<template>
  <div class="fools-success" v-client-height>
    <div class="header"></div>
    <div class="contents">
      <div class="successHeader">
        <img src="../../images/foolsDay/success-txt.png" alt="" width="70%" class="txt">
        <img src="../../images/foolsDay/clown3.png" alt="小丑" class="clown">
      </div>
      <div class="tip">以上奖励已放入<span>{{userMobile}}</span>账户</div>
      <div class="downLoad" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">立即查看</div>
      <div class="tips">
        温馨提示：<br>
        1.您已成功领取愚人节礼包，请登录宏财网App至“我的”-“特权本金”账户中，查看活动奖励； <br>
        2.特权本金是宏财网向用户提供的一种虚拟资金，其本身不可提现或用于投资，但享受8%预期年化回报率。特权本金次日即可产生收益，并直接发放至用户可用余额，可用于投资或提现；<br>
        3.召集更多好友来测谎，勇攀“愚人榜”，500000元特权本金等着你！(约合收益110元)。
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userMobile: this.$route.query.mobile || '暂无用户信息'
      }
    },
    props: ['token'],
    watch: {
    },
    mounted () {},
    created () {},
    methods: {
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-success {
    background: #f89b32;
    width: 100%;
    overflow-x: hidden;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .3rem;
  }
  .successContent {
    padding: 1.3rem 0 .5rem;
  }
  .successHeader {
    width: 88%;
    height: 3rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto .35rem;
    position: relative;
  }
  .successHeader .txt {
    margin-top: 1.05rem;
    margin-left: -.4rem;
    position: relative;
    z-index: 1;
  }
  .clown {
    position: absolute;
    right: -16%;
    top: -43%;
    width: 63%;
    z-index: 0;
  }
  .tip {
    color: #51171b;
    font-size: .26rem;
    text-align: center;
  }
  .tip span {
    display: inline-block;
    color: #95273d;
    font-weight: bold;
  }
  .downLoad {
    background: url('../../images/foolsDay/down-btn.png') no-repeat center center;
    background-size: 100% 100%;
    width: 29%;
    height: 1.1rem;
    line-height: 1.2rem;
    margin: 0 auto;
    color: #fff5e1;
    font-size: .28rem;
  }
  .tips {
    color: #fff;
    font-size: .23rem;
    text-align: justify;
    padding: .5rem .3rem .3rem;
  }
</style>
