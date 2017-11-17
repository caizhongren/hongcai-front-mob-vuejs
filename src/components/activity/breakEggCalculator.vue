<template>
  <div class="calculator-wrapper" id="calcu">
    <div class="calculator" v-show="showCalculator">
      <div class="title">
        <img src="../../images/break-egg/hammer.png" alt="" width="8%" class="display-inbl">年化投资计算器
      </div>
      <form action="" autocomplete="off">
        <div class="form-item clearfix">
          <img src="../../images/break-egg/icon-money.png" alt="" width="11%" class="fl">
          <div class="fl">
            <input type="tel" placeholder="投资金额" id="amount" v-model="project.amount" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler">
            元
          </div>
        </div>
        <div class="form-item clearfix">
          <img src="../../images/break-egg/icon-date.png" alt="" width="11%" class="fl">
          <div class="fl">
            <input type="tel" placeholder="项目期限" id="term" v-model="project.term" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler">
            天
          </div>
        </div>
      </form>
      <div class="result clearfix">
        <p>折合年化投资金额</p>
        <span>≈</span>
        <p>{{annualInvestment}}元</p>
      </div>
      <p class="calculator-tip">*年化投资金额=投资金额÷365×项目期限</p>
    </div>
    <div class="line"><span></span></div>
    <img src="../../images/break-egg/icon-close.png" alt="" width="10%" @click="closeCalculator">
  </div>
</template>
<script>
  import {InputMaskHelper} from '../../service/Utils'
  export default {
    name: 'breakEggCalculator',
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
          var handleEle = document.getElementById('calcu')
          InputMaskHelper.windowChange(handleEle)
        }
      }
    },
    methods: {
      oninputHandler () {
        this.project.amount = this.project.amount.replace(/\D/g, '')
        this.project.amount = this.project.amount.length > 9 ? this.project.amount.slice(0, 9) : this.project.amount
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
  .calculator-wrapper .line {
    width: 100%;
  }
  .calculator-wrapper .line span {
    margin: -.37rem auto 0;
    display: block;
    height: .7rem;
    width: 1px;
    background-color: #fff;
  }
  .calculator {
    width: 90%;
    height: 7rem;
    margin: .6rem auto 0;
    background: url('../../images/break-egg/bg-calculator.png') no-repeat center center;
    background-size: 100%;
  }
  .calculator .title {
    margin: 0 auto;
    padding-top: 2rem;
    padding-left: .1rem;
    width: 80%;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.23;
    letter-spacing: 3px;
    color: #582318;
  }
  form {
    width: 78%;
    margin-top: .3rem;
    margin-left: 13%;
  }
  form .form-item div.fl {
    border-bottom : 1px solid #4b0d00;
    margin-left: .1rem;
    padding: 0 .1rem;
    width: 78%;
    margin-bottom: .3rem;
    font-size: .28rem;
	  color: #4c1003;
  }
  form .form-item div.fl input {
    border: none;
    width: 85%;
    font-size: .25rem;
    color: #4c1003;
  }
  .result {
    width: 81%;
    margin-left: 13%;
    color: #4c1003;
    line-height: 1.3;
    margin-top: 0;
    float: left;
  }
  .result p, .result span {
    float: left;
  }
  .result span {
    margin: 0.04rem .08rem;
    font-size: .3rem;
    font-weight: bold;
  }
  .result p:first-child {
    margin-top: .12rem;
  }
  .result p:last-child {
    margin-top: -.05rem;
    width: 40%;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .25rem;
    border-radius: 7.5px;
    background-color: #fbdc34;
    border: solid 1px #4b0d00;
  }
  .calculator-tip {
    width: 97%;
    margin-top: .7rem;
    font-size: .22rem;
    color: #5d2c22;
    line-height: 1.6;
    transform: scale(.9)
  }
</style>
