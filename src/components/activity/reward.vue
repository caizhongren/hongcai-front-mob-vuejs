<template>
  <div class="invite-reward overflow-hid" auto-h>
    <div class="head">
      <p class="text-center">您已成功邀请<span class="ft-3 display-inbl margin-l-1 margin-r-1">{{inviteCount}}</span>位好友了！</p>
    </div>
    <p class="friend-ship">好友共为您带来</p>
    <div class="part2">
      <div>
        <p class="text-center">{{privilegedCapital.amount}}</p>
        <p class="text-center">累计特权本金(元)</p>
      </div>
      <div>
        <p class="text-center">{{privilegedCapital.profit | number}}</p>
        <p class="text-center">累计收益(元)</p>
      </div>
    </div>
    <div class="invite-list">
      <div class="table-wrap-wrap">
        <div class="table-wrap">
          <table>
            <thead class="text-center">
              <tr>
                <td class="bd-right bd-bottom">成功邀请好友</td>
                <td class="bd-right bd-bottom">累计特权本金(元)</td>
                <td class="bd-bottom">剩余获得天数(天)</td>
              </tr>
            </thead>
            <tbody class="" v-for="detail in details" v-if="details.length > 0">
              <tr v-if="detail.firstInvestTime > 0">
                <td v-bind:class="{'color_grey' : getintervalDays(detail.firstInvestTime) <= 0}" class="bd-right bd-bottom">{{detail.mobile}}</td>
                <td v-bind:class="{'color_grey' : getintervalDays(detail.firstInvestTime) <= 0}" class="bd-right bd-bottom">{{detail.amount | number}}</td>
                <td v-bind:class="{'color_grey' : getintervalDays(detail.firstInvestTime) <= 0}" class="bd-bottom">{{getintervalDays(detail.firstInvestTime)}}</td>
              </tr>
              <tr v-if="detail.firstInvestTime <= 0">
                <td v-bind:class="{'color_grey' : getintervalDays(detail.firstInvestTime) <= 0}" class="bd-right bd-bottom">{{detail.mobile}}<img src="../../images/invite/award-off.png" v-show="getintervalDays(detail.registTime) <= 0"></td>
                <td class="bd-right bd-bottom color_grey" v-if="getintervalDays(detail.registTime) <= 0">——</td>
                <td class="bd-right bd-bottom" v-if="getintervalDays(detail.registTime) > 0">暂无</td>
                <td class="bd-bottom color_grey" v-if="getintervalDays(detail.registTime) <= 0">——</td>
                <td class="bd-bottom" v-if="getintervalDays(detail.registTime) > 0">未投资</td>
              </tr>
            </tbody>
            <tbody v-if="totalPage > page">
              <tr>
                <td></td>
                <td><p class="padding-t-3 text-center ft-white" @click="loadMore();"><i class="fa fa-list-ul ft-orange"></i>&nbsp;查看更多</p></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="con-invite-btn">
      <img src="../../images/invite/award-btn-on.png" class="display-bl margin-auto margin-t-1"  @click="toshare" width="94%">
      <p class="text-center" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关 </p>
    </div>
  </div>
</template>

<script>
  import {Utils, InviteShareUtils} from '../../service/Utils'
  export default {
    name: 'ActivityReward',
    data () {
      return {
        isiOS: false,
        inviteCount: 0,
        privilegedCapital: 0,
        details: [],
        pageSize: 10,
        page: 1,
        totalPage: 0
      }
    },
    created: function () {
      this.isiOS = Utils.isIos()
      this.InvitePrivilegedUsers()
      this.invitePrivilegedRewardStat()
      this.getInvitePrivilegedRewards()
    },
    methods: {
      getintervalDays: function (firstInvestTime) {
        var currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        var firstInvestDate = new Date(firstInvestTime)
        firstInvestDate.setHours(0, 0, 0, 0)
        var oneDay = 24 * 60 * 60 * 1000
        var intervalDays = 60 - parseInt((currentDate.getTime() - firstInvestDate.getTime()) / oneDay)
        return intervalDays > 0 ? intervalDays : 0
      },
      InvitePrivilegedUsers: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invitePrivilegedUsers'
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.inviteCount = response.data
          }
        })
      },
      invitePrivilegedRewardStat: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invitePrivilegedRewardStat'
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.privilegedCapital = response.data
          } else {
            this.privilegedCapital = {amount: 10000, profit: 66.666}
          }
        })
      },
      getInvitePrivilegedRewards: function (page, pageSize) {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invitePrivilegedRewards',
          data: {
            page: page,
            pageSize: pageSize
          }
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            // var details = response.data.data
            // this.totalPage = response.data.totalPage
            // for (var i = 0; i < details.length; i++) {
            //   this.details.push(details[i])
            // }
          } else {
            var details = [
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              },
              {
                activityId: null,
                amount: 5000,
                createTime: null,
                creditRightId: null,
                description: null,
                dueTime: null,
                firstInvestTime: 1493215321707,
                id: 154730,
                investAmount: 0,
                investUserId: null,
                mobile: '132****5315',
                profit: 0,
                registTime: 1493125733441,
                settleInvestAmount: 0,
                status: null,
                userId: null
              }
            ]
            this.totalPage = 3
            for (var i = 0; i < details.length; i++) {
              this.details.push(details[i])
            }
          }
        })
      },
      loadMore: function () {
        this.page = this.page + 1
        this.getInvitePrivilegedRewards(this.page)
      },
      setupWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
          callback(window.WebViewJavascriptBridge)
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
              callback(window.WebViewJavascriptBridge)
            },
            false
          )
        }
        if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
      },
      toshare: function () {
        var shareItem = InviteShareUtils.share()
        console.log(shareItem)
        this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.registerHandler('iOSPayResultHandler', function (data) {
            alert(data.name)
          })
          bridge.callHandler('IOS_Share', {
            'title': shareItem.title,
            'subTitle': shareItem.subTitle,
            'linkUrl': shareItem.linkUrl,
            'imageUrl': shareItem.imageUrl
          }, function (response) {
          })
        })
      }
    }
  }
</script>

<style>
.invite-reward {
  background: url('../../images/invite/award-bg.jpg') repeat-y center 0;
  background-size: cover;
  background-color: #f8902f;
  padding-bottom: 1.6rem;
}
.friend-ship {
  color: #fff;
  font-size: .34rem;
  font-weight: 800;
  margin: .2rem 0;
}
.invite-reward .head {
  padding-top: .9rem;
}
.invite-reward .head p {
  font-style: italic;
  -webkit-text-fill-color: #fff;/*文字的填充色*/
  -webkit-text-stroke: .3px #c52609;
  font-size: .26rem;
  font-weight: 600;
}
.invite-reward .head p span {
  -webkit-text-fill-color: #fcaf01;/*文字的填充色*/
  -webkit-text-stroke: 1px #c52609;
  font-size: 1rem;
  font-style: italic;
}
.con-invite-btn {
  position: fixed;
  margin: 0rem auto;
  width: 100%;
  max-width: 640px;
  z-index: 10;
  bottom: 0;
  background: #fa8535;
}
.con-invite-btn p {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
  font-size: .2rem;
  color: #fff;
}
.con-invite-btn img {
  margin: 0.1rem auto;
}
.invite-list {
  padding: 0 0.3rem;
  margin-bottom: .4rem;
  font-size: .23rem;
}
.table-wrap-wrap {
  border-radius: .1rem; 
  overflow: hidden;
}
.table-wrap {
  position: relative;
  border: 8px solid #cc4160;
  border-image: linear-gradient(#ca445d , #c95941) 30 30;
  background-clip: padding-box;
  background-image: linear-gradient(#ea4555,#e85d36);
  overflow-y: scroll;
  overflow-x: hidden;
  height: 4.5rem; 
} 
.table-wrap table {
  width: 100%;
  margin: .1rem 0;
}
.table-wrap table tbody:last-child tr:last-child td {
  border-bottom: none !important;
}
.table-wrap table td {
  padding: 10px 0;
  text-align: center;
  width: 33%;
  color: #fff;
  position: relative;
  transform: scale(0.9);
}
.table-wrap table td img {
  position: absolute;
  width: 67%;
  top: 0;
  left: 34%;
}
.table-wrap table td.bd-right {
  border-right: 1px solid #bf1619;
}
.table-wrap table td.bd-bottom {
  border-bottom: 1px solid #bf1619; 
}
.table-wrap table td.color_grey {
  color: #cdcbce;
}
.table-wrap::after{
  position: absolute;
  top: -4px; bottom: -4px;
  left: -4px; right: -4px;
  background: linear-gradient(#ea4555,#e85f35);
  content: '';
  z-index: -1;
  border-radius: 10px;
}
.part2 {
  display: flex;
  justify-content: space-between;
  padding: 0 3%;  
}
.part2 div {
  display: inline-block;
  width: 48.5%;
  text-align: center;
  border-radius: .2rem;
  margin-bottom: .3rem;
  background-size: cover;
  padding-bottom: .2rem;
  font-weight: 500;
}
.part2 div p {
  line-height: .2rem;
  color: #fff;
}
.part2 div p:first-child {
  margin: .2rem 0 .1rem;
  font-size: .3rem;
}
.part2 div p:last-child {
  font-size: .24rem;
}
.part2 div:first-child {
  background-color: #9d3bc4;
  background: url('../../images/invite/award-bg2.png') no-repeat 0 0;
  background-size: 100% 100%;
}
.part2 div:last-child {
  background-color: #feae01;
  background: url('../../images/invite/award-bg1.png') no-repeat 0 0;
  background-size: 100% 100%;
}
</style>
