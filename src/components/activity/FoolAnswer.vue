<template>
  <!-- 答题主页面 -->
  <div class="fools-answer" v-client-height v-if="showPage">
    <div class="portrait">
      <img v-bind:src="answerHeadImgUrl" alt="">
    </div>
    <img src="../../images/foolsDay/answer-txt.png" alt="文案" width="74%">
    <div class="startAnswer" @click="startAnswer">
      <img src="../../images/foolsDay/answer-btn-txt.png" alt="立即出招" width="80%">
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  export default {
    data () {
      return {
        answerNum: '',
        answerHeadImgUrl: '',
        showPage: false
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? (this.hasAnswer(), this.getQuestionImg(), this.getAnswerNum()) : this.checkLogin()
      },
      answerNum: function (val) {
        val && val === this.$route.params.number ? this.$router.replace({name: 'FoolResult'}) : null
      }
    },
    mounted () {
      var that = this
      wx.ready(function () {
        var shareLink = process.env.vue_domain + '/activity/fools-day/answer/' + that.$route.params.number
        WechatShareUtils.onMenuShareAppMessage('你看得出我在说谎吗？', '认识了那么久，你有把握我说的每句话都是真心话吗？', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/8MZDOEkib8AnEm8IKUChDJ7X50kEO9u4GxRe5kwWibuAEq0mOHqmyZnsAk27P9lMk2NjCM0VOFBXPf4nByXcFI5g/0?wx_fmt=png')
      })
    },
    created () {
      this.userInfo.id > 0 ? (this.hasAnswer(), this.getQuestionImg(), this.getAnswerNum()) : null
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
      getQuestionImg () {
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/question/' + that.$route.params.number + '/questionHeadImg').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            if (res.data.endsWith('96')) {
              that.answerHeadImgUrl = res.data.substring(0, res.data.length - 2) + '0'
            } else {
              that.answerHeadImgUrl = res.data
            }
          }
        })
      },
      hasAnswer () {
        var that = this
        var number = that.$route.params.number
        that.axios('/hongcai/rest/activitys/foolsDay/question/' + number + '/checkAnswerQuestion')
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.$router.replace({name: 'FoolTacit', params: {number: number}})
          } else {
            that.showPage = true
          }
        })
      },
      startAnswer () {
        this.$router.replace({name: 'FoolAnswerPage', params: {number: this.$route.params.number}})
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-answer {
    background: url('../../images/foolsDay/bg-1.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }
  .fools-answer .startAnswer {
    width: 53%;
    height: 1.2rem;
    line-height: 1.5rem;
    background: url('../../images/foolsDay/answer-btn.png') no-repeat 0 0;
    background-size: 100% 100%;
    text-align: center;
    padding-left: 5px;
    margin: 0 auto;
  }
  .portrait {
    width: 35%;
    height: 3rem;
    background: url('../../images/foolsDay/answer-icon.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    margin: 3.1rem auto 0.3rem;
  }
  .portrait img {
    width: 81%;
    position: absolute;
    bottom: 5%;
    left: 9.6%;
    border-radius: 50%;
    height: 61%;
    pointer-events: none;
  }
</style>
