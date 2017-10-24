<template>
  <div class="gameCounting" v-auto-height v-load>
    <div class="rewardTitle">
      <div class="totalMoney">
        <span>¥</span><span class="money">{{rewardMoney}}</span>
      </div>
      <div class="countTimes">
        <div class="countDown fl">
          <img src="../../images/singles-day/clock.png" id="clock">
          <span>{{second}}S</span>
        </div>
        <div class="gameCounts fr">剩余次数：{{gameCounts}}次</div> 
      </div>
    </div>
    <div class="moneyBox">
      <p class="i-know" @click="closeFirstAndStart">我知道了</p>
      <ul class="money-list">
        <li v-for="(item, index) in HandList" @touchstart="startTouchScroll($event,index)" @touchmove="moveTouchScroll($event,index)" @touchend="endTouchScroll($event,index)">{{HandList[index]}}</li>
      </ul>
    </div>
    <div class="mask-common first-mask" v-show="showMask">
      <!-- 首次游戏引导蒙层 -->
      <div v-show="showFirst">
        <p class="mask-title">抢到多少，就送多少</p>
        <div class="mask-content">
          <img src="../../images/singles-day/top-hand.png" alt="" width="8%">
          上滑抢钞票
          <img src="../../images/singles-day/icon-01.png" alt="" width="8%">
          不止给你100块！<br>
          有机会出现面值500元和10000元的钞票哦！
        </div>
      </div>
      <!-- 高能预警 -->
      <div class="start-mask" v-show="showWarning">
        <div class="warning">
          <img src="../../images/singles-day/emoji-02.png" alt="" width="28%">
          <span>高能预警</span>
        </div>
        <div class="count-down">{{warningText}}</div>
      </div>
      <!-- 获得奖励 -->
      <div class="reward-mask" v-show="showReward">
        <div class="rewardBox" v-if="rewardMoney >0">
          <p v-if="gameType === 1">恭喜您获得</p>
          <p v-if="gameType === 2">恭喜您数出</p>
          <div class="rewardBg">
            <P>特权本金</P>
            <P>￥<span id="rewardMoney">{{rewardMoney}}</span></P>
            <p>有效期1天</p>
          </div>
          <div v-if="gameType === 2" class="demo">试玩将不会获得奖励，练好手速就去正式玩一局吧！</div>
          <ul class="rewardBtns">
            <li v-if="gameType === 1" @click="toPriviledge">查看特权本金</li>
            <li v-if="gameType === 2" @click="goBack">返回</li>
            <li @click="startWarning()">再玩一次</li>
          </ul>
        </div>
        <div class="NoReward" v-if="rewardMoney <= 0">
          <img src="../../images/singles-day/emoji-04.png" width="25%">
          100块都没数到...
          <div class="startAginBtn" @click="startWarning">再玩一次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'gameCounting',
    data () {
      return {
        warningText: 3,
        showWarning: false,
        showMask: false,
        showReward: false,
        showFirst: false,
        rewardMoney: 0,
        second: 16,
        gameCounts: 5,
        gameType: Number(this.$route.params.gameType), // 2: 试玩
        HandList: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500, 100, 100, 100, 100, 100, 500, 100, 100, 500, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500, 100, 100, 100, 500, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 10000, 100, 10000, 100, 100, 100, 100, 100, 10000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500, 100, 500, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500, 100, 500, 500, 100, 100, 100, 100, 100, 10000, 10000, 100, 100, 500, 500, 500, 100, 100, 100, 100, 100, 100, 500, 100, 100, 100, 500, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        isPlay: true // 默认播放音效
      }
    },
    watch: {
      showFirst: function (newVal, oldVal) {
        document.getElementsByClassName('moneyBox')[0].style.zIndex = newVal ? 2 : 0
        document.getElementsByClassName('i-know')[0].style.zIndex = newVal ? 2 : 0
        newVal ? $('.money-list li').addClass('example') : $('.money-list li').removeClass('example')
      }
    },
    props: ['token'],
    created () {
      this.gameType = Number(this.$route.params.gameType)
      this.getGameCounts()
      if (this.gameType === 1) {
        this.getMoneyList(1)
        this.showFirst = true
      } else {
        this.getMoneyList(2)
        this.showFirst = false
      }
      window.vue = this
    },
    directives: {
      'load': {
        inserted: function (el) {
          console.log(document.querySelector('.money-list'))
          // document.querySelector('.money-list').addEventListener('load', window.vue.moveTouchScroll(), false)
        }
      }
    },
    mounted () {
      // console.log(this.showFirst)
      // if (this.showFirst) {
      //   $('.moneyBox img').addClass('example')
      // } else {
      //   $('.moneyBox img').removeClass('example')
      // }
      for (var i = 0; i < this.HandList.length; i++) {
        $($('.money-list li')[i]).addClass('money-' + this.HandList[i])
        // console.log('money-' + this.HandList[i])
      }
    },
    components: {
    },
    methods: {
      toPriviledge () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {
          that.closeMask()
        }, null)
      },
      goBack () {
        this.$router.push({name: 'gameStart'})
      },
      startWarning () { // 高能预警倒计时
        var that = this
        if (that.gameType === 1 && that.gameCounts <= 0) {
          that.$router.push({name: 'gameOver'})
        } else {
          that.showReward = false
          that.showWarning = true
          var warningTimer = setInterval(function () {
            that.warningText -= 1
            if (that.warningText === 0) {
              that.warningText = (that.warningText.toString() + '开始').slice(-2)
              clearInterval(warningTimer)
              if (that.gameType === 1) {
                that.updateGameCounts()
              }
              setTimeout(function () {
                that.showWarning = false
                that.showMask = false
                that.warningText = 3
                that.second = 16
                that.countDown()
              }, 1000)
            }
          }, 1000)
        }
      },
      getGameCounts () {
        var that = this
        if (that.gameType === 1) { // 正式玩
          that.$http({
            method: 'post',
            url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.gameCounts = res.data.freeCount + res.data.count - res.data.usedCount
              res.data.usedCount === 0 ? that.showFirst = true : that.showFirst = false
            } else {
              console.log(res.data.msg)
            }
          })
        } else { // 试玩
          that.startWarning()
        }
      },
      getMoneyList (type) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest//activity/countingKings/0/handSpeedConfig?token=' + that.token + '&type=' + type
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            console.log(res.data)
          } else {
            console.log(res.data.msg)
          }
        })
      },
      updateGameCounts () {
        var that = this
        that.$http({
          method: 'put',
          url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token + '&type=1'
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.gameCounts = res.data.freeCount + res.data.count - res.data.usedCount
            res.data.usedCount === 0 ? that.showFirst = true : that.showFirst = false
          } else {
            console.log(res.data.msg)
          }
        })
      },
      closeFirstAndStart () { // 关闭首次引导并开始
        document.getElementsByClassName('i-know')[0].style.zIndex = 0
        document.getElementsByClassName('moneyBox')[0].style.zIndex = 1
        this.showFirst = false
        this.startWarning()
      },
      showRewardMoney (elem, endVal, startVal, duration, decimal) { // 获得奖励自增动画
        var that = this
        var startTime = 0
        var dec = Math.pow(10, decimal)
        var progress, value
        function startCount (timestamp) {
          if (!startTime) startTime = timestamp
          progress = timestamp - startTime
          value = startVal + (endVal - startVal) * (progress / duration)
          value = (value > endVal) ? endVal : value
          value = Math.floor(value * dec) / dec
          that.rewardMoney = value
          progress < duration && requestAnimationFrame(startCount)
        }
        requestAnimationFrame(startCount)
      },
      hourglassAnimate (duration) { // 倒计时5s动画
        $('#clock').addClass('hourglass')
        var glassTimer = setTimeout(function () {
          $('#clock').removeClass('hourglass')
          clearTimeout(glassTimer)
        }, duration)
      },
      countDown () { // 倒计时
        var that = this
        if (that.second > 0) {
          if (that.second <= 6) {
            that.playOrPaused('../../static/audio/tip.mp3')
            that.hourglassAnimate(that.second * 1000 - 100)
          }
          that.second -= 1
          var countTimer = setTimeout(function () {
            that.countDown()
          }, 1000)
        } else {
          clearTimeout(countTimer)
          // that.showMask = true
          // that.showReward = true
          // that.showRewardMoney($('#rewardMoney'), that.rewardMoney, 0, 800, 0)
          // if (that.rewardMoney >= 100) {
          //   that.playOrPaused('../../static/audio/get.mp3')
          // }
          that.gameOverGetPriviledge(that.gameType, that.rewardMoney, 100, 66)
        }
      },
      gameOverGetPriviledge (type, amount, number, countingNum) { // 游戏结束获得特权本金
        // type:1.正式游戏，2试玩游戏 amount:金额，number:金额配置编号，countingNum:点钞数
        var that = this
        that.$http({
          method: 'get',
          url: '/activity/countingKings/0/takeHandSpeedReward?token=' + that.token + '&type=' + type + '&amount=' + amount + '&number=' + number + '&countingNum=' + countingNum})
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.showMask = true
            that.showReward = true
            that.showRewardMoney($('#rewardMoney'), amount, 0, 800, 0)
            if (amount >= 100) {
              that.playOrPaused('../../static/audio/get.mp3')
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
      playOrPaused (url) {
        if (this.isPlay) {
          var audio = new Audio()
          audio.setAttribute('src', url)
          if (audio.paused) {
            // 暂停中
            audio.play()
          }
        }
      },
      scrollMoney (event, index) {

      },
      startTouchScroll (event, index) {
        event.preventDefault()
        var touch = event.targetTouches[0]
        this.startPos = {x: touch.pageX, y: touch.pageY}
        $($('.money-list li')[index]).addClass('animate')
        // alert(1)
        // document.querySelector('.money-list li').addEventListener('touchmove', this.moveTouchScroll(event, startPos, index), false)
      },
      moveTouchScroll (event, index) {
        this.offsetY = 0
        console.log(this.startPos)
        var touch = event.targetTouches[0]
        console.log(event.targetTouches[0].pageY)
        console.log(window.touchStartY)
        var endPos = {x: touch.pageX - this.startPos.x, y: touch.pageY - this.startPos.y}
        // isScrolling为1时，表示纵向滑动，0为横向滑动
        var isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0
        console.log(isScrolling)
        if (isScrolling === 1) {
          event.preventDefault()
        }
        // event.preventDefault()
        this.offsetY += 0.25 * (event.targetTouches[0].pageY - window.touchStartY)
        window.touchStartY = event.targetTouches[0].pageY
        // var touchY = window.offsetY
        console.log(this.offsetY)
        if (this.offsetY < -1) {
          $($('.money-list li')[index]).css('transform', 'translateY(-3rem)')
          document.querySelector('.money-list li').style.webkitTransform = 'translateY(-3rem)'
        }
      },
      endTouchScroll (touchY, index) {
        if (this.offsetY >= 0) {
          $($('.money-list li')[index]).removeClass('animate')
        } else {
          $($('.money-list li')[index]).css('transform', 'translateY(-13rem)')
          document.querySelector('.money-list li').style.webkitTransform = 'translateY(-13rem)'
          this.rewardMoney += this.HandList[index]
        }
      }
    }
  }
</script>
<style scoped>
  /* 首次引导弹窗 */
  .mask-common.first-mask {
    z-index: 1;
  }
  .mask-title {
    padding-top: 1rem;
    font-size: .36rem;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
  }
  .mask-content {
    color: #fff;
    text-align: center;
    line-height: 1.8;
    margin: 0;
  }
  .mask-content img {
    display: inline-block;
  }
  .i-know {
    width: 35%;
    color: #59060e;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: 100% 100%;
    padding: .2rem .2rem .25rem;
    position: absolute;
    top: 69%;
    left: 32.5%;
    font-size: .27rem;
    z-index: 0;
  }
  /* 高能预警 */
  .start-mask {
    z-index: 3;
  }
  .start-mask .warning {
    padding-top: 2.4rem;
    font-size: .5rem;
    letter-spacing: 1.5px;
    color: #ffffff;
    width: 49%;
    margin: 0 auto;
  }
  .warning img {
    float: left;
    margin-top: -.2rem;
  }
  .start-mask .count-down {
    margin-top: 1.4rem;
    font-family: ArialMT;
    font-size: 1rem;
    letter-spacing: 2.9px;
    color: #ffffff;
  }
  /* animation */
  @keyframes gyrate {
    0% {
      transform: translateY(0.55rem);
    }
    100% {
      transform: translateY(-0.55rem);
    }
  }
  .moneyBox .money-list {
    transform: translateY(.55rem);
  }
  .moneyBox .money-list li.example {
    animation: gyrate .8s 0s infinite alternate;
    -moz-animation: gyrate .8s 0s infinite alternate;
    -webkit-animation: gyrate .8s 0s infinite alternate;
    -o-animation: gyrate .8s 0s infinite alternate;
  }
  .gameCounting {
    background: #fbdc34;
    padding: 0.5rem 0;
    overflow: hidden;
  }
  .rewardTitle {
    background: url('../../images/singles-day/reward-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 80%;
    height: 2rem;
    margin: 0 auto;
    color: #4f0709;
    padding: .3rem;
    margin-top: .5rem;
  }
  .money {
    font-family: ArialMT;
    font-size: .48rem;
    text-align: center;
    width: 65%;
  }
  .totalMoney {
    overflow: hidden;
    height: .7rem;
    line-height: .8rem;
  }
  .totalMoney span {
    float: left;
    font-weight: bold;
  }
  .totalMoney span:nth-child(1) {
    font-size: .4rem;
    width: 15%;
    text-align: left;
    margin-left: .1rem;
  }
  .countDown {
    width: 34%;
  }
  .moneyBox {
    position: fixed;
    /* z-index: 2; */
    bottom: -.8rem;
    left: 2.5%;
    width: 95%;
    height: 7.2rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center 91%;
    background-size: contain;
  }
  .countTimes {
    overflow: hidden;
    clear: both;
    font-size: .28rem;
    text-align: left;
    margin-top: .3rem;
    font-weight: bold;
  }
  #clock {
    width: 22%;
    vertical-align: text-top;
    margin-right: .15rem;
  }
  .countDown #clock.hourglass {
    animation: clock .1s 0s infinite alternate;
    -moz-animation: clock .1s 0s infinite alternate;
    -webkit-animation: clock .1s 0s infinite alternate;
    -o-animation: clock .1s 0s infinite alternate;
  }
  @keyframes clock {
    0% {
      transform: rotate(-30deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(30deg);
    }
  }
  .rewardBtns {
    margin: 0 auto;
    text-align: center;
    padding: .8rem 0 .2rem;
  }
  .rewardBtns li {
    display: inline-block;
    width: 35%;
    font-size: .22rem;
    height: .8rem;
    line-height: .85rem;
  }
  .rewardBtns li:nth-child(1) {
    color: #4f0709;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: contain;
    margin-right: .5rem;
  }
  .rewardBtns li:nth-child(2) {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red.png') no-repeat center center;
    background-size: contain;
  } 
  .startAginBtn {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red-long.png') no-repeat center center;
    background-size: contain;
    width: 90%;
    font-size: .24rem;
    height: .8rem;
    line-height: .85rem;
    text-align: center;
    margin: 1rem auto 0;
  }
  .rewardBox {
    padding: 2.5rem .5rem 0;
    font-family: MicrosoftYaHei;
  }
  .rewardBox>p:nth-child(1) {
    font-size: .38rem;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    margin-left: .6rem;
  }
  .rewardBg {
    width: 90%;
    margin: 0 auto;
    background: url('../../images/singles-day/reward.png') no-repeat center center;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .8rem;
  }
  .rewardBg p {
    line-height: 1.21;
    text-align: center;
    color: #4b0d00;
  }
  .rewardBg p:nth-child(1) {
    font-size: .45rem;
  }
  .rewardBg p:nth-child(2) {
    font-size: .3rem;
    padding: .035rem 0;
  }
  .rewardBg p:nth-child(2) span {
    font-family: -webkit-body;
    font-size: .45rem;
    color: #fc2a42;
    font-weight: bold;
  }
  .rewardBg p:nth-child(3) {
    font-size: .21rem;
    margin-top: .1rem;
  }
  .rewardBox .demo {
    font-size: .2rem;
    text-align: justify;
    color: #ffffff;
    width: 85%;
    margin: .2rem auto 0;
  }
  .NoReward {
    padding: 2.5rem 1rem 0;
    font-size: .38rem;
    font-weight: bold;
    text-align: justify;
    color: #ffffff;
    vertical-align: middle;
  }
  .money-list {
    width: 100%;
    height: 7.1rem;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .money-list li {
    width: 57%;
    height: 7rem;
    position: absolute;
    bottom: 0;
    left: 21.1%;
  }
  .money-100 {
    background: url('../../images/singles-day/money-100.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .money-500 {
    background: url('../../images/singles-day/money-500.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .money-10000 {
    background: url('../../images/singles-day/money-10000.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .animate {
    -webkit-transition:all .3s ease;
    -moz-transition:all .3s ease;
    -o-transition:all .3s ease;
    -ms-transition:all .3s ease;    
    transition:all .3s ease;
    transform: scale(.9);
  }
</style>
