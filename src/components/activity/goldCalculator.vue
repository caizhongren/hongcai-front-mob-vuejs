<template>
  <div class="mask-common clacul-mask">
    <div id="calcu-body">
      <!-- 计算器 -->
      <div class="calculator" v-if="isCalculator">
        　<img src="../../images/gold-day/header-calcul.png" alt="年化出借计算器" width="80%">
        <form action="" autocomplete="off">
          <div class="input-item">
            <input type="tel" name="amount" maxlength=9 placeholder="出借金额" rows=6 cols=30 v-model="project.amount" v-on:input="project.amount = project.amount.replace(/\D/g, '')">
            元
          </div>
          <div class="input-item">
            <input type="tel" name="term" maxlength=3 placeholder="项目期限" v-model="project.term" v-on:input="project.term = project.term.replace(/\D/g, '')">
            天
          </div>
        </form>
        <div class="result clearfix">
          <p class="fl">折合年化出借金额</p>
          <p class="fr">{{annualInvestment}}元</p>
        </div>
        <p class="calculator-tip margin-auto">*年化出借金额=出借金额÷365×项目期限</p>
      </div>
      <!-- 温馨提示 -->
      <div class="tipBox" v-else-if="isTips">
        <div :class="[isTips === 1 ? 'header-tip' : 'header-activityEnd']"></div>
        <div class="text">
          特权本金产量未达到100元 <br>
          {{isTips === 1 ? '现在收获不产生收益哟' : '不能获取产生收益哟'}}
        </div>
        <div class="btns" @click="$parent.showMask = false;">{{isTips === 1 ? '再等等' : '知道了'}}</div>
      </div>
      <!-- 活动结束蒙层 -->
      <div class="activityEnd" v-else>
        <img src="../../images/gold-day/activityEnd.png" alt="">
      </div>
    </div>
    <img v-if="isCalculator" src="../../images/break-egg/icon-close.png" width="12%" class="close" @click="$parent.showMask = false;">
  </div>
</template>
<script>
import {InputMaskHelper, ModalHelper} from '../../service/Utils'
export default {
  name: 'GoldCalculator',
  data () {
    return {
      project: {
        amount: null,
        term: null
      }
    }
  },
  props: ['showMask', 'isCalculator', 'isTips'],
  watch: {
    'project.term': function (newVal, oldVal) {
      this.project.term = newVal > 365 ? newVal.slice(0, 2) : this.project.term
    },
    '$parent.showMask': function (newVal, oldVal) {
      var that = this
      if (that.isCalculator) {
        that.project.term = ''
        that.project.amount = ''
        InputMaskHelper.windowChange(document.getElementById('calcu-body'))
      }
      newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
    }
  },
  created () {
    this.$parent.showMask ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
  },
  computed: {
    annualInvestment () {
      return Math.ceil(this.project.amount * this.project.term / 365)
    }
  }
}
</script>
<style scoped>
/* 计算器 */
.mask-common .close {
  margin-top: 1.2rem;
  margin-bottom: -0.8rem;
}
.calculator {
  margin: 1.5rem auto 0;
  padding: .2rem .25rem;
  height: auto;
  width: 80%;
  border-radius: 15px;
  background-color: #36dcdc;
  border: solid 1.5px #008087;

}
.calculator-tip {
  width: 96%;
  margin-left: 5%;
  margin-top: 0.2rem;
  font-size: .2rem;
  line-height: 1.6;
  color: #008087;
  text-align: left;
}
.rules-tip {
  font-size: .26rem;
  line-height: 1.4;
}
.close-btn {
  width: 51%;
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
  background-color: #fff;
  border: 1px solid #008087;
  margin-bottom: .1rem;
  margin-top: .1rem;
  overflow: hidden;
  font-size: .28rem;
  color: #0a3617;
}
form .input-item input {
  line-height: 1.3;
  width: 82%;
  border: none;
  font-size: .25rem;
  color: #0a3617;
}
input::-webkit-input-placeholder {
  color: rgba(78, 2, 10, 0.5);
  opacity: 0.5;
  font-size: .25rem;
}
input:-moz-placeholder {
  color: rgba(78, 2, 10, 0.5);
  opacity: 0.5;
  font-size: .25rem;
}
.result {
  margin-top: .15rem;
  width: 96%;
  font-size: .22rem;
  color: #008087;
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
  background-color: #93e8f8;
  border: solid 1px #008087;
  color: #0a3617;
}
.tipBox {
  margin: 2.75rem auto 0;
  padding: .15rem 0 .2rem;
  height: auto;
  width: 63%;
  border-radius: 15px;
  background-color: #36dcdc;
  border: solid 2px #008087;
  text-align: center;
}
.header-tip, .header-activityEnd {
  width: 85%;
  height: .72rem;
  margin: 0 auto;
}
.header-tip {
  background: url('../../images/gold-day/header-tip.png') no-repeat center center;
  background-size: contain;
}
.header-activityEnd {
  background: url('../../images/gold-day/header-activityEnd.png') no-repeat center center;
  background-size: contain;
}
.tipBox .text {
  background-color: #93e8f8;
  color: #05848b;
  font-weight: bold;
  padding: .2rem;
  margin: .2rem 0;
}
.tipBox .btns {
  width: 56%;
  height: .6rem;
  line-height: .65rem;
  margin: 0 auto;
  border-radius: 17.5px;
  background-color: #ffcc02;
  box-shadow: 0px 2px 2px 0 rgba(184, 130, 18, 0.94);
  color: #9a540e;
  text-shadow: 0.2px 0.5px 0 rgba(111, 74, 0, 0.28);
}
.activityEnd {
  margin: 2rem auto 0;
}
.activityEnd img {
  width: 45%;
  margin: .5rem 0 0 16%;
}
</style>
