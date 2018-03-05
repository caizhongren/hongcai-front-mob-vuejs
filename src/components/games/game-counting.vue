<template>
  <div class="gameCounting" v-auto-height v-load>
    <audio preload="preload" id="count"><source src="../../assets/count.mp3"></audio>
    <audio preload="preload" id="get"><source src="../../assets/get.mp3"></audio>
    <audio preload="preload" id="tip"><source src="../../assets/tip.mp3"></audio>
    <audio preload="preload" id="click"><source src="../../assets/click.mp3"></audio>
    <div class="rewardTitle" style=" position: absolute;left: 10%;top: .5rem">
      <div class="totalMoney">
        <span>¥</span><span class="money">{{rewardMoney}}</span>
      </div>
      <div class="countTimes">
        <div class="countDown fl">
          <img src="../../images/singles-day/clock.png" id="clock">
          <span>{{second}}S</span>
        </div>
        <div v-if="gameType === 1" class="gameCounts fr">剩余次数：{{gameCounts}}次</div> 
      </div>
    </div>
    <canvas id='stage' width='300' height='300'></canvas>
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
        <div class="moneyBox">
          <p class="i-know" @click="closeFirstAndStart">我知道了</p>
          <img src="../../../static/images/money-100.png" width="57%">
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
        <div class="rewardBox" v-if="rewardMoney > 0">
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
            <li @click="getGameCounts(true)">再玩一次</li>
          </ul>
        </div>
        <div class="NoReward" v-if="rewardMoney <= 0">
          <img src="../../images/singles-day/emoji-04.png" width="25%">
          100块都没数到...
          <div class="startAginBtn" @click="getGameCounts(true)">再玩一次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil, audioPlayUtil, Utils, commonAnimation} from '../../service/Utils'
  export default {
    name: 'gameCounting',
    data () {
      return {
        warningText: 3,
        showWarning: false,
        showMask: true,
        showReward: false,
        showFirst: false,
        rewardMoney: 0,
        second: 15,
        gameCounts: 0,
        countNum: 0, // 数了几张
        number: '', // 钞票配置number
        gameType: Number(this.$route.params.gameType), // 2: 试玩
        isPlay: this.$route.query.isPlay,
        activityType: this.$route.query.act,
        HandList: [],
        moneyBg1: [],
        moneyBg2: [],
        backgroundTimer: null,
        moneyBgCount: 2, // qp_d背景图个数
        qp_e: 3,
        qipaStage: {},
        W: 640,
        H: 1E3,
        IS_TOUCH: null,
        IS_ANDROID: Utils.isAndroid(),
        gameStatus: 1,
        images: {
          img: {
            path: "../../../static/images/",
            manifest: [{
              src: "money-100.png",
              id: "m100"
            },
            {
              src: "money-500.png",
              id: "m500"
            },
            {
              src: "money-10000.png",
              id: "m10000"
            },
            {
              src: "mb-100.png",
              id: "mb100"
            },
            {
              src: "mb-500.png",
              id: "mb500"
            },
            {
              src: "mb-10000.png",
              id: "mb10000"
            },
            {
              src: "money-box.png",
              id: "box"
            },
            {
              src: "money-bg05.png",
              id: "d0"
            },
            {
              src: "money-bg06.png",
              id: "d1"
            }]
          }
        }
      }
    },
    props: ['token'],
    watch: {
      showFirst: function (newVal, oldVal) {
        newVal ? $('.moneyBox img').addClass('example') : $('.moneyBox img').removeClass('example')
      },
      token (val) {
        val && val !== '' ? this.getGameCounts() : null
      }
    },
    directives: {
      'load': {
        inserted: function (el) {
        }
      }
    },
    mounted () {
      this.gameType = Number(this.$route.params.gameType)
      var createjs = window.create || createjs
      var that = this;
      var l = null,
      d,
      f = null,
      g = null,
      e = null,
      h = null;
      that.qipaStage.stage = null
      that.qipaStage.queue = null
      that.qipaStage.init = function(c, isOnceAgain) {
        if(isOnceAgain) {
          that.drawScrollMoney()
          that.backgroundTimer = setInterval(setBackground, 1E3);
          that.qipaStage.stage.removeChild(that.qipaStage.stage.player)
          that.qipaStage.stage.player = new drawMoney(that.HandList[0])
          that.qipaStage.stage.addChild(that.qipaStage.stage.player)
          return
        }

        function qp_w() {
          var a = new createjs.Shape;
          a.graphics.beginFill("#fbdc34").drawRect(0, 0, that.W, that.H);
          that.qipaStage.stage.addChild(a);
          var b = new createjs.Shape;
          b.graphics.beginFill("white").rect(0, 200, that.W, that.H);
          a.hitArea = b;
          var c = 0,
          d = 0;
          a.on("mousedown", function(a) {
            if (that.second <= 0) {
              return
            }
            c = a.localY;
            d = that.qipaStage.stage.player.m[qp_f].y;
            that.qipaStage.stage.removeChild(that.qipaStage.stage.player)
            that.qipaStage.stage.player = new drawMoney(that.HandList[that.countNum])
            that.qipaStage.stage.addChild(that.qipaStage.stage.player)
          });
          a.on("pressmove", function(e) {
            if (that.second <= 0 || c - e.localY <= 0) {
              return
            }
             if (1 == that.gameStatus) {
                that.gameStatus = 2
             }
             if (2 == that.gameStatus) {
              that.qipaStage.stage.player.m[qp_f].visible = !0;
              if (!that.qipaStage.stage.player.m[qp_f].y) {
                that.qipaStage.stage.player.m[qp_f].y = 220;
              }
              that.qipaStage.stage.player.m[qp_f].y += (e.localY - c) / 1.5
             }
          });
          var f = 0;
          a.on("pressup", function(a) {
            if (that.second <= 0) {
              return
            }
            if (50 < c - a.localY) {
              a = (new Date).getTime()
              if (0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a) {
              } else {
                f = qp_y(a)
                if (f <= 20) {
                  that.rewardMoney += that.HandList[that.countNum]
                  that.countNum++
                  that.qipaStage.stage.player.playAnimation(that.qipaStage.stage.player.m[qp_f])
                  audioPlayUtil.playOrPaused('count', that.isPlay)
                } else {
                  qp_i.length--
                }
              }
            } else {
              qp_z(d)
              that.qipaStage.stage.player.m[qp_f].visible = !1
            }
          });
          that.drawScrollMoney()
          that.backgroundTimer = setInterval(setBackground, 1E3);
          that.qipaStage.stage.player = new drawMoney(that.HandList[0])
          that.qipaStage.stage.addChild(that.qipaStage.stage.player)
        }
        that.qipaStage.stage = new createjs.Stage("stage");
        that.qipaStage.queue = new createjs.LoadQueue(!1);
        that.qipaStage.queue.setMaxConnections(30);
        if (that.IS_TOUCH = createjs.Touch.isSupported()) {
          createjs.Touch.enable(that.qipaStage.stage, !0);
          that.qipaStage.stage.mouseEnabled = !1;
          var c = new createjs.Shape;
          c.graphics.f("white").r(0, 0, that.W, that.H);
          that.qipaStage.stage.addChild(c)
        }
        createjs.Ticker.setFPS(60);
        setTimeout(that.setCanvasSize, 100);
        createjs.Ticker.on("tick", that.qipaStage.stage);
        that.qipaStage.queue.on("complete", qp_w, null, !0);
        // h = c是图片集合， that.qipaStage.init调用时赋值
        that.images.img && that.qipaStage.queue.loadManifest(that.images.img, !1);
        that.qipaStage.queue.load()
        console.log('init')
        h = c
      };
      window.onresize = that.setCanvasSize;
      that.H = 960; // canvas画布高。
      var qp_e = 3,
      qp_f = qp_e,
      qp_g = 400,
      qp_i = []
      function genRandom(a) {
        return parseInt(Math.random() * a)
      }
      /** 
      ** qQp_A 画出钞票
      **/
      function drawMoney(money) {
        this.initialize();
        this.box = new createjs.Bitmap(that.qipaStage.queue.getResult("box"));
        this.box.regX = this.box.getBounds().width / 2;
        this.box.regY = this.box.getBounds().height / 3;
        this.box.scaleX = .86;
        this.box.scaleY = .8;
        this.box.y = 475;
        this.addChild(this.box);

        this.mb = new createjs.Bitmap(that.qipaStage.queue.getResult("m" + money));
        this.mb.regX = this.mb.getBounds().width / 2;
        this.mb.regY = this.mb.getBounds().height / 2;
        this.mb.scaleX = .9;
        this.mb.scaleY = .8;
        this.mb.y = qp_g;
        this.mb.x = -3;
        this.x = that.W / 2;
        this.y = that.H / 2 - 150;
        this.addChild(this.mb);
    
        this.m = [];
        for (var a = 0; 3 >= a; a++) this.m[a] = new createjs.Bitmap(that.qipaStage.queue.getResult("mb" + money)),
        this.m[a].regX = this.m[a].getBounds().width / 2,
        this.m[a].regY = this.m[a].getBounds().height / 2,
        this.m[a].scaleX = .9,
        this.m[a].scaleY = .8,
        this.m[a].y = qp_g,
        this.m[a].visible = !1,
        this.addChild(this.m[a]);
      }
      drawMoney.prototype = new createjs.Container;
      drawMoney.prototype.playAnimation = function(a) {
        a.visible = !0;
        createjs.Tween.get(a).to({
          scaleX: 0.5,
          scaleY: 0.5,
          y: -that.H
        }, 300).to({
          visible: !1,
          y: qp_g,
          scaleX: 1,
          scaleY: 1
        }, 0);
        0 < qp_f ? qp_f--:qp_f = qp_e
      };
      /** 
      ** qp_D 背景动画设置
      **/
      var qp_F = 0;
      function setBackground() {
        for (var a = 0; a < that.moneyBgCount; a++) that.moneyBg1[qp_F][a].visible = !0,
        createjs.Tween.get(that.moneyBg1[qp_F][a]).to({
          y: that.H + that.moneyBg1[qp_F][a].getBounds().height / 2 + 100,
          rotation: 720 + genRandom(400),
          x: genRandom(that.W)
        }, 1E3 + genRandom(800)).to({
          visible: !1
        }, 10).to({
          x: genRandom(that.W),
          y: -that.H / 2 + genRandom(that.H / 2),
          rotation: 0
        }, 10);
        for (var a = 0; a < that.moneyBgCount; a++) that.moneyBg2[qp_F][a].visible = !0,
        createjs.Tween.get(that.moneyBg2[qp_F][a]).to({
          y: that.H + that.moneyBg2[qp_F][a].getBounds().height / 2 + 100,
          rotation: 720 + genRandom(400),
          x: genRandom(that.W)
        }, 1E3 + genRandom(800)).to({
          visible: !1
        }, 10).to({
          x: genRandom(that.W),
          y: -that.H / 2 + genRandom(that.H / 2),
          rotation: 0
        }, 10);
        qp_F < qp_e ? qp_F++:qp_F = 0
      }
      /** 
      ** qp_y 隐藏游戏开始箭头图标
      **/
      function qp_y(a) {
        var b = 0;
        if (0 != qp_i.length) {
          var c;
          for (c = 0; c < qp_i.length && !(qp_i[c] > a - 1E3); c++);
          for (var b = qp_i.length - c,
          d = c; d < qp_i.length; d++) qp_i[d - c] = qp_i[d];
          qp_i.length -= c
        }
        qp_i.push(a);
        return parseInt(b)
      }
      /** 
      ** qp_z 隐藏游戏开始箭头图标
      **/
      function qp_z(a) {
        var b = Math.abs(that.qipaStage.stage.player.m[qp_f] - a);
        createjs.Tween.get(that.qipaStage.stage.player.m[qp_f]).to({
          y: a
        }, 20 * b)
      }
      that.token ? that.getGameCounts() : null
      audioPlayUtil.playOrPaused('click', that.isPlay)
    },
    components: {
    },
    methods: {
      playAgin () {
        if (this.gameType === 1 && this.gameCounts <= 0) {
          this.$router.replace({name: 'gameOver', query: { act: this.activityType, isPlay: this.isPlay }})
          clearInterval(this.backgroundTimer)
          return
        }
        location.reload()
      },
      /** 
      ** Qp_x 背景钞票动画
      **/
      qp_p () {
        this.countNum = 0;
        this.gameStatus = 1;
      },
      setCanvasSize () { // 设置画布宽高
        var c = this.qipaStage.stage.canvas,
        k = window.innerWidth,
        b = window.innerHeight
        if (!0) k / b > this.W / this.H ? k = this.W * b / this.H : b = this.H * k / this.W,
        c.style.marginTop = 0
        else {
          var d = this.W * b / this.H
          k >= d ? (k = d, stage.x = 0) : stage.x = (k - d) / 2
        }
        c.width = this.W
        c.height = this.H
        c.style.width = k + 'px'
        c.style.height = window.innerHeight + 'px'
      },
      // 循环滚动背景
      drawScrollMoney: function () {
        var that = this
        var createjs = window.create || createjs
        var a = 0, b = 0, c = 0, d = 0;
        for (a = 0; a <= that.qp_e; a++) for (that.moneyBg1[a] = [], b = 0; b < 2; b++) {
          var e = new createjs.Bitmap(that.qipaStage.queue.getResult("d0"));
          e.regX = e.getBounds().width / 2;
          e.regY = e.getBounds().height / 2;
          e.x = parseInt(Math.random() * that.W);
          e.y = -that.H / 2 + parseInt(Math.random() * that.H);
          e.visible = !1;
          that.moneyBg1[a].push(e);
          that.qipaStage.stage.addChild(that.moneyBg1[a][b])
        }
        for (c = 0; c <= that.qp_e; c++) for (that.moneyBg2[c] = [], d = 0; d < 2; d++) {
          var e1 = new createjs.Bitmap(that.qipaStage.queue.getResult("d1"));
          e1.regX = e1.getBounds().width / 2;
          e1.regY = e1.getBounds().height / 2;
          e1.x = parseInt(Math.random() * that.W);
          e1.y = -that.H / 2 + parseInt(Math.random() * that.H);
          e1.visible = !1;
          that.moneyBg2[c].push(e1);
          that.qipaStage.stage.addChild(that.moneyBg2[c][d])
        }
      },
      toPriviledge () {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {}, null)
      },
      showOrhideBackBtn (status) { // 显示或隐藏返回按钮 0隐藏 1显示
        bridgeUtil.webConnectNative('HCNative_SetBackButtonStatus', undefined, {
          status: status
        }, function (res) {}, null)
      },
      goBack () {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        this.$router.go(-1)
      },
      startWarning (isOnceAgain) { // 高能预警倒计时
        var that = this
        that.getMoneyList(that.gameType, isOnceAgain)
        that.showOrhideBackBtn(0)
        that.rewardMoney = 0
        that.showReward = false
        that.showWarning = true
        that.warningText = 3
        that.second = 15
        var warningTimer = setInterval(function () {
          that.warningText -= 1
          if (that.warningText === 0) {
            that.warningText = (that.warningText.toString() + '开始').slice(-2)
            // $('.count-down').html('开始')
            clearInterval(warningTimer)
            setTimeout(function () {
              that.showWarning = false
              that.showMask = false
              that.warningText = 3
              that.countDown()
              that.second = 15
              that.qp_p();
            }, 1000)
          }
        }, 1000)
      },
      getGameCounts (isOnceAgain) {
        var that = this
        that.countNum = 0
        that.moneyBg1 = []
        that.moneyBg2 = []
        clearInterval(that.backgroundTimer)
        if (that.gameType === 1) { // 正式玩
          that.$http({
            method: 'post',
            url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.showFirst = true
              that.gameCounts = res.data.freeCount + res.data.count - res.data.usedCount
              if (that.gameType === 1 && that.gameCounts <= 0) {
                that.$router.replace({name: 'gameOver', query: { act: that.activityType, isPlay: that.isPlay }})
                clearInterval(that.backgroundTimer)
              } else {
                res.data.usedCount === 0 ? that.showFirst = true : that.showFirst = false
                res.data.usedCount === 0 ? that.showWarning = false : that.showWarning = true
                that.gameCounts -= 1
                if (that.showWarning) {
                  that.startWarning(isOnceAgain)
                }
              }
            } else {
              console.log(res.data.msg)
            }
          })
        } else { // 试玩
          that.showFirst = false
          that.startWarning(isOnceAgain)
        }
      },
      getMoneyList (type, isOnceAgain) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/countingKings/0/handSpeedConfig?token=' + that.token + '&type=' + type
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.HandList = JSON.parse(res.data.deftHandValues)
            that.number = res.data.number
            that.qipaStage.init(that.images, isOnceAgain)
            
          } else {
            console.log(res.data.msg)
          }
        })
      },
      closeFirstAndStart () { // 关闭首次引导并开始
        audioPlayUtil.playOrPaused('click', this.isPlay)
        this.showFirst = false
        this.startWarning()
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
            audioPlayUtil.playOrPaused('tip', that.isPlay)
            that.hourglassAnimate(that.second * 1000 - 100)
          }
          that.second -= 1
          var countTimer = setTimeout(function () {
            that.countDown()
          }, 1000)
        } else {
          // 关闭定时器
          clearInterval(that.scrTimer)
          clearTimeout(countTimer)
          clearInterval(that.backgroundTimer)
          that.showMask = true
          that.showReward = true
          commonAnimation.countToNumber($('#rewardMoney'), that.rewardMoney, 0, 800, 0)
          if (that.rewardMoney >= 100) {
            audioPlayUtil.playOrPaused('get', that.isPlay)
            that.gameOverGetPriviledge(that.gameType, that.rewardMoney, that.number, that.countNum)
          }
          that.showOrhideBackBtn(1)
        }
      },
      gameOverGetPriviledge (type, amount, number, countingNum) { // 游戏结束获得特权本金
        // type:1.正式游戏，2试玩游戏 amount:金额，number:金额配置编号，countingNum:点钞数
        var that = this
        this.$http.post('/hongcai/rest/activity/countingKings/0/takeHandSpeedReward', {
          token: that.token,
          type: type,
          amount: amount,
          number: number,
          countingNum: countingNum
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            if (amount >= 100) {
              audioPlayUtil.playOrPaused('get', that.isPlay)
            }
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    },
    destroyed () {
      this.qipaStage.stage.removeAllChildren()
      clearInterval(this.backgroundTimer)
      audioPlayUtil.playOrPaused('click', this.isPlay)
    }
  }
</script>
<style scoped>
  .qian-top,
  .qian-bottom,
  .qian-middle {
    width: 20%;
    position: absolute;
    z-index: 1;
  }
  .qian-top {
    width: 23%;
    left: 10%;
  }
  .qian-middle {
    width: 15%;
    left: 80%;
  }
  /* 首次引导弹窗 */
  .mask-common.first-mask {
    z-index: 2;
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
    z-index: 99;
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
  .gameCounting {
    background: #fbdc34;
    /*padding: 0.5rem 0;*/
    overflow: hidden;
    position: fixed;
    width: 100%;
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
    position: relative;
    z-index: 2;
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
    bottom: -.4rem;
    left: 2%;
    width: 96%;
    height: 6.8rem;
    margin: 0 auto;
    background: url('../../../static/images/money-box.png') no-repeat center 100%;
    background-size: contain;
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
  .moneyBox img.example {
    animation: gyrate .8s 0s infinite alternate;
    -moz-animation: gyrate .8s 0s infinite alternate;
    -webkit-animation: gyrate .8s 0s infinite alternate;
    -o-animation: gyrate .8s 0s infinite alternate;
  }
  .countTimes {
    overflow: hidden;
    clear: both;
    font-size: .28rem;
    text-align: left;
    margin-top: .3rem;
    font-weight: bold;
    height: .6rem;
  }
  #clock {
    width: 19%;
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
    line-height: .8rem;
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
    line-height: .8rem;
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
    z-index: 1;
  }
  .money-list li img {
    width: 100%;
    height: 100%;
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
