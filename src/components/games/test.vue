<template>
    <div style='background-color: #blue'>
      <canvas id='stage' width='300' height='300'></canvas>
    </div>
  </template>
  <script>
    // import create from 'createjs'
    import {Utils} from '../../service/Utils.js'
    export default {
      name: 'gameCouting',
      data () {
        return {
          W: 640,
          H: 1E3,
          IS_TOUCH: null,
          IS_ANDROID: Utils.isAndroid(),
          SCREEN_SHOW_ALL: true,
          qipaStage: {},
          qipaApp: {
            score: 100
          }
        }
      },
      created () {
      },
      mounted () {
        var createjs = window.create || createjs
          // 设置画布宽高
        var that = this;
        function setCanvasSize() {
          var c = that.qipaStage.stage.canvas,
          k = window.innerWidth,
          b = window.innerHeight
          if (!0) k / b > that.W / that.H ? k = that.W * b / that.H : b = that.H * k / that.W,
          c.style.marginTop = 0
          else {
            var d = that.W * b / that.H
            k >= d ? (k = d, stage.x = 0) : stage.x = (k - d) / 2
          }
          c.width = that.W
          c.height = that.H
          c.style.width = k + 'px'
          c.style.height = b + 'px'
        }
        var l = null,
        d,
        f = null,
        g = null,
        e = null,
        h = null;
        that.qipaStage.stage = null
        that.qipaStage.queue = null
        that.qipaStage.init = function(c) {
          console.log(that.qipaStage)
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
        window.onload = function() {
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
          setTimeout(setCanvasSize, 100);
          createjs.Ticker.on("tick", that.qipaStage.stage);
          that.qipaStage.queue.on("complete", h.startFunc, null, !0);
          // h = c是图片集合， that.qipaStage.init调用时赋值
          h.img && that.qipaStage.queue.loadManifest(h.img, !1);
          h.audio && (that.IS_ANDROID ? that.qipaStage.queue.loadFile({
            id: "sound",
            src: "../../../static/audio/count.mp3"
          }) : (createjs.Sound.alternateExtensions = ["ogg"], that.qipaStage.queue.installPlugin(createjs.Sound), that.qipaStage.queue.loadManifest(h.audio, !1)));
          h.noshare || that.qipaStage.queue.loadManifest({
            path: "../../../static/images/",
            manifest: [{
              src: "share_tip.png",
              id: "share_tip"
            }]
          },
          !1);
          h.followed || that.qipaStage.queue.loadManifest({
            path: "../../../static/images/",
            manifest: [{
              src: "follow_anim.png",
              id: "follow"
            }]
          },
          !1);
          that.qipaStage.queue.load()
        };
        window.onresize = setCanvasSize;
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
        var qp_b = 30,
        qp_c, qp_d = 5,
        qp_e = 3,
        qp_f = qp_e,
        qp_g = 420,
        qp_h = 0,
        qp_i = [],
        qp_j = 20,
        qp_k = 0,
        qp_l,
        qp_m = 0,
        qp_n = 0,
        qp_o = 0;
        function genRandom(a) {
          return parseInt(Math.random() * a)
        }
        /** 
        ** qQp_A 画出钞票
        **/
        function Qp_A() {
          this.initialize();
          this.mb = new createjs.Bitmap(that.qipaStage.queue.getResult("mb0"));
          this.mb.regX = this.mb.getBounds().width / 2;
          this.mb.regY = this.mb.getBounds().height / 2;
          this.mb.y = qp_g;
          this.x = that.W / 2;
          this.y = that.H / 2 - 150;
          this.addChild(this.mb);
  
          this.m = [];
          for (var a = 0; 3 >= a; a++) this.m[a] = new createjs.Bitmap(that.qipaStage.queue.getResult("m0")),
          this.m[a].regX = this.m[a].getBounds().width / 2,
          this.m[a].regY = this.m[a].getBounds().height / 2,
          this.m[a].y = qp_g,
          this.m[a].visible = !1,
          this.addChild(this.m[a]);
  
          for (a = 0; a <= qp_e; a++) this.m[a].image = that.qipaStage.queue.getResult("m0");
          for (a = 0; a < qp_c.length; a++) for (var b = 0; b < qp_c[a].length; b++) qp_c[a][b].image = that.qipaStage.queue.getResult("d0")
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
        ** qQp_B 画出倒计时 和 已数钱数
        **/
        function Qp_B() {
          this.initialize();
          this.tmbg = new createjs.Bitmap(that.qipaStage.queue.getResult("tmbg"));
          this.tmbg.x = (that.W - this.tmbg.getBounds().width) / 2;
          this.tmbg.y = 30;
          this.addChild(this.tmbg);
          this.sum = new createjs.Text("\uffe5" + that.qipaApp.score, "bold 46px Arial", "yellow");
          this.sum.textAlign = "center";
          this.sum.textBaseline = "middle";
          this.sum.x = that.W / 2;
          this.sum.y = this.tmbg.y + this.tmbg.getBounds().height / 2;
          this.addChild(this.sum);
          this.tmbg1 = new createjs.Bitmap(that.qipaStage.queue.getResult("tmbg"));
          this.tmbg1.scaleX = 0.7;
          this.tmbg1.x = (that.W - 0.7 * this.tmbg.getBounds().width) / 2;
          this.tmbg1.y = this.tmbg.y + this.tmbg.getBounds().height + 15;
          this.addChild(this.tmbg1);
          this.tmicon = new createjs.Bitmap(that.qipaStage.queue.getResult("tmicon"));
          this.tmicon.x = this.tmbg1.x + 14;
          this.tmicon.y = this.tmbg1.y + 14;
          this.addChild(this.tmicon);
          this.txt = new createjs.Text(qp_n + '"', "bold 44px Arial", "white");
          this.txt.textAlign = "center";
          this.txt.textBaseline = "middle";
          this.txt.x = that.W / 2 + this.tmicon.getBounds().width / 2;
          this.txt.y = this.tmbg1.y + this.tmbg1.getBounds().height / 2;
          this.addChild(this.txt)
        }
        Qp_B.prototype = new createjs.Container;
        /** 
        ** qQp_C 游戏结束重新开始／分享／排行弹窗
        **/
        function Qp_C() {
          this.initialize();
          var a = new createjs.Shape,
          b = that.qipaStage.queue.getResult("dlgbg");
          a.setBounds(0, 0, that.W, b.height);
          a.graphics.bf(b).r(0, 0, that.W, b.height);
          this.addChild(a);
          b = new createjs.Bitmap(that.qipaStage.queue.getResult("start"));
          b.x = 40;
          b.y = a.y + a.getBounds().height - 160;
          b.on("click",
          function(a) {
            qp_p();
            that.qipaStage.stage.gameover.visible = !1
          });
          var c = new createjs.Bitmap(that.qipaStage.queue.getResult("rank"));
          c.x = that.W / 2;
          c.y = b.y;
          c.regX = c.getBounds().width / 2;
          c.on("click",
          function(a) {
            clickMore();
          });
          var d = new createjs.Bitmap(that.qipaStage.queue.getResult("share"));
          d.x = that.W - 40;
          d.y = b.y;
          d.regX = c.getBounds().width;
          d.on("click",
          function(a) {
            that.IS_TOUCH && a.nativeEvent instanceof MouseEvent || dp_share()
          });
          this.addChild(b);
          this.addChild(c);
          this.addChild(d);
          this.scoreText = new createjs.Text("", "bold 50px Arial", "#fff");
          this.scoreText.textAlign = "center";
          this.scoreText.x = that.W / 2;
          this.scoreText.y = a.y + 50;
          this.addChild(this.scoreText);
          this.shareText = new createjs.Text("", "38px Arial", "#eee");
          this.shareText.textAlign = "center";
          this.shareText.x = that.W / 2;
          this.shareText.y = this.scoreText.y + 95;
          this.addChild(this.shareText)
        }
        Qp_C.prototype = new createjs.Container;
        Qp_C.prototype.refresh = function() {
          this.scoreText.text = "\uffe5" + that.qipaApp.score;
          // this.shareText.text = 0 < that.qipaApp.score ? qipaShare.desc.replace("\u6bd4", "\n\u6bd4").replace("\u6211\u662f", "\n\u6211\u662f") : ""
        };
        /** 
        ** Qp_x 游戏开始
        **/
        function Qp_x() {
          this.initialize();
          this.bg = new createjs.Shape;
          this.bg.graphics.beginFill("#559966").drawRect(0, 0, that.W, that.H);
          this.addChild(this.bg);
          this.label = new createjs.Bitmap(that.qipaStage.queue.getResult("splashtitle"));
          this.label.x = (that.W - this.label.getBounds().width) / 2;
          this.label.y = 100;
          this.addChild(this.label);
          this.start = new createjs.Bitmap(that.qipaStage.queue.getResult("mb0"));
          this.start.y = that.H - 300;
          this.start.x = (that.W - this.start.getBounds().width) / 2;
          this.addChild(this.start);
          this.arrow = new createjs.Bitmap(that.qipaStage.queue.getResult("starttip"));
          this.arrow.y = that.H - 400;
          this.arrow.x = (that.W - this.arrow.getBounds().width) / 2;
          this.addChild(this.arrow);
          var a, b;
          this.start.on("mousedown",
          function(c) {
            if (0 == qp_o) {
              (a = c.localY, b = that.H - 300)
            }
          });
          this.start.on("pressmove",
          function(c) {
            if (0 == qp_o) { 
              SplashPressmoveEvent(c.localY - a, b) 
            }
          });
          this.start.on("pressup",
          function(b) {
            if (0 == qp_o && 30 > a - b.localY) {
               createjs.Sound.play("count", !0), createjs.Tween.get(that.qipaStage.stage.splash.start).to({
              y: -that.H
            }, 400).call(function(a) {
              that.qipaStage.stage.splash.arrow.visible = !1;
              qp_p();
              that.qipaStage.stage.splash.visible = !1
            })
            }
          })
        }
        Qp_x.prototype = new createjs.Container;
        function SplashPressmoveEvent(a, b) {
          that.qipaStage.stage.splash.start.y + a < b && (that.qipaStage.stage.splash.start.y += a)
        }
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
          qp_F < qp_e ? qp_F++:qp_F = 0
        }
        /** 
        ** Qp_x 背景钞票动画
        **/
        function qp_p() {
          that.qipaStage.stage.arrow.visible = !0;
          var qp_q = that.qipaApp.score = 0;
          qp_n = qp_b;
          qp_m = -1;
          that.qipaStage.stage.num.txt.text = qp_n + '"';
          qp_k = 0;
          qp_o = 1;
          // that.qipaApp.onGameStarted()
          that.qipaStage.showFollowAnim(!1)
        }
        /** 
        ** qp_t 钞票随手势平滑滑出
        **/
        function qp_t() {
          qp_o = 3;
          qp_l = setTimeout(function() {
            window.clearTimeout(qp_l)
          },
          900);
          qp_u();
          // that.qipaApp.onNewScore(that.qipaApp.score);
          // that.qipaApp.onGameOver();
          that.qipaStage.showFollowAnim(!0)
          that.qipaStage.stage.gameover.visible = !0;
          that.qipaStage.stage.gameover.refresh()
        }
        /** 
        ** qp_s 隐藏游戏开始箭头图标
        **/
        function qp_s() {
          that.qipaStage.stage.arrow.visible = !1;
          qp_m = 0
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
        /** 
        ** qp_z 游戏结束分享弹窗
        **/
        function qp_u() {
          // alert('游戏结束：获得分数' + that.qipaApp.score)
          // qipaShare.title = "\u6570\u94b1\u6570\u5230\u624b\u62bd\u7b4b\uff01\u4f60\u662f\u6570\u94b1\u9ad8\u624b\u5417\uff1f";
          // if (0 == qipaApp.score) qipaShare.desc = qipaShare.title;
          // else {
          //   var a = parseInt(Math.sqrt(1E4 * qipaApp.score / 17E3));
          //   99 < a && (a = "99.9");
          //   qipaShare.title = "\u6211\u6570\u4e86\uffe5" + qipaApp.score + "\uff0c\u6bd4" + a + "%\u7684\u4eba\u6709\u94b1\uff01\u6211\u662f" + (5E3 > qipaApp.score ? "\u5c4c\u4e1d": 1E4 > qipaApp.score ? "\u8d2b\u519c": 15E3 > qipaApp.score ? "\u5bcc\u519c": 2E4 > qipaApp.score ? "\u571f\u8c6a": 25E3 > qipaApp.score ? "\u7164\u8001\u677f": "\u8d44\u672c\u5bb6") + "\u3002"
          // }
          // dp_submitScore(qipaApp.score);
        }
        /** 
        ** qp_w 画出画布颜色
        **/
        function qp_w() {
          var a = new createjs.Shape;
          a.graphics.beginFill("#ff0000").drawRect(0, 0, that.W, that.H);
          that.qipaStage.stage.addChild(a);
          var b = new createjs.Shape;
          b.graphics.beginFill("white").rect(0, 200, that.W, that.H);
          a.hitArea = b;
          var c = 0,
          d = 0;
          a.on("mousedown",
          function(a) {
            c = a.localY;
            d = that.qipaStage.stage.player.m[qp_f].y;
          });
          a.on("pressmove",
          function(e) {
            //  (1 == qp_o && (qp_s(), qp_o = 2), 2 == qp_o && (that.qipaStage.stage.player.m[qp_f].visible = !0, that.qipaStage.stage.player.m[qp_f].y += (a.localY - c) / 1.5))
             if (1 == qp_o) {
               qp_s(), 
               qp_o = 2
               console.log(1)
             }
             if (2 == qp_o) {
              console.log(2)
              that.qipaStage.stage.player.m[qp_f].visible = !0;
              if (!that.qipaStage.stage.player.m[qp_f].y) {
                that.qipaStage.stage.player.m[qp_f].y = 420;
              }
              that.qipaStage.stage.player.m[qp_f].y += (e.localY - c) / 1.5
              // console.log('c----:' + that.qipaStage.stage.player.m[qp_f].y);
             }
          });
          var f = 0;
          a.on("pressup",
          function(a) {
             2 != qp_o || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (qp_k++, that.qipaApp.score += 100, that.qipaStage.stage.player.playAnimation(that.qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0)) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), that.qipaStage.stage.player.m[qp_f].visible = !1))
          });
          qp_c = [];
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
          that.qipaStage.stage.player = new Qp_A;
          that.qipaStage.stage.addChild(that.qipaStage.stage.player);
          that.qipaStage.stage.num = new Qp_B;
          that.qipaStage.stage.num.y = 30;
          that.qipaStage.stage.addChild(that.qipaStage.stage.num);
          that.qipaStage.stage.arrow = new createjs.Bitmap(that.qipaStage.queue.getResult("starttip"));
          that.qipaStage.stage.arrow.x = (that.W - that.qipaStage.stage.arrow.getBounds().width) / 2;
          that.qipaStage.stage.arrow.y = 290;
          that.qipaStage.stage.arrow.visible = !1;
          that.qipaStage.stage.addChild(that.qipaStage.stage.arrow);
          that.qipaStage.stage.gameover = new Qp_C;
          that.qipaStage.stage.gameover.x = 0;
          that.qipaStage.stage.gameover.y = 260;
          that.qipaStage.stage.gameover.visible = !1;
          that.qipaStage.stage.addChild(that.qipaStage.stage.gameover);
          that.qipaStage.stage.splash = new Qp_x;
          that.qipaStage.stage.addChild(that.qipaStage.stage.splash);
          setInterval(qp_D, 1E3);
          createjs.Ticker.addEventListener("tick",
          function(a) {
            0 <= qp_m && (qp_m += a.delta, a = 30 - parseInt(qp_m / 1E3), a != qp_n && (qp_n = a, that.qipaStage.stage.num.txt.text = qp_n + '"'), 0 >= qp_n && (qp_m = -1, qp_t()));
            that.qipaStage.stage.num.sum.text = "\uffe5" + that.qipaApp.score
          })
        }
        function qp_v(a) {
          that.IS_ANDROID && (createjs.Sound.registMySound("count", 0), createjs.Sound.registMySound("silenttail", 0.25));
          qp_w()
        }
        var _cfg = {
          startFunc: qp_v,
          img: {
            path: "../../../static/images/",
            manifest: [{
              src: "m0.png",
              id: "m0"
            },
            {
              src: "mb0.png",
              id: "mb0"
            },
            {
              src: "d0.png",
              id: "d0"
            },
            {
              src: "starttip.png",
              id: "starttip"
            },
            {
              src: "tmbg.png",
              id: "tmbg"
            },
            {
              src: "splashtitle.png",
              id: "splashtitle"
            },
            {
              src: "tmicon.png",
              id: "tmicon"
            },
            {
              src: "start.png",
              id: "start"
            },
            {
              src: "rank.png",
              id: "rank"
            },
            {
              src: "share.png",
              id: "share"
            },
            {
              src: "dlgbg.png",
              id: "dlgbg"
            }]
          },
          audio: {
            path: "../../../static/audio/",
            manifest: [{
              src: "count.mp3",
              id: "count"
            }]
          }
        };
        that.qipaStage.init(_cfg)
        that.qipaApp = {
          // onGameStarted: that.qipaStage.showFollowAnim(!1),
          // onGameOver: that.qipaStage.showFollowAnim(!0)
        }
      },
      methods: {
      }
    }
  </script>
