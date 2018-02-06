<template>
  <div class="FenTian">
    <div class="header position-re">
      <img src="../../images/fentian/main-header.png" alt="" width="100%">
      <p class="act-time position-ab">活动时间：{{activityInfo.startYear}}.{{activityInfo.startMonth}}.{{activityInfo.startDate}}至{{activityInfo.endYear}}.{{activityInfo.endMonth}}.{{activityInfo.endDate}}</p>
    </div>
    <div class="contents">
      <!-- 礼包 -->
      <div class="position-re carousel-mask">
        <div id="wrapper">
          <ul class="poster-list">
            <li v-for="(item, index) in gifts" :key="index">
              <span class="circle"></span>
              <img :src="'../../../static/images/level' + index + '.png'" alt="" class="display-bl name" width="32%">
              <div class="flag"><p>价值<span>RMB{{item.value}}</span></p></div>
              <div class="box1">
                <div class="box-son">
                  <div class="position-re">
                    <p class="position-ab num"><span>x{{item.num1}}</span></p>
                    <img :src="'../../../static/images/gift' + index + '-1.png'" alt="" class="display-bl margin-auto" :width="item.imgWidth">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x{{item.num2}}</span></p>
                    <img :src="'../../../static/images/gift' + index + '-2.png'" alt="" class="display-bl margin-auto" :width="item.imgWidth">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x{{item.num3}}</span></p>
                    <img :src="'../../../static/images/gift' + index + '-3.png'" alt="" class="display-bl margin-auto" :width="item.imgWidth">
                  </div>
                  <div class="position-re" v-if="item.num4">
                    <p class="position-ab num"><span>x{{item.num4}}</span></p>
                    <img :src="'../../../static/images/gift' + index + '-4.png'" alt="" class="display-bl margin-auto" :width="item.imgWidth">
                  </div>
                </div>
                <div class="box-son" v-if="index.type === 0">
                  <p class="gift-name">【时装兑换令牌】</p>
                  <p class="gift-name">【神器印记礼包】</p>
                  <p class="gift-name">【魔气结晶】</p>
                </div>
                <div class="box-son" v-if="item.type === 1">
                  <p class="gift-name">【典籍经典宝箱】&nbsp;&nbsp;【金宠随机包】<br>【随机神能宝箱】&nbsp;&nbsp;【坐骑兑换缰绳】</p>
                </div>
                <div class="box-son" v-if="item.type === 2">
                    <p class="gift-name">【9级宝石】&nbsp;&nbsp;【高级天机卷】<br>【金钥匙】&nbsp;&nbsp;&nbsp;&nbsp;【神器印记礼包】</p>
                </div>
              </div>
              <p class="text" v-if="item.type === 0 && item.cdkey === null">您已获得价值<span>RMB{{item.value}}</span>游戏礼包领取资格，通过银行存管认证后，即可获取礼包兑换码，数量有限，兑完即止哟～</p>
              <p class="text" v-if="item.type === 1 && item.cdkey === null">首投任意金额(不含债权转让类项目)即可获取价值<span>RMB{{item.value}}</span>游戏礼包</p>
              <p class="text" v-if="item.type === 2 && item.cdkey === null">活动期间，累计投资金额满5000元 (不含债权转让类项目)即可获取价值<span>RMB{{item.value}}</span>游戏礼包</p>
              <div class="gongxi" v-if="item.cdkey !== null">
                <p>恭喜您获得焚天{{item.giftName}}！</p>
                <p>奖励兑换码为</p>
                <p class="cdKey">{{item.cdkey}}</p>
              </div>
              <p class="take-btn" v-if="item.cdkey !== null" @click="copyCdkey(item.cdkey)">复制兑换码</p>
              <p class="take-btn" v-if="item.cdkey === null" @click="toTakeCdkey()">立即抢领</p>
            </li>
          </ul>
        </div>
      </div>
      <p class="tip">*本活动针对宏财精选及宏财尊贵项目，不含债权转让类项目</p>
      <div class="how">
        <img src="../../images/fentian/gift-header.png" alt="" width="90%" class="display-bl margin-auto">
        <div class="how-rule">
          获得的礼包可全渠道使用，兑换码永久有效；可在焚天游戏登录界面<span class="color-900">点击右上角进入【地图】>>点击左边【福】>>进入福利界面</span>，在兑换CDKEY处输入兑换码即可获得礼包内游戏道具。
        </div>
      </div>
      <img src="../../images/fentian/rule-header.png" alt="" width="55%" class="margin-auto">
      <div class="act-rules">
        <p>奖励数量有限，先到先得，兑完即止，赶快来参与吧；</p>
        <p>达标领取条件后，可返回此活动页面复制奖励兑换码，也可前往【我的】页面点击右上角>>进入【站内信】点击提醒>>查看兑换码及奖励信息；</p>
        <p>每个兑换码仅可兑换一次奖励，兑换成功后，奖励道具将自动发放至游戏背包中，因活动机会难得，道具珍贵抢手，每个游戏ID每种类别礼包奖励仅可通过相应兑换码兑换一次哟；</p>
        <p>如活动中发现用户涉及造假、作弊等行为，平台有权取消其获奖资格并冻结账号；</p>
        <p>在法律规定范围内，宏财网保留本活动最终解释权。</p>
      </div>
    </div>
    <p class="statement" v-if="isIos">该活动与设备生产商Apple Inc.公司无关</p>
  </div>
</template>
<script>
  import {Carousel} from '../../service/mCarousel'
  import {Utils, bridgeUtil} from '../../service/Utils'
  // import $ from 'zepto'
  export default {
    data () {
      return {
        isIos: Utils.isIos(),
        userAuth: {
          active: Boolean,
          authStatus: Number
        },
        activityInfo: {
          startYear: 2018,
          startMonth: 1,
          startDate: 1,
          endYear: 2018,
          endMonth: 1,
          endDate: 1
        },
        gifts: [
          {
            type: 0,
            value: 410,
            giftName: '初级礼包',
            num1: 1,
            num2: 1,
            num3: 2,
            imgWidth: '80%',
            cdkey: null
          },
          {
            type: 1,
            value: 1000,
            giftName: '中级礼包',
            num1: 3,
            num2: 1,
            num3: 1,
            num4: 1,
            imgWidth: '86%',
            cdkey: null
          },
          {
            type: 2,
            value: 2500,
            giftName: '高级礼包',
            num1: 1,
            num2: 5,
            num3: 2,
            num4: 2,
            imgWidth: '86%',
            cdkey: null
          }
        ]
      }
    },
    props: ['token'],
    created () {
      this.getActivityStatus()
      this.getCdkeys(0)
      this.getCdkeys(1)
      this.getCdkeys(2)
    },
    mounted () {
      this.setCarousel()
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          that.activityStatus = res.data.status
          var startTime = res.data.startTime
          var endTime = res.data.endTime
          that.activityInfo = {
            startYear: new Date(startTime).getFullYear(),
            startMonth: new Date(startTime).getMonth() + 1,
            startDate: new Date(startTime).getDate(),
            endYear: new Date(endTime).getFullYear(),
            endMonth: new Date(endTime).getMonth() + 1,
            endDate: new Date(endTime).getDate()
          }
        })
      },
      getCdkeys (type) { // 各等级领取状态查询
        var that = this
        that.$http('/hongcai/rest/activitys/fenTianCdkey?token=' + that.token + '&channelName=fentian' + '&cdKeyType=' + type)
        .then(function (res) {
          console.log(that.gifts[type].cdkey === null)
          res.status !== 200 ? that.gifts[type].cdkey = null : that.gifts[type].cdkey = res.data.cdkey
        })
      },
      setCarousel () { // 红包布局配置
        var that = this
        var wrapper = document.getElementById('wrapper')
        if (that.activityStatus !== 3) {
          Carousel.mCarousel(wrapper, {
            index: 0,
            active: 'active',
            scale: 0.67,
            duration: 300,
            locked: true,
            diff: 0.445,
            before: function () { // 动画执行中不可拆红包
              that.canTake = false
            },
            after: function () {
              that.canTake = true
            }
          })
        }
      },
      toTakeCdkey () {
        if (this.userAuth.active && this.userAuth.authStatus === 2) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
        } else {
          bridgeUtil.webConnectNative('HCNative_CheckUserAuth', null, {}, function (response) {}, null)
        }
      },
      copyCdkey (cdkey) {
        bridgeUtil.webConnectNative('HCNative_CopyText', null, {text: cdkey}, function (response) {}, null)
      }
    }
  }
</script>
<style scoped>
  .FenTian {
    overflow-x: hidden;
    background: #2a0d28;
    padding-bottom: .3rem;
  }
  #cdKey {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }
  .act-time {    
    top: 71%;
    left: 10%;
    color: #fff;
    font-size: .2rem;
  }
  .statement {
    color: #fff;
    font-size: .2rem;
    padding-top: .5rem;
    transform: scale(0.9)
  }
  .color-900 {
    color: #ff0900 !important;
  }
  .act-rules {
    padding: .9rem .2rem 0.2rem;
    text-align: justify;
    background-color: #fff9f9;
    border-radius: .1rem;
    width: 90%;
    margin: -0.5rem auto 0;
    opacity: 2;
  }
  .act-rules p {
    margin-bottom: .3rem;
    line-height: 1.7;
    letter-spacing: -0.4px;
    color: #531e1d;
    padding-left: .45rem;
    background: url('../../images/fentian/icon-rule.png') no-repeat 0 0;
    background-size: .33rem .33rem;
    font-size: .23rem;
  }
  .contents .tip {
    color: #fff;
    font-size: .2rem;
    margin: 2.5rem auto .5rem;
  }
  .how .how-rule {
    width: 86%;
    margin: -.2rem auto 0.9rem;
    padding: .7rem .4rem .4rem;
    text-align: justify;
    background-color: #fff2d5;
    border-radius: .1rem;
    font-size: .28rem;
    font-family: 'PingFang-SC';
    line-height: 1.38;
    letter-spacing: -0.6px;
    color: #531e1d;
  }
  #wrapper {
    height: 3.6rem;
    width: 100%;
  }
  .poster-list li {
    width: 75.6%;
    height: 5.8rem;
    border-radius: 10px;
    background-color: #fff9f9;
  }
  @media (max-height: 480px) {
    .poster-list li {
      height: 6rem;
    }
  }
  .poster-list li .red_bag_bg {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: .24rem;
    /* background: url('../../images/spring-festival/hongbao-3-min.png') no-repeat center center; */
    background-size: contain;
  }
  li .gongxi p:first-child {
    color: #531e1d;
    font-size: .23rem;
    margin: .1rem auto .15rem;
  }
  li .gongxi p:first-child + p {
    color: #531e1d;
  }
  li .gongxi p:last-child {
    margin-top: -.1rem;
    color: #ff0e00;
    font-size: .3rem;
  }
  li .circle {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #2a0d28;
    left: -.25rem;
    top: .6rem;
  }
  li .name {
    padding: .4rem;
  }
  li .flag {
    height: 1rem;
    line-height: .8rem;
    width: 2.2rem;
    position: absolute;
    right: -.05rem;
    top: -.2rem;
    background: url('../../images/fentian/icon.png') no-repeat center center;
    background-size: contain;
  }
  li .flag p {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    -webkit-transform: rotate(-10deg);
    -o-transform: rotate(-10deg);
    font-family: 'PingFang-SC';
    font-size: .23rem;
    font-weight: bold;
    letter-spacing: 0.1px;
    text-align: center;
    color: #fff;
  }
  li .flag p span {
    color: #f6ff00;
    font-size: .26rem;
  }
  li .text {
    padding: .25rem .3rem;
    font-family: 'PingFang-SC';
    font-size: .23rem;
    line-height: 1.4;
    text-align: justify;
    color: #531e1d;
  }
  li .text span {
    color: #fd2007;
  }
  li .take-btn {
    position: absolute;
    bottom: 5%;
    height: 1rem;
    width: 81%;
    margin-left: 9.5%;
    background: url('../../images/fentian/btn-box.png') no-repeat center center;
    background-size: 100%;
    color: #d0262a;
    line-height: 1rem;
    font-size: .34rem;
	  font-weight: bold;
	  font-family: 'PingFang-SC';
  }
  .box1 {
    margin: 0 auto;
    width: 100%;
  }
  .box-son .gift-name {
    display: inline-block;
    color: #ff6500;
    line-height: 1.3;
    text-align: left;
    font-size: .2rem;
  }
  .box-son {
    margin-left: -5%;
    text-align: center;
    color: #333;
  }
  .box-son div {
    display: inline-block;
    padding: .4rem .2rem .2rem .2rem;
    width: 25%;
    height: 1.3rem;
    background-color: rgb(252, 230, 184);
    margin-left: 5%;
    margin-top: .1rem;
	  border-radius: .1rem;
  }
  li:nth-child(2) .box-son, li:last-child .box-son {
    margin-left: 0%;
  }
  li:nth-child(2) .box-son div, li:last-child .box-son div {
    width: 23%;
    height: 1.1rem;
    margin-left: 0%;
    padding: 0.3rem 0.15rem 0.15rem;
  }
  .box-son div p.num {
    left: -2px;
    top: 0;
    width: 100%;
    height: .8rem;
    background: url('../../images/fentian/num.png') no-repeat 0 0;
    background-size: contain;
  }
  .box-son div p.num span {
    width: 100%;
    display: block;
    color: #fff;
    transform: rotate(-45deg);
    line-height: 3.2;
    height: 30%;
    width: 30%;
    text-align: center;
    font-size: .22rem;
  }
</style>
