<template>
  <div class="lottery padding-b-3">
    <div class="lottery-wrap">
      <div class="draw-lottery">
        <p class="text-center ft-1p3">
          <span ng-if="isLogged">今日可抽奖次数：<span class="draw-count">{{drawCount}}</span>次</span>
        </p>
        <!-- 抽奖转盘 1, "当日加息"" ; 2, "现金奖励 ; 3, "加息券 ; 4, "现金券" ; 5, "特权本金" ; 6, "谢谢"-->
        <div class="lottery-box" id="js-rect-luck-draw-con">
          <div class="lottery-item js-item selecting" data-sort="1" data-prize-id="1">
            <img src="../../images/lottery/one-day-rate.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="2" data-prize-id="2">
            <img src="../../images/lottery/cash.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="3" data-prize-id="3">
            <img src="../../images/lottery/rate-coupon.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="8" data-prize-id="5">
            <img src="../../images/lottery/privilege.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-start-btn" @click="draw()">
            <img src="../../images/lottery/draw.png" alt="">
          </div>
          <div class="lottery-item js-item selecting" data-sort="4" data-prize-id="4">
            <img src="../../images/lottery/cash-coupon.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="7" data-prize-id="6">
            <img src="../../images/lottery/thanks.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="6" data-prize-id="1">
            <img src="../../images/lottery/one-day-rate.png" alt="">
            <span class="item-mask"></span>
          </div>
          <div class="lottery-item js-item selecting" data-sort="5" data-prize-id="5">
            <img src="../../images/lottery/privilege.png" alt="">
            <span class="item-mask"></span>
          </div>
        </div>
      </div>
    <div class="lottery-other">
        <p class="display-inb">活动规则</p>
        <p class="display-inb" @click="toLotteryRecord()">我的奖励</p>
      </div>
      <!-- 幸运用户 -->
      <div class="lucky-users">
        <img src="../../images/lottery/title-lucky-users.png" alt="" width="48%">
        <div class="lucky-users-wrap">
          <ul class="margin-b-0">
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得200000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
            <li class="text-justify"><span>恭喜153****5650</span>获得20000元特权本金</li>
          </ul>
        </div>
        <p class="text-center state" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</p>
      </div>
    </div>
  </div>
</template>
<script src="../../service/rect.luckdraw.js"></script>
<script>
  import {Utils} from '../../service/Utils'
  // import $ from 'jquery'
  // import {LuckDraw} from '../../service/rect.luckdraw.js'
  export default {
    name: 'lottery',
    data () {
      return {
        drawCount: 0,
        isiOS: true,
        prizeList: {},
        token: '9c438068699b1c092f2e65895feebaba8bc575a4dec742dd'
      }
    },
    created: function () {
      this.isiOS = Utils.isIos()
      this.token = this.$route.query.token
      console.log(this.token)
    },
    methods: {
      draw: function () {
        var that = this
        // var rld = RectLuckDraw('#js-rect-luck-draw-con', this.prizeList, {
        //   turnAroundCount: 5,
        //   maxAnimateDelay: 400,
        //   turnStartCallback: function () {
        //     alert('摇奖开始...')
        //   },
        //   turnEndCallback: function (prizeId, obj) {
        //     setTimeout(function () {
        //       that.drawCount = that.drawCount - 1
        //     }, 300)
        //   },
        //   startBtnClick: function ($btn) {
        //     if (this.isLocked()) {
        //       return
        //     }
        //   },
        //   onLock: function () {
        //     alert('锁上了')
        //   },
        //   onUnlock: function (obj) {
        //     alert('解锁了')
        //   }
        // })
        that.$http.post('/hongcai/rest/lotteries/draw', {})
        .then(function (response) {
          var receivePrize = response
          that.prizeId = receivePrize.prizeType || 1
          // rld.start(that.prizeId)
          // switch (receivePrize.prizeType) {
          //   case 1:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '当日加息',
          //       prizeValue: '+' + receivePrize.value + '%',
          //       prizeCont: '奖励已自动生效，成功为您加息！'
          //     }
          //     break
          //   case 2:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '返现',
          //       prizeValue: receivePrize.value + '元',
          //       prizeCont: '奖励已发放至您的账户，前往“我的”页面即可查看！'
          //     }
          //     break
          //   case 3:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '加息券',
          //       prizeValue: '+' + receivePrize.value + '%',
          //       prizeCont: '奖励已发放至您的账户，前往“我的-加息券”即可查看！'
          //     }
          //     break
          //   case 4:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '现金券',
          //       prizeValue: Number(receivePrize.value).toFixed(0) + '元',
          //       prizeCont: '奖励已发放至您的账户，前往“我的-现金券”即可查看！'
          //     }
          //     break
          //   case 5:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '(有效期1天)',
          //       prizeValue: Number(receivePrize.value).toFixed(0) + '元特权本金',
          //       prizeCont: '奖励已发放至您的账户，前往“我的-特权本金”即可查看！'
          //     }
          //     break
          //   case 6:
          //     that.prizeList = {
          //       prizeType: receivePrize.prizeType,
          //       prizeText: '谢谢',
          //       prizeValue: receivePrize.value,
          //       prizeCont: '什么都木有赚到，换个姿势再试一次吧～'
          //     }
          //     break
          // }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      toLotteryRecord: function () {
        if (!this.token || this.token === '') {
          // 跳转native登录
          return
        }
        this.$router.push({name: 'LotteryRecord', query: { token: this.token }})
      }
    }
  }
</script>
<style scoped>
  .lottery{
    font-family: "微软雅黑" !important;
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
    -webkit-user-select:none; /*webkit浏览器*/   
    -khtml-user-select:none; /*早期浏览器*/   
    -moz-user-select:none;/*火狐*/   
    -ms-user-select:none; /*IE10*/   
    user-select:none;   
  }
  .lottery .lottery-wrap {
    background: url('../../images/lottery/lottery-bg.jpg') 0 0 no-repeat;
    background-size: cover;
    padding-top: .6rem;
  }
  /*转盘部分*/
  .lottery .lottery-wrap .draw-lottery {
    background: url(../../images/lottery/draw-bg1.png) -0.05rem 0 no-repeat;
    height: .8rem;
    width: 97%;
    margin: 0 auto;
    background-size: 100% 100%; 
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box {
    width: 92%;
    margin: 0 auto;
    text-align: center;
    padding-top: .88rem;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item {
    display: inline-block;
    width: 25%;
    position: relative;
  }
  /*每种奖励上的蒙层*/
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item .item-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    border-radius: .1rem;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .selecting .item-mask {
    display: none;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item img{
    width: 100%;
    display: block;
  }

  /*活动规则、我的奖励*/
  .lottery .lottery-wrap .lottery-other {
    width: 94%;
    margin: .24rem auto .85rem;
    text-align: center;
  }
  .lottery .lottery-wrap .lottery-other p {
    width: 40%;
    height: .8rem;
    border-radius: .1rem;
    line-height: .8rem;
    font-size: .4rem;
  }
  .lottery .lottery-wrap .lottery-other p:first-child {
    color: #046151;
    margin-right: .3rem;
    background: url(../../images/lottery/rule-btn.png) no-repeat;
    background-size: 100% 100%;
  }
  .lottery .lottery-wrap .lottery-other p:last-child {
    color: #564705;
    background: url(../../images/lottery/reward-btn.png) no-repeat;
    background-size: 100% 100%;
  }
  /*幸运用户*/
  .lottery .lottery-wrap .lucky-users {
    background-color: #fbd942;
    padding-bottom: .3rem;
  }
  .lottery .lottery-wrap .lucky-users img{
    display: block;
    margin: .24rem auto;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap {
    width: 92%;
    margin: 0 auto;
    padding: 0.02rem .2rem;
    background: #f7d25e;
    border: 0.26rem solid #edcd40;
    border-radius: .24rem;
    height: 33rem;
    overflow-y: hidden;
    position: relative;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap li{
    color: #000;
    margin-bottom: .23rem;
  }

  /*中奖弹窗*/
  .showDrawBox {
    display: none;
  }
  .draw-box {
    text-align: center;
  }
  .draw-box .receive-draw {
    text-align: center;
    padding: 22% 0 4rem;
    display: none;
  }
  .draw-box .receive-draw .getPrize {
    background: url('../../images/lottery/receive-draw-02.png') no-repeat center center;
    background-size: contain;
    height: 20rem;
    padding-top: 11.6rem;
    margin-top: .5rem;
  }
  .draw-box .receive-draw .getPrize p {
    color: #fc7371;
    margin-bottom: 0;
    line-height: 1.8rem;
  }
  .draw-box .receive-draw .prize-effect {
    color: #fff;
    font-size: 1.4rem;
    margin: 2rem 0 1.4rem;
  }
  .draw-box .upper-limit {
    padding: 40% 0 4rem;
    display: none;
  } 
  .draw-box .usedAndcanShare {
    padding: 40% 0 7rem;
    display: none;
  }
  /*规则弹窗*/
  .rule-box {
      padding: 20% 3.2rem 4rem;
  }
  .rule-box .rule-title {
    position: relative;
  }
  .rule-box .rule-title .hongcai-portrait {
    position: absolute;
    top: -2.56rem;
    left: 27%;
  }
  .rule-box .rule-bg {
    height: 34rem;
    overflow: auto;
    background: url('../../images/lottery/rule-bg.png') no-repeat center center;
    background-size: contain;
  }
  .rule-box .rule-bg .rule-content {
    height: 24.5rem;
      position: relative;
      top: 4rem;
      padding: 0 4rem;
      overflow: auto;
  }
  .rule-box .rule-bg .rule-content p {
    margin-bottom: 1.2rem;
    color: #fff;
    font-size: 1.4rem;
    text-align: justify;
  }
  .state {
    font-size: .2rem;
    color: #000;
    margin: 0.7rem 0 0;
  }
  @media(min-width: 320px) {
    .lottery .lottery-wrap {
      padding-top: 1.5rem;
      height: 15rem;
    }
    .lottery .lottery-wrap .draw-lottery {
      height: 7.6rem;
    }
    .lottery .lottery-wrap .draw-lottery p {
      height: 1.3rem;
      line-height: 2.4rem;
      margin-bottom: 0;
      color: #222;
    }
    .lottery .lottery-wrap .draw-lottery .draw-count {
      font-size: .37rem;
      margin-right: .1rem;
      color: #f5fb60;
    }
    .lottery .lottery-wrap .draw-lottery .lottery-box {
        padding-top: .88rem;
    }
    .lottery .lottery-wrap .lucky-users .lucky-users-wrap {
      height: 5.5rem;
    }
    .lottery .lottery-wrap .lucky-users .lucky-users-wrap li{
      font-size: .24rem;
      margin-bottom: 0;
      height: .5rem;
      line-height: .5rem;
    }
    .lottery .lottery-wrap .lucky-users .lucky-users-wrap li span{
      display: inline-block;
      width: 46%;
      /*margin-right: 5%;*/
    }
    .about-background, .bank-custody, .risk-safety ul li {
      width: 92%;
    }
    .rule-box {
      padding: 20% 3.2rem 1rem;
    }
    .rule-box .rule-bg {
      height: 30rem;
    }
    .rule-box .rule-bg .rule-content {
      height: 21rem;
        top: 4rem;
        padding: 0 4rem;
    }
    .rule-box .rule-title .hongcai-portrait {
      top: -2.6rem;
    }
    .draw-box .receive-draw {
      padding: 22% 0 2rem;
    }
  }
</style>
