<template>
    <div class="gameOver">
      <audio preload="preload" id="click"><source src="../../assets/click.mp3"></audio>
      <div class="record" @click="getRecordList">游戏<br>记录</div>
      <div class="title">
        <img src="../../images/singles-day/emoji-03.png" alt="" width="15%">
        嘤嘤嘤...没有游戏机会咯！
      </div>
      <div class="position-re">
        <div class="notice-head">
          新增<img src="../../images/singles-day/icon-02.png" alt="" width="5%">年化投资金额每满<img src="../../images/singles-day/icon-01.png" alt="" width="8%">2000元(不含债权转让项目),
          即可再获得 <img src="../../images/singles-day/emoji-02.png" class="position-ab" alt="" width="6%">&nbsp;&nbsp;&nbsp;&nbsp; 1次游戏机会哦！
        </div>
        <div class="calculator">
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
          <p class="calculator-tip">*年化投资金额=投资金额÷365×项目期限</p>
        </div>
      </div>
      <p class="tip">奖励发放30天后，如仍未开通银行存管，奖励将会自动失效哦～</p>
      <p class="invest-btn" @click="toInvestList">立即投资</p>
    </div>
</template>
<script>
  import {bridgeUtil, audioPlayUtil} from '../../service/Utils'
  export default {
    name: 'gameOver',
    data () {
      return {
        project: {
          amount: null,
          term: null
        },
        annualInvestment: 0,
        isPlay: this.$route.query.isPlay,
        activityType: this.$route.query.act
      }
    },
    watch: {
      'project.amount': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      },
      'project.term': function (newVal, oldVal) {
        this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
      }
    },
    props: ['token'],
    created () {
      this.annualInvestment = Math.ceil(this.project.amount * this.project.term / 365)
    },
    mounted () {
      document.getElementsByClassName('gameOver')[0].style.height = window.innerHeight + 'px'
      this.last(document.getElementById('amount'), 3)
    },
    methods: {
      getRecordList () {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        this.$router.push({name: 'gameRecord', query: { act: this.activityType, isPlay: this.isPlay }})
      },
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
      },
      toInvestList () {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
      },
      last (elem, index) {
        var val = elem.value
        var len = val.length
        if (len < index) return
        setTimeout(function () {
          elem.focus()
          if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)
          } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart('character', -len)
            range.moveEnd('character', -len)
            range.moveStart('character', index)
            range.moveEnd('character', 0)
            range.select()
          }
        }, 10)
      }
    },
    destroyed () {
      audioPlayUtil.playOrPaused('click', this.isPlay)
    }
  }
</script>
<style scoped>
  .gameOver {
    padding: .5rem .35rem 0;
    background-color: #fbdc34;
    overflow: hidden;
    height: 100%;
    /* position: relative; */
  }
  .gameOver .tip {
    width: 88%;
    margin: 109% auto 0;
    font-size: .22rem;
    color: #4f0709;
    text-align: justify;
    line-height: 1.2;
    /* padding-bottom: 1.9rem; */
  }
  .gameOver .record {
    width: 1.1rem;
    height: .8rem;
    line-height: 1.2;
    background: url('../../images/singles-day/rule-icon.png') no-repeat center bottom;
    background-size: 100% 100%;
    position: fixed;
    right: -0.1rem;
    top: 8.5%;
    padding: .1rem 0 .1rem .15rem;
    color: #fff;
    font-size: .26rem;
    z-index: 3;
  }
  .gameOver .title {
    padding-top: .4rem;
    width: 78%;
    margin-left: 7%;
    font-size: .28rem;
	  color: #5a190c;
  }
  .gameOver .title img {
    float: left;
    margin-top: -.2rem;
  }
  .notice-head {
    width: 92%;
    margin: .6rem auto 0;
    padding: .3rem .14rem;
    position: absolute;
    left: 4%;
    text-align: justify;
    border-radius: 10px;
    background-color: #ffffff;
    border: solid 1.5px #740e0b;
    font-family: MicrosoftYaHei;
    font-size: .29rem;
    line-height: 1.2;
    color: #4f0709;
    z-index: 2;
  }
  .calculator {
    position: absolute;
    top: .5rem;
    left: 2.5%;
    width: 94.5%;
    height: 5.5rem;
    background: url('../../images/singles-day/calculator-bg.png') no-repeat bottom center;
    background-size: 94%;
  }
  .calculator .calculator-tip {
    color: #fff;
    width: 85%;
    margin-top: 0.13rem;
    margin-left: 13%;
    font-size: .2rem;
    transform: scale(.95);
  }
  @media(max-width: 320px) {
    .calculator .calculator-tip {
      transform: scale(.8);
    }
  }
  form {
    margin-top: 2.4rem;
  }
  form .input-item {
    width: 66%;
    margin-left: 23%;
    height: .8rem;
    border-radius: 7.5px;
	  background-color: #ffffff;
    border: 1px solid #4b0d00;
    margin-bottom: .1rem;
    overflow: hidden;
    font-size: .32rem;
	  color: #4c1003;
  }
  form .input-item input {
    height: .8rem;
    width: 70%;
    border: none;
    line-height: 2;
    font-size: .25rem;
    padding-left: .1rem;
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
    width: 66%;
    margin-left: 23%;
    font-size: .26rem;
    color: #4c1003;
    line-height: 1.2;
    margin-top: .2rem;
  }
  .result p, .result span {
    float: left;
  }
  .result span {
    margin: .06rem .15rem;
    font-size: .4rem;
    font-weight: bold;
  }
  .result p:last-child {
    width: 54%;
    height: .64rem;
    line-height: .65rem;
    font-size: 18px;
    border-radius: 7.5px;
    background-color: #fbdc34;
    border: solid 1px #4b0d00;
  }
  .invest-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    color: #fff;
    font-size: .26rem;
    background-color: #fc2a42;
    border: solid 1.5px #5b010a;
  }
</style>
