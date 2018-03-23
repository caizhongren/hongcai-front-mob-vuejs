<template>
  <div class="fools-exchange" v-client-height>
    <div class="header">
      <div class="exchangeHeader">恭喜您获得</div>
      <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    </div>
    <div class="contents">
      <div class="gift">
        精选1.5％无条件加息券 <br>
        尊贵2.5％无条件加息券 <br>
        特权本金2018元（有效期3天)
      </div>
      <form name="mobile" class="mobileBox">
        <input type="tel" placeholder="请输入手机号" v-model="mobile"  v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
        <div class="btns">
          <div class="exchangeBtn" @click="exchange">马上领取</div>
          <img src="../../images/foolsDay/line2.png" alt="曲线" width="26%">
        </div>
      </form>
      <div class="tips">
        温馨提示： <br>
        1.每个账户只能兑换一次奖励，兑换时请务必填写正确的手机账号； <br>
        2.奖励兑换后将在一个工作日内发放至您的宏财网账户，请及时查收； <br>
        3.召集更多好友来测谎，勇攀“愚人榜”，500000元特权本金等着你！(约合收益110元)。
      </div>
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import FoolRules from './FoolRules.vue'
  export default {
    data () {
      return {
        showRules: false,
        mobile: ''
      }
    },
    props: ['showErrMsg'],
    watch: {
    },
    mounted () {},
    created () {},
    methods: {
      closeRules () {
        this.showRules = false
      },
      exchange () {
        var that = this
        if (that.mobile === '') {
          return
        }
        if (that.mobile.length < 11) {
          that.showErrMsg('请输入正确的手机号码！')
          return
        }
        alert('马上领取')
      },
      oninputHandler () {
        this.mobile = this.mobile.replace(/\D/g, '')
        this.mobile = this.mobile.length > 11 ? this.mobile.slice(0, 11) : this.mobile
      },
      beforepasteHandler (e) {
        e.clipboardData.setData('text', e.clipboardData.getData('text').replace(/\D/g, ''))
      }
    },
    components: {FoolRules},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-exchange {
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
  .exchangeHeader {
    width: 40%;
    height: 1.4rem;
    line-height: 1.5rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin-left: 7%;
    font-size: .32rem;
    color: #fff;
    float: left;
  }
  .gift {
    color: #fff;
    font-size: .25rem;
    width: 78%;
    margin: 0 auto;
    height: 4rem;
    padding: 1.9rem 0 0 1rem;
    text-align: left;
    font-weight: bold;
    background: url('../../images/foolsDay/exchange.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .mobileBox {
    padding: 0 10%;
  }
  .mobileBox input {
    border: none;
    background: url('../../images/foolsDay/mobile-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 77%;
    height: 1.1rem;
    line-height: 1.2rem;
    padding: 0 .6rem;
    color: #51171b;
    font-size: .25rem;;
  }
  input::-webkit-input-placeholder {
    color: #51171b;
  }
  .btns {
    overflow: hidden;
    clear: both;
    margin-top: -.1rem;
  }
  .btns img {
    float: right;
  }
  .exchangeBtn {
    width: 35%;
    height: 1rem;
    line-height: 1.15rem;
    background: url('../../images/foolsDay/take-btn.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    font-size: .26rem;
    float: right;
    margin-left: -.1rem;
  }
  .tips {
    color: #fff;
    font-size: .23rem;
    text-align: justify;
    padding: .3rem;
  }
  .ruleIcon {
    width: 28%;
    float: right;
    margin-top: -.1rem;
  }
</style>
