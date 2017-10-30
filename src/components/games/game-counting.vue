<template>
  <div class="gameCounting" v-auto-height v-load>
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
    <!-- <div class="moneyBox">
      <p class="i-know" @click="closeFirstAndStart">我知道了</p>
      <ul class="money-list">
        <li class="nextMoney">
          <img src="../../../static/images/money-100.png" alt="">
        </li>
        <li v-bind:draggable="false" class="slideMoney" @touchstart="startTouchScroll($event)" @touchmove="moveTouchScroll($event)" @touchend="endTouchScroll($event)"  v-bind:style="{ top: moneyTop + 'rem' }">
          <img v-bind:draggable="false" src="../../../static/images/money-100.png" alt="">
        </li>
      </ul>
    </div> -->
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
            <li @click="getGameCounts">再玩一次</li>
          </ul>
        </div>
        <div class="NoReward" v-if="rewardMoney <= 0">
          <img src="../../images/singles-day/emoji-04.png" width="25%">
          100块都没数到...
          <div class="startAginBtn" @click="getGameCounts">再玩一次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil, audioPlayUtil, Utils} from '../../service/Utils'
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
        gameCounts: 5,
        countNum: 0, // 数了几张
        number: '', // 钞票配置number
        gameType: Number(this.$route.params.gameType), // 2: 试玩
        isPlay: this.$route.query.isPlay,
        activityType: this.$route.query.act,
        HandList: [],
        num: null,
        qianTop: 0,
        qianBottom: 20,
        qianMiddle: 10,
        rollSpeed: 5, // 背景滚动的速度
        scrTimer: null, // 用于滚动背景的定时器
        updateTimer: null, // 更新时间的定时器
        moneyTop: 0, // 钱的top属性值
        moneyBg1: [],
        moneyBg2: [],
        moneyBgCount: 2, // qp_d背景图个数
        qp_e: 3,
        qipaStage: {},
        qipaApp: {
          score: 100
        },
        W: 640,
        H: 1E3,
        IS_TOUCH: null,
        IS_ANDROID: Utils.isAndroid(),
        SCREEN_SHOW_ALL: true,
        gameStatus: 1,
        qp_m: 0,
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
              src: "money-box.png",
              id: "box"
            },
            {
              src: "money-100.png",
              id: "mb0"
            },
            {
              src: "money-bg05.png",
              id: "d0"
            },
            {
              src: "money-bg06.png",
              id: "d1"
            }]
          },
          audio: {
            path: "../../../static/audio/",
            manifest: [{
              src: "count.mp3",
              id: "count"
            }]
          }
        }
      }
    },
    watch: {
      showFirst: function (newVal, oldVal) {
        document.getElementsByClassName('moneyBox')[0].style.zIndex = newVal ? 3 : 0
        document.getElementsByClassName('i-know')[0].style.zIndex = newVal ? 9 : 0
        newVal ? $('.money-list li').addClass('example') : $('.money-list li').removeClass('example')
      }
    },
    props: ['token'],
    created () {
      // this.getGameCounts()
      window.vue = this
    },
    directives: {
      'load': {
        inserted: function (el) {
        }
      }
    },
    mounted () {
      if (this.showFirst) {
        $('.moneyBox img').addClass('example')
      } else {
        $('.moneyBox img').removeClass('example')
      }
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
      that.qipaStage.init = function(c) {
        function qp_w() {
          that.IS_ANDROID && (createjs.Sound.registMySound("count", 0), createjs.Sound.registMySound("silenttail", 0.25));
          var a = new createjs.Shape;
          a.graphics.beginFill("#fbdc34").drawRect(0, 0, that.W, that.H);
          that.qipaStage.stage.addChild(a);
          var b = new createjs.Shape;
          b.graphics.beginFill("white").rect(0, 200, that.W, that.H);
          a.hitArea = b;
          var c = 0,
          d = 0;
          a.on("mousedown", function(a) {
            console.log(that.HandList[that.countNum])
            c = a.localY;
            d = that.qipaStage.stage.player.m[qp_f].y;
            that.qipaStage.stage.player = new Qp_A(that.HandList[that.countNum])
            that.qipaStage.stage.addChild(that.qipaStage.stage.player)
          });
          a.on("pressmove", function(e) {
            //  (1 == that.gameStatus && (qp_s(), that.gameStatus = 2), 2 == that.gameStatus && (that.qipaStage.stage.player.m[qp_f].visible = !0, that.qipaStage.stage.player.m[qp_f].y += (a.localY - c) / 1.5))
             if (1 == that.gameStatus) {
                that.qp_m = 0, 
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
            // if(that.second === 0) {return}
             2 != that.gameStatus || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (that.qipaStage.stage.player.playAnimation(that.qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0), that.rewardMoney += that.HandList[that.countNum], that.countNum++) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), that.qipaStage.stage.player.m[qp_f].visible = !1))
          });
          qp_c = [];
          qp_c1 = [];
          for (a = 0; a <= qp_e; a++) for (qp_c[a] = [], b = 0; b < qp_d; b++) {
            var e = new createjs.Bitmap(that.qipaStage.queue.getResult("d0"));
            e.regX = e.getBounds().width / 2;
            e.regY = e.getBounds().height / 2;
            e.x = genRandom(that.W);
            e.y = -that.H / 2 + genRandom(that.H);
            e.visible = !1;
            qp_c[a].push(e);
            that.qipaStage.stage.addChild(qp_c[a][b])
          }
          for (c = 0; c <= qp_e; c++) for (qp_c1[c] = [], d = 0; d < qp_d; d++) {
            var e1 = new createjs.Bitmap(that.qipaStage.queue.getResult("d1"));
            e1.regX = e1.getBounds().width / 2;
            e1.regY = e1.getBounds().height / 2;
            e1.x = genRandom(that.W);
            e1.y = -that.H / 2 + genRandom(that.H);
            e1.visible = !1;
            qp_c1[c].push(e1);
            that.qipaStage.stage.addChild(qp_c1[c][d])
          }
          that.qipaStage.stage.player = new Qp_A(that.HandList[0]);
          that.qipaStage.stage.addChild(that.qipaStage.stage.player);
          setInterval(qp_D, 1E3);
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
        that.images.audio && (that.IS_ANDROID ? that.qipaStage.queue.loadFile({
          id: "sound",
          src: "../../../static/audio/count.mp3"
        }) : (createjs.Sound.alternateExtensions = ["ogg"], that.qipaStage.queue.installPlugin(createjs.Sound), that.qipaStage.queue.loadManifest(that.images.audio, !1)));
        that.images.noshare || that.qipaStage.queue.loadManifest({
          path: "../../../static/images/",
          manifest: [{
            src: "share_tip.png",
            id: "share_tip"
          }]
        },
        !1);
        that.images.followed || that.qipaStage.queue.loadManifest({
          path: "../../../static/images/",
          manifest: [{
            src: "follow_anim.png",
            id: "follow"
          }]
        },
        !1);
        that.qipaStage.queue.load()
        console.log('init')
        h = c
        if (that.IS_ANDROID) {
          createjs.Sound.play = function(c, b) {
            var e = that.qipaStage.queue.getResult('sound');
            e.currentTime = this.soundSprite[c];
            e.play();
            b != d && !0 == b && (null != l && (clearTimeout(l), l = null), l = setTimeout(function() {
              createjs.Sound.play('silenttail')
            },
            1E3))
          },
          createjs.Sound.registMySound = function(a, c) {
            this.soundSprite || (this.soundSprite = {});
            this.soundSprite[a] = c
          }
        }
      };
      window.onresize = that.setCanvasSize;
      createjs.DisplayObject.prototype.do_cache = function() {
        var a = this.getBounds();
        this.cache(a.x, a.y, a.width, a.height)
      };
      that.qipaStage.showFollowAnim = function(c) {
        if (!h.followed) {
          if (null == g) {
            var spriteSheet = new createjs.SpriteSheet({
              framerate: 10,
              images: [that.qipaStage.queue.getResult("follow")],
              frames: {
                width: 170,
                height: 150
              },
              animations: {
                show: [0, 4, !0]
              }
            });
            g = new createjs.Sprite(spriteSheet);
            g.y = that.H;
            g.name = "follow";
            g.on("click",
            function(a) {
              a.stopImmediatePropagation();
              that.IS_TOUCH && a.nativeEvent instanceof MouseEvent || window.open(APP_FOLLOW_URL)
            })
          } else that.qipaStage.stage.removeChild(g);
          that.qipaStage.stage.addChild(g);
          spriteSheet = g.getBounds();
          c ? (g.play(), createjs.Tween.get(g).to({
            regX: spriteSheet.width,
            regY: 0,
            visible: !0
          }).to({
            regX: 0,
            regY: spriteSheet.height
          },
          200)) : createjs.Tween.get(g).to({
            regX: spriteSheet.width,
            regY: 0
          },
          200).to({
            visible: !1
          }).call(function() {
            g.stop()
          })
        }
      };
      that.H = 960; // canvas画布高。
      function qp_a(a) {}
      var qp_c, qp_c1, qp_d = 2,
      qp_e = 3,
      qp_f = qp_e,
      qp_g = 400,
      qp_h = 0,
      qp_i = [],
      qp_j = 20,
      qp_l
      function genRandom(a) {
        return parseInt(Math.random() * a)
      }
      /** 
      ** qQp_A 画出钞票
      **/
      function Qp_A(money) {
        this.initialize();
        this.box = new createjs.Bitmap(that.qipaStage.queue.getResult("box"));
        this.box.regX = this.box.getBounds().width / 2;
        this.box.regY = this.box.getBounds().height / 3;
        this.box.scaleX = .86;
        this.box.scaleY = .86;
        this.box.y = 465;
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
        for (var a = 0; 3 >= a; a++) this.m[a] = new createjs.Bitmap(that.qipaStage.queue.getResult("m" + money)),
        this.m[a].regX = this.m[a].getBounds().width / 2,
        this.m[a].regY = this.m[a].getBounds().height / 2,
        this.m[a].scaleX = .9,
        this.m[a].scaleY = .8,
        this.m[a].y = qp_g,
        this.m[a].visible = !1,
        this.addChild(this.m[a]);
    
        // for (a = 0; a <= qp_e; a++) this.m[a].image = that.qipaStage.queue.getResult("m0");
        // for (a = 0; a < qp_c.length; a++) for (var b = 0; b < qp_c[a].length; b++) qp_c[a][b].image = that.qipaStage.queue.getResult("d0")
        // for (a = 0; a < qp_c1.length; a++) for (var b = 0; b < qp_c1[a].length; b++) qp_c1[a][b].image = that.qipaStage.queue.getResult("d1")
      }
      Qp_A.prototype = new createjs.Container;
      Qp_A.prototype.playAnimation = function(a) {
        a.visible = !0;
        createjs.Tween.get(a).to({
          scaleX: 0.5,
          scaleY: 0.5,
          y: -that.H
        },
        300).to({
          visible: !1,
          y: qp_g,
          scaleX: 1,
          scaleY: 1
        },
        0);
        0 < qp_f ? qp_f--:qp_f = qp_e
      };
      /** 
      ** qp_D 钞票随手势平滑滑出
      **/
      var qp_F = 0;
      function qp_D() {
        for (var a = 0; a < qp_d; a++) qp_c[qp_F][a].visible = !0,
        createjs.Tween.get(qp_c[qp_F][a]).to({
          y: that.H + qp_c[qp_F][a].getBounds().height / 2 + 100,
          rotation: 720 + genRandom(400),
          x: genRandom(that.W)
        },
        1E3 + genRandom(800)).to({
          visible: !1
        },
        10).to({
          x: genRandom(that.W),
          y: -that.H / 2 + genRandom(that.H / 2),
          rotation: 0
        },
        10);
        for (var a = 0; a < qp_d; a++) qp_c1[qp_F][a].visible = !0,
        createjs.Tween.get(qp_c1[qp_F][a]).to({
          y: that.H + qp_c1[qp_F][a].getBounds().height / 2 + 100,
          rotation: 720 + genRandom(400),
          x: genRandom(that.W)
        },
        1E3 + genRandom(800)).to({
          visible: !1
        },
        10).to({
          x: genRandom(that.W),
          y: -that.H / 2 + genRandom(that.H / 2),
          rotation: 0
        },
        10);
        qp_F < qp_e ? qp_F++:qp_F = 0
      }
      /** 
      ** qp_t 钞票随手势平滑滑出
      **/
      function qp_t() {
        that.gameStatus = 3;
        qp_l = setTimeout(function() {
          window.clearTimeout(qp_l)
        },900);
        that.qipaStage.showFollowAnim(!0)
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
        },
        20 * b)
      }
      that.getGameCounts()
    },
    components: {
    },
    methods: {
      /** 
      ** Qp_x 背景钞票动画
      **/
      qp_p () {
        console.log(this.qipaStage)
        var qp_q = this.qipaApp.score = 0;
        this.qp_m = -1;
        this.countNum = 0;
        this.gameStatus = 1;
        this.qipaStage.showFollowAnim(!1)
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
      scrollBackground: function () {
        var that = this
        var createjs = window.create || createjs
        for (a = 0; a <= qp_e; a++) for (that.moneyBg1[a] = [], b = 0; b < 2; b++) {
          var e = new createjs.Bitmap(that.qipaStage.queue.getResult("d0"));
          e.regX = e.getBounds().width / 2;
          e.regY = e.getBounds().height / 2;
          e.x = genRandom(that.W);
          e.y = -that.H / 2 + genRandom(that.H);
          e.visible = !1;
          that.moneyBg1[a].push(e);
          that.qipaStage.stage.addChild(that.moneyBg1[a][b])
        }
        for (c = 0; c <= qp_e; c++) for (that.moneyBg2[c] = [], d = 0; d < 2; d++) {
          var e1 = new createjs.Bitmap(that.qipaStage.queue.getResult("d1"));
          e1.regX = e1.getBounds().width / 2;
          e1.regY = e1.getBounds().height / 2;
          e1.x = genRandom(that.W);
          e1.y = -that.H / 2 + genRandom(that.H);
          e1.visible = !1;
          that.moneyBg2[c].push(e1);
          that.qipaStage.stage.addChild(that.moneyBg2[c][d])
        }
      },
      // 更新时间
      updateTime: function () {
        this.second -= 1
        if (this.second === 0) {
          clearInterval(this.updateTimer)
        }
      },
      // 用于检测
      update: function () {
        if (this.moneyTop <= -13) {
          this.moneyTop = 0
          $('.slideMoney img').attr('src', '../../../static/images/money-' + this.HandList[this.countNum] + '.png')
          $('.nextMoney img').attr('src', '../../../static/images/money-' + this.HandList[this.countNum + 1] + '.png')
          clearInterval(this.moveMoneyTimer)
        }
        // 如果数钱游戏结束
        if (this.second <= 0) {
          // 关闭定时器
          clearInterval(this.scrTimer)
          clearInterval(this.updateTimer)
          clearInterval(this.moveMoneyTimer)
        }
      },
      toPriviledge () {
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3', this.isPlay)
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {}, null)
      },
      showOrhideBackBtn (status) { // 显示或隐藏返回按钮 0隐藏 1显示
        bridgeUtil.webConnectNative('HCNative_SetBackButtonStatus', undefined, {
          status: status
        }, function (res) {}, null)
      },
      goBack () {
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3', this.isPlay)
        this.$router.replace({name: 'gameStart', query: { act: this.activityType }})
      },
      startWarning (times) { // 高能预警倒计时
        var that = this
        if (!times) { // times 不传是点击再次开始要加音效
          audioPlayUtil.playOrPaused('../../static/audio/click.mp3', that.isPlay)
        }
        that.showOrhideBackBtn(0)
        that.rewardMoney = 0
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
              // if (that.gameType === 1) {
              //   that.updateGameCounts()
              // }
              setTimeout(function () {
                that.showWarning = false
                that.showMask = false
                that.warningText = 3
                that.second = 15
                that.countDown()
                that.updateTimer = setInterval(that.update, 1)
                that.qp_p();
              }, 1000)
            }
          }, 1000)
        }
      },
      getGameCounts () {
        var that = this
        that.countNum = 0
        that.HandList = []
        if (that.gameType === 1) { // 正式玩
          that.$http({
            method: 'post',
            url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.showFirst = true
              that.gameCounts = res.data.freeCount + res.data.count - res.data.usedCount
              res.data.usedCount === 0 ? that.showFirst = true : that.showFirst = false
              res.data.usedCount === 0 ? that.showWarning = false : that.showWarning = true
              if (that.showWarning) {
                that.startWarning()
              }
              that.getMoneyList(1)
            } else {
              console.log(res.data.msg)
            }
          })
        } else { // 试玩
          that.getMoneyList(2)
          that.showFirst = false
          that.startWarning(1)
        }
      },
      getMoneyList (type) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/countingKings/0/handSpeedConfig?token=' + that.token + '&type=' + type
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.gameCounts -= 1
            that.HandList = JSON.parse(res.data.deftHandValues)
            that.number = res.data.number
            that.qipaStage.init(that.images)
            $('.money-list li img').attr({'scr': '../../../static/images/money-' + that.HandList[0] + '.png'})
          } else {
            console.log(res.data.msg)
          }
        })
      },
      closeFirstAndStart () { // 关闭首次引导并开始
        audioPlayUtil.playOrPaused('../../static/audio/click.mp3', this.isPlay)
        document.getElementsByClassName('i-know')[0].style.zIndex = 0
        document.getElementsByClassName('moneyBox')[0].style.zIndex = 1
        this.showFirst = false
        this.startWarning(1)
      },
      showRewardMoney (elem, endVal, startVal, duration, decimal) { // 获得奖励自增动画
        var startTime = 0
        var dec = Math.pow(10, decimal)
        var progress, value
        function startCount (timestamp) {
          if (!startTime) startTime = timestamp
          progress = timestamp - startTime
          value = startVal + (endVal - startVal) * (progress / duration)
          value = (value > endVal) ? endVal : value
          value = Math.floor(value * dec) / dec
          $('#rewardMoney').html(value.toFixed(decimal))
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
            audioPlayUtil.playOrPaused('../../static/audio/tip.mp3', that.isPlay)
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
          that.showMask = true
          that.showReward = true
          that.showRewardMoney($('#rewardMoney'), that.rewardMoney, 0, 800, 0)
          if (that.rewardMoney >= 100) {
            audioPlayUtil.playOrPaused('../../static/audio/get.mp3', that.isPlay)
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
              audioPlayUtil.playOrPaused('../../static/audio/get.mp3', that.isPlay)
            }
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      startTouchScroll (event) {
        if (this.showFirst) {
          return
        }
        event.preventDefault()
        var touch = event.targetTouches[0]
        this.startPos = {x: touch.pageX, y: touch.pageY}
        $('.slideMoney').addClass('animate')
      },
      moveTouchScroll (event) {
        $('.slideMoney').removeClass('animate')
        this.offsetY = 0
        var touch = event.targetTouches[0]
        var endPos = {x: touch.pageX - this.startPos.x, y: touch.pageY - this.startPos.y}
        // isScrolling为1时，表示纵向滑动，0为横向滑动
        var isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0
        if (isScrolling === 1) {
          event.preventDefault()
        }
        this.offsetY += 0.25 * (event.targetTouches[0].pageY - window.touchStartY)
        window.touchStartY = event.targetTouches[0].pageY
        console.log(this.offsetY)
        if (this.offsetY < -1) {
          // $($('.money-list li')[index]).css('transform', 'translateY(-13rem)')
          // document.querySelector('.money-list li').style.webkitTransform = 'translateY(-13rem)'
        }
      },
      endTouchScroll (touchY) {
        var that = this
        console.log(that.offsetY)
        if (that.offsetY >= 0) {
          $('.slideMoney').removeClass('animate')
        } else if (this.offsetY < -2) {
          if (that.second > 0) {
            // $($('.money-list li')[index]).css('transform', 'translateY(-13rem)')
            // document.querySelector('.money-list li').style.webkitTransform = 'translateY(-13rem)'
            that.moveMoneyTimer = setInterval(function () {
              that.moneyTop -= 0.5
            }, 1)
            that.rewardMoney += that.HandList[that.countNum]
            that.countNum += 1
            audioPlayUtil.playOrPaused('../../static/audio/count.mp3', that.isPlay)
            console.log(that.HandList[that.countNum])
            console.log(that.countNum)
          }
        }
      }
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
  .moneyBox .money-list li img{
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
    position: absolute;
    /* z-index: 2; */
    bottom: -.8rem;
    left: 2.5%;
    width: 95%;
    height: 7.2rem;
    margin: 0 auto;
    /*background: url('../../images/singles-day/money-box.png') no-repeat center 91%;
    background-size: contain;*/
    z-index: 2;
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
