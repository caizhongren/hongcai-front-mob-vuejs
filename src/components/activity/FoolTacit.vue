<template>
  <!-- 答题主页面 -->
  <div class="fools-tacit">
    <div class="header"></div>
    <div class="contents">
      <div class="tacitHeader">{{tacitTips[tacit / 20]}}</div>
      <div class="title">
        <div class="portraitBox">
          <div class="portrait">
            <img v-bind:src="answerPortraitUrl" alt="">
          </div>
          <p>{{answerUserName}}</p>
        </div>
        <div class="progress">
          <p>{{tacit}}%</p>
          <div class="box">
            <span class="bar" v-bind:style="{width: tacit + '%'}"></span>
          </div>
        </div>
        <div class="portraitBox">
          <div class="portrait">
            <img v-bind:src="questionPortraitUrl" alt="">
          </div>
          <p>{{questionUserName}}</p>
        </div>
      </div>
      <div class="listTitle">
        <img src="../../images/foolsDay/moqidu-txt.png" alt="" width="57%">
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
      <div class="partakeBox">
        <div class="bottomPortrait">
          <img v-bind:src="answerPortraitUrl" alt="">
        </div>
        <img src="../../images/foolsDay/invite-txt2.png" alt="头像" class="invite-txt1">
        <div class="join" @click="join">
          <img src="../../images/foolsDay/invite-txt.png" alt="我也要玩" width="60%">          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        answerUserName: 'lll==',
        questionUserName: 'yyyyyy',
        tacit: 80,
        tacitTips: ['看透不说透，大智若愚才是真正的智者！', '我说得这么明显，难道你都看不出来吗？', '点开我的头像，是时候让我们好好聊聊了', '人生的长度，一半真实一半假象，你...及格了...', '差一点儿就被你看穿了，真是百密一疏啊！', '你就像我肚子里的蛔虫，什么都瞒不过你...'],
        answerPortraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
        questionPortraitUrl: 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg',
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
        ]
      }
    },
    props: ['token'],
    watch: {},
    mounted () {},
    created () {},
    methods: {
      join () {
        alert('我也要玩')
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-tacit {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    background: #f89b32;
    padding-bottom: 2.5rem;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
  }
  .tacitHeader {
    width: 60%;
    height: 2rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: -.95rem  auto 0;
    position: relative;
    padding: .7rem .2rem 0 .55rem;
    color: #fff;
    font-size: .26rem;
    text-align: left;
  }
  .title {
    overflow: hidden;
    clear: both;
    width: 90%;
    margin: -.25rem auto 0;
  }
  .portraitBox {
    overflow: hidden;
    width: 30%;
    float: left;
  }
  .portraitBox p {
    color: #51171b;
    font-size: .22rem;
  }
  .partakeBox {
    width: 100%;
    background: rgba(0,0,0,.7);
    height: 1.1rem;
    line-height: 1.22rem;
    position: absolute;
    bottom: 0;
    padding: 0 .35rem;
  }
  .invite-txt1 {
    width: 45%;
    margin: 03% 0 0 15%;
    position: relative;
    top: .1rem;
  }
  .bottomPortrait {
    background: url('../../images/foolsDay/answer-icon.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 17%;
    height: 1.45rem;
    top: -.9rem;
    left: 6%;
  }
  .join {
    width: 32%;
    height: 1rem;
    background: url('../../images/foolsDay/down-btn.png') no-repeat 0 0;
    background-size: 100% 100%;
    float: right;
  }
  .portrait {
    width: 100%;
    height: 2.32rem;
    background: url('../../images/foolsDay/answer-icon.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    float: left;
  }
  .portrait img, .bottomPortrait img {
    width: 81%;
    position: absolute;
    bottom: 5%;
    left: 9.6%;
    border-radius: 50%;
  }
  .progress {
    width: 37%;
    float: left;
    margin: .6rem 0.05rem 0;
  }
  .progress p {
    color: #51171b;
    font-size: .65rem;
    /* font-weight: bold; */
  }
  .progress .box {
    width: 100%;
    background: #fff;
    height: .15rem;
    border-radius: .15rem;
  }
  .progress .bar {
    width: 30%;
    background: #ffda05;
    height: .15rem;
    float: left;
    border-top-left-radius: .15rem;
    border-bottom-left-radius: .15rem;
  }
  .listTitle {
    background: url('../../images/foolsDay/yellow-bg2.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 52%;
    height: 1.4rem;
    line-height: 1.5rem;
    margin: 0 auto;
  }
  .inviteList {
    overflow: hidden;
    clear: both;
    width: 80%;
    margin: -.15rem auto;
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
