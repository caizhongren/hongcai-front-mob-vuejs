<template>
  <div class="invite-reward overflow-hid" v-auto-height>
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
  import {Utils, InviteShareUtils, bridgeUtil, getToken} from '../../service/Utils'
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
        totalPage: 1,
        token: ''
      }
    },
    created: function () {
      this.token = getToken()
      this.isiOS = Utils.isIos()
      this.InvitePrivilegedUsers()
      this.invitePrivilegedRewardStat()
      this.getInvitePrivilegedRewards(this.page, this.pageSize)
      this.getVoucher()
      bridgeUtil.setupWebViewJavascriptBridge()
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
          url: '/hongcai/rest/activitys/invitePrivilegedUsers?token=' + this.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.inviteCount = response.data.data
          }
        })
      },
      invitePrivilegedRewardStat: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invitePrivilegedRewardStat?token=' + this.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.privilegedCapital = response.data
          }
        })
      },
      getInvitePrivilegedRewards: function (page, pageSize) {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invitePrivilegedRewards?page' + page + '&pageSize=' + pageSize + '&token=' + this.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            var details = response.data.data
            this.totalPage = response.data.totalPage
            for (var i = 0; i < details.length; i++) {
              this.details.push(details[i])
            }
          }
        })
      },
      loadMore: function () {
        this.page = this.page + 1
        this.getInvitePrivilegedRewards(this.page, this.pageSize)
      },
      getVoucher: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/voucher?token=' + that.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            that.voucher = response.data.inviteCode
          }
        })
      },
      toshare: function () {
        var shareItem = InviteShareUtils.share(this.voucher)
        //   var linkUrl = location.href.split('#')[0]
        console.log(shareItem)
        //   console.log(linkUrl)
        var nativeNeedDatas = {
          'HC_shareType': 1,
          'title': shareItem.title,
          'subTitle': shareItem.subTitle,
          'url': shareItem.linkUrl,
          'imageUrl': shareItem.imageUrl
        }
        bridgeUtil.webConnectNative('HCNative_Share', null, nativeNeedDatas, function (response) {
          alert('分享成功')
        }, null)
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
  padding-top: .6rem;
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
  border-radius: 5px; 
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
  height: 4rem; 
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
