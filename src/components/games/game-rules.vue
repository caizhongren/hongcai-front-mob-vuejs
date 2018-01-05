<template>
  <div class="mask-common game-over" v-show="showRulesMask">
    <div class="rule-wrapper" id="game-over">
      <img src="../../images/singles-day/close.png" class="closeRulesMask" v-if="showAnnualInvest" @click="closeRules">
      <!-- 规则弹窗显示 -->
      <div class="discription" v-if="showRulesAbout">
        活动期间，每人均有一次免费游戏机会，新增<img src="../../images/singles-day/icon-02.png" alt="" width="5%">年化投资金额每满<img src="../../images/singles-day/icon-01.png" alt="" width="9%">2000元
        (不含债权转让项目)，即可再获得&nbsp;<img src="../../images/singles-day/emoji-02.png" alt="" width="6%" class="position-ab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1次游戏机会哦！
      </div>
      <div class="calculator">
        <ul>
          <li>年</li>
          <li>化</li>
          <li>投</li>
          <li>资</li>
          <li>计</li>
          <li>算</li>
          <li>器</li>
        </ul>
        <form action="" autocomplete="off">
          <div class="input-item">
            <input type="tel" name="amount" id="amount" placeholder="投资金额" rows=6 cols=30 v-model="project.amount" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" v-on:focus="">
            元
          </div>
          <div class="input-item">
            <input type="tel" name="project.term" id="term" placeholder="项目期限" v-model="project.term" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler">
            天
          </div>
        </form>
        <div class="result clearfix">
          <p>折合年化<br>投资金额</p>
          <span>≈</span>
          <p>{{annualInvestment}}元</p>
        </div>
      </div>
      <!-- 规则弹窗显示 -->
      <p class="calculator-tip" v-if="showRulesAbout">奖励发放30天后，如仍未开通银行存管，奖励将会自动失效哦～</p>
      <p class="close-btn" v-if="showRulesAbout" @click="closeRules">我知道了<img src="../../images/singles-day/emoji-01.png" alt="" width="30%" class="fr"></p>
      <!-- 投资记录弹窗显示 -->
      <p class="calculator-tip rules-tip" v-if="showAnnualInvest">活动期间，新增年化投资金额每满2000元(不含债权转让项目)，即可获得一次游戏机会！</p>
      <p class="calculator-tip" v-if="showAnnualInvest">
        <img src="../../images/singles-day/emoji-01.png" alt="" width="10%" class="display-inbl">举个栗子：<br>
        宏财宝宝投资160天项目5000元，则该笔投资折合年化投资金额为<br>
        5000÷365×160≈2192元<br>
        可获得一次游戏机会哟！
      </p>
    </div>
  </div>
</template>

<script>
  import {InputMaskHelper} from '../../service/Utils'
  export default {
    name: 'gameRules',
    data () {
      return {
        project: {
          amount: null,
          term: null
        },
        showRulesAbout: false,
        showRules: false,
        showAnnualInvest: false,
        annualInvestment: 0,
        path: window.location.href.split('/')[4]
      }
    },
    props: ['showRulesMask', 'closeRules'],
    watch: {
      'project.amount': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      },
      'project.term': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      },
      'showRulesMask': function (newVal, oldVal) {
        var that = this
        if (!newVal) {
          that.project.term = ''
          that.project.amount = ''
        } else {
          var handleEle = document.getElementById('game-over')
          InputMaskHelper.windowChange(handleEle)
        }
      }
    },
    created () {
      this.showRules = this.showRulesMask
      this.path === 'game-counting-start?act=34' ? this.showRulesAbout = true : this.showAnnualInvest = true
    },
    methods: {
      oninputHandler () {
        this.project.amount = this.project.amount.replace(/\D/g, '')
        this.project.amount = this.project.amount.length > 7 ? this.project.amount.slice(0, 7) : this.project.amount
      },
      beforepasteHandler (e) {
        e.clipboardData.setData('text', e.clipboardData.getData('text').replace(/\D/g, ''))
      },
      oninputHandler1 () {
        this.project.term = this.project.term.replace(/\D/g, '')
        this.project.term = this.project.term.length >= 3 && this.project.term > 365 ? this.project.term.slice(0, 2) : this.project.term
      }
    }
  }
</script>
<style scoped>
  .rule-wrapper {
    width: 80%;
    margin: 30% auto;
    padding: .3rem .25rem;
    background-color: #fbdc34;
    border: solid 1px #740e0b;
    border-radius: .15rem;
    font-size: .26rem;
    line-height: 1.33;
    color: #581f0d;
    text-align: justify;
    position: relative;
  }
  .discription {
    margin-bottom: .15rem;
  }
  .calculator {
    padding: .1rem .3rem;
    height: 2.9rem;
    width: 98%;
    margin-left: 1%;
    border-radius: 10px;
    background-color: #ffffff;
    border: solid 1.5px #740e0b;
  }
  .calculator-tip {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.13rem;
    font-size: .2rem;
    line-height: 1.6;
  }
  .rules-tip {
    font-size: .26rem;
    line-height: 1.4;
  }
  .close-btn {
    width: 50%;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: 100% 100%;
    padding: .26rem .35rem .28rem;
    margin: .25rem auto 0;
    font-size: .27rem;
  }
  .close-btn img {
    margin-top: -.05rem;
  }
  .calculator ul {
    width: 10%;
    float: left;
    font-size: .22rem;
    margin-top: .2rem;
  }
  .calculator ul li {
    margin-bottom: .045rem;
    width: .43rem;
    height: .25rem;
    text-align: center;
    border-radius: .15rem;
    color: #f20c12;
    font-family: FZLTZHK-GBK1-0;
    background-color: #ffffff;
    border: solid 1px #4b0d00;
  }
  form {
    width: 80%;
    padding-left: 7%;
    float: left;
  }
  form .input-item {
    width: 103%;
    height: .8rem;
    border-radius: 7.5px;
	  background-color: #ffffff;
    border: 1px solid #4b0d00;
    margin-bottom: .1rem;
    margin-top: .1rem;
    overflow: hidden;
    font-size: .28rem;
	  color: #4c1003;
  }
  form .input-item input {
    height: .74rem;
    width: 63%;
    border: none;
    font-size: .24rem;
    padding-left: .5rem;
    color: #4c1003;
  }
  input::-webkit-input-placeholder {
    color: rgba(79, 7, 9, 0.5);
    opacity: 0.5;
  }
  input:-moz-placeholder {
    color: rgba(79, 7, 9, 0.5);
    opacity: 0.5;
  }
  .result {
    width: 81%;
    margin-left: 18%;
    font-size: .22rem;
    color: #4c1003;
    line-height: 1.2;
    margin-top: -.53rem;
    float: left;
  }
  .result p, .result span {
    float: left;
  }
  .result span {
    margin: 0rem .15rem;
    font-size: .4rem;
    font-weight: bold;
  }
  .result p:last-child {
    margin-top: -.05rem;
    width: 53%;
    height: .6rem;
    line-height: .6rem;
    font-size: .24rem;
    text-align: center;
    border-radius: 7.5px;
    background-color: #fbdc34;
    border: solid 1px #4b0d00;
  }
  .closeRulesMask {
    width: 10%;
    position: absolute;
    right: 0;
    top: -.92rem;
  }
</style>
