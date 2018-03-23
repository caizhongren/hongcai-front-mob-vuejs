<template>
  <!-- 活动结果查看页面 -->
  <div class="fools-result" v-client-height>
    <div class="header">
      <div class="result"> 
        已有{{answerPeople}}位好友对我进行了人工测谎
        <img src="../../images/foolsDay/maozi.png" alt="帽子" class="maozi">
      </div>
    </div>
    <div class="contents">
      <ul class="entrance">
        <li class="fl" @click="toReportCard"></li>
        <li class="fr" @click="toRecord"></li>
      </ul>
      <div class="exchangeBtn" @click="exchange"></div>
      <div class="inviteBtn" @click="inviteShare">
        <img src="../../images/foolsDay/result-btn-txt.png" alt="邀请好友来鉴定" width="77%">
      </div>
      <div class="inviteTitle">
        <img src="../../images/foolsDay/moqidu.png" alt="" width="36%">
        <span>(共{{answerPeople}} 人)</span>
      </div>
      <ul class="inviteList">
        <li v-for="item in inviteList">
          <img v-bind:src="item.portraitUrl" alt=""/>
          <span>{{item.percent}}</span>
        </li>
        <li>
          <img src="../../images/foolsDay/result-more.png" alt="" class="loadMore" @click="loadMore">
        </li>
      </ul>
    </div>
    <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import FoolRules from './FoolRules.vue'
  export default {
    data () {
      return {
        answerPeople: 10,
        inviteList: [
          {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '20%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '10%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '40%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '60%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '20%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '10%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '40%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '60%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '20%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '10%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '40%'
          }, {
            portraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
            percent: '60%'
          }
        ],
        showRules: false
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
      closeRules () {
        this.showRules = false
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
    components: {FoolRules},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-result {
    background: #f89b32;
    width: 100%;
    position: relative;
  }
  .contents {
    background: #f89b32;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .3rem;
  }
  .ruleIcon {
    position: absolute;
    top: .1rem;
    right: .1rem;
    width: 30%;
  }
  .result {
    width: 60%;
    height: 2rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    color: #fff;
    text-align: justify;
    font-size: .26rem;
    font-weight: bold;
    padding: .65rem .8rem;
    position: relative;
  }
  .maozi {
    position: absolute;
    left: 3%;
    top: -.15rem;
    width: 30%;
  }
  .entrance {
    overflow: hidden;
    clear: both;
    width: 80%;
    margin: 4% auto 0;
  }
  .entrance li {
    width: 43%;
    height: 1.2rem;
  }
  .entrance li:nth-child(1) {
    background: url('../../images/foolsDay/result-icon2.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .entrance li:nth-child(2) {
    background: url('../../images/foolsDay/result-icon1.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .exchangeBtn {
    width: 68%;
    height: 2.3rem;
    background: url('../../images/foolsDay/result-cha.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 4px auto 0;
  }
  .inviteBtn {
    width: 55%;
    height: 1.4rem;
    background: url('../../images/foolsDay/result-btn.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 1.65rem;
  }
  .inviteTitle {
    width: 60%;
    height: 1.2rem;
    line-height: 1.3rem;
    background: url('../../images/foolsDay/yellow-bg2.png') no-repeat center center;
    background-size: 100% 100%;
    margin-left: 5%;
    padding-left: 8%;
    text-align: left;
  }
  .inviteTitle span {
    color: #51171b;
    font-size: .23rem;
    font-weight: bold;
    position: relative;
    top: -.03rem;
  }
  .inviteList {
    overflow: hidden;
    clear: both;
    width: 80%;
    margin: 0 auto;
  }
  .inviteList li {
    float: left;
    width: 13.7%;
    height: .65rem;
    margin: 0 1.6% .1rem 0;
    padding: .12rem;
    background: url('../../images/foolsDay/unselected-box.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }
  .inviteList li img {
    width: 100%;
    height: 100%;
    border-radius: .1rem;
  }
  .inviteList li span {
    display: block;
    background: rgba(0,0,0,.8);
    color: #fff;
    bottom: .1rem;
    position: absolute;
    width: 92.5%;
    height: .25rem;
    line-height: .25rem;
    font-size: .2rem;
    border-bottom-left-radius: .1rem;
    border-bottom-right-radius: .1rem;
    transform: scale(.8);
    margin-left: -.08rem;
  }
  .inviteList li img.loadMore {
    width: 63%;
    height: 75%;
    margin-top: .1rem;
  }
</style>
