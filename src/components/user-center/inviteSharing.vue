<template>
  <div class="slide-banner position-re overflow-hid" v-auto-height>
      <div id="slideBanner" class="slide position-re">
        <ul>
          <!-- 平台数据总览 -->
          <li class="reportList position-re text-center">
            <div class="report1-content">
              <ul class="header overflow-hid">
                <li class="contentNum">01</li>
                <li class="report-title">平台数据总览</li>
              </ul>
              <ul class="content">
                <li>
                  <p>{{platformData.totalAmount.amount}}</p>
                  <p>{{platformData.totalAmount.title}}</p>
                </li>
                <li v-for="data in platformData.listDatas">
                  <p class="ft-pink0">
                    <span class="fl">{{data.count1}}</span>
                    <span class="fr">{{data.count2}}</span>
                  </p>
                  <p class="ft-pink1">
                    <span class="fl">{{data.type1}}</span>
                    <span class="fr">{{data.type2}}</span>
                  </p>
                </li>
              </ul>
              <div class="tip">*数据统计截至2017年12月31日</div>
            </div>
          </li>
        </ul>
        <div class="dot">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="arrow"></div>
      </div>
  </div>  
</template>

<script>
import $ from 'zepto'
import {Utils, InviteShareUtils, bridgeUtil, ModalHelper} from '../../service/Utils'
import {swiper} from '../../service/swipeSlide'
export default {
  name: 'Invite',
  data () {
    return {
      showRules: false,
      isLogged: false,
      isInvitedFriends: true,
      isActivityEnd: false,
      isiOS: true,
      voucher: '',
      shareItem: {},
      nativeNeedDatas: {}
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
    swiper.init({
      autoSwipe: false,
      axisX: false,
      speed: 2000,
      transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
      firstCallback: function (i, sum) {
        $('#slideBanner').find('.dot').children().first().addClass('cur')
      },
      callback: function (i, sum) {
        i === 8 ? $('.arrow').hide() : $('.arrow').show()
        $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
      }
    })
  },
  methods: {
    showRuleBox: function () {
    //   var $invite = document.querySelector('#invite')
    //   ruleBox.showRuleBox($invite, this, this.showRules)
      this.showRules = !this.showRules
      this.showRules ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
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
    
</style>
