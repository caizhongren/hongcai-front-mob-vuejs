<template>
  <div class="project">
    <!--更多详情页面-->
    <div class="more-details">
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
          <div class="content">
            企业介绍：反反复复的奉公守法过三个代表fd辅导费 v 发的 vv 福鼎市的范儿个人玩惹人反而风热风格 v 时尚感
          </div>
        </div>
        <div class="project-brief">
          <div class="title">
            <span></span>
            <p>资金用途</p>
          </div>
          <div class="content">
            企业正常经营销售收入
          </div>
        </div>
        <div class="project-brief">
          <div class="title">
            <span></span>
            <p>还款来源</p>
          </div>
          <div class="content">
            企业正常经营销售收入
          </div>
        </div>
        <div class="project-brief">
          <div class="title">
            <span></span>
            <p>项目评级</p>
          </div>
          <div class="content">
            <p><span></span>借款企业。。。。。</p>
            <p><span></span>借款企业。。。。。</p>
            <p><span></span>借款企业。。。。。</p>
            <p><span></span>借款企业。。。。。</p>
            <p><span></span>借款企业。。。。。</p>            
          </div>
        </div>
      </div>
      <div v-show="activeTab == 1">
        相关资料
      </div>
      <div v-show="activeTab == 2">
        投资记录
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

<script>
  // import axios from 'axios'
  export default {
    name: 'projectDetail',
    data () {
      return {
        activeTab: 0,
        detailTabs: ['项目详情', '相关资料', '投资记录', '还款计划']
      }
    },
    methods: {
      toggleTab (i) {
        this.activeTab = i
      }
    }
  }
</script>

<style>
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
</style>
