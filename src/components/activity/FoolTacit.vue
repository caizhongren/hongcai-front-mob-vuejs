<template>
  <!-- 默契度主页面 -->
  <div class="fools-tacit" id="fools-tacit">
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
            <span class="bar" v-bind:class="{'tacit100': tacit === 100}" v-bind:style="{width: tacit + '%'}"></span>
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
          <img v-bind:src="item.headImg" alt=""/>
          <span>{{item.tacit}}%</span>
        </li>
        <li v-if="investPage < Math.ceil(total/pageSize)">
          <img src="../../images/foolsDay/result-more.png" alt="查看更多" class="loadMore" @click="loadMore">
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
    <div class="fools-qrcode mask-common" v-client-height v-if="showQrCode" @click="showQrCode = false">
      <img src="../../images/foolsDay/qrcode.png" alt="长按识别图中二维码" width="50%">
      <div class="qrcodeBox">
        <img src="../../images/foolsDay/wechat-qrcode.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import {ModalHelper} from '../../service/Utils'
  import wx from 'weixin-js-sdk'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  export default {
    data () {
      return {
        showQrCode: false,
        questionUserName: '',
        answerUserName: '',
        tacit: 0,
        tacitTips: ['看透不说透，大智若愚才是真正的智者！', '我说得这么明显，难道你都看不出来吗？', '点开我的头像，是时候让我们好好聊聊了', '人生的长度，一半真实一半假象，你...及格了...', '差一点儿就被你看穿了，真是百密一疏啊！', '你就像我肚子里的蛔虫，什么都瞒不过你...'],
        questionPortraitUrl: '',
        answerPortraitUrl: '',
        inviteList: [],
        skip: 0,
        pageSize: 9,
        investPage: 1,
        number: this.$route.params.number,
        total: 0,
        answerNum: ''
      }
    },
    props: ['userInfo', 'checkLogin'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? (this.answer(), this.getAnswerNum()) : this.checkLogin()
      },
      showQrCode: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      answerNum: function (val) {
        val && val === Number(this.$route.params.number) ? this.$router.replace({name: 'FoolResult'}) : null
      }
    },
    mounted () {
      history.pushState({page: 'state1'}, null, location.href)
      history.pushState({page: 'state2'}, null, location.href)
      this.inviteList.length <= 0 ? document.getElementById('fools-tacit').style.height = document.documentElement.clientHeight + 'px' : null
      var that = this
      wx.ready(function () {
        var shareLink = process.env.vue_domain + '/activity/fools-day/answer/' + that.$route.params.number
        WechatShareUtils.onMenuShareAppMessage('你看得出我在说谎吗？', '认识了那么久，你有把握我说的每句话都是真心话吗？', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/8MZDOEkib8AnEm8IKUChDJ7X50kEO9u4GxRe5kwWibuAEq0mOHqmyZnsAk27P9lMk2NjCM0VOFBXPf4nByXcFI5g/0?wx_fmt=png')
      })
    },
    created () {
      this.userInfo.id > 0 ? (this.answer(), this.getAnswerNum()) : null
      this.number ? this.answerQuestion() : null
      window.onpopstate = function (event) {
        if (event.state.page === 'state1') {
          wx.closeWindow()
        }
      }
    },
    methods: {
      getAnswerNum () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/number').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.answerNum = res.data
          }
        })
      },
      join () {
        var that = this
        that.axios('/hongcai/rest/wechat/subscribeStatus')
        .then(function (res) {
          res.data ? window.location.href = process.env.vue_domain + '/activity/fools-day' : that.showQrCode = true
        })
      },
      // 答题详情
      answerQuestion () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/' + that.number + '/checkAnswerQuestion')
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.answerUserName = res.data.nickName
            that.answerPortraitUrl = res.data.headImg
            that.tacit = res.data.tacit
            that.questionPortraitUrl = res.data.questionHeadImg
            that.questionUserName = res.data.questionNickName
          } else {
            alert('没有答题')
          }
        })
      },
      // 好有默契度
      answer () {
        var that = this
        that.$http('/hongcai/rest/activitys/foolsDay/question/' + that.number + '/answers?pageSize=' + that.pageSize + '&skip=' + that.skip)
        .then(function (res) {
          that.total = res.data.total
          var List = res.data.data
          for (var i = 0; i < List.length; i++) {
            that.inviteList.push(List[i])
          }
        })
      },
      loadMore () {
        this.investPage += 1
        this.pageSize = 10
        this.skip = [(this.investPage - 1) * this.pageSize] - 1
        this.answer()
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .tacit100 {
    border-top-right-radius: .15rem;
    border-bottom-right-radius: .15rem;
  }
  .fools-tacit {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    background: #f89b32;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
  }
  .contents {
    padding-bottom: 2.2rem;
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
    position: fixed;
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
    height: 61%;
    pointer-events: none;
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
  .fools-qrcode {
    padding-top: 1.3rem;
  }
  .qrcodeBox {
    width: 65%;
    margin-top: .5rem;
    background: rgba(255,0,0,.95);
    margin: .5rem auto;
    padding: .25rem .25rem .1rem;
    border-radius: .2rem;
  }
  .qrcodeBox img {
    width: 100%;
    border-radius: .2rem;
  }
</style>
