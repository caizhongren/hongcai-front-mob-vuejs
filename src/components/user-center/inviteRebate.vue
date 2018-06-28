<template>
  <div class="invite-rebate" v-auto-height>
    <div class="invite-rebate-wrap">
      <div class="count1">
        <p>{{inviteStat.totalNum || 0}}</p>
        <p>注册成功(人)</p>
      </div>
      <div class="clearfix">
        <div class="count2 fl">
          <p>{{inviteStat.realNameAuthNum < inviteStat.investNum ? inviteStat.investNum : inviteStat.realNameAuthNum || 0}}</p>
          <p>认证成功(人)</p>
        </div>
        <div class="count3 fr">
          <p>{{inviteStat.investNum || 0}}</p>
          <p>首次出借成功(人)</p>
        </div>
      </div>
      <div class="qrCode" id="qrcode"></div>
      <div class="tip">
        <p>扫码加入宏财网</p>
        <p>让我们一起启航财富，放心去飞！</p>
      </div>
      <div class="share-route position-re">
        <ul class="circles">
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>
        <p>分享到</p>
        <div class="share-list">
          <div @click="shareToWechat()"><img src="../../images/user-center/wechat2.png" alt=""></div>
          <div @click="shareToQQ()"><img src="../../images/user-center/qq.png" alt=""></div>
          <div @click="copyLink()"><img src="../../images/user-center/link.png" alt=""></div>
        </div>
        <div class="share-list-words">
          <div>微信好友</div>
          <div>QQ好友</div>
          <div>复制链接</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {QRCode} from '../../service/qrcode.js'
  import {bridgeUtil, InviteShareUtils} from '../../service/Utils'
  export default {
    name: 'inviteRebate',
    data () {
      return {
        url: '',
        qrcode: Object,
        inviteStat: {},
        voucher: '',
        shareItem: {},
        nativeNeedDatas: {}
      }
    },
    created: function () {
      if (this.token) {
        this.getVoucher()
        this.getInviteStat()
        this.toInviteList()
      }
    },
    props: ['token'],
    watch: {
      token: function (value) {
        if (value && value !== '') {
          this.getVoucher()
          this.getInviteStat()
          this.toInviteList()
        }
      },
      inviteStat: function (val) {
        bridgeUtil.webConnectNative('HCNative_NeedInviteList', '', {
          // 1 需要显示 0 不需要显示
          isShow: 1
        }, function (res) {
        }, function (data) {
        })
      }
    },
    mounted () {
      var that = this
      that.qrcode = new QRCode(document.getElementById('qrcode'), {
        text: that.url,
        width: 150,
        height: 150,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })
    },
    methods: {
      getInviteStat: function () {
        var that = this
        this.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/inviteStat?token=' + that.token
        })
        .then(response => {
          if (!response.data || response.data.ret === -1) {
            return
          }
          that.inviteStat = response.data
        })
      },
      toInviteActivity: function () {
        this.$router.push({name: 'Invite'})
      },
      toInviteList: function () {
        var that = this
        bridgeUtil.webConnectNative(null, 'HCWeb_ToInviteList', {}, null, function (data) {
          that.$router.push({name: 'inviteRebateList'})
        })
      },
      getVoucher: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/voucher?token=' + that.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            that.voucher = response.data.inviteCode
            that.url = process.env.vue_domain + '/activity/invite-sharing/' + that.voucher
            that.qrcode.makeCode(that.url)
            that.shareItem = InviteShareUtils.share(that.voucher)
            that.nativeNeedDatas = {
              'HC_shareType': 1,
              'title': that.shareItem.title,
              'subTitle': that.shareItem.subTitle,
              'url': that.shareItem.linkUrl,
              'imageUrl': that.shareItem.imageUrl
            }
          }
        })
      },
      shareToWechat: function () {
        bridgeUtil.webConnectNative('HCNative_ShareToWechat', null, this.nativeNeedDatas, function (res) {
          console.log(res)
        }, null)
      },
      shareToQQ: function () {
        bridgeUtil.webConnectNative('HCNative_ShareToQQ', null, this.nativeNeedDatas, function (res) {
          console.log(res)
        }, null)
      },
      copyLink: function () {
        bridgeUtil.webConnectNative('HCNative_CopyLink', null, {
          'url': this.nativeNeedDatas.url
        }, function (res) {
          console.log(res)
        }, null)
      }
    }
  }
</script>
<style scoped>
  #qrcode {
    margin-top: 5%;
  }
  .invite-rebate {
    background-image: linear-gradient(to bottom, #ff6000, #f93438);
    padding: .3rem .4rem .6rem;
    font-family: '微软雅黑';
    overflow: hidden;
  }
  .invite-rebate-wrap {
    border-radius: .2rem;
    height: 98%;
    background: url('../../images/user-center/invite-bg.png') no-repeat center 60%;
    background-color: #fff;
    background-size: 100%;
    color: #ff611d;
    padding-top: 2%;
    position: relative;
    /*overflow: hidden;*/
  }
  .count1 p:first-child {
    font-size: .7rem;
    height: .9rem;
  }
  .count1 p:last-child, .count2 p:last-child, .count3 p:last-child {
    font-size: .21rem;
    color: #666;
  }
  .count2 p:first-child, .count3 p:first-child {
    font-size: .47rem;
    height: .64rem;
  }
  .count2, .count3 {
    display: inline-block;
    width: 40%;
  }
  .tip {
    margin: 2% 0;
    font-size: .21rem;
    line-height: .35rem;
    color: #666;
  }
  .circles {
    position: absolute;
    top: -30%;
    left: -5.6%;
    width: 120%;
  }
  .circles li {
    float: left;
    height: .12rem;
    width: .12rem;
    background-color: #fc683b;
    border-radius: 50%;
    margin: 0 .04rem;
  }
  .circles li:first-child, .circles li:last-child {
    width: .54rem;
    height: .54rem;
    margin-top: -.2rem;
    background-image: linear-gradient(to bottom, #f64c24, #fb491e);
  }
  .share-route p {
    font-size: .28rem;
    color: #fa6943;
    margin: 15% 0 0%;
    position: relative;
    top: -.2rem;
  }
  .share-list, .share-list-words {
    display: flex;
    justify-content: space-around;
    padding: 0 .1rem;
  }
  .share-list-words {
    color: #999;
  }
  .share-list div img{
    display: block;
    height: 60%;
    margin: .21rem auto;
  }
  .share-list div {
    height: 1rem;
    width: 1rem;
    border: 1px solid #eee;
    border-radius: .1rem;
    background-color: #eee;
  }
  @media(max-height: 480px) {
    .invite-rebate-wrap {
      padding-top: 0;
    }
    .tip {
      margin: 4% 0 4%;
    }
    .share-route p {
      margin: 8% 0 5%;
    }
    .circles {
      top: -15%;
    }
  }
</style>
