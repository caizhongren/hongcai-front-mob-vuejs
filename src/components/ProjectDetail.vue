<template>
  <div class="project" id="project">
    <div class="fist-frame product-page1">
      <div class="project-detail-top bg-white">
        <p class="ft-Arial"><span>9.3</span>%</p>
        <p class="second">期望年均回报率</p>
        <div class="tip-list">
          <span class="tip-item tip-item1"><span class="font-Arial margin-0">100</span>元起投</span>
          <span class="tip-item tip-item2"><span class="font-Arial margin-0">180</span>天项目期</span>
        </div>
        <div class="project-process clearfix">
          <div class="start-circle fl">
            <div class="start-circle-center"></div>
          </div>
          <div class="process-bar fl">
            <div class="process-inner-bar fl" v-bind:style="{width:processWith + '%'}"></div>
            <img src="../images/project/process-btn.png" class="fl" v-bind:style="{left:processWith - 5 + '%'}">
            <div class="process-tip" v-bind:style="{left:processWith + '%'}">{{processWith}}%</div>
          </div>
          <div class="end-circle fr">
            <div class="end-circle-center"></div>
          </div>
        </div>
        <p class="remain-amount">剩余可投<span>20,000</span>元</p>
        <p class="actual-amount">投资<span>20,000</span>元，预计收益<span>159.34</span>元</p>
      </div>
      <div class="project-detail-bottom bg-white">
        <div class="detail-item">
          <span>计息日期：</span>投资成功，当日计息
        </div>
        <div class="detail-item">
          <span>还款方式：</span>按月付息，到期还本
        </div>
        <div class="detail-item">
          <span>募集提示：</span>该项目将处于募集结束后，进入锁定期
        </div>
        <div class="detail-item">
          <span>项目状态：</span>融资中
        </div>
      </div>
      <div class="drop-load">
        向上滑动查看更多详情
      </div>
      <p class="invest-fixed-btn">立即投资</p>
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
      <div class="project-details" v-show="activeTab == 0">
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
      <div v-show="activeTab == 1">
        相关资料
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
              </tr>
              <tr>
                <td class="ft-grey4">2015-02-12</td>
                <td class="ft-blue">ffff</td>
                <td><span class="ft-orange0">11111</span></td>
              </tr>
              <tr>
              <!--<tr v-for="order in orderList" :key="order.id" v-show="orderList.length >0 ">
                <td>{{getHumanDate(order.createTime)}}</td>
                <td>{{order.userName}}</td>
                <td>{{order.orderAmount}}</td>
              </tr>-->
              <tr class="text-center" v-show="orderList.length <=0 ">
                <td colspan="3">
                  <!--<img src="/images/project/no-record.png" width="17%" class="margin-t-2">-->
                  <p class="ft-grey4 margin-b-0 margin-t-1p5">该项目暂未有人投资</p>
                  <p class="ft-grey4 margin-b-0">快做第一投资人吧</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="activeTab == 3">
        还款计划
      </div>
      <div class="investBtn">
        立即投资
      </div>
    </div> 
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
<script>
  import axios from 'axios'
  import moment from 'moment'
  export default {
    name: 'projectDetail',
    data () {
      return {
        project: {
        },
        projectInfo: {
          description: '',
          financingPurpose: '',
          repaymentSource: '',
          riskManagementInfo: '',
          riskControl: ''
        },
        orderList: {

        },
        paramsNum: 0,
        projectId: 0,
        processWith: 0,
        activeTab: 2,
        detailTabs: ['项目详情', '相关资料', '投资记录', '还款计划'],
        pageSize: 10,
        page: 1
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
          this.orderList = response.data.data
        })
      },
      getHumanDate: function (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      load: function () {
        var e = document.querySelector('.product-page2')
        e.addEventListener('touchstart', touch, false)
        e.addEventListener('touchmove', touch, false)
        e.addEventListener('touchend', touch, false)
        function touch (e) {
          var event = e || window.e
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
              // alert(333)
              // document.querySelector('.product-page1').style.webkitTransform = 'translate3d(0, ' + 0 + 'px, 0)'
              // document.querySelector('.product-page2').style.webkitTransform = 'translate3d(0, ' + 0 + 'px, 0)'
              break
          }
        }
      }
    }
  }
  
</script>

<style scoped>
  .more-details {
    background: #efeef4;
    margin-bottom: .98rem;
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
  .more-details .investBtn {
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

  .project {
    background-color: #efeef4;
  }
  .fist-frame {
    height: 11.3rem;
  }
  .invest-fixed-btn {
    height: .9rem;
    line-height: .9rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: .3rem;
    background-color: #ff611d;
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
    width: .7rem;
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
    font-size: .25rem;

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
</style>
