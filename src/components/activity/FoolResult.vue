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
        <span>(共{{answerPeople}}人)</span>
      </div>
      <ul class="inviteList">
        <li v-for="item in inviteList">
          <img v-bind:src="item.headImg" alt="" class="headImg"/>
          <span>{{item.tacit}}%</span>
        </li>
        <li v-if="investPage < Math.ceil(total/pageSize)" >
          <img src="../../images/foolsDay/result-more.png" alt="" class="loadMore" @click="loadMore">
        </li>
      </ul>
    </div>
    <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
    <Fool-Share :showShare="showShare" :closeShare="closeShare" v-show="showShare"></Fool-Share>
    <!-- 未达标弹窗 -->
    <div class="fools-box mask-common" v-client-height v-if="unReach">
      <div class="tipBox">
        <div class="Header">
          好友参与鉴谎人数达到5人 <br>
          <span class="ft-p24">即可拆开领奖！</span>
        </div>
        <div class="Content">
          <p>
            礼包包含：精选1.5％无条件加息券 <br>
            <span>尊贵2.5％无条件加息券</span> <br>
            <span>特权本金2018元(有效期3天)</span>
          </p>
          <div class="iKnow" @click="iKnow()">
            <img src="../../images/foolsDay/zhidao.png" alt="我知道了" width="60%"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 已领弹窗 -->
    <div class="fools-box mask-common" v-client-height v-if="hasToken">
      <div class="hasToken">
          <span class="ft-p36">您已拆过礼包啦！</span> <br>
        <span class="ft-p2">前往宏财网应用参与更多活动!</span>
      </div>
      <div class="iKnow width-30" @click="iKnow()">
        <img src="../../images/foolsDay/zhidao.png" alt="我知道了" width="60%"/>
      </div>
    </div>
  </div>
</template>
<script>
  import FoolRules from './FoolRules.vue'
  import FoolShare from './FoolShare.vue'
  import {ModalHelper} from '../../service/Utils'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        answerPeople: 0,
        inviteList: [],
        showRules: false,
        showShare: false || this.$route.query.isShare === '1',
        hasToken: false,
        unReach: false,
        skip: 0,
        pageSize: 9,
        investPage: 1,
        total: 0
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? (this.answerUsersCount(), this.getFoolsQuestionNumber()) : this.checkLogin()
      },
      unReach: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      hasToken: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {
    },
    created () {
      this.userInfo.id > 0 ? (this.answerUsersCount(), this.getFoolsQuestionNumber()) : null
    },
    methods: {
      // 获取问题编号
      getFoolsQuestionNumber () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/number').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.number = res.data
            that.number ? that.answer() : null
            wx.ready(function () {
              var shareLink = process.env.vue_domain + '/activity/fools-day/answer/' + that.number
              WechatShareUtils.onMenuShareAppMessage('你看得出我在说谎吗？', '认识了那么久，你有把握我说的每句话都是真心话吗？', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/8MZDOEkib8AnEm8IKUChDJ7X50kEO9u4GxRe5kwWibuAEq0mOHqmyZnsAk27P9lMk2NjCM0VOFBXPf4nByXcFI5g/0?wx_fmt=png')
            })
          }
        })
      },
      // 答题人数
      answerUsersCount () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/answerUsersCount').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.answerPeople = res.data
          }
        })
      },
      // 好有默契度
      answer () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/' + that.number + '/answers?pageSize=' + that.pageSize + '&skip=' + that.skip)
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            var List = res.data.data
            that.total = res.data.total
            for (var i = 0; i < List.length; i++) {
              that.inviteList.push(List[i])
            }
          }
        })
      },
      toReportCard () {
        this.$router.push({name: 'FoolReportCard', params: {number: this.number}})
      },
      toRecord () {
        this.$router.push({name: 'FoolRecord'})
      },
      closeRules () {
        this.showRules = false
      },
      closeShare () {
        this.showShare = false
      },
      // 查看更多
      loadMore () {
        this.investPage += 1
        this.pageSize = 10
        this.skip = [(this.investPage - 1) * this.pageSize] - 1
        this.answer()
      },
      // 拆礼包
      exchange () {
        var that = this
        if (that.answerPeople < 5) {
          that.unReach = true
        } else {
          that.axios('/hongcai/rest/activitys/foolsDay/takeRecordStatus').then(function (res) {
            if (res.data && res.data.ret !== -1) {
              let status = res.data.status
              // status -1，未出题，0，未达到领取条件，1 可领，2 已领取
              if (status === 1) {
                that.$router.push({name: 'FoolExchange'})
              } else if (status === 2) {
                that.hasToken = true
              } else if (status === 0) {
                that.unReach = true
              } else {
                that.$router.replace({name: 'FoolDays'})
              }
            }
          })
        }
      },
      iKnow () {
        this.unReach = false
        this.hasToken = false
        this.$router.push({name: 'FoolResult'})
      },
      inviteShare () {
        this.showShare = true
      }
    },
    components: {FoolRules, FoolShare},
    desrtoyed () {}
  }
</script>
<style scoped>
  .ft-p2 {
    font-size: .2rem;
  }
  .ft-p24 {
    font-size: .24rem;
  }
  .ft-p36 {
    font-size: .36rem;
    font-weight: bold;
  }
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
  /* 未达标弹窗 */
  .tipBox {
    width: 70%;
    height: 4.8rem;
    background: url('../../images/foolsDay/box-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 1.5rem auto;
    padding: .12rem;
  }
  .iKnow {
    width: 57%;
    height: .9rem;
    line-height: 1.1rem;
    background: url('../../images/foolsDay/konw-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .tipBox .Header, .hasToken {
    width: 82%;
    height: 1.7rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: .65rem .23rem;
    font-size: .25rem;
    color: #fff;
  }
  .hasToken {
    padding-top: .9rem;
    width: 66%;
    height: 2.5rem;
    margin: 2rem auto .5rem;
  }
  .tipBox .Content {
    overflow: auto;
    height: 5rem;
  }
  .tipBox .Content p {
    color: #51171b;
    font-size: .23rem;
    font-weight: bold;
    text-align: left;
    margin: .25rem 0 .25rem .1rem;
  }
  .tipBox .Content p  span {
    margin-left: 1.1rem;
  }
  .iKnow.width-30 {
    width: 39%;
  }
  .headImg {pointer-events: none;}
</style>
