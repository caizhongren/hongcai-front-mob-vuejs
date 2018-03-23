<template>
  <!-- 活动规则页面 -->
  <div class="fools-rules">
    <div class="header"></div>
    <div class="contents">
      <div class="ruleHeader">
        <img src="../../images/foolsDay/rule-header.png" alt="活动规则" width="95%">
      </div>
      <div class="ruleContent">
        <div class="rule">活动时间 <br>本活动仅限于2018年4月1日至4月5日参与有效</div>
        <div class="rule">参与方式 <br>活动期间用户可选择模版或自定义来设置题目，题目内容的真实性由用户自行设置决定，设置完成即可发布，好友可通过你们之间的了解程度判断题目真假，并根据成绩生成默契度，好友参与人数最多的前三名，还可获得额外奖励，链接仅支持在微信好友/朋友圈之间传播哟～</div>
        <div class="rule">活动奖品 <br>
          1.好友参与人工鉴谎人数达到10人，即可获得：<br>
          2018元特权本金(有效期3天) <br>
          宏财精选项目1.5%无条件加息券 <br>
          宏财精选项目1.5%无条件加息券 <br>
          (新用户领取礼包后请于30日之内尽快开通银行存管，不然奖励就失效咯) <br>
          2.截至2018年4月5日23:59活动结束，获得好友人工鉴谎次数最多的前三名用户，可以分别获得500000元特权本金、200000元特权本金、100000元特权本金奖励(有效期1天) <br>
          所有奖励将发放至您的宏财网账户中，兑换时请务必填写正确的手机账号哟！
        </div>
        <div class="rule">平台说明 <br>在法律允许范围内，本活动最终解释权归宏财网所有，如活动期间平台发现有用户通过作弊等违规方式参与活动，宏财网有权取消其参与资格，并没收其活动奖励。</div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['token'],
    watch: {},
    mounted () {},
    created () {},
    methods: {
      toReportCard () {
        this.$router.push({name: 'FoolReportCard'})
      },
      toRecord () {
        this.$router.push({name: 'FoolRecord'})
      },
      showRules () {
        alert('活动规则')
      },
      loadMore () {
        alert('查看更多')
      },
      exchange () {
        alert('拆礼包')
      },
      inviteShare () {
        alert('分享邀请好友来鉴定')
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-rules {
    background: #f89b32;
    width: 100%;
    position: relative;
    padding-bottom: .5rem;
  }
  .contents {
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 55px rgba(255,255,255,1);
    position: relative;
    border-radius: .3rem;
    width: 86%;
    height: auto;
    margin: 0 auto;
    z-index: 1;
    top: -1.2rem;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .3rem;
  }
  .bottom {
    background: url('../../images/foolsDay/comm-bottom.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 3.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 0;
  }
  .ruleHeader {
    width: 64%;
    height: 2rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    line-height: 1rem;
    text-align: center;
    padding: .65rem .8rem;
    position: absolute;
    left: 18%;
    top: -.8rem;
  }
  .ruleContent {
    padding: 1.2rem .25rem .5rem;
  }
  .rule {
    color: #f69b40;
    text-align: left;
    margin-bottom: .4rem;
    font-size: .2rem;
    line-height: 1.7;
  }
</style>
