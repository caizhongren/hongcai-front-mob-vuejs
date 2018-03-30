<template>
  <!-- 愚人节活动成绩单页面 -->
  <div class="fools-reportCard" id="fools-reportCard">
    <div class="header"></div>
    <div class="contents">
      <div class="reportCardHeader">
        <img src="../../images/foolsDay/reportCard-title.png" alt="我的愚人节成绩单" width="90%">
      </div>
      <ul class="reportCardContent">
        <li class="question" v-for="(question, index) in questionList">
          <div class="title">{{index + 1}}.{{question.question}}</div>
          <div class="answerList">
            <ul class="answer">
              <li>相信</li>
              <li>
                <span v-if="question.trustCount !== 0" v-bind:style="{width:(question.trustCount/(question.trustCount + question.untrustCount) * 100) + '%'}"></span>
                <span v-else class="precent0"></span>
              </li>
              <li>{{question.trustCount}}人</li>
            </ul>
            <ul class="answer">
              <li>不信</li>
              <li>
                <span v-if="question.untrustCount !== 0" v-bind:style="{width:(question.untrustCount/(question.trustCount + question.untrustCount) * 100) + '%'}"></span>
                <span v-else class="precent0"></span>
              </li>
              <li>{{question.untrustCount}}人</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        questionList: []
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? null : this.checkLogin()
      }
    },
    mounted () {
    },
    created () {
      this.question()
    },
    methods: {
      question () { // 成绩单
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/' + that.$route.params.number).then(function (res) {
          that.questionList = res.data.data
          if (that.questionList.length === 0) {
            that.questionList.length <= 0 ? document.getElementById('fools-reportCard').style.height = document.documentElement.clientHeight + 'px' : null
            alert('没有创建题目,怎么办了,跳哪儿去了？')
          }
        })
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-reportCard {
    background: #f89b32;
    width: 100%;
    position: relative;
    padding-bottom: .5rem;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .3rem;
  }
  .bottom {
    background: url('../../images/foolsDay/comm-bottom.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 3.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 0;
  }
  .contents {
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 55px rgba(255,255,255,1);
    position: relative;
    border-radius: .3rem;
    width: 92%;
    height: auto;
    margin: 0 auto;
    z-index: 1;
    top: -1.2rem;
  }
  .reportCardHeader {
    width: 64%;
    height: 2rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    line-height: 1rem;
    text-align: center;
    padding: .4rem .8rem;
    position: absolute;
    left: 18%;
    top: -.8rem;
  }
  .reportCardContent {
    padding: 1.3rem 0 .5rem;
  }
  .question .title {
    color: #211203;
    text-align: left;
    font-size: .24rem;
    background: url('../../images/foolsDay/yellow-bg.png') no-repeat center center;
    background-size: 100% 100%;
    height: 1.2rem;
    line-height: 1.25rem;
    padding-left: .45rem;
  }
  .answerList {
    width: 80%;
    margin: 0 auto;
  }
  .answer {
    color: #180d01;
    overflow: hidden;
    clear: both;
    margin-bottom: .2rem;
  }
  .answer li {
    float: left;
  }
  .answer li:nth-child(1) {
    width: 15%;
  }
  .answer li:nth-child(2) {
    width: 65%;
    height: .26rem;
    background: transparent;
    margin-top: .04rem;
  }
  .answer li:nth-child(2) span {
    display: block;
    height: .26rem;
  }
  .answer:nth-child(1) li:nth-child(2) span {
    background: #f0c18a;
  }
  .answer:nth-child(2) li:nth-child(2) span {
    background: #b3672b;
  }
  .answer li:nth-child(3) {
    width: 20%;
    text-align: right;
  }
  .answer li:nth-child(2) span.precent0 {
    background: #dddddd;
    width: 100%;
  }
</style>
