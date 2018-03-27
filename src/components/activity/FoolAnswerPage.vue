<template>
  <!-- 答题页面 -->
  <div class="fools-answer-page" v-client-height>
    <div class="header">
      <ul class="nums">
        <li class="unSelectNumBg selectNumBg">
          <p class="num1"></p>
        </li>
        <li class="unSelectNumBg ">
          <p class="num2"></p>
        </li>
        <li class="unSelectNumBg ">
          <p class="num3"></p>
        </li>
        <li class="unSelectNumBg ">
          <p class="num4"></p>
        </li>
        <li class="unSelectNumBg ">
          <p class="num5"></p>
        </li>
      </ul>
    </div>
    <div class="question">{{title}}</div>
    <ul class="selectBtns">
      <li class="noBelieve" @click="choose(1)"></li>
      <li class="believe" @click="choose(2)"></li>
    </ul>
    <div class="tipBox">
      <img src="../../images/foolsDay/answer-tips.png" alt="">
    </div>
    <img src="../../images/foolsDay/clown2.png" alt="" class="clown2">
    <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    <Fool-Quit :showQuit="showQuit" :closeQuit="closeQuit" :isAnswer="isAnswer"  v-show="showQuit"></Fool-Quit>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import $ from 'zepto'
  import FoolRules from './FoolRules.vue'
  import FoolQuit from './FoolQuit.vue'
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        showRules: false,
        showQuit: false,
        isAnswer: true,
        title: '',
        questionList: [],
        num: 1,
        answerQuestions: [],
        number: '',
        token: ''
      }
    },
    watch: {
    },
    mounted () {},
    created () {
      this.number = '122'
      this.token = '66724307eb8d5db37ceb9564f83ba0c2e316ce0b69de76c1'
      this.question()
      sessionStorage.amswerCount = Number(sessionStorage.amswerCount) + 1 || 1
      if (sessionStorage.amswerCount > 1) {
        this.showQuit = true
      }
    },
    methods: {
      closeQuit (type) { // type 1 取消 2 确认
        this.showQuit = false
        type === 1 ? (
          this.answerQuestions = JSON.parse(sessionStorage.answerQuestions),
          this.num = Number(this.answerQuestions.length) + 1,
          $($('.nums li')[0]).removeClass('selectNumBg'),
          $($('.nums li')[this.num - 1]).addClass('selectNumBg')
        ) : wx.closeWindow()
      },
      closeRules () {
        this.showRules = false
      },
      choose (type) {
        var that = this
        var question = that.questionList[that.num - 1]
        that.title = question.question
        question.commitAnswer = type
        that.answerQuestions.push(question)
        sessionStorage.answerQuestions = JSON.stringify(that.answerQuestionss)
        if (that.num === 5) {
          that.$http.post('/hongcai/rest/activitys/foolsDay/answerQuestion', {
            number: that.number,
            token: that.token,
            answerQuestions: that.answerQuestions
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.$router.push({name: 'FoolTacit'})
            }
          })
        }
        $($('.nums li')[that.num - 1]).removeClass('selectNumBg')
        $($('.nums li')[that.num]).addClass('selectNumBg')
        that.num += 1
      },
      question () { // 我的问题
        var that = this
        that.$http('/hongcai/rest/activitys/foolsDay/question?number=' + that.number + '&token=' + that.token).then(function (res) {
          if (res.data.code === -1321) {
            alert('没有创建问题')
            return
          }
          that.questionList = res.data.data
          that.title = res.data.data[0].question
        })
      }
    },
    components: {FoolRules, FoolQuit},
    desrtoyed () {
      sessionStorage.answerCount = null
      sessionStorage.answerQuestions = null
    }
  }
</script>
<style scoped>
  .fools-answer-page {
    background: #f89b32;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
  }
  .header .nums {
    clear: both;
    overflow: hidden;
    margin-bottom: 0;
    padding-top: 13%;
    margin-left: 3%;
  }
  .header .nums li {
    float: left;
    margin-right: 3%;
  }
  .header .nums .unSelectNumBg {
    width: 16%;
    background: url('../../images/foolsDay/unselected-box.png') no-repeat center center;
    background-size: 100% 100%;
    margin-top: 3%;
  }
  .unSelectNumBg p {
    width: 22%;
    height: .5rem;
    margin: .25rem auto;
  }
  .unSelectNumBg .num1 {
    background: url('../../images/foolsDay/num1-unselected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .unSelectNumBg .num2 {
    background: url('../../images/foolsDay/num2-unselected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .unSelectNumBg .num3 {
    background: url('../../images/foolsDay/num3-unselected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .unSelectNumBg .num4 {
    background: url('../../images/foolsDay/num4-unselected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .unSelectNumBg .num5 {
    background: url('../../images/foolsDay/num5-unselected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .header .nums .selectNumBg {
    width: 21%;
    background: url('../../images/foolsDay/selected-box.png') no-repeat center center;
    background-size: 100% 100%;
    margin-top: 0;
  }
  .selectNumBg p {
    width: 22%;
    height: .7rem;
    margin: .35rem auto;
  }
  .selectNumBg .num1 {
    background: url('../../images/foolsDay/num1-selected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .selectNumBg .num2 {
    background: url('../../images/foolsDay/num2-selected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .selectNumBg .num3 {
    background: url('../../images/foolsDay/num3-selected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .selectNumBg .num4 {
    background: url('../../images/foolsDay/num4-selected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .selectNumBg .num5 {
    background: url('../../images/foolsDay/num5-selected.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .question {
    width: 90%;
    height: 3rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: -5% auto 0;
    color: #fff;
    text-align: justify;
    font-size: .4rem;
    font-weight: bold;
    padding: .95rem .7rem;
  }
  .selectBtns {
    clear: both;
    overflow: hidden;
    width: 94%;
    margin: -8% auto 0;
  }
  .selectBtns li {
    float: left;
    width: 38%;
    height: 2.1rem;
  }
  .selectBtns li:nth-child(2) {
    float: right;
    height: 2.3rem;
  }
  .selectBtns li:nth-child(1) {
    margin-left: .4rem;
  }
  .noBelieve {
    background: url('../../images/foolsDay/buxin.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .believe {
    background: url('../../images/foolsDay/xin.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .clown2 {
    width: 62%;
    position: absolute;
    right: 9%;
    bottom: -.4rem;
    pointer-events: none;
    z-index: 1;
  }
  .changeTitle, .definedTitle {
    width: 60%;
    height: .8rem;
    line-height: 1rem;
    position: absolute;
    left: 0;
    background: url('../../images/foolsDay/box.png') no-repeat center center;
    background-size: 100% 100%;
    text-align: left;
    padding-left: .4rem;
  }
  .changeTitle {
    bottom: 14%;
  } 
  .definedTitle {
    bottom: 4%;
  }
  .ruleIcon {
    position: absolute;
    top: .1rem;
    right: .1rem;
    width: 30%;
  }
  .tipBox {
    width: 40%;
    height: 1.4rem;
    line-height: 2.1rem;
    background: url('../../images/foolsDay/answer-tipBox.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 1rem 0 0 6%;
  }
  .tipBox img {
    width: 90%;
  }
  @media (min-height: 724px) and (max-height: 1624px) {
    .selectBtns {
      margin-top: 0%;
    }
    .clown2 {
      width: 76%;
      right: 4%;
      bottom: -1%;
    }
    .question {
      margin-top: 3%;
    }
    .tipBox {
      margin-top: 2.2rem;
    }
  }
</style>
