<template>
    <div class="gameStart" v-auto-height>
      <audio preload="preload" id="click"><source src="../../assets/click.mp3"></audio>
      <div class="overflow-hid" @click="playOrpause">
        <img v-if="isPlay === 'true'" src="../../images/singles-day/audio-play.png" width="8%" class="audioIcon fr">
        <img v-if="isPlay === 'false'" src="../../images/singles-day/audio-pause.png" width="8%" class="audioIcon fr">
      </div>
      <div class="game-title">
        <img src="../../images/singles-day/bg-01.png" alt="" width="100%">
        <img src="../../images/singles-day/bg-02.png" class="title2" width="100%">
        <div class="rule">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fl">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fr">
          <div class="ruleIcon" @click="showRule">游戏规则</div>
        </div>
      </div>
      <p class="activityTime">活动时间: 2017.11.08～2017.12.12</p>
      <ul class="startBtns" v-if="activityStatus === 1">
        <li v-for="item in startList" @click="goGame(item.gameType)">{{item.text}}</li>
      </ul>
      <div class="activityEndBtns" v-if="activityStatus === 2">活动已结束</div>
      <div class="moneyBox">
        <img src="../../../static/images/money-100.png" width="56%">
      </div>
      <div class="record" @click="goRecord()">游戏<br>记录</div>
      <game-rules :showRulesMask="showRulesMask" :closeRules='closeRules'></game-rules>
    </div>
</template>
<script>
  import {bridgeUtil, audioPlayUtil} from '../../service/Utils'
  import gameRules from './game-rules.vue'
  export default {
    name: 'gameStart',
    data () {
      return {
        startList: [
          {
            text: '试玩练习',
            gameType: 2
          },
          {
            text: '开始数钱',
            gameType: 1
          }
        ],
        activityStatus: 1,
        showRulesMask: false,
        gameCounts: 0,
        isPlay: 'true' // 默认播放音效
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? this.getGameCounts() : null
      }
    },
    created () {
      this.activityType = this.$route.query.act
      this.activityType ? this.getActivityStatus() : null
      this.token ? this.getGameCounts() : null
    },
    components: {gameRules},
    methods: {
      playOrpause () {
        this.isPlay === 'true' ? this.isPlay = 'false' : this.isPlay = 'true'
      },
      getActivityStatus () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/' + that.activityType
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.activityStatus = res.data.status
          } else {
            console.log(res.data.msg)
          }
        })
      },
      getGameCounts () {
        var that = this
        that.$http({
          method: 'post',
          url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.gameCounts = res.data.freeCount + res.data.count - res.data.usedCount
          } else {
            console.log(res.data.msg)
          }
        })
      },
      toLogin () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function () {}, null)
      },
      goGame (gameType) {
        // audioPlayUtil.playOrPaused('click', this.isPlay)
        if (!this.token) {
          this.toLogin()
          return
        }
        if (gameType === 1 && this.gameCounts <= 0) {
          this.$router.push({name: 'gameOver', query: { act: this.activityType, isPlay: this.isPlay }})
        } else {
          this.$router.push({name: 'gameCounting', params: { gameType: gameType }, query: { act: this.activityType, isPlay: this.isPlay }})
        }
      },
      goRecord () {
        // audioPlayUtil.playOrPaused('click', this.isPlay)
        if (!this.token) {
          this.toLogin()
          return
        }
        this.$router.push({name: 'gameRecord', query: { act: this.activityType, isPlay: this.isPlay }})
      },
      closeRules () {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        this.showRulesMask = false
      },
      showRule () {
        this.showRulesMask = !this.showRulesMask
        audioPlayUtil.playOrPaused('click', this.isPlay)
      }
    },
    destroyed () {
      audioPlayUtil.playOrPaused('click', this.isPlay)
    }
  }
</script>
<style scoped>
  .audioIcon {
    position: fixed;
    right: 0.1rem;
    top: .28rem;
    z-index: 44;
    border-radius: .3rem;
    z-index: 44;
  }
  .gameStart {
    background: #fbdc34;
    position: fixed;
    width: 100%;
  }
  .game-title {
    position: relative;
    height: 4.4rem;
  }
  .game-title .title2 {
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
  }
  .rule {
    position: absolute;
    top: -.05rem;
    right: 37%;
    width: 15%;
  }
  .ruleBg {
    height: .6rem;
  }
  .ruleIcon {
    height: .5rem;
    line-height: .5rem;
    border-radius: .15rem;
    background-color: #fc2a42;
    border: solid 1px #4b0d00;
    font-size: .24rem;
    clear: both;
    width: 140%;
    color: #fffbfc;
    margin: 0 auto;
    text-align: center;
    position: relative;
    top: -.05rem;
    left: -17%;
    font-weight: 500;
    animation: ruleShow 1s 0s alternate;
    -moz-animation: ruleShow 1s 0s alternate;
    -webkit-animation: ruleShow 1s 0s alternate;
    -o-animation: ruleShow 1s 0s alternate;
  }
  .activityEndBtns {
    width: 35%;
    font-size: .24rem;
    height: .8rem;
    line-height: .8rem;
    color: #4f0709;
    background: url('../../images/singles-day/btn-grey.png') no-repeat center center;
    background-size: contain;
    margin: 0.5rem auto 0;
  }
  .startBtns {
    margin: 0 auto;
    text-align: center;
    padding: .2rem 0 .2rem;
  }
  .startBtns li {
    display: inline-block;
    width: 35%;
    font-size: .24rem;
    height: .8rem;
    line-height: .8rem;
  }
  .startBtns li:nth-child(1) {
    color: #4f0709;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: contain;
    margin-right: .5rem;
  }
  .startBtns li:nth-child(2) {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red.png') no-repeat center center;
    background-size: contain;
  }
  .moneyBox {
    position: absolute;
    bottom: -.43rem;
    left: 2.5%;
    width: 95%;
    height: 4.5rem;
    margin: 0 auto;
    background: url('../../../static/images/money-box.png') no-repeat center bottom;
    background-size: contain;
  }
  .moneyBox img {
    margin-left: -1%;
  }
  .record {
    width: 1rem;
    height: .75rem;
    line-height: 1.2;
    background: url('../../images/singles-day/rule-icon.png') no-repeat center bottom;
    background-size: contain;
    position: fixed;
    top: 38%;
    right: -.1rem;
    padding: .1rem 0 .1rem .15rem;
    color: #fff;
    font-size: .24rem;
  }
  @keyframes ruleShow {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-moz-keyframes ruleShow {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-webkit-keyframes ruleShow
  {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-o-keyframes ruleShow
  {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @keyframes audioAnimation {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .audioIcon {
    background: #fff;
    animation: audioAnimation 1.5s 0s infinite linear;
    -moz-animation: audioAnimation 1.5s 0s infinite linear;
    -webkit-animation: audioAnimation 1.5s 0s infinite linear;
    -o-animation: audioAnimation 1.5s 0s infinite linear;

  }
  .activityTime {
    color: #581f0d;
    font-size: .26rem;
    font-weight: bold;
  }
</style>
