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
						<span class="white fr">每邀请3名好友成功注册，您可获得</span>
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
						<p class="pro_des_dot_tip">{{inviteNum}}位</p>
						<div></div>
					</div>
					<p class="tip2">再邀请2位好友即可获得加息券～</p>
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
    <div class="fixBtn" v-if="token">立即邀请</div>
		<!-- 活动规则 -->
		<div class="invite-Rulebox mask-common" v-if="showRules">
				<div class="ruleBox width-100 height-100 position-re bg-grey0p5" >
						<div class="box">
								<div class="rec-act-rule bg-white border-ra-0p5">
								<div class="rule1">
										<p class="rule-title">1.如何获得邀请资格？</p>
										<p class="rule-content">本活动结束之前注册的宏财网用户均可获得邀请好友的资格。</p>
								</div>
						</div>
						<div class="rec-act-rule bg-white border-ra-0p5">
								<div class="rule2">
										<p class="rule-title">2.老用户成功邀请好友投资后，能获得什么福利？</p>
										<p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>活动有效期间，老用户A每邀请一位新用户B注册成为宏财网用户，且B自注册之日起30天内完成首次投资（含宏财精选、宏财尊贵两种类别），A即可获得B该笔及未来60天内每笔投资额度50%的特权本金，特权本金按8%年均回报率计息，收益进入A的账户余额。</span><br/>
										<i class="fa fa-circle" aria-hidden="true"></i><span>老用户通过邀请单个新用户获得的平台奖励特权本金上限为10万元。</span><br/>
										<i class="fa fa-circle" aria-hidden="true"></i><span>老用户获得的特权本金随着其所邀请新用户的在投本金的增减而相应增减。</span><br/>
										<i class="fa fa-circle" aria-hidden="true"></i><span>老用户邀请新用户的数量无上限。</span><br>
												<i class="fa fa-circle" aria-hidden="true"></i><span>特权本金计息时长截至B首投之后的第60天，第61天起所有特权本金失效，不再计息。</span>
										</p>
								</div>
						</div>
						<div class="rec-act-rule bg-white border-ra-0p5">
								<div class="rule2">
										<p class="rule-title">3.新用户通过老用户邀请注册后，可以得到什么奖励？</p>
										<p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>新用户通过邀请注册后，立享“合伙人特权大礼包”：</span></p>
										<p class="list-page">
												<span>&nbsp;1）</span>新手专享项目：预期年化收益率8%+6%，55天期限 <br/>
												&nbsp;2）精选加息券：0.3%、0.5%、0.8%，各1张 <br/>
												&nbsp;3）尊贵加息券：0.8%、1.2%、1.6%，各1张 <br/>
												&nbsp;4）精选现金券：总计184元现金投资券 <br/>
												&nbsp;5）尊贵现金券：总计782元现金投资券
										</p>
										<p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>新用户须在注册之日起30天内进行首次投资宏财精选或宏财尊贵产品，老用户才可获得相应特权本金。</span></p>
								</div>
						</div>
						<div class="rec-act-rule bg-white border-ra-0p5">
								<div class="rule1">
										<p class="rule-title">4.什么是特权本金？</p>
										<p class="rule-content">特权本金是平台奖励给用户的虚拟本金，不可提现或用于投资；其产生的收益按8%年均回报率每日计息、次日显示昨日收益；特权本金产生的收益进入用户账户余额，可用于投资或提现。</p>
								</div>
						</div>
						<div class="rec-act-rule bg-white border-ra-0p5">
								<div class="rule1">
										<p class="rule-title">5.新用户可否重复领奖？</p>
										<p class="rule-content">同一手机号、身份证号的新用户，只享受一次合伙人礼包，不可重复获得。</p>
								</div>
						</div>
						<div class="tips">
								<p>本活动解释权归宏财网所有</p>
								<p>活动咨询请致电客服400-990-7626（工作日：9:00-18:00）</p>
						</div>
						</div>
						<div class="close-rule" @click="showRuleBox"></div>
				</div>
		</div>
	</div>
</template>

<script>
import $ from 'zepto'
import {Utils, InviteShareUtils, bridgeUtil, ModalHelper, ScrollHalfPage} from '../../service/Utils'
export default {
  name: 'Invite',
  data () {
    return {
      showRules: false,
      isLogged: false,
      isInvitedFriends: true,
      isActivityEnd: false,
      voucher: '',
      shareItem: {},
      nativeNeedDatas: {},
      inviteNum: 2
    }
  },
  created: function () {
    this.token ? this.getInvitedFriends() : ''
    this.token ? this.getInviteCode() : ''
    this.isiOS = Utils.isIos()
    this.token ? this.isLogged = true : this.isLogged = false
    bridgeUtil.webConnectNative('HCNative_NeedInviteList', null, {
      // 1 需要显示 0 不需要显示
      isShow: 0
    }, function (res) {}, null)
  },
  props: ['token'],
  watch: {
    token: function (value) {
      if (value && value !== '') {
        this.getInvitedFriends()
        this.getInviteCode()
      }
      this.token ? this.isLogged = true : this.isLogged = false
    }
  },
  mounted () {
    ScrollHalfPage($('.fixBtn'))
  },
  methods: {
    showRuleBox: function () {
    //   var $invite = document.querySelector('#invite')
    //   ruleBox.showRuleBox($invite, this, this.showRules)
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
    getInvitedFriends: function () {
      this.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/isInvitedFriends?token=' + this.token
      }).then((response) => {
        if (response.data && response.data.ret !== -1) {
          this.isInvitedFriends = response.data.flag
        } else if (response.data.code && response.data.code === -1041) {
          this.isActivityEnd = true
        } else if (response.data.code && response.data.code === -1000) {
          this.isInvitedFriends = false
          this.isActivityEnd = false
        } else {
          this.isInvitedFriends = true
          this.isActivityEnd = false
        }
      })
    },
    toLogin: function () {
    //   var regesterHandCallback = function (data) {
    //     data = Utils.isIos() === true ? data : JSON.parse(data)
    //     window.location.replace(window.location.pathname)
    //     this.getInvitedFriends()
    //   }
      bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
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
      // var that = this
      if (!this.token || this.token === '') {
        this.toLogin()
        return
      }
      if (this.isActivityEnd) {
        alert('活动结束')
        return
      }
      bridgeUtil.webConnectNative('HCNative_InviteShare', null, this.nativeNeedDatas, function (response) {
      }, null)
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
	.contents {

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
    display: none;
  }
	.invite-rule {
			background: url('../../images/invite/rule-icon.png') no-repeat center center;
			background-size: 100%;
			width: 1.5rem;
			height: 1rem;
			position: fixed;
			z-index: 9;
			top: 2.8rem;
			right: 0rem;
	}
	.invite-Rulebox {
			padding: 0 .3rem;
			background: rgba(0,0,0,.5);
	}
	.ruleBox {
			background: url('../../images/invite/invite-rule-bg.png') no-repeat center center;
			background-size: contain;
			height: 10rem;
			overflow: auto;
	}
	.box {
			position: relative;
			overflow: auto;
			top: 2rem;
			height: 6.1rem;
	}
	.rec-act-rule {
			border-radius: 0.1rem;
			padding: .1rem;
			background-color: #fdf6d9;
			margin: 0 0.3rem;
			margin-bottom: .2rem;
	}
	.rec-act-rule .rule1, .rec-act-rule .rule2 {
			background-image: linear-gradient(to bottom, #e6c590 0%, #c79653 100%);
			border-radius: .1rem;
			padding: .1rem 0;
			text-align: left;
			overflow: hidden;
	}
	.rule-title {
			font-size: 0.22rem;
			color: #f83b15;
			padding: .1rem 0 0rem .1rem;
	}
	.rule-content {
		font-size: .2rem;
		color: #7c4618;
		line-height: .35rem;
		text-align: justify;
		padding: 0 .3rem;
		margin-top: .1rem;
		overflow: hidden;
	}
	.rule-content i {
			display: block;
			width: .12rem;
			height: .13rem;
			background: #f83b15;
			border-radius: 50%;
			margin-right: .04rem;
			float: left;
			margin-top: .08rem;
	}
	.rule-content span {
			float: left;
			width: 96%;
	}
	.list-page {
			font-size: .2rem;
			color: #7c4618;
			line-height: .35rem;
			text-align: justify;
			padding: 0 .3rem;
			margin-top: .1rem;
			padding-left: 0.4rem;
			overflow: hidden;
	}
	.list-page span {
			float: left;
			width: 9%;
			height: .5rem;
	}
	.tips {
			/*position: fixed;*/
			bottom: 2.62rem;
			left: 0.53rem;
	}
	.tips p {
			margin-bottom: 0;
			text-align: center;
			font-size: 0.2rem;
			color: #e4a150;
	}
	.close-rule {
			width: 10%;
			height: 5.6%;
			position: absolute;
			bottom: 11.3%;
			left: 45%;
	}
</style>
