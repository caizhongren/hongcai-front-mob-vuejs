<template>
  <!-- 愚人节活动成绩单页面 -->
  <div class="fools-reportCard">
    <div class="header"></div>
    <div class="contents">
      <div class="reportCardHeader">
        <img src="../../images/foolsDay/reportCard-title.png" alt="我的愚人节成绩单" width="90%">
      </div>
      <ul class="reportCardContent">
        <li class="question" v-for="(question, index) in questionList">
          <div class="title">{{index + 1}}.{{question.title}}</div>
          <div class="answerList">
            <ul class="answer">
              <li>相信</li>
              <li><span v-bind:style="{width:(question.believeNum/(question.believeNum + question.unBelieveNum) * 100) + '%'}"></span></li>
              <li>{{question.believeNum}}人</li>
            </ul>
            <ul class="answer">
              <li>不信</li>
              <li><span v-bind:style="{width:(question.unBelieveNum/(question.believeNum + question.unBelieveNum) * 100) + '%'}"></span></li>
              <li>{{question.unBelieveNum}}人</li>
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
        questionList: [
          {
            title: '今天在宏财网投资5万元，3年后实现财富自由',
            believeNum: 4000,
            unBelieveNum: 600
          },
          {
            title: '我其实是一只猪投胎变成了人。',
            believeNum: 5,
            unBelieveNum: 5
          },
          {
            title: '我其实是一只猪投胎变成了人。',
            believeNum: 4,
            unBelieveNum: 6
          },
          {
            title: '我其实是一只猪投胎变成了人。',
            believeNum: 4,
            unBelieveNum: 6
          },
          {
            title: '我其实是一只猪投胎变成了人。',
            believeNum: 4,
            unBelieveNum: 6
          }
        ]
      }
    },
    props: ['token'],
    watch: {},
    mounted () {},
    created () {},
    methods: {
      toReportCard () {
        this.$router.push({name: 'FoolReportCard'})
      },
      toRecord () {
        this.$router.push({name: 'FoolRecord'})
      },
      showRules () {
        alert('活动规则')
      },
      loadMore () {
        alert('查看更多')
      },
      exchange () {
        alert('拆礼包')
      },
      inviteShare () {
        alert('分享邀请好友来鉴定')
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
</style>
