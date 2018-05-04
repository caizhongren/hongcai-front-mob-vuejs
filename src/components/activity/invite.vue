<template>
	<div id="invite" v-bind:class="{'padding-b-2': token != ''}">
		<div class="main">
			<div class="imgs">
				<img src="../../images/invite/main-header_01.png">
				<img src="../../images/invite/main-header_02.png">
				<img src="../../images/invite/main-header_03.png">
				<img src="../../images/invite/main-header_04.png">
				<img src="../../images/invite/main-header_05.png">
				<img src="../../images/invite/main-header_06.png">
				<img src="../../images/invite/main-header_07.png">
				<img src="../../images/invite/main-header_08.png">
				<img src="../../images/invite/main-header_09.png">
			</div>
			<div class="contents">
				<div class="box-top" @click="toPage">{{token === '' ? '登录' : ''}}查看我的奖励</div>
				<div class="part1">
					<div class="title">
						<span class="yellow fl">邀友注册</span>
						<span class="white fl">每邀请3名好友成功注册，您可获得</span>
					</div>
					<div class="header-icon">
						<p>每3位好友成功注册</p>
						<div class="icon">
							<img src="../../images/invite/line-l.png" alt="">
							<img src="../../images/invite/line-r.png" alt="">
						</div>
					</div>
					<ul class="rates">
						<li>
							<p>1.2<span>%</span></p>
							<p>无条件加息券</p>
						</li>
						<li>
							<p>2.4<span>%</span></p>
							<p>无条件加息券</p>
						</li>
					</ul>
					<p class="tip1">*奖励可叠加获得哟</p>
					<div class="progress">
						<p class="pro_des_dot_tip" v-bind:style="{left: ((inviteNum % 3) / 3 * 100 - 7) + '%'}">{{inviteNum % 3}}位</p>
						<div v-bind:style="{width: ((inviteNum % 3) / 3 * 100) + '%'}"></div>
					</div>
					<p class="tip2">再邀请{{3 - inviteNum % 3}}位好友即可获得加息券～</p>
        </div>
        <div class="part2">
          <div class="title">
            <span class="white lf">好友注册后90日内进行投资，您可获</span>
            <span class="yellow fr">加成佣金</span>
          </div>
          <ul>
            <li>
              <div class="icon fl">好友投资</div>
              <p class="fl text-left">自好友首投之日起60天内</p>
            </li>
            <li>
              <div class="icon fr">2%佣金</div>
              <p class="fr text-right">好友每笔投资折合年化金额 x 2%佣金返现</p>
            </li>
            <li class="tip">*可从单个好友处获得加成佣金上限为1000元</li>
          </ul>
        </div>
        <div class="part3">
          <div class="title">
            <span class="yellow fl">好友注册</span>
            <span class="white fl">好友成功注册，即可获得</span>
          </div>
          <div class="header-icon">
            <div class="icon">
              <img src="../../images/invite/line-l.png" alt="">
              <img src="../../images/invite/line-r.png" alt="">
            </div>
          </div>
          <ul class="coupons">
            <li class="fl">
              <p>18888元特权本金 <br> (合伙人专属)</p>
            </li>
            <li class="fr"><p>966元新手现金券</p></li>
					</ul>
				</div>
			</div>
			<!-- 活动规则 -->
			<div class="invite-rule" @click="showRuleBox"></div>
    </div>
    <div class="fixBtn" v-if="token" @click="toShare">立即邀请</div>
		<!-- 活动规则 -->
		<div class="invite-Rulebox mask-common" v-show="showRules">
			<div class="ruleBox width-100 height-100 position-re bg-grey0p5" >
					<div class="ruleTitle">
							<img src="../../images/invite/activity-rule.png" alt="" width="50%">
					</div>
					<div class="box">
							<div class="slide position-re slide-banner" id="slideBanner">
								<ul class="">
									<li>
										<p>
											<span>【获得邀请资格】</span>
											凡在宏财网进行注册的用户均可获得邀请好友的资格。
										</p>
									</li>
									<li>
										<p>
											<span>【老用户邀请奖励】</span>
											1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
											精选项目1.2%无条件加息券 x 1张<br>
											尊贵项目2.4%无条件加息券 x 1张<br>
											(优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
											2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来60天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
										</p>
									</li>
									<li>
										<p>
											<span>【新用户注册奖励】</span>
											通过邀请方式注册的新用户，除新手专享966元现金券礼包外，还可获得邀请专属特权本金18888元(有效期1天)；<br>
											*温馨提示：邀请新用户注册后30天内还未开通银行存管，则邀请专属特权本金奖励将自动失效。
										</p>
									</li>
									<li>
										<p>
											<span>【奖励发放】</span>
											邀请好友注册优惠券奖励将直接发放至"我的优惠券"中；<br>
											邀请好友投资佣金返现将直接发放至账户"可用余额"中，可用于投资或提现。
										</p>
									</li>
									<li>
										<p>
											<span>【关于特权本金】</span>
											特权本金是平台向用户提供的一种虚拟资金，其本身不可提现或用于投资，但享受8%预期年化回报率。特权本金次日即可产生收益，并直接发放至用户可用余额，可用于投资或提现。<br>
											本活动最终解释权归宏财网所有
                    </p>
									</li>
								</ul>
							</div>
					</div>
			</div>
			<div class="dot">
					<span @click="toggle(item - 1)" v-for="item in number">{{item}}</span>
			</div>
			<div class="close-rule" @click="showRuleBox"></div>
		</div>
	</div>
</template>

<script>
import $ from 'zepto'
import {InviteShareUtils, bridgeUtil, ModalHelper} from '../../service/Utils'
import {swiper} from '../../service/swipeSlide'
export default {
  name: 'Invite',
  data () {
    return {
      showRules: true,
      voucher: '',
      shareItem: {},
      nativeNeedDatas: {},
      inviteNum: 1,
      slideTab: {},
      number: [1, 2, 3, 4, 5],
      version: 310
    }
  },
  created: function () {
    this.token ? this.getVersion() : ''
    this.token ? this.getInviteNum() : ''
    this.token ? this.getInviteCode() : ''
    bridgeUtil.webConnectNative('HCNative_NeedInviteList', null, {
      // 1 需要显示 0 不需要显示
      isShow: 0
    }, function (res) {}, null)
  },
  props: ['token'],
  watch: {
    token: function (value) {
      if (value && value !== '') {
        this.getInviteCode()
        this.getInviteNum()
        this.getVersion()
      }
    }
  },
  mounted () {
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop
      if (t >= window.innerHeight + 50) {
        $('.fixBtn').show().addClass('.fixed')
      } else {
        $('.fixBtn').hide().removeClass('.fixed')
      }
    }
    this.showRules = false
    swiper.init({
      autoSwipe: false,
      axisX: true,
      continuousScroll: true,
      speed: 1000,
      transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
      firstCallback: function (i, sum) {
        $('.dot').children().first().addClass('cur')
      },
      callback: function (i, sum) {
        $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
      }
    })
  },
  methods: {
    getVersion () {
      var that = this
      that.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/version?token=' + that.token
      }).then(function (response) {
        that.version = response.data.replace(/\./g, '')
      })
    },
    toggle (index) {
      swiper.goTo(index)
    },
    showRuleBox: function () {
      this.showRules = !this.showRules
      this.showRules ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
    },
    toPage () {
      if (!this.token) {
        bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
      } else {
        this.$router.push({name: 'ActivityReward'})
      }
    },
    toLogin: function () {
      bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
    },
    getInviteNum () {
      var that = this
      that.$http({
        method: 'get',
        url: '/hongcai/rest/activitys/invite/friends/num?token=' + that.token
      }).then(function (response) {
        that.inviteNum = response.data
      })
    },
    getInviteCode: function () {
      var that = this
      that.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/voucher?token=' + that.token
      }).then(function (response) {
        that.voucher = response.data.inviteCode
        that.shareItem = InviteShareUtils.share(that.voucher)
        that.nativeNeedDatas = {
          'HC_shareType': 1,
          'title': that.shareItem.title,
          'subTitle': that.shareItem.subTitle,
          'url': that.shareItem.linkUrl,
          'imageUrl': that.shareItem.imageUrl
        }
      })
    },
    toShare: function () {
      if (!this.token || this.token === '') {
        this.toLogin()
        return
      }
      var nativeName = 'HCNative_Share'
      this.version >= 310 ? nativeName = 'HCNative_InviteShare' : nativeName = 'HCNative_Share'
      bridgeUtil.webConnectNative(nativeName, null, this.nativeNeedDatas, function (response) {}, null)
    }
  }
}
</script>

<style scoped>
	#invite {
    background-color: #05014a;
    padding-bottom: 1rem;
  }
  .padding-b-2 {
    padding-bottom: 1.7rem !important;
  }
	.imgs {
		margin-bottom: 1rem;
	}
	.imgs img {
		width: 100%;
		vertical-align: top;
		display: inline-block;
	}
	.contents .box-top {
		width: 70%;
		margin: -1.65rem auto 0;
		z-index: 1;
		position: relative;;
		background: url('../../images/invite/box-top.png') no-repeat center center;
		background-size: 100%;
		text-shadow: 0px 1.5px 0 rgba(41, 19, 69, 0.88);
		color: #fbe756;
		height: 1rem;
		line-height: 1.05rem;
		letter-spacing: 1.1px;
		font-size: .38rem;
		font-weight: bold;
	}
	.contents .part1, .part2, .part3 {
		width: 100%;
		height: 7.3rem;
		background: url('../../images/invite/box-content1.png') no-repeat center center;
		background-size: 101%;
		margin: 1rem auto;
		position: relative;
    padding: .7rem 0;
	}
	.contents .part1 .title, .part2 .title, .part3 .title {
		width: 85%;
		height: 1.48rem;
    line-height: 1.6rem;
    padding: 0 .2rem;
		background: url('../../images/invite/box-content-l.png') no-repeat center center;
		background-size: 100%;
		overflow: hidden;
		position: absolute;
    top: -.75rem;
    left: .4rem;
	}
	.contents .title .yellow {
		color: #fbe756;
		font-size: .38rem;
    width: 20%;
    line-height: 1.3;
    font-weight: bold;
    margin: .26rem 0 0 .08rem;
	}
	.contents .title .white {
    color: #fff;
		font-size: .22rem;
	}
	.part1 .header-icon, .part3 .header-icon {
		width: 45%;
		height: 2.7rem;
		color: #fff;
		font-size: .24rem;
		background: url('../../images/invite/part1_icon.png') no-repeat center center;
		background-size: 100%;
		margin: 0 auto;
    position: relative;
  }
	.part1 .header-icon p, .part3 .header-icon p {
		padding-top: 2.06rem;
	}
	.part1 .header-icon img, .part3 .header-icon img {
		position: absolute;
		bottom: -.2rem;
		width: 22%;
	}
	.part1 .header-icon img:nth-child(1) {
		left: -19%;
	}
	.part1 .header-icon img:nth-child(2) {
		right: -19%;
	}
	.part1 .rates {
		overflow: hidden;
		clear: both;
		width: 92%;
    margin: 0.12rem auto;
	}
	.part1 .rates li {
		width: 43%;
		height: 1.5rem;
		background: url('../../images/invite/box-jx.png') no-repeat center center;
		background-size: 100%;
		float: left;
		color: #fff;
	}
	.part1 .rates li:nth-child(2) {
		background: url('../../images/invite/box-zg.png') no-repeat center center;
		background-size: 100%;
		float: right;
	}
	.part1 .rates li p:nth-child(1) {
		font-size: .5rem;
		font-weight: bold;
		margin-top: .2rem;
	}
	.part1 .rates li p:nth-child(2) {
		font-size: .26rem;
		margin-top: -.12rem;
	}
	.part1 .rates li p span {
		font-size: .25rem;
		font-weight: normal;
	}
	.part1 .tip1 {
		color: #fad12e;
		font-size: .24rem;
	}
	.part1 .tip2 {
		color: #fff;
		font-size: .24rem;
	}
	.part1 .progress {
		width: 85%;
		height: .25rem;
		background: #fff;
		border-radius: .35rem;
		margin: 0.65rem auto .2rem;
		box-shadow: 0px 0px 17px rgba(115,76,170,1);
    padding: .045rem;
    position: relative;
	}
	.part1 .progress div {
		width: 33.33%;
		height: 100%;
		background: #facc2e;
		border-top-left-radius: .35rem;
		border-bottom-left-radius: .35rem;
	}
	.part1 .pro_des_dot_tip {
    display: block;
    position: absolute;
    left: 26%;
    top: -0.65rem;
    width: .7rem;
    height: .5rem;
    line-height: .55rem;
    font-size: .23rem;
    font-weight: bold;
    color: #160d6d;
    background-color: #fff;
    border-radius: .12rem;
  }
  .part1 .pro_des_dot_tip:after{
    pointer-events: none;
    content: "";
    display: block;
    border-width: .1rem;
    position: absolute;
    bottom: -.2rem;
    right: .22rem;
    border-style: solid dashed dashed;
    border-color :#fff transparent transparent;
    font-size: 0;
    line-height: 0;
  }
  .part2 .title {
		background: url('../../images/invite/box-content-r.png') no-repeat center center;
    background-size: 100%;
    text-align: left;
    left: .6rem;
  }
  .contents .part2 .title .yellow {
    text-align: center;
    margin-right: .05rem;
  }
  .part2 ul li {
    border-bottom: solid 1px #4464e0;
    width: 100%;
    overflow: hidden;
    clear: both;
    margin-bottom: .25rem;
    color: #fff;
  }
  .part2 ul li:nth-child(1) div {
    width: 45%;
    height: 2.5rem;
    background: url('../../images/invite/part2_icon1.png') no-repeat center center;
    background-size: 100%;
    margin-left: .25rem;
    padding-top: 2.02rem;
  }
  .part2 ul li:nth-child(2) div {
    width: 45%;
    height: 2.5rem;
    background: url('../../images/invite/part2_icon2.png') no-repeat center center;
    background-size: 100%;
    margin-right: .25rem;
    padding-top: 2rem;
  }
  .part2 ul li:nth-child(1) p, .part2 ul li:nth-child(2) p {
    width: 50%;
    margin-top: 1rem;
  }
  .part2 .tip {
    color: #fad12e;
    font-size: .22rem;
    border-bottom: none;
    margin-top: .4rem;
  }
  .part3 {
		height: 5.3rem;
		background: url('../../images/invite/box-content2.png') no-repeat center center;
    background-size: 101%;
    margin-bottom: 0;
  }
  .part1 .title .white {
    margin-left: .42rem;
  }
  .part3 .title .white {
    margin-left: .55rem;
  }
  .part3 .header-icon {
    height: 2.8rem;
		background: url('../../images/invite/part3_icon.png') no-repeat center center;
    background-size: 100%;
    width: 50%;
  }
  .part3 .header-icon img {
    bottom: .2rem;
  }
  .part3 .header-icon img:nth-child(1) {
    left: -26%;
  }
  .part3 .header-icon img:nth-child(2) {
    right: -26%;
  }
  .part3 .coupons {
    overflow: hidden;
    clear: both;
    width: 94%;
    margin: 0 auto;
    color: #fff;
    text-align: left;
  }
  .part3 .coupons li {
    width: 48%;
		height: 1.2rem;
		background: url('../../images/invite/box.png') no-repeat center center;
    background-size: 100%;
    font-size: .25rem;
  }
  .part3 .coupons li:nth-child(1) p {
    padding: .22rem .25rem;
  }
  .part3 .coupons li:nth-child(2) p {
    padding: .44rem .25rem;
  }
  .fixBtn {
    width: 100%;
    height: .9rem;
    line-height: .95rem;
    color: #fff;
    font-size: .28rem;
    background: #2923ab;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: none;
  }
	.invite-rule {
			background: url('../../images/invite/invite-rule.png') no-repeat center center;
			background-size: contain;
			width: 1.4rem;
			height: 1rem;
			position: fixed;
			z-index: 9;
			top: 2.8rem;
			right: 0rem;
	}
	.invite-Rulebox {
			padding: 0 .3rem;
	}
	.ruleBox {
			background: url('../../images/invite/invite-rule-bg.png') no-repeat center bottom;
			background-size: 100%;
			height: 7.8rem;
			overflow: hidden;
			position: relative;
			z-index: 10;
	}
	.box {
			overflow: hidden;
			margin-top: -.4rem;
			height: 6.1rem;
	}
	.close-rule {
			width: .8rem;
			height: .8rem;
			margin: 0.3rem auto;
			background: url(../../images/invite/close-rule.png) no-repeat;
			background-size: cover;
	}
	/*活动规则*/
	::-webkit-scrollbar {display:none}
  .slide-banner {
    margin: .35rem auto 0;
    height: 4rem;
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
    -webkit-transform:rotate(0deg)
  }
  .slide{
    height: 100%;
    position: relative;
    margin: 0 auto;
    text-align: left;
  }
  .slide:after{
    content: '';
    display: block;
    width: 100%;
    padding-top: 50%;
  }
  .slide ul{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide li{
    overflow: hidden;
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  /* 解决js阻塞页面显示首屏 */
  .slide li:first-child{
    z-index: 1;
  }
  .slide li p{
    padding-left: .4rem;
    padding-right: .4rem;
    color: #fefefe;
    font-size: .24rem;
    line-height: 1.8;
    text-align: justify;
  }
  .slide li p span{
    font-size: .26rem;
    display: block;
    text-align: center;
  }
  .dot{
    z-index: 1;
    width: 100%;
		margin-top: -.2rem;
  }
  .dot span{
    display: inline-block;
    width: 19.5%;
    height: 1rem;
    background-color: #160d6d;
    border-left: 1px solid #4362d7;
    border-bottom: 1px solid #4362d7;
    color: #6787ff;
    font-size: .65rem;
    line-height: 1.2rem;
    font-family: CTCuYuanSF;
    text-align: center;
    font-weight: bold;
  }
  .dot span:last-child{
    border-right: 1px solid #4362d7;
  }
  .dot .cur{
    background-color: #4464e0;
    color: #ffffff;
  }
  .ruleTitle img{
	margin: .5rem 10% 0 16%;
    width: 54%;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .dot{
        bottom: 4.5rem;
    }
    .close-rule{
        bottom: 3.4rem;
    }
  }
</style>
