<template>
    <div class="gameStart" v-auto-height>
      <div class="game-title">
        <img src="../../images/singles-day/bg-01.png" alt="" width="100%">
        <img src="../../images/singles-day/bg-02.png" class="title2" width="100%">
        <div class="rule">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fl">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fr">
          <div class="ruleIcon" @click="showRulesMask = !showRulesMask;audioPlayUtil.playOrPaused('../../static/audio/click.mp3')">游戏规则</div>
        </div>
      </div>
      <ul class="startBtns">
        <li v-for="item in startList" @click="goGame(item.gameType)">{{item.text}}</li>
      </ul>
      <div class="moneyBox">
        <img src="../../images/singles-day/money-100.png" width="57%">
      </div>
      <div class="record" @click="goRecord()">游戏<br>记录</div>
      <game-rules :showRulesMask="showRulesMask" :closeRules='closeRules'></game-rules>
    </div>
</template>
<script>
  import {audioPlayUtil} from '../../service/Utils'
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
        activityStatus: true,
        showRulesMask: false,
        gameCounts: 10,
        token: '239833f25433a3345d0740c1686249e87c2995c8fc4b6f5c'
      }
    },
    watch: {
    },
    // props: ['token'],
    created () {
      this.activityType = this.$route.query.act
      this.getActivityStatus()
      this.getGameCounts()
    },
    components: {
      gameRules
    },
    methods: {
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
            alert(res.data.msg)
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
            alert(res.data.msg)
          }
        })
      },
      goGame (gameType) {
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3')
        if (gameType === 1 && this.gameCounts <= 0) {
          this.$router.push({name: 'gameOver'})
        } else {
          this.$router.push({name: 'gameCounting', params: { gameType: gameType }})
        }
      },
      goRecord () {
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3')
        this.$router.push({name: 'gameRecord', query: { act: this.activityType }})
      },
      closeRules () {
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3')
        this.showRulesMask = false
      }
    }
  }
</script>
<style scoped>
  .gameStart {
    background: #fbdc34;
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
  .startBtns {
    margin: 0 auto;
    text-align: center;
    padding: .5rem 0 .2rem;
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
    position: fixed;
    bottom: -.4rem;
    left: 2.5%;
    width: 95%;
    height: 4.5rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center bottom;
    background-size: contain;
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
</style>
