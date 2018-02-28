<template>
    <!-- 计算器 -->
    <div class="mask-common clacul-mask" v-show="showCalculator">
      <div id="calcu-body">
        <div class="calculator">
          <form action="" autocomplete="off">
          <div class="input-item">
              <input type="tel" name="amount" maxlength=9 placeholder="投资金额" rows=6 cols=30 v-model="project.amount" v-on:input="project.amount = project.amount.replace(/\D/g, '')">
              元
          </div>
          <div class="input-item">
              <input type="tel" name="project.term" maxlength=3 placeholder="项目期限" v-model="project.term" v-on:input="project.term = project.term.replace(/\D/g, '')">
              天
          </div>
          </form>
          <div class="result clearfix">
            <p class="fl">折合年化投资金额</p>
            <p class="fr">{{annualInvestment}}元</p>
          </div>
          <p class="calculator-tip margin-auto">*年化投资金额=投资金额÷365×项目期限</p>
        </div>
      </div>
      <img src="../../images/break-egg/icon-close.png" width="12%" alt="" @click="closeCalculator">
    </div>
</template>
<script>
  import {InputMaskHelper, ModalHelper} from '../../service/Utils'
  export default {
    name: 'ArborCalculator',
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
        this.project.term = newVal > 365 ? newVal.slice(0, 2) : this.project.term
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
    }
  }
</script>
<style scoped>
  /* 计算器 */
  .mask-common img {
    margin-top: 1.5rem;
    margin-bottom: -0.8rem;
  }
  .calculator {
    margin-top: 1.5rem;
    padding: 1.5rem .3rem .1rem .3rem;
    height: 5.2rem;
    width: 76%;
    margin-left: 12%;
    border-radius: .1rem;
    background: url(../../images/arbor-day/cacul-bg.png) no-repeat center center;
    background-size: 100%;

  }
  .calculator-tip {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.3rem;
    font-size: .2rem;
    line-height: 1.6;
    color: #fff;
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
  form {
    width: 93%;
    margin: 0 auto;
  }
  form .input-item {
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    border-radius: 7.5px;
	  background-color: #ffffff;
    border: 1px solid #0b6c0d;
    margin-bottom: .1rem;
    margin-top: .1rem;
    overflow: hidden;
    font-size: .28rem;
	  color: #0a3617;
  }
  form .input-item input {
    line-height: 1.3;
    width: 73%;
    border: none;
    font-size: .25rem;
    padding-left: .2rem;
    color: #0a3617;
  }
  input::-webkit-input-placeholder {
    color: rgba(78, 8, 12, 0.5);
    opacity: 0.5;
    font-size: .25rem;
  }
  input:-moz-placeholder {
    color: rgba(78, 8, 12, 0.5);
    opacity: 0.5;
    font-size: .25rem;
  }
  .result {
    margin-top: .15rem;
    width: 96%;
    font-size: .22rem;
    color: #fff;
    line-height: 1.2;
  }
  .result p, .result span {
    font-weight: bold;
  }
  .result span {
    margin: 0rem .15rem;
    font-size: .4rem;
    font-weight: bold;
  }
  .result p:first-child {
    margin-left: 4%;
    margin-top: 0.15rem;
  }
  .result p:last-child {
    margin-top: -.05rem;
    width: 50%;
    height: .65rem;
    line-height: .65rem;
    font-size: .25rem;
    text-align: center;
    border-radius: 7.5px;
    background-color: #d6fced;
	  border: solid 1px #0b6c0d;
    color: #0a3617;
  }
</style>
