<template>
  <div class="invite-reward overflow-hid" v-auto-height>
    <ul class="recordTitle">
      <li :class="{active: activeTab == 0}" @click="switchTab(0)">加成佣金</li>
      <li :class="{active: activeTab == 1}" @click="switchTab(1)">受邀好友</li>
    </ul>
    <div class="recordBox">
      <div class="recordList">
        <!-- 加成佣金 -->
        <div class="rewardRecord" v-if="activeTab === 0">
          <div v-if="loading && rewardList.length > 0">
            <div class="total">累计获得佣金返现：{{totalCommission}}元</div>
            <ul class="rewardTitle">
              <li>日期</li>
              <li>受邀好友</li>
              <li>获得佣金</li>
            </ul>
            <div class="scrollBox">
              <table>
                <tbody>
                  <tr v-for="item in rewardList">
                    <td>{{item.commissionSendTime | date('.')}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.commission}}元</td>
                  </tr>
                  <tr v-if="rewardTotalPage > rewardPage" class="loadMore" @click="loadMore(rewardPage)"><td colspan="3">查看更多</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="loading && rewardList.length <= 0" class="noInvestRecord">
            <p>暂无数据</p>
          </div>
        </div>
        <!-- 受邀好友 -->
        <div class="investRecord" v-if="activeTab === 1">
          <div v-if="loading && investList.length > 0">
            <div class="total">成功受邀注册人数：{{inviteNum}}人</div>
            <ul class="investTitle">
              <li>注册时间</li>
              <li>受邀好友</li>
              <li>注册/出借</li>
            </ul>
            <div class="scrollBox">
              <table>
                <tbody>
                  <tr v-for="item in investList">
                    <td>{{item.createTime | date('.')}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.investAmount <= 0 ? '已注册' : '已出借'}}</td>
                  </tr>
                  <tr v-if="investTotalPage > investPage" class="loadMore" @click="loadMore(investPage)"><td colspan="4">查看更多</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="loading && investList.length <= 0" class="noInvestRecord">
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fix-btn" @click="toShare">继续邀请好友</div>
  </div>
</template>

<script>
  import {InviteShareUtils, bridgeUtil} from '../../service/Utils'
  export default {
    name: 'ActivityReward',
    data () {
      return {
        totalCommission: 0,
        inviteNum: 0,
        activeTab: 0,
        rewardList: [],
        investList: [],
        pageSize: 10,
        investPage: 1,
        investTotalPage: 2,
        rewardPage: 1,
        rewardTotalPage: 2,
        loading: false,
        version: 310
      }
    },
    created: function () {
      if (this.token) {
        this.activeTab === 1 ? this.getInviteNum() : this.getTotalCommission()
        this.activeTab === 1 ? this.getInvestRecords(this.investPage, this.pageSize) : this.getCommissionRecords(this.rewardPage, this.pageSize)
        this.getVoucher()
        this.getVersion()
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '') {
          this.activeTab === 1 ? this.getInviteNum() : this.getTotalCommission()
          this.activeTab === 1 ? this.getInvestRecords(this.investPage, this.pageSize) : this.getCommissionRecords(this.rewardPage, this.pageSize)
          this.getVoucher()
          this.getVersion()
        }
      }
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
      toShare: function () {
        if (!this.token || this.token === '') {
          this.toLogin()
          return
        }
        var shareItem = InviteShareUtils.share(this.voucher)
        var nativeNeedDatas = {
          'HC_shareType': 1,
          'title': shareItem.title,
          'subTitle': shareItem.subTitle,
          'url': shareItem.linkUrl,
          'imageUrl': shareItem.imageUrl
        }
        var nativeName = 'HCNative_Share'
        this.version >= 310 ? nativeName = 'HCNative_InviteShare' : nativeName = 'HCNative_Share'
        bridgeUtil.webConnectNative(nativeName, null, nativeNeedDatas, function (response) {}, null)
      },
      switchTab: function (index) {
        if (this.activeTab !== index) {
          this.activeTab = index
          this.loading = false
          if (index === 1) {
            this.investList = []
            this.investPage = 1
            this.getInviteNum()
            this.getInvestRecords(this.investPage, this.pageSize)
          } else {
            this.rewardList = []
            this.rewardPage = 1
            this.getTotalCommission()
            this.getCommissionRecords(this.rewardPage, this.pageSize)
          }
        }
      },
      getTotalCommission: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invite/totalCommission?token=' + that.token
        }).then((response) => {
          that.totalCommission = response.data
        })
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
      getInvestRecords (page, pageSize) {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invite/friends?token=' + this.token + '&page=' + page + '&pageSize=' + pageSize
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.loading = true
            var investList = response.data.data
            this.investTotalPage = Math.ceil(response.data.total / this.pageSize)
            console.log(this.investTotalPage)
            for (var i = 0; i < investList.length; i++) {
              this.investList.push(investList[i])
            }
          }
        })
      },
      getCommissionRecords: function (page, pageSize) {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invite/commissionRecords?token=' + this.token + '&page=' + page + '&pageSize=' + pageSize
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.loading = true
            var rewardList = response.data.data
            this.rewardTotalPage = Math.ceil(response.data.total / this.pageSize)
            for (var i = 0; i < rewardList.length; i++) {
              this.rewardList.push(rewardList[i])
            }
          }
        })
      },
      loadMore (indexPage) {
        var page = (indexPage + 1)
        if (this.activeTab === 1) {
          this.getInvestRecords(page, this.pageSize)
          this.investPage = page
        } else {
          this.getCommissionRecords(page, this.pageSize)
          this.rewardPage = page
        }
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
      }
    }
  }
</script>

<style scoped>
.fix-btn {
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
}
.invite-reward {
  background: #060547;
  padding: 0.7rem .25rem .5rem;
  overflow: hidden;
  position: fixed;
  width: 100%;
  max-width: 720px;
  z-index: 99;
}
ul.recordTitle {
  overflow: hidden;
  clear: both;
  width: 100%;
  font-size: .28rem;
  position: relative;
  height: 1rem;
}
ul.recordTitle li span {
  font-size: .2rem;
  display: block;
  font-weight: normal;
  margin-top: -.15rem;
}
ul.recordTitle li {
  width: 28%;
  height: .6rem;
  line-height: .65rem;
  background-color: #160d6d;
  border: solid 1px #4464e0;
  color: #fefefe;
  position: absolute;
  bottom: 0;
}
ul.recordTitle li.active {
  background-color: #4464e0;
  height: .8rem;
  line-height: .85rem;
}
ul.recordTitle li:nth-child(1) {
  left: 0;
  border-top-left-radius: .2rem;
}
ul.recordTitle li:nth-child(2) {
  left: 28.5%;
  border-top-right-radius: .2rem;
}
.recordBox .total {
  font-size: .3rem;
  color: #fff3f3;
  margin: .4rem auto .3rem;
}
.recordList {
  border-radius: .2rem;
  border-top-left-radius: 0rem;
  background-color: #160d6d;
  border: solid 1px #4464e0;
  margin-top: -1px;
  height: 7.1rem;
}
.investRecord table, .rewardRecord table {
  width: 100%;
  margin: 0 auto;
  font-size: .24rem;
}
.investRecord table tbody, .rewardRecord table tbody {
  font-family: ArialMT;
  color: #fff;
  height: .8rem;
  line-height: .8rem;
}
.investRecord table tbody tr:nth-child(even), .rewardRecord table tbody tr:nth-child(even) {
  background-color: #232a9c;
}
.rewardRecord table tbody tr td {
  width: 33.333%;
}
.rewardRecord table tbody tr td:nth-child(2) {
  width: 35%;
}
.investRecord table tbody tr td {
  width: 33.33%;
}
.loadMore {
  text-align: center;
  margin:  0 auto;
}
.noInvestRecord {
  width: 48%;
  height: 2.3rem;
  background: url('../../images/invite/activityEnd.png') no-repeat center center;
  background-size: 100% 100%;
  font-size: .25rem;
  color: #4f0709;
  margin: 0 auto;
}
.noInvestRecord p {
  padding: .35rem .48rem;
  text-align: right;
  color: #060547;
  font-size: .28rem;
  margin-top: 2.5rem;
}
.scrollBox {
  height: 5.2rem;
  overflow: scroll;
}
.investTitle, .rewardTitle {
  overflow: hidden;
  clear: both;
  background-color: #232a9c;
  color: #fff;
  height: .55rem;
  line-height: .55rem;
  width: 100%;
}
.rewardTitle li, .investTitle li {
  float: left;
  width: 33.333%;
  font-size: .25rem;
}
.rewardTitle li:nth-child(2) {
  width: 35%;
}
.rewardTitle li:nth-child(3) {
  width: 31.3%;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .recordList {
    height: 10rem;
  }
  .scrollBox {
    height: 8rem;
  }
}
</style>
