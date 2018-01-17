<template>
  <!-- 计算器 -->
  <div class="mask-common" v-show="showCalculator">
    <div id="calcu-body">
      <div class="calculator">
        <p class="cal-title">年化投资计算器</p>
        <form action="" autocomplete="off">
          <div class="input-item">
              <input type="tel" name="amount" maxlength=9 placeholder="投资金额" rows=6 cols=30 v-model="project.amount" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler">
              元
          </div>
          <div class="input-item">
              <input type="tel" name="project.term" maxlength=3 placeholder="项目期限" v-model="project.term" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler">
              天
          </div>
        </form>
        <div class="result clearfix">
          <p class="fl">折合年化投资金额</p>
          <span class="fl">≈</span>
          <p class="fr">{{annualInvestment}}元</p>
        </div>
        <p class="cal-tip">*年化投资金额=投资金额÷365×项目期限</p>
      </div>
    </div>
    <img src="../../images/break-egg/icon-close.png" width="12%" alt="" @click="closeCalculator" class="close-btn">
  </div>
</template>
<script>
  import {InputMaskHelper, ModalHelper} from '../../service/Utils'
  export default {
    name: 'LabaCalculator',
    data () {
      return {
        project: {
          amount: null,
          term: null
        },
        annualInvestment: 0
      }
    },
    props: ['showCalculator', 'closeCalculator'],
    watch: {
      'project.amount': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      },
      'project.term': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      },
      'showCalculator': function (newVal, oldVal) {
        var that = this
        if (!newVal) {
          that.project.term = ''
          that.project.amount = ''
        } else {
          var handleEle = document.getElementById('calcu-body')
          InputMaskHelper.windowChange(handleEle)
        }
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    methods: {
      oninputHandler () {
        this.project.amount = this.project.amount.replace(/\D/g, '')
      },
      beforepasteHandler (e) {
        e.clipboardData.setData('text', e.clipboardData.getData('text').replace(/\D/g, ''))
      },
      oninputHandler1 () {
        this.project.term = this.project.term.replace(/\D/g, '')
        this.project.term = this.project.term > 365 ? this.project.term.slice(0, 2) : this.project.term
      }
    }
  }
</script>

<style scoped>
  /* 计算器 */
  .calculator {
    margin-top: 1.5rem;
    padding-top: .5rem;
    padding-bottom: .15rem;
    width: 82%;
    margin-left: 9%;
    border-radius: .1rem;
    background: url('../../images/laba-festival/invest-box.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .cal-title {
    font-family: 'FZZCHJW-GB1-0';
    font-size: .28rem;
    letter-spacing: 0.4px;
    color: #ffdaa3;
  }
  .cal-tip {
    font-family: MicrosoftYaHei;
    font-size: .22rem;
    text-align: left;
    width: 80%;
    margin-left: 10%;
    color: #ffffff;
  }
  .calculator-tip {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.13rem;
    font-size: .2rem;
    line-height: 1.6;
  }
  .close-btn {
    margin: 1.5rem auto 0;
  }
  form {
    width: 80%;
    margin: .3rem auto 0;
  }
  form .input-item {
    width: 100%;
    height: .8rem;
    line-height: .8rem;
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
    line-height: 1.3;
    width: 73%;
    border: none;
    font-size: .24rem;
    padding-left: .2rem;
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
    width: 80%;
    font-size: .22rem;
    color: #4e1508;
    line-height: 1.2;
    margin: .2rem 10% .1rem;
  }
  .result p, .result span {
    font-weight: bold;
	  color: #ffdaa3;
  }
  .result p:first-child {
    margin-top: .15rem;
  }
  .result span {
    margin: 0.02rem .1rem;
    font-size: .4rem;
    font-weight: bold;
  }
  .result p:last-child {
    margin-top: -.05rem;
    width: 46%;
    height: .65rem;
    line-height: .65rem;
    font-size: .28rem;
    text-align: center;
    border-radius: 7.5px;
    background-color: #ffeead;
	  color: #4c1106;
    border: solid 1px #4e1508;
  }
</style>
