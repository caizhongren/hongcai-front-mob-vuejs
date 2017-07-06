<template>
  <div class="project" id="project" v-auto-height>
    <div class="fist-frame product-page1 animate" id="product-page1">
      <div class="project-detail-top bg-white">
        <p class="ft-Arial"><span>{{project.annualEarnings}}</span>%</p>
        <p class="second">期望年均回报率</p>
        <div class="tip-list">
          <span class="tip-item tip-item1"><span class="font-Arial margin-0">100</span>元起投</span>
          <span class="tip-item tip-item2"><span class="font-Arial margin-0">{{project.projectDays}}</span>天项目期</span>
        </div>
        <div class="project-process clearfix">
          <div class="start-circle fl">
            <div class="start-circle-center"></div>
          </div>
          <div class="process-bar fl">
            <div class="process-inner-bar fl" v-bind:style="{width:processWith + '%'}"></div>
            <img src="../images/project/process-btn.png" class="fl" v-bind:style="{left:processWith - 5 + '%'}">
            <div class="process-tip" v-bind:style="{left:processWith - 2 + '%'}">{{processWith}}%</div>
          </div>
          <div class="end-circle fr" v-show="processWith < 100">
            <div class="end-circle-center"></div>
          </div>
        </div>
        <p class="remain-amount">剩余可投<span>{{project.amount | number}}</span>元</p>
        <p class="actual-amount">投资<span>10,000.00</span>元，预计收益<span>{{expectEarning}}</span>元</p>
      </div>
      <div class="project-detail-bottom bg-white">
        <div class="detail-item">
          <span>计息日期：</span>投资成功，当日计息
        </div>
        <div class="detail-item">
          <span>还款方式：</span>按月付息，到期还本
        </div>
        <div class="detail-item">
          <span>募集提示：</span>该项目将于募集结束后，进入锁定期
        </div>
        <div class="detail-item" v-if="project.status === 7">
          <span>项目状态：</span>融资中
        </div>
        <div class="detail-item" v-if="project.status === 6">
          <span>项目状态：</span>预发布
        </div>
        <div class="detail-item" v-if="project.status === 9">
          <span>项目状态：</span>还款中
        </div>
        <div class="detail-item" v-if="project.status === 8">
          <span>项目状态：</span>融资成功
        </div>
        <div class="detail-item" v-if="project.status === 10">
          <span>项目状态：</span>还款完成
        </div>
        <div class="detail-item" v-if="project.status === 11">
          <span>项目状态：</span>预约中
        </div>
      </div>
      <div class="drop-load">
        向上滑动查看更多详情
      </div>
    </div>
    <!--更多详情页面-->
    <div class="more-details product-page2 animate">
      <div id="detail-tabs" class="detail-tabs-wrapper">
        <div class="tabs sum-4">
          <div class="clearfix">
            <div class="tab" v-for="(tab, index) in detailTabs" :class="{active: activeTab == index}" @click="toggleTab(index)">
              <p>{{tab}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="child">下滑返回详情首页</div>
      <div class="scroll">
        <div class="details-more">
          <div class="project-details" v-show="activeTab === 0">
            <div class="project-brief">
              <div class="title">
                <span></span>
                <p>项目简介</p>
              </div>
              <div class="content" v-html="projectInfo.description"></div>
            </div>
            <div class="project-brief">
              <div class="title">
                <span></span>
                <p>资金用途</p>
              </div>
              <div class="content" v-html="projectInfo.financingPurpose"></div>
            </div>
            <div class="project-brief">
              <div class="title">
                <span></span>
                <p>还款来源</p>
              </div>
              <div class="content" v-html="projectInfo.repaymentSource"></div>
            </div>
            <div class="project-brief">
              <div class="title">
                <span></span>
                <p>项目评级</p>
              </div>
              <div class="content">
                <p v-html="projectInfo.riskManagementInfo"><span></span></p>   
              </div>
            </div>
            <div class="project-brief" v-show="projectInfo.riskControl && projectInfo.riskControl.length>0">
              <div class="title">
                <span></span>
                <p>风控审核</p>
              </div>
              <div class="content">
                <p v-html="projectInfo.riskControl"><span></span></p>
              </div>
            </div>
          </div>
          <div v-show="activeTab === 1" class="business-license project-details bg-white">
            <div class="project-brief">
              <div class="content">
                <ul class="license-list">
                  <li class="license-item" v-show="categoryCode !== '0115'" v-for="(contract, index) in contractThumbnailFileList" @click="preview(index, $event, contractOriginalFileList)">
                    <img v-bind:src="baseFileUrl + contract.uploadFile.url" width="100%" height="100%">
                  </li>
                  <li class="license-item" v-show="categoryCode !=='0112' && categoryCode !== '0115' && categoryCode !== '0116'" @click="preview(index, $event, enterpriseOriginalFileList)" v-for="(enterPrise, index) in enterpriseThumbnailFileList">
                    <img v-bind:src="baseFileUrl + enterPrise.uploadFile.url" width="100%" height="100%">
                  </li>
                  <li class="license-item" v-show="projectThumbnailFileList.length > 0" @click="preview(index, $event, projectOriginalFileList)" v-for="(project, index) in projectThumbnailFileList">
                    <img v-bind:src="baseFileUrl + project.uploadFile.url" width="100%" height="100%">
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="orders" v-show="activeTab == 2">
            <div class="investor-record">
              <table>
                <thead>
                  <tr>
                    <th>成交时间</th>
                    <th>用户名</th>
                    <th>投资金额(元)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orderList" :key="order.id" v-show="orderList && orderList.length >0 ">
                    <td>{{order.createTime | date}}</td>
                    <td>{{order.userName}}</td>
                    <td>{{order.orderAmount}}</td>
                  </tr>
                  <tr class="text-center" v-show="orderList && orderList.length <=0 ">
                    <td colspan="3">
                      <img src="../images/project/no-record.png" width="35%" class="no-record">
                      <p class="ft-grey4 margin-b-0 margin-t-1p5">暂无记录</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="drop-load" @click="loadMoreOrder()" v-if="page<totalPage">
                查看更多
              </div>
            </div>
          </div>
          <div v-show="activeTab === 3" class="repayment-plan bg-white">
            <div class="each-line" v-for="preRepayment in preRepaymentList">
              <div class="column1"><span v-show="preRepayment.status !== 1">预计</span>{{preRepayment.repaymentTime | date}}</div>
              <div class="column2">
                <span class="circle"></span>
                <span class="vertical-line"></span>
              </div>
              <div class="column3">
                项目回款:利息{{preRepayment.repaymentInterest | number}}元
              </div>
            </div>
            <div class="each-line">
              <div class="column1"><span v-show="final.status !== 1">预计</span>{{final.repaymentTime | date}}</div>
              <div class="column2">
                <span class="circle"></span>
                <span class="vertical-line last-line"></span>
              </div>
              <div class="column3">
                项目回款:本金{{final.repaymentPrincipal | number}}元
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="invest-fixed-btn" :class="{'disable-btn': project.status !== 7 }" v-if="project.status === 7" @click="toInvest()">立即投资</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 6">预发布</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 8">融资成功</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 9">还款中</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 10">还款完成</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 11">预约中</p>
  </div>
</template>
<script>
  import {Utils, bridgeUtil} from '../service/Utils'
  import $ from 'jquery'
  export default {
    name: 'projectDetail',
    data () {
      return {
        project: {},
        projectInfo: {
          description: '',
          financingPurpose: '',
          repaymentSource: '',
          riskManagementInfo: '',
          riskControl: ''
        },
        orderList: [],
        paramsNum: 0,
        projectId: 0,
        expectEarning: 0,
        processWith: 0,
        activeTab: 0,
        detailTabs: ['项目详情', '相关资料', '投资记录', '还款计划'],
        pageSize: 10,
        page: 1,
        totalPage: 1,
        isIos: Utils.isIos(),
        isAndroid: Utils.isAndroid(),
        categoryCode: '0115',
        final: {},
        preRepaymentList: {},
        contractOriginalFileList: [],
        contractThumbnailFileList: [],
        enterpriseOriginalFileList: [],
        enterpriseThumbnailFileList: [],
        projectOriginalFileList: [],
        projectThumbnailFileList: [],
        baseFileUrl: 'http://test321.hongcai.com/uploads/'
      }
    },
    created: function () {
      this.paramsNum = this.$route.params.number
      this.getProject()
      this.getProjectRisk()
      this.getFiles()
      this.getProjectBill()
      bridgeUtil.setupWebViewJavascriptBridge()
      window.vue = this
      window.onload = function (e) {
        var page1 = document.querySelector('.product-page1')
        var page2 = document.querySelector('.product-page2')
        var pagedetail = document.querySelector('.details-more')
        if (page1) {
          page1.addEventListener('load', window.vue.scrollDetail(page1), false)
        }
        if (page2 && pagedetail) {
          page2.addEventListener('load', window.vue.scrollBack(pagedetail), false)
        }
        document.querySelector('.scroll').style.height = window.innerHeight - 2 * document.querySelector('#detail-tabs').offsetHeight - 20 + 'px'
      }
    },
    methods: {
      toggleTab: function (i) {
        this.activeTab = i
        document.querySelector('.details-more').style.webkitTransform = 'translateY(' + 0 + 'px)'
        this.orderList = []
        this.page = 1
        i === 2 ? this.getOrderList(this.page, this.pageSize) : ''
      },
      getProject: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.paramsNum
        }).then((response) => {
          this.project = response.data
          document.title = this.project.name
          var proWidth = (this.project.total - this.project.amount) / this.project.total * 100
          this.processWith = parseInt(proWidth) === proWidth ? proWidth : proWidth.toFixed(1)
          this.expectEarning = (10000 * this.project.annualEarnings * this.project.projectDays / 36500).toFixed(2)
          this.projectId = response.data.id
          this.getProjectInfo()
        })
      },
      getProjectInfo: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.projectId + '/info'
        }).then((response) => {
          this.projectInfo = response.data
        })
      },
      getFiles: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/projects/' + that.paramsNum + '/files'
        }).then((res) => {
          that.categoryCode = res.data.category.code
          that.contractOriginalFileList = res.data.contractOriginalFileList
          that.contractThumbnailFileList = res.data.contractThumbnailFileList
          that.enterpriseOriginalFileList = res.data.enterpriseOriginalFileList
          that.enterpriseThumbnailFileList = res.data.enterpriseThumbnailFileList
          that.projectOriginalFileList = res.data.projectOriginalFileList
          that.projectThumbnailFileList = res.data.projectThumbnailFileList
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      getProjectRisk: function () {
        this.$http({
          method: 'post',
          url: '/hongcai/api/v1/siteProject/getProjectRisk?number=' + this.paramsNum
        }).then((response) => {
          this.projectInfo.riskControl = response.data.data.riskControl
        })
      },
      getOrderList: function (page, pageSize) {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.paramsNum + '/orders?page=' + page + '&pageSize=' + pageSize
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.totalPage = response.data.totalPage
            if (response.data.data.length >= 1) {
              for (var i = response.data.data.length - 1; i >= 0; i--) {
                this.orderList.push(response.data.data[i])
              }
            }
          }
        })
      },
      getProjectBill: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/projects/' + that.paramsNum + '/projectBills'
        }).then(function (res) {
          that.preRepaymentList = res.data
          that.final = that.preRepaymentList[that.preRepaymentList.length - 1]
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      loadMoreOrder: function () {
        if (this.page >= this.totalPage) {
          return
        }
        this.page += 1
        this.getOrderList(this.page, this.pageSize)
      },
      toInvest: function () {
        var that = this
        var callHandlerCallback = function (response) {}
        var nativeNeedDatas = {
          'amount': that.project.amount,
          'annualEarnings': that.project.annualEarnings,
          'projectDays': that.project.projectDays,
          'projectId': that.project.id,
          'number': that.project.number
        }
        bridgeUtil.webConnectNative('HCNative_ImmediateInvestment', 'HCWeb_LoginSuccess', nativeNeedDatas, callHandlerCallback, null)
      },
      preview: function (i, e, tar) {
        var that = this
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': that.baseFileUrl + tar[i].uploadFile.url}, function (response) {}, function (data) {})
      },
      CaptureTouch: function (t) {
        function e (e) {
          var n
          var s = e.targetTouches[0]
          if (s.pageX || s.pageY) {
            n = s.pageY
          } else {
            n = s.clientY + document.body.scrollTop + document.documentElement.scrollTop
          }
          n -= t.offsetTop
          a.y = n
        }
        var a = {
          y: null
        }
        return [t.addEventListener('touchstart', function (t) {
          e(t)
        }, !1),
          t.addEventListener('touchend', function (t) {
            a.y = null
          }, !1),
          t.addEventListener('touchmove', e, !1), a]
      },
      scrollDetail: function (page) {
        var Height = window.innerHeight
        window.touch = this.CaptureTouch(page)
        window.offsetY = 0
        window.touchStartY = 0
        window.speed = 0
        var touchY = 1
        page.addEventListener('touchstart', startTouchScroll, false)
        page.addEventListener('touchmove', moveTouchScroll, false)
        page.addEventListener('touchend', endTouchScroll, false)
        function startTouchScroll (event) {
          // event.preventDefault()
          window.touchStartY = window.touch[3].y
          window.offsetY = 0
          document.querySelector('#product-page1').classList = 'fist-frame product-page1 animate'
        }
        function moveTouchScroll (event) {
          // event.preventDefault()
          window.offsetY += 0.25 * (window.touch[3].y - window.touchStartY)
          window.touchStartY = window.touch[3].y
          touchY = window.offsetY
          console.log(window.offsetY)
          if (window.offsetY <= 0 && window.offsetY < -1) {
            page.style.webkitTransform = 'translate3d(0, ' + window.offsetY + 'px, 0)'
          }
        }
        function endTouchScroll (event) {
          // event.preventDefault()
          window.speed = -(document.body.clientHeight - Math.abs(window.offsetY)) / 10
          window.offsetY += window.speed
          if (touchY < -1) {
            page.style.webkitTransform = 'translate3d(0, -' + Height + 'px, 0)'
            var page2 = document.querySelector('.product-page2')
            page2.style.webkitTransform = 'translate3d(0, -' + Height + 'px, 0)'
            document.querySelector('.details-more').style.webkitTransform = 'translateY(' + 0 + 'px)'
          }
        }
      },
      scrollBack: function scrollBack (page) {
        window.vue = this
        var scrollDirection = 0
        var offsetY = 0
        var touchStartY = 0
        var scrollTop = 0
        page.addEventListener('touchstart', startTouchScroll, true)
        page.addEventListener('touchmove', moveTouchScroll, true)
        page.addEventListener('touchend', endTouchScroll, true)
        function startTouchScroll (event) {
          // event.preventDefault()
          document.querySelector('.scroll').classList.remove('animate')
          touchStartY = event.targetTouches[0].pageY
          offsetY = 0
          scrollTop = $('.scroll').offset().top
        }
        function moveTouchScroll (event) {
          // event.preventDefault()
          offsetY += 0.25 * (event.targetTouches[0].pageY - touchStartY)
          touchStartY = event.targetTouches[0].pageY
          scrollDirection = offsetY
          if (scrollDirection > 15 && $('.details-more').offset().top - screenTop >= 15) {
            // document.querySelector('.scroll').classList = 'scroll animate'
            document.querySelector('.scroll').style.webkitTransform = 'translateY(' + scrollDirection + 'px)'
          } else if (scrollTop === $('.details-more').offset().top) {
            // document.querySelector('.scroll').classList = 'scroll animate'
          }
        }
        function endTouchScroll (event) {
          // event.preventDefault()($('.scroll').offset().top)
          var sub = $('.scroll').offset().top - $('.details-more').offset().top
          if (scrollDirection === 0 && event.target.className === 'drop-load') {
            // window.vue.loadMoreOrder()
            return false
          } else if (sub === 0 && scrollDirection >= 35) {
            document.querySelector('.scroll').classList = 'scroll animate'
            setTimeout(function () {
              document.querySelector('.scroll').style.webkitTransform = 'translateY(0px)'
              document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, 0px, 0)'
              document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, 0px, 0)'
            }, 300)
            scrollDirection = 0
          } else if (sub === 0 && scrollDirection < 35) {
            document.querySelector('.scroll').style.webkitTransform = 'translateY(0px)'
          } else if (sub === 0) {
            offsetY = 0
          } else if (scrollDirection < -window.innerHeight) {
            scrollDirection = 0
          }
        }
      }
    }
  }
  document.querySelector('.details-more') ? console.log(document.querySelector('.details-more').scrollHeight) : ''
</script>

<style scoped>
  .child {
    position: absolute;
    top: 1.5rem;
    left: 35%;
    font-size: .2rem;
    background-color: #efeef4;
    color: #999;
  }
  .scroll {
    overflow: scroll;
    background: #fff;
    /*height: 8.5rem;*/
  }
  #product-page1.animate, .product-page2.animate, .scroll.animate {
    -webkit-transition:all .6s ease-in-out;
    -moz-transition:all .6s ease-in-out;
    -o-transition:all .6s ease-in-out;
    -ms-transition:all .6s ease-in-out;    
    transition:all .6s ease-in-out;
  }
  .more-details {
    background: #efeef4;
    margin-bottom: .98rem;
    height: 100%;
    position: relative;
    overflow: hidden;
    min-height: 10.4rem;
  }
  #detail-tabs {
    position: relative;
    height: .9rem;
    overflow: hidden;
    /*border-bottom: .05rem solid #efeef4;  */
    margin-bottom: .3rem;
    z-index: 99999;
  }
  .detail-tabs-wrapper, .reminder-tip {
    background: #fff;
  }
  #detail-tabs .tabs {
    position: absolute;
    background-color: #fff;
  }
  #detail-tabs .tabs.sum-4 {
    width: 100%;
    padding: 0 .2rem;
  }
  #detail-tabs .tabs.sum-4 .tab {
    width: 25%;
  }
  #detail-tabs .tab {
    position: relative;
    float: left;
    height: .9rem;
  }
  #detail-tabs .tab.active p {
    position: relative;
    color: #ff611d;
  }
  #detail-tabs .tab p {
    width: 100%;
    line-height: .9rem;
    text-align: center;
    color: #666666;
    font-size: .28rem;
  }
  .project-details {
    background-color: #efeef4;
  }
  .project-details .project-brief {
    background-color: #fff;
    padding: .3rem .4rem;
    margin-bottom: .3rem;
  }
  .project-details .project-brief .title {
    color: #ff611d;
    font-size: .27rem;
    margin-bottom: .2rem;
    text-align: left;
    height: .36rem;
    width: 1.5rem;
    border-bottom: 1px solid #ff611d;
  }
  .project-details .project-brief .title span {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    background-color: #ff611d;
    vertical-align: sub;
    position: relative;
    left: -7px;
  }
  .project-details .project-brief .title p {
    display: inline-block;
    margin-left: -5px;
  }
  .project-details .project-brief .content {
    color: #666;
    font-size: .24rem;
    text-align: justify;
  }
  .project-details .project-brief .content p span {
    display: inline-block;
    width: .12rem;
    height: .12rem;
    border-radius: 50%;
    background-color: #ff611d;
    margin: 1px .1rem 1px .1rem;
  }
   .invest-fixed-btn, .investBtn {
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    color: #fff;
    font-size: .28rem;
    background-color: #ff611d;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .invest-fixed-btn.disable-btn {
    background-color: #999;
  }
  #project {
    background-color: #efeef4;
    overflow: hidden;
    height: 100%;
  }
  .drop-load {
     font-size: .2rem;
     /*background-color: #efeef4;*/
     color: #999;
     padding: .25rem 0;
  }
  .project-detail-top {
    padding-top: 0.8rem;
    padding-bottom: 0.4rem;
    margin-bottom: .3rem;
  }
  .project-detail-top p.ft-Arial {
    color: #ff611d;
    font-size: 0.67rem;
    height: .96rem;
    line-height: .96rem;
    margin-bottom: .25rem;
  }
  .project-detail-top span {
    font-size: 1.2rem;
    margin-left: 7%;
  }
  .project-detail-top p.second {
    height: .2rem;
    line-height: .2rem;
    color: #fdb62b;
    font-size: .2rem;
    margin-bottom: .4rem;
  }
  .fist-frame {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .tip-list {
    color: #333;
    padding: 0 .38rem;
    display: flex;
    justify-content: space-between;
  }
  .tip-list span.tip-item {
    font-size: .29rem;
    margin-left: 0;
  }
  .tip-list span.tip-item span {
    font-size: .3rem;
    margin-left: 0;
  }
  .tip-list .tip-item1 {
    background: url('../images/project/icon01.png') no-repeat 0 2px;
    padding-left: .4rem;
    background-size: 18%;
  }
  .tip-list .tip-item2 {
    background: url('../images/project/icon02.png') no-repeat 0px 1px;
    padding-left: .42rem;
    background-size: 16%;
  }
  .project-process {
    width: 100%;
    padding: 0 .38rem;
    margin-top: .6rem;
    margin-bottom: .3rem;
  }
  .project-process .start-circle, .project-process .end-circle {
    width: .15rem;
    height: .15rem;
    background: #fff;
    position: relative;
    border-radius: 50%;
    margin-top: -0.05rem;
  }
  .project-process .start-circle {
    border: 1px solid #ff611d;
  }
  .project-process .end-circle {
    border: 1px solid #75c4f6;
  }
  .project-process .start-circle .start-circle-center, .project-process .end-circle .end-circle-center {
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0.014rem;
  }
  .project-process .start-circle .start-circle-center, .process-inner-bar {
    background: #ff611d;
  }
  .project-process .end-circle .end-circle-center, .process-bar {
    background: #75c4f6;
  }
  .process-bar {
    width: 96%;
    height: 2px;
    margin-bottom: -2px;
    position: relative
  }
  .process-bar .process-inner-bar {
    position: absolute;
    /*width: 80%;*/
    height: 2px;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .process-bar img {
    position: absolute;
    /*left: 75%;*/
    top: -0.18rem;
    width: 8%;
  }
  .process-bar .process-tip {
    width: .55rem;
    height: .35rem;
    background: url('../images/project/process-tip.png') no-repeat 0 0;
    background-size: 100% 100%;
    color: #fff;
    font-size: .18rem;
    text-align: center;
    line-height: .35rem;
    position: absolute;
    /*left: 79%;*/
    top: -0.5rem;
  }
  .remain-amount, .actual-amount {
    padding: 0 .38rem;
    font-size: .235rem;
    color: #444;
    height: .26rem;
    line-height: .26rem;
    text-align: left;
  }
  .remain-amount {
    margin-bottom: .28rem;
  }
  .remain-amount span, .actual-amount span {
    color: #ff611d;
    font-size: .24rem;
    margin-left: 0;
  }
  .project-detail-bottom {
    padding: 0 .38rem;
    text-align: left;
    color: #666;
    font-size: .25rem;

  }
  .project-detail-bottom .detail-item {
    height: .7rem;
    line-height: .7rem;
  }
  .project-detail-bottom span {
    color: #999;
  }
  .investor-record p {
    /*line-height: 1.8rem;*/
  }
  .investor-record table {
    width: 100%;
    background-color: #fff;
  }
  .investor-record table th {
    width: 33.3333%;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    color: #666;
    font-weight: normal;
    font-size: .28rem;
    border-bottom: 1px solid #ddd;
  }
  .investor-record table  td {
    text-align: center;
    border-color: #fff;
    height: .8rem;
    line-height: .8rem;
    color: #666;
    font-size: .24rem;
  }
  .investor-record table  tbody tr:nth-child(even) {
    background-color: #f8f9fd;
  }
  /*营业执照*/
  .details-more {
    background-color: #fff;
    min-height: 8.9rem;
  }
  .business-license .project-brief {
    margin-bottom: 0;
  }
  .business-license .project-brief .title{
    margin-bottom: .3rem;
  }
  .business-license .project-brief .content .license-list {
    width: 100%;
  }
  .content .license-list .license-item {
    width: 2.6rem;
    height: 2.6rem;
    display: inline-block;
    border: 1px solid #fdb62b;
    margin-bottom: .3rem;
  }
  .license-item:nth-child(even) {
    float: right;
  }
  .overlay{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:999;
    background: rgba(0, 0, 0, 1);
    width:100%;
    height:100%;
    display:none;
  }
  .overlay img{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:9999;
  }
  /*还款计划*/
  .repayment-plan {
    padding: 0;
    width: 100%;
    padding: .5rem .35rem 0;
    min-height: 9.2rem;
  }
  .column1, .column2, .column3{
    display: inline-block;
  }
  .repayment-plan .each-line {
    height: 1.22rem;
  }
  .repayment-plan .each-line .column1{
    width: 32%;
    font-size: .24rem;
    color: #999;
    text-align: left;
    margin-top: -.4rem;
    vertical-align: text-top;
    height: 100%;
  }
  .repayment-plan .each-line .column2{
    width: 5%;
    position: relative;
    padding-left: .15rem;
  }
  .column2 .circle {
    width: .12rem;
    height: .12rem;
    border-radius: 50%;
    background-color: #ff611d;
    box-shadow: 0 2px 16px #ff611d, 0 0 2px #ff611d, 0 0 2px #ff611d;
    display: block;
  }
  .column2 .circle:last-child {
    position: absolute;
    bottom: -.8rem;
   }
  .column2 .vertical-line {
    height: .98rem;
    width: 1px;
    background-color: #ff611d;
    display: block;
    margin-left: .05rem;
    margin-top: .07rem;
    margin-bottom: -0.6rem;
  }
  .column2 .vertical-line.last-line {
    opacity: 0;
  }
  .column3 {
    padding-left: .2rem;
    width: 59.5%;
    color: #666;
    font-size: .25rem;
    text-align: left;
    height: 100%;
    vertical-align: top;
    margin-top: -.1rem;
  }
  .no-record {
    margin-top: 1rem;
  }
</style>
