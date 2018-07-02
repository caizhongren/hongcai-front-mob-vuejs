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
            <!-- 初级 -->
            <li>
              <span class="circle"></span>
              <img src="../../images/fentian/level1.png" alt="" class="display-bl name" width="32%">
              <div class="flag"><p>价值<span>RMB410</span></p></div>
              <div class="box1">
                <div class="box-son">
                  <div class="position-re">
                    <p class="position-ab num"><span>x1</span></p>
                    <img src="../../images/fentian/gift0-1.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x1</span></p>
                    <img src="../../images/fentian/gift0-2.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x2</span></p>
                    <img src="../../images/fentian/gift0-3.png" alt="" class="display-bl margin-auto" width="75%">
                  </div>
                </div>
                <div class="box-son">
                  <p class="gift-name">【时装兑换令牌】</p>
                  <p class="gift-name">【圣器印记礼包】</p>
                  <p class="gift-name">【魔气结晶】</p>
                </div>
              </div>
              <p class="text" v-if="!cdkey0">您已获得价值<span>RMB410</span>游戏礼包领取资格，通过银行存管认证后，即可获取礼包兑换码，数量有限，兑完即止哟～</p>
              <div class="gongxi" v-if="cdkey0">
                <p>恭喜您获得焚天【初级礼包】！</p>
                <p>奖励兑换码为</p>
                <p>{{cdkey0}}</p>
              </div>
              <p class="take-btn" @click="copyCdkey(cdkey0, 0)">复制兑换码</p>
              <p class="take-btn" v-if="!cdkey0" @click="toTakeCdkey(0)">立即抢领</p>
            </li>
            <!-- 中级 -->
            <li>
              <span class="circle"></span>
              <img src="../../images/fentian/level2.png" alt="" class="display-bl name" width="32%">
              <div class="flag"><p>价值<span>RMB1000</span></p></div>
              <div class="box1">
                <div class="box-son">
                  <div class="position-re">
                    <p class="position-ab num" v-bind:class="{'invalid-num': !cdkey1 && Invalid}"><span>x3</span></p>
                    <img src="../../images/fentian/gift1-1.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num" v-bind:class="{'invalid-num': !cdkey1 && Invalid}"><span>x1</span></p>
                    <img src="../../images/fentian/gift1-2.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num" v-bind:class="{'invalid-num': !cdkey1 && Invalid}"><span>x1</span></p>
                    <img src="../../images/fentian/gift1-3.png" alt="" class="display-bl margin-auto" width="86%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num" v-bind:class="{'invalid-num': !cdkey1 && Invalid}"><span>x1</span></p>
                    <img src="../../images/fentian/gift1-4.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                </div>
                <div class="box-son">
                  <p class="gift-name">【典籍经典宝箱】&nbsp;&nbsp;【金宠随机包】<br>【随机神能宝箱】&nbsp;&nbsp;【坐骑兑换缰绳】</p>
                </div>
              </div>
              <p class="text" v-if="!cdkey1">首次出借任意金额(不含债权转让类项目)即可获取价值<span>RMB1000</span>游戏礼包</p>
              <div class="gongxi" v-if="cdkey1">
                <p>恭喜您获得焚天【中级礼包】！</p>
                <p>奖励兑换码为</p>
                <p>{{cdkey1}}</p>
              </div>
              <p class="take-btn" v-if="cdkey1" @click="copyCdkey(cdkey1, 1)">复制兑换码</p>
              <p class="take-btn" v-if="!cdkey1 && !Invalid" @click="toTakeCdkey(1)">立即抢领</p>
              <p class="invalid-btn" v-if="!cdkey1 && Invalid">礼包已失效</p>
            </li>
            <!-- 高级 -->
            <li>
              <span class="circle"></span>
              <img src="../../images/fentian/level3.png" alt="" class="display-bl name" width="32%">
              <div class="flag"><p>价值<span>RMB2500</span></p></div>
              <div class="box1">
                <div class="box-son">
                  <div class="position-re">
                    <p class="position-ab num"><span>x1</span></p>
                    <img src="../../images/fentian/gift2-1.png" alt="" class="display-bl margin-auto" width="86%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x5</span></p>
                    <img src="../../images/fentian/gift2-2.png" alt="" class="display-bl margin-auto" width="75%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x2</span></p>
                    <img src="../../images/fentian/gift2-3.png" alt="" class="display-bl margin-auto" width="80%">
                  </div>
                  <div class="position-re">
                    <p class="position-ab num"><span>x2</span></p>
                    <img src="../../images/fentian/gift0-2.png" alt="" class="display-bl margin-auto" width="86%">
                  </div>
                </div>
                <div class="box-son">
                    <p class="gift-name">【9级宝石】&nbsp;&nbsp;【高级天机卷】<br>【金钥匙】&nbsp;&nbsp;&nbsp;&nbsp;【神器印记礼包】</p>
                </div>
              </div>
              <p class="text" v-if="!cdkey2">活动期间，累计出借金额满5000元 (不含债权转让类项目)即可获取价值<span>RMB2500</span>游戏礼包</p>
              <div class="gongxi" v-if="cdkey2">
                <p>恭喜您获得焚天【高级礼包】！</p>
                <p>奖励兑换码为</p>
                <p>{{cdkey2}}</p>
              </div>
              <p class="take-btn" v-if="cdkey2" @click="copyCdkey(cdkey2, 2)">复制兑换码</p>
              <p class="take-btn" v-if="!cdkey2" @click="toTakeCdkey(2)">立即抢领</p>
            </li>
          </ul>
        </div>
      </div>
      <p class="tip">*本活动针对宏财精选及宏财尊贵项目，不含债权转让类项目</p>
      <div class="how">
        <img src="../../images/fentian/gift-header.png" alt="" width="90%" class="display-bl margin-auto">
        <div class="how-rule">
          获得的礼包可全渠道使用，兑换码永久有效；可在焚天游戏登录界面<span class="color-900">点击右上角进入<span class="text-indent">【地图</span><span class="text-indent">】</span>>>点击左边<span class="text-indent">【福】</span>>>进入福利界面</span>，在兑换CDKEY处输入兑换码即可获得礼包内游戏道具。
        </div>
      </div>
      <img src="../../images/fentian/rule-header.png" alt="" width="55%" class="margin-auto">
      <div class="act-rules">
        <p>奖励数量有限，先到先得，兑完即止，赶快来参与吧；</p>
        <p>达标领取条件后，可返回此活动页面复制奖励兑换码，也可前往<span class="text-indent">【我的</span><span class="text-indent">】</span>页面点击右上角>>进入<span class="text-indent">【站内信<span class="text-indent">】</span></span>点击提醒>>查看兑换码及奖励信息；</p>
        <p>每个兑换码仅可兑换一次奖励，兑换成功后，奖励道具将自动发放至游戏背包中，因活动机会难得，道具珍贵抢手，每个游戏ID每种类别礼包奖励仅可通过相应兑换码兑换一次哟；</p>
        <p>如活动中发现用户涉及造假、作弊等行为，平台有权取消其获奖资格并冻结账号；</p>
        <p>在法律规定范围内，宏财网保留本活动最终解释权。</p>
      </div>
    </div>
    <p class="statement" v-if="isIos">该活动与设备生产商Apple Inc.公司无关</p>
    <div class="mask-common fen-mask" v-show="activityStatus === 2">
      <img src="../../images/fentian/activityEnd.png" alt="" class="red-package" width="60%">
    </div>
  </div>
</template>
<script>
  import {Carousel} from '../../service/mCarousel'
  import {Utils, bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        Invalid: false,
        cdkey0: 0,
        cdkey1: 0,
        cdkey2: 0,
        isIos: Utils.isIos(),
        index: 0, //
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
        activityStatus: 1 // 1 正常 2 结束
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val ? this.getCdkeys(0) : null
        val ? this.getCdkeys(1) : null
        val ? this.getCdkeys(2) : null
        val ? this.getFirstInvest() : null
      },
      activityStatus: function (val) {
        val && val === 2 ? document.getElementsByClassName('FenTian')[0].style.height = window.innerHeight + 'px' : document.getElementsByClassName('FenTian')[0].style.height = 'auto'
      }
    },
    created () {
      this.getActivityStatus()
      this.token ? this.getCdkeys(0) : null
      this.token ? this.getCdkeys(1) : null
      this.token ? this.getCdkeys(2) : null
      this.token ? this.getFirstInvest() : null
    },
    mounted () {
      this.setCarousel()
    },
    methods: {
      getFirstInvest () {
        var that = this
        that.$http('/hongcai/rest/users/0/creditRights/firstInvest?token=' + that.token).then(function (res) {
          (res.data && res.data.type === 6) ? that.Invalid = true : that.Invalid = false
        })
      },
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
      getCdkeys (type) { // 各等级领取cdkey查询
        if (type === 0 && this.cdkey0 || type === 1 && this.cdkey1 || type === 2 && this.cdkey2) {
          return
        }
        var that = this
        that.$http('/hongcai/rest/activitys/fenTianCdkey?token=' + that.token + '&channelName=fentian' + '&cdKeyType=' + type)
        .then(function (res) {
          type === 0 ? that.cdkey0 = null : type === 1 ? that.cdkey1 = null : that.cdkey2 = null
          if (res && res.data.ret !== -1) {
            type === 0 ? that.cdkey0 = res.data.cdkey : null
            type === 1 ? that.cdkey1 = res.data.cdkey : null
            type === 2 ? that.cdkey2 = res.data.cdkey : null
          }
        })
      },
      setCarousel () { // 礼包布局配置
        var wrapper = document.getElementById('wrapper')
        Carousel.mCarousel(wrapper, {
          index: 0,
          active: 'active',
          scale: 0.67,
          duration: 300,
          locked: true,
          diff: 0.445
        })
      },
      toTakeCdkey (type) {
        if (type !== Carousel.index) { return }
        this.$http.get('/hongcai/rest/users/0/userAuth?token=' + this.token).then((response) => {
          this.userAuth = response.data
          if (this.userAuth.active && this.userAuth.authStatus === 2) {
            bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
          } else {
            bridgeUtil.webConnectNative('HCNative_CheckUserAuth', null, {}, function (response) {}, null)
          }
        })
      },
      copyCdkey (cdkey, type) {
        if (type !== Carousel.index) { return }
        bridgeUtil.webConnectNative('HCNative_CopyText', null, {text: cdkey}, function (response) {}, null)
      }
    }
  }
</script>
<style scoped>
  .fen-mask {
    background-color: rgba(0,0,0,0.9) !important;
    padding-top: 2.5rem;
  }
  .FenTian {
    overflow: hidden;
    background: #2a0d28;
    padding-bottom: .3rem;
  }
  .text-indent {
    text-indent: -.5em;
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
    background-size: contain;
  }
  li .gongxi p:first-child {
    color: #531e1d;
    font-size: .23rem;
    margin: .1rem auto .1rem;
  }
  li .gongxi p:first-child + p {
    color: #531e1d;
  }
  li .gongxi p:last-child {
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
  li .take-btn, li .invalid-btn {
    position: absolute;
    display: block;
    border:none;
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
  li .invalid-btn {
    background: url('../../images/fentian/invalid-btn.png') no-repeat center center;
    background-size: 100%;
    color: #6f6d6d;
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
  .box-son div p.num, .invalid-num {
    left: -2px;
    top: 0;
    width: 100%;
    height: .8rem;
    background: url('../../images/fentian/num.png') no-repeat 0 0;
    background-size: contain;
  }
  .box-son div p.invalid-num {
    background: url('../../images/fentian/invalid-num.png') no-repeat 0 0;
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
