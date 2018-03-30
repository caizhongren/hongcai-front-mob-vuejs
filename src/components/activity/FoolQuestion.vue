<template>
  <!-- 出题页面 -->
  <div class="fools-question" v-client-height>
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
    <div class="question">{{question.question}}</div>
    <ul class="selectBtns">
      <li class="noBelieve" @click="choose(2)"></li>
      <li class="believe" @click="choose(1)"></li>
    </ul>
    <img src="../../images/foolsDay/clown2.png" alt="" class="clown2">
    <div class="changeTitle" @click="changeTitle">
      <img src="../../images/foolsDay/changeTitle.png" alt="更换随机题目" width="68%">
    </div>
    <div class="definedTitle" @click="showDefinedBox">
      <img src="../../images/foolsDay/defined-txt.png" alt="自定义题目" width="58%">
    </div>
    <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    <!-- 温馨提示 -->
    <div class="mask-common alertTips" v-if="alertTips">
      <div class="tipBox">
        <img src="../../images/foolsDay/tip-title.png" alt="温馨提示" class="tipTitle">
        <div class="borderBox">
            注意啦！题目确认好之后，<br>
            就不可再修改咯〜 <br>
            愚人有度，切莫伤人
        </div>
        <div class="startQuestion" @click="startQuestion">
          <img src="../../images/foolsDay/konw-txt.png" alt="我懂的" width="60%">
        </div>
      </div>
    </div>
    <!-- 自定义题目 -->
    <div class="mask-common alertDefinedTitle" v-if="alertDefinedTitle">
      <div class="tipBox" id="tipBox">
        <img src="../../images/foolsDay/defined-title.png" alt="温馨提示" class="defined-title">
        <div class="borderBox">
          <textarea type="text" v-model="defined.question" autofocus>{{defined.question}}</textarea>
        </div>
        <p class="tip">题目最多不超过20字哦～</p>
        <div class="saveTitle" @click="saveTitle">
          <img src="../../images/foolsDay/sure-txt.png" alt="确定" width="40%">
        </div>
      </div>
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
    <Fool-Share :showShare="showShare" :closeShare="closeShare"  v-show="showShare"></Fool-Share>
    <Fool-Quit :showQuit="showQuit" :closeQuit="closeQuit"  v-show="showQuit"></Fool-Quit>
  </div>
</template>
<script>
  import $ from 'zepto'
  import wx from 'weixin-js-sdk'
  import FoolRules from './FoolRules.vue'
  import FoolShare from './FoolShare.vue'
  import {CheckWordsUtils} from '../../service/CheckWordsUtils.js'
  import FoolQuit from './FoolQuit.vue'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  export default {
    data () {
      return {
        showRules: false,
        showShare: false,
        showQuit: false,
        question: {
          question: '今天在宏财网投资5万元，3年后实现财富自由',
          systemId: 0,
          answer: 1,
          sortNo: 1
        },
        defined: {
          question: '',
          systemId: 0,
          answer: 1,
          sortNo: 1
        },
        num: 1,
        alertTips: true,
        alertDefinedTitle: false,
        systemQuestions: [],
        saveQuestions: [],
        selectSystemQuestionId: 0,
        busy: false,
        maxLength: 0
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? this.getTakeRecordStatus() : this.checkLogin()
      },
      alertDefinedTitle: function (val) {
        // var handleEle = document.getElementById('tipBox')
        // val ? InputMaskHelper.windowChange(handleEle) : null
      },
      'defined.question': function (val) {
        this.computedByteLen === 40 ? this.maxLength = this.computedCharLen : null
        if (this.computedByteLen > 40) {
          this.defined.question = this.defined.question.slice(0, this.maxLength)
        }
      }
    },
    mounted () {
      wx.ready(function () {
        var shareLink = process.env.vue_domain + '/activity/fools-day'
        WechatShareUtils.onMenuShareAppMessage('谁说愚人节一定要说假话', '借着这个机会，又有多少人道出了埋藏心底的秘密...', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/8MZDOEkib8AnEm8IKUChDJ7X50kEO9u4GxRe5kwWibuAEq0mOHqmyZnsAk27P9lMk2NjCM0VOFBXPf4nByXcFI5g/0?wx_fmt=png')
      })
    },
    computed: {
      // 获取字符的个数
      computedCharLen () {
        return this.defined.question.length
      },
      // 获取字节的个数
      computedByteLen () {
        return this.defined.question.replace(/[^\x00-\xff]/g, '01').length
      }
    },
    created () {
      var that = this
      history.pushState({page: 'state1'}, null, '')
      history.pushState({page: 'state2'}, null, location.href)
      sessionStorage.questionCount = Number(sessionStorage.questionCount) + 1 || 1
      if (sessionStorage.questionCount > 1) {
        that.showQuit = true
        that.alertTips = false
      }
      window.onpopstate = function (event) {
        history.pushState({page: 'state1'}, null, '')
        history.pushState({page: 'state2'}, null, location.href)
        if (event.state.page === 'state1') {
          that.showQuit = true
        }
      }
      that.getSystemQuestions()
      that.userInfo.id > 0 ? that.getTakeRecordStatus() : null
    },
    methods: {
      getTakeRecordStatus () {
        var that = this
        that.axios({
          method: 'get',
          url: '/hongcai/rest/activitys/foolsDay/takeRecordStatus'
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            that.takeRecordStatus = response.data.status
            if (that.takeRecordStatus !== -1) {
              // that.$router.replace({name: 'FoolResult'})
              window.location.href = process.env.vue_domain + '/activity/fools-day/result'
            }
          }
        })
      },
      closeQuit (type) { // type 1 取消 2 确认
        this.showQuit = false
        if (type === 1) {
          if (sessionStorage.saveQuestion) {
            this.saveQuestions = JSON.parse(sessionStorage.saveQuestion)
            this.num = Number(this.saveQuestions.length) + 1
            $($('.nums li')[0]).removeClass('selectNumBg')
            $($('.nums li')[this.num - 1]).addClass('selectNumBg')
          } else {
          }
        } else {
          sessionStorage.clear()
          wx.closeWindow()
        }
      },
      changeTitle () {
        var index = Math.floor(Math.random() * this.systemQuestions.length)
        this.question = {
          question: this.systemQuestions[index].question,
          systemId: this.systemQuestions[index].systemId,
          answer: this.systemQuestions[index].answer,
          sortNo: this.systemQuestions[index].sortNo
        }
      },
      showDefinedBox () {
        this.alertDefinedTitle = true
        this.defined.question = this.question.question
      },
      saveTitle () {
        if (this.defined.question === '') {
          this.$parent.showErrMsg('自定义题目不能为空哦！')
          return
        }
        this.alertDefinedTitle = false
        if (this.defined.question !== this.question.question) {
          this.defined.question = CheckWordsUtils.filter(this.defined.question)
          this.question.question = this.defined.question
          this.question.systemId = 0
        }
      },
      closeRules () {
        this.showRules = false
      },
      closeShare () {
        this.showShare = false
      },
      choose (answer) {
        if (this.num > 5 || this.busy) {
          return
        }
        this.busy = true
        setTimeout(function () {
          this.busy = false
        }, 1000)
        var saveQuestion = {
          question: this.question.question,
          systemId: this.question.systemId,
          answer: answer,
          sortNo: this.num
        }
        this.saveQuestions.push(saveQuestion)
        if (this.question.systemId > 0) {
          this.selectSystemQuestionId = this.question.systemId
          for (let i = 0; i < this.systemQuestions.length; i++) {
            if (this.systemQuestions[i].systemId === this.selectSystemQuestionId) {
              this.systemQuestions.splice(i, 1)
              break
            }
          }
        }
        sessionStorage.saveQuestion = JSON.stringify(this.saveQuestions)
        if (this.num === 5) {
          this.saveUserQuestions()
          return
        } else {
          var index = Math.floor(Math.random() * this.systemQuestions.length)
          this.question = {
            question: this.systemQuestions[index].question,
            systemId: this.systemQuestions[index].systemId,
            answer: this.systemQuestions[index].answer,
            sortNo: this.systemQuestions[index].sortNo
          }
          $($('.nums li')[this.num - 1]).removeClass('selectNumBg')
          $($('.nums li')[this.num]).addClass('selectNumBg')
          this.num += 1
          this.busy = false
        }
      },
      startQuestion () {
        this.alertTips = false
      },
      getSystemQuestions () { // 系统题库查询
        var that = this
        that.axios({ // 获取服务器时间
          method: 'get',
          url: '/hongcai/rest/activitys/foolsDay/question/system'
        }).then((response) => {
          if (response && response.ret !== -1) {
            if (response.data.total > 0) {
              for (let i = 0; i < response.data.total; i++) {
                this.systemQuestions.push({systemId: response.data.data[i].id, question: response.data.data[i].question})
              }
              var index = Math.floor(Math.random() * response.data.total)
              this.question = {
                question: this.systemQuestions[index].question,
                systemId: this.systemQuestions[index].systemId,
                answer: this.systemQuestions[index].answer,
                sortNo: this.systemQuestions[index].sortNo
              }
            }
          }
        })
      },
      saveUserQuestions () { // 提交用户设置的问题
        var that = this
        that.busy = false
        if (that.busy) {
          return
        }
        that.busy = true
        that.axios.post('/hongcai/rest/activitys/foolsDay/question', {
          userQuestions: JSON.stringify(that.saveQuestions)
        }).then((res) => {
          if (res.data === 5) {
            setTimeout(function () {
              that.busy = false
            }, 1000)
            // this.$router.replace({name: 'FoolResult'})
            window.location.href = process.env.vue_domain + '/activity/fools-day/result?isShare=1'
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    components: {FoolRules, FoolShare, FoolQuit},
    desrtoyed () {
      sessionStorage.clear()
    }
  }
</script>
<style scoped>
  .alertDefinedTitle textarea {
    background-color: transparent;
    border: none;
    color: #51171b;
    font-size: .24rem;
    font-weight: bold;
  }
  .alertDefinedTitle .tip {
    color: #e3424a;
    font-size: .2rem;
    margin-top: -25%;
    text-align: left;
    margin-left: 10%;
  }
  .alertDefinedTitle .saveTitle {
    margin-top: 3%;
  }
  .defined-title {
    width: 60%;
    margin: .35rem auto 0;
  }
  .tipBox {
    width: 70%;
    height: 4.8rem;
    background: url('../../images/foolsDay/box-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 1.5rem auto;
  }
  .tipTitle {
    width: 50%;
    margin: .35rem auto 0;
  }
  .borderBox {
    width: 86%;
    height: 3rem;
    background: url('../../images/foolsDay/box-kuang.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: .3rem;
    text-align: justify;
    color: #51171b;
    font-weight: bold;
    font-size: .24rem;
    line-height: 1.8;
  }
  .startQuestion, .saveTitle {
    width: 44%;
    height: .9rem;
    line-height: 1.25rem;
    background: url('../../images/foolsDay/konw-btn.png') no-repeat center center;
    background-size: 100% 100%;
    margin: -16% auto;
  }
  .fools-question {
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
    position: relative;
    z-index: 2;
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
  @media (height: 532px) {
    .clown2 {
      width: 45%;
      right: 20%;
      bottom: 0%;
    }
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
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
  }
</style>
