<template>
  <div class="project" id="project">
    <div class="fist-frame product-page1" id="product-page1">
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
            <img src="../images/project/process-btn.png" class="fl" v-bind:style="{left:processWith - 4 + '%'}">
            <div class="process-tip" v-bind:style="{left:processWith + '%'}">{{processWith}}%</div>
          </div>
          <div class="end-circle fr">
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
    <div class="more-details product-page2">
      <div id="detail-tabs" class="detail-tabs-wrapper">
        <div class="tabs sum-4">
          <div class="clearfix">
            <div class="tab" v-for="(tab, index) in detailTabs" :class="{active: activeTab == index}" @click="toggleTab(index)">
              <p>{{tab}}</p>
            </div>
          </div>
        </div>
        <div class="iScrollHorizontalScrollbar iScrollLoneScrollbar" style="position: absolute; z-index: 9999; height: 7px; left: 2px; right: 2px; bottom: 0px; overflow: hidden; transform: translateZ(0px); transition-duration: 0ms; opacity: 0;">
          <div class="iScrollIndicator" style="box-sizing: border-box; position: absolute; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.9); border-radius: 3px; height: 100%; transition-duration: 0ms; display: none; width: 8px; transform: translate(-8px, 0px) translateZ(0px);">
          </div>
        </div>
      </div>
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
          <!--<div class="project-brief" v-show="projectInfo.riskControl && projectInfo.riskControl.length>0">
            <div class="title">
              <span></span>
              <p>风控审核</p>
            </div>
            <div class="content">
              <p v-html="projectInfo.riskControl"><span></span></p>
            </div>
          </div>-->
        </div>
        <div v-show="activeTab === 1" class="business-license project-details bg-white">
          <div class="project-brief">
            <div class="title">
              <span></span>
              <p>营业执照</p>
            </div>
            <div class="content">
              <ul class="license-list">
                <li class="license-item">
                  <img src="../images/project/icon01.png" width="100%" height="100%">
                </li>
                <li class="license-item">
                  <img src="../images/project/icon02.png" width="100%" height="100%">
                </li>
              </ul>
            </div>
          </div>
          <div class="project-brief">
            <div class="title">
              <span></span>
              <p>银行流水</p>
            </div>
            <div class="content">
              <ul class="license-list">
                <li class="license-item"></li>
                <li class="license-item"></li>
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
                <!--<tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>
                <tr>
                  <td class="ft-grey4">2015-02-12</td>
                  <td class="ft-blue">ffff</td>
                  <td><span class="ft-orange0">11111</span></td>
                </tr>-->
                <tr v-for="order in orderList" :key="order.id" v-show="orderList && orderList.length >0 ">
                  <td>{{order.createTime | date}}</td>
                  <td>{{order.userName}}</td>
                  <td>{{order.orderAmount}}</td>
                </tr>
                <tr class="text-center" v-show="orderList && orderList.length <=0 ">
                  <td colspan="3">
                    <!--<img src="/images/project/no-record.png" width="17%" class="margin-t-2">-->
                    <p class="ft-grey4 margin-b-0 margin-t-1p5">该项目暂未有人投资</p>
                    <p class="ft-grey4 margin-b-0">快做第一投资人吧</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="drop-load" @click="loadMoreOrder()">
              查看更多
            </div>
          </div>
        </div>
        <div v-show="activeTab === 3" class="repayment-plan bg-white">
          <div class="each-line">
            <div class="column1"><span>预计</span>2017-05-25至2017-06-01</div>
            <div class="column2">
              <span class="circle"></span>
              <span class="vertical-line"></span>
            </div>
            <div class="column3">
              项目回款:利息5,000.00元
            </div>
          </div>
          <div class="each-line">
            <div class="column1"><span>预计</span>2017-05-25至2017-06-01</div>
            <div class="column2">
              <span class="circle"></span>
              <span class="vertical-line"></span>
            </div>
            <div class="column3">
              项目回款:利息5,000.00元
            </div>
          </div> 
          <div class="each-line">
            <div class="column1"><span>预计</span>2017-05-25至2017-06-01</div>
            <div class="column2">
              <span class="circle"></span>
              <span class="vertical-line"></span>
            </div>
            <div class="column3">
              项目回款:利息5,000.00元
            </div>
          </div> 
          <div class="each-line">
            <div class="column1"><span>预计</span>2017-05-25至2017-06-01</div>
            <div class="column2">
              <span class="circle"></span>
              <span class="vertical-line"></span>
              <span class="circle"></span>
            </div>
            <div class="column3">
              项目回款:本金5,000,000.00元
            </div>
          </div>    
        </div>
      </div>
    </div>
    <p class="invest-fixed-btn" :class="{'disable-btn': project.status !== 7 }" v-if="project.status === 7">立即投资</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 6">预发布</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 8">融资成功</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 9">还款中</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 10">还款完成</p>
    <p class="invest-fixed-btn disable-btn" v-if="project.status === 11">预约中</p>
  </div>
</template>
<script>
  import axios from 'axios'
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
        activeTab: 2,
        detailTabs: ['项目详情', '相关资料', '投资记录', '还款计划'],
        pageSize: 2,
        page: 1,
        totalPage: 0
      }
    },
    created: function () {
      this.paramsNum = this.$route.params.number
      this.getProject()
      this.getProjectRisk()
      this.getOrderList(this.page, this.pageSize)
    },
    methods: {
      toggleTab: function (i) {
        this.activeTab = i
      },
      getProject: function () {
        axios({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.paramsNum
        }).then((response) => {
          this.project = response.data
          this.processWith = (this.project.total - this.project.amount) / this.project.total * 100
          this.expectEarning = (10000 * this.project.annualEarnings * this.project.projectDays / 36500).toFixed(2)
          this.projectId = response.data.id
          this.getProjectInfo()
        })
      },
      getProjectInfo: function () {
        axios({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.projectId + '/info'
        }).then((response) => {
          this.projectInfo = response.data
        })
      },
      getProjectRisk: function () {
        axios({
          method: 'post',
          url: '/hongcai/api/v1/siteProject/getProjectRisk?number=' + this.paramsNum
        }).then((response) => {
          this.projectInfo.riskControl = response.data.data.riskControl
        })
      },
      getOrderList: function (page, pageSize) {
        axios({
          method: 'get',
          url: '/hongcai/rest/projects/' + this.paramsNum + '/orders?page=' + page + '&pageSize=' + pageSize
        }).then((response) => {
          if (response.ret && response.ret !== -1) {
            this.totalPage = response.totalPage
            if (response.data.length >= 1) {
              for (var i = response.data.data.length - 1; i >= 0; i--) {
                this.orderList.push(response.data.data[i])
              }
            }
          }
          this.orderList = response.data.data
        })
      },
      loadMoreOrder: function () {
        if (this.page >= this.totalPage) {
          return
        }
        this.page += 1
        this.getOrderList()
      },
      load: function () {
        var e = document.querySelector('.product-page1')
        e.addEventListener('touchstart', touch, false)
        e.addEventListener('touchmove', touch, false)
        e.addEventListener('touchend', touch, false)
        function touch (e) {
          var event = e || window.e
          window.offsetY = 0
          switch (event.type) {
            case 'touchstart':
              // alert(111)
              break
            case 'touchend':
              // alert(222)
              event.preventDefault()
              setTimeout(function () {

                // document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, -640px, 0)'
                // document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, -640px, 0)'
              }, 1000)
              break
            case 'touchmove':
              event.preventDefault()
              console.log(window.offsetY)
              // alert(333)
              // document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, ' + 0 + 'px, 0)'
              // document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, ' + 0 + 'px, 0)'
              break
          }
        }
      }
    }
  }
  function CaptureTouch (t) {
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
  }
  window.onload = function (e) {
    var page1 = document.querySelector('.product-page1')
    var page2 = document.querySelector('.product-page2')
    var pagedetail = document.querySelector('.details-more')
    page1.style.height = window.innerHeight + 'px'
    page1.addEventListener('load', scrollDetail(page1), false)
    page2.addEventListener('load', scrollBack(pagedetail), false)
  }
  var Height = window.innerHeight
  function scrollDetail (page) {
    window.touch = CaptureTouch(page)
    window.offsetY = 0
    window.touchStartY = 0
    window.speed = 0
    var touchY = 1
    page.addEventListener('touchstart', startTouchScroll, false)
    page.addEventListener('touchmove', moveTouchScroll, false)
    page.addEventListener('touchend', endTouchScroll, false)
    function startTouchScroll (event) {
      event.preventDefault()
      window.touchStartY = window.touch[3].y
      window.offsetY = 0
    }
    function moveTouchScroll (event) {
      event.preventDefault()
      window.offsetY += 0.25 * (window.touch[3].y - window.touchStartY)
      window.touchStartY = window.touch[3].y
      touchY = window.offsetY < 0 ? -1 : 1
      if (window.offsetY <= 0) {
        page.style.webkitTransform = 'translate3d(0, ' + window.offsetY + 'px, 0)'
      }
    }
    function endTouchScroll (event) {
      event.preventDefault()
      window.speed = -(document.body.clientHeight - Math.abs(window.offsetY)) / 10
      window.offsetY += window.speed
      if (touchY < 0) {
        page.style.webkitTransform = 'translate3d(0, ' + -Height + 'px, 0)'
        document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, ' + -Height + 'px, 0)'
      }
    }
  }
  function scrollBack (page) {
    window.offsetY = 0
    var touchY = 1
    page.addEventListener('touchstart', startTouchScroll, false)
    page.addEventListener('touchmove', moveTouchScroll, false)
    page.addEventListener('touchend', endTouchScroll, false)
    function startTouchScroll (event) {
      event.preventDefault()
    }
    function moveTouchScroll (event) {
      event.preventDefault()
      touchY = window.offsetY < 0 ? -1 : 1
      document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, ' + -Height + 'px, 0)'
      document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, ' + -Height + 'px, 0)'
    }
    function endTouchScroll (event) {
      event.preventDefault()
      if (touchY <= 0) {
        setTimeout(function () {
          document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, 0px, 0)'
          document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, ' + Height + 'px, 0)'
        }, 200)
      }
    }
  }
</script>

<style scoped>
  .more-details {
    background: #efeef4;
    margin-bottom: .98rem;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  #detail-tabs {
    position: relative;
    height: .9rem;
    overflow: hidden;
    /*border-bottom: .05rem solid #efeef4;  */
    margin-bottom: .3rem;
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
    font-size: .3rem;
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
    font-size: .28rem;
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
    height: .98rem;
    line-height: .98rem;
    color: #fff;
    font-size: .3rem;
    background-color: #ff611d;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
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
     font-size: .22rem;
     background-color: #efeef4;
     color: #999;
     padding: .45rem 0;
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
    font-size: .21rem;
    margin-bottom: .52rem;
  }
  .fist-frame {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .tip-list {
    color: #333;
    padding: 0 .4rem;
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
    padding: 0 .4rem;
    margin-top: .8rem;
    margin-bottom: .4rem;
  }
  .project-process .start-circle, .project-process .end-circle {
    width: .2rem;
    height: .2rem;
    background: #fff;
    position: relative;
    border-radius: 50%;
    margin-top: -0.1rem;
  }
  .project-process .start-circle {
    border: 1px solid #ff611d;
  }
  .project-process .end-circle {
    border: 1px solid #75c4f6;
  }
  .project-process .start-circle .start-circle-center, .project-process .end-circle .end-circle-center {
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0.023rem;
  }
  .project-process .start-circle .start-circle-center, .process-inner-bar {
    background: #ff611d;
  }
  .project-process .end-circle .end-circle-center, .process-bar {
    background: #75c4f6;
  }
  .process-bar {
    width: 93%;
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
    top: -0.23rem;
    width: 10%;
  }
  .process-bar .process-tip {
    width: .6rem;
    height: .4rem;
    background: url('../images/project/process-tip.png') no-repeat 0 0;
    background-size: 100% 100%;
    color: #fff;
    font-size: .21rem;
    text-align: center;
    line-height: .36rem;
    position: absolute;
    /*left: 79%;*/
    top: -0.57rem;
  }
  .remain-amount, .actual-amount {
    padding: 0 .4rem;
    font-size: .24rem;
    color: #444;
    height: .26rem;
    line-height: .26rem;
    text-align: left;
  }
  .remain-amount {
    margin-bottom: .4rem;
  }
  .remain-amount span, .actual-amount span {
    color: #ff611d;
    font-size: .25rem;
    margin-left: 0;
  }
  .project-detail-bottom {
    padding: 0 .4rem;
    text-align: left;
    color: #666;
    font-size: .26rem;

  }
  .project-detail-bottom .detail-item {
    height: .83rem;
    line-height: .9rem;
  }
  .project-detail-bottom span {
    color: #999;
  }
  .investor-record p {
    line-height: 1.8rem;
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
    font-size: .3rem;
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
  .business-license .project-brief {
    margin-bottom: 0;
  }
  .business-license .project-brief .title{
    margin-bottom: .46rem;
  }
  .business-license .project-brief .content .license-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .content .license-list .license-item {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #fdb62b;
    margin-bottom: .65rem;
  }
  /*还款计划*/
  .repayment-plan {
    padding: 0;
    width: 100%;
    padding: .7rem .38rem 0;
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
  }
  .repayment-plan .each-line .column2{
    width: 5%;
    position: relative;
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
  .column3 {
    padding-left: .2rem;
    width: 60%;
    color: #666;
    font-size: .28rem;
    text-align: left;
    height: 100%;
    vertical-align: top;
  }
</style>
