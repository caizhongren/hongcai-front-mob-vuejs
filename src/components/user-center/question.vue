<template>
  <div class="questionnaire">
    <!-- 问卷 -->
    <form name="questionnaireForm" >
    <!-- 问题及答案 -->
      <div class="question" v-for="question in questions">
        <div class="title overflow-hid clearfix ft-444">
          <span class="no fl">{{question.id}}</span>
          <span class="content fl">{{question.title || '您的年龄是：'}}</span>
        </div>
        <div class="answers">
          <div class="answer overflow-hid clearfix" v-for="answer in question.answers" @click="select($event, question.id, answer.id)">
            <span class="fl"></span><label class="fl" >{{ answer.answer || '30岁以下' }}</label>
          </div>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="position-re margin-t-5"> 
        <div class="errMsg position-ab" v-show="warningMsg && showWarning">
          <!--{{errMsg}}-->{{warningMsg}}
        </div>
        <button type="button" class="button button-primary submit-btn" v-bind:class="[!canSubmit ? 'button-disabled' : '', '']" @click="submitQuestionnaire(questionAndAnswer)">提交</button>
      </div>
    </form>
    <div class="mask-common" v-show="showResult">
      <div class="wrap">
        <div class="wrap-conyent">
          <div class="rule">
            <p class="margin-t-0 margin-b-0 text-justify">尊敬的用户，您的风险承受能力 <span class="ft-bold">{{ability}}</span>，投资偏好为 <span class="ft-bold">{{type}}</span>，建议您选择宏财精选和宏财尊贵项目。</p>
            <button class="question-btn padding-0" @click="closeResult">我知道了</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Utils} from '../../service/Utils'
  export default {
    name: 'Questionnaire',
    data () {
      return {
        questions: [
          {
            id: 1,
            title: '您的年龄是：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 1, questionId: 1, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 2, questionId: 1, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 3, questionId: 1, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 1, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 2,
            title: '您的家庭就业情况：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 5, questionId: 1, answer: '您与配偶均有稳定收入的工作', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 6, questionId: 1, answer: '您与配偶其中一人有稳定收入的工作', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 7, questionId: 1, answer: '未婚，有稳定收入的工作', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 8, questionId: 1, answer: '未婚，目前暂无稳定收入的工作', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 3,
            title: '您的家庭年收入：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 9, questionId: 1, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 10, questionId: 1, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 11, questionId: 1, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 12, questionId: 1, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 4,
            title: '您有多少年股票、基金、P2P、金融衍生品等兼容投资的经验：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 13, questionId: 1, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 14, questionId: 1, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 15, questionId: 1, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 16, questionId: 1, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 5,
            title: '您计划的投资期限是多久',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 1, questionId: 17, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 2, questionId: 18, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 3, questionId: 19, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 20, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 6,
            title: '在您的投资计划中，您认为自己能承受的最大投资损失是多少：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 1, questionId: 21, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 2, questionId: 22, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 3, questionId: 23, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 24, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 7,
            title: '您的家庭就业情况：',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 1, questionId: 25, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 2, questionId: 26, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 3, questionId: 27, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 28, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          },
          {
            id: 8,
            title: '如果您打算用部分资金做风险投资，投资A预期获得10%的收益，可能损失非常小；投资B预期获得30%的收益，但可能承担较大亏损。您会如何投资？',
            surveryType: 1,
            status: 1,
            answers: [
                {id: 1, questionId: 29, answer: '30岁以下', score: 10, status: 1, createTime: 0, updateTime: null},
                {id: 2, questionId: 30, answer: '30-45岁', score: 8, status: 1, createTime: 0, updateTime: null},
                {id: 3, questionId: 31, answer: '45岁-60岁', score: 6, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 32, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null},
                {id: 4, questionId: 33, answer: '60岁以上', score: 4, status: 1, createTime: 0, updateTime: null}
            ]
          }
        ],
        questionAndAnswer: {

        },
        canSubmit: false,
        showWarning: false,
        showResult: false,
        warningMsg: '',
        ability: '',
        type: '',
        token: 'e745776d47dcd5d7fc3aea509ed3b125e493969a6437c698'
      }
    },
    created: function () {
      this.getQustions()
      console.log(Utils.isAndroid())
    },
    methods: {
      getQustions: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/users/31590/getQuestionnaire?token=' + that.token
        })
        .then(function (response) {
          that.questions = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      select: function (e, question, answer) {
        var target = e.target.localName === 'span' || e.target.localName === 'label' ? e.target.parentElement : e.target
        for (var i = 0; i < target.parentElement.children.length; i++) {
          target.parentElement.children[i].classList.remove('selected')
          target.parentElement.children[i].children[0].classList.remove('selected')
        }
        target.className += ' selected'
        target.children[0].className += ' selected'
        this.canSubmit = true
        this.questionAndAnswer[question] = answer
      },
      submitQuestionnaire: function (questionAndAnswer) {
        let that = this
        if (!that.canSubmit) { return }
        that.canSubmit = false
        that.$http.post('/hongcai/rest/users/0/questionnaire', {
          surveyType: 1,
          answerJson: questionAndAnswer,
          token: that.token
        })
        .then(function (response) {
          if (!response.data || response.data.ret === -1) {
            that.warningMsg = response.data.msg
            that.showWarning = true
            setTimeout(function () {
              that.showWarning = false
            }, 2000)
            return
          }
          that.showResult = true
          var questionnaireResult = response.data
          var score1 = questionnaireResult.score1
          var score2 = questionnaireResult.score2
          that.ability = (function () {
            if (score1 > 21 && score1 < 41) { return '一般' }
            if (score1 > 40 && score1 < 56) { return '较强' }
            if (score1 > 55 && score1 < 71) { return '很强' }
            if (score1 > 70) { return '超赞' }
          }())
          that.type = (function () {
            if (score2 < 35) { return '保守型' }
            if (score2 > 34 && score2 < 60) { return '稳健型' }
            if (score2 > 59) { return '进取型' }
          }())
        })
        .catch(function (error) {
          that.warningMsg = '网络出错'
          setTimeout(function () {
            that.showWarning = false
          }, 2000)
          console.log(error)
        })
      },
      closeResult: function () {
        this.showResult = false
        this.questionAndAnswer = {}
        var answer = document.getElementsByClassName('answer')
        // var aswSpan = document.getElementsByClassName('answer-span')
        console.log(aswSpan)
        var aswSpan = []
        for (var i = 0; i < answer.length; i++) {
          answer[i].classList.remove('selected')
          aswSpan.push(answer[i].firstChild)
          aswSpan[i].classList.remove('selected')
          this.canSubmit = true
        }
        for (var j = 0; i < answer.length; i++) {
          aswSpan[j].classList.remove('selected')
        }
      }
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped >
  .questionnaire {
    font-family: MicrosoftYaiHei;
    background: rgb(248, 248, 248);
    padding: .4rem .4rem 1.5rem;
    font-size: .23rem;
  }
  .question .title {
    font-size: .26rem;
  }
  .question .title .no {
    font-family: Arial;
    display: inline-block;
    background: #fff;
    border-radius: 50%;
    width: .34rem;
    height: .34rem;
    text-align: center;
    margin-right: 5px;
    font-size: .25rem;
    line-height: .34rem;
  }
  .question .title .content {
    text-align: justify;
    width: 86%;
    padding-left: 6px;
  }
  .question .answers {
    padding: .2rem .4rem .2rem;
  }
  .questionnaire .question .answers .answer {
    color: #666;
    border: 1px solid #eee;
    background: #fff;
    padding: .1rem .1rem .08rem;
    margin-bottom: .2rem;
  }
  .questionnaire .question .answers .answer.selected {
    background-color: #fd8f3f;
    color: #fff
  }
  .questionnaire .question .answers .answer span {
    width: .19rem;
    height: .19rem;
    display: inline-block;
    margin-right: 5px;
    margin-top: 5px;
    background: url('../../images/user-center/unselected.png') no-repeat;
    background-size: contain;
  }
  .questionnaire .question .answers .answer span.selected {
    background: url('../../images/user-center/selected.png') no-repeat;
    background-size: contain;
  }
  .questionnaire .submit-btn {
    width: 54%;
    height: 38px;
    margin: 0 23%;
    font-weight: 400;
    font-size: .24rem;
    line-height: 38px;
    margin-top: 1rem;
  }
  .questionnaire .errMsg {
    background: url('../../images/user-center/transfer-msg.png') no-repeat;
    width: 47%;
    height: .6rem;
    line-height: .48rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
    background-size: 100% 100%;
    left: 27%;
    bottom: 39px;
  }
  .mask-common .wrap {
    margin-top: 57%;
  }
  .mask-common .wrap-conyent {
    background-color: #fff;
    font-size: .23rem;
    color: #222;
    padding: .4rem;
    width: 86%;
    margin: 0 auto;
    border-radius: .1rem;
    line-height: 1.6;
  }
  .question-btn {
    width: 43%;
    height: .5rem;
    display: block;
    background-color: #fd8f3f;
    border: 1px solid #fd8f3f;
    border-radius: .5em;
    line-height: .5rem;
    text-align: center;
    margin: .4rem 29% .1rem;
    color: #fff;
    font-size: .23rem;
    font-weight: initial;
  }
</style>
