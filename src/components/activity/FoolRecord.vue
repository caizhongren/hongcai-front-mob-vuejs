<template>
  <!-- 愚人节活动愚人榜页面 -->
  <div class="fools-record" id="fools-record">
    <div class="header"></div>
    <div class="contents">
      <div class="recordHeader">
        <img src="../../images/foolsDay/record-title.png" alt="我的愚人节成绩单" width="100%">
      </div>
      <ul class="recordContent">
        <div class="noRecord" v-if="recordList.length <= 0">
          <img src="../../images/foolsDay/none-record.png" alt="暂无排名，你要不要做第一个？" class="txt">
          <img src="../../images/foolsDay/maozi.png" alt="帽子" class="maozi">
        </div>
        <div class="recordTitle" v-if="recordList.length > 0">
          我的当前排名：{{ranking > 0 ? ranking : '暂无排'}}名
          <img src="../../images/foolsDay/maozi.png" alt="帽子">
        </div>
        <li class="record" v-for="(record, index) in recordList" v-if="recordList.length > 0" v-bind:class="{'record-padding': index === 0}">
          <div class="portrait" v-bind:class="{'portrait1': index === 0, 'portrait2': index === 1, 'portrait3': index === 2}">
            <img v-bind:src="record.headImg" alt="头像" />
            <span v-if="index >= 3" class="num" v-bind:class="'num' + (index + 1)"></span>
          </div>
          <div class="title">
            {{record.num}}位好友对其进行了测谎 <br>
            {{decs[index]}}
          </div>
          <img src="../../images/foolsDay/record-line.png" alt="下边框" class="line">
        </li>
      </ul>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ranking: 0,
        recordList: [],
        decs: ['面不改色心不跳，尤其是在说假话的时候！', '魔镜魔镜，谁是世界上最深不可测的人？', '自幼精通36计，你难道不知道第1计就是瞒天过海吗？', '只要说一次谎，鼻子就会长长一点哟～', '有时候谎言很美丽，她的名字叫“善意的谎言”。', '我何必说谎，你懂我的，我对你从来就不用假装。', '不是每个长鼻子的小孩都爱说谎，他也有可能是只小象。', '女人心海底针，男人心...', '看不清，摸不着，猜不透！', '真相只有一个！']
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? this.getRank() : this.checkLogin()
      }
    },
    mounted () {
      this.recordList.length <= 0 ? document.getElementById('fools-record').style.height = document.documentElement.clientHeight + 'px' : document.getElementById('fools-record').style.height = 'auto'
    },
    created () {
      this.userInfo.id > 0 ? this.getRank() : null
    },
    methods: {
      getRank () { // 排行榜
        var that = this
        that.axios('/hongcai/rest/activitys/foolsDay/rank').then(function (res) {
          that.recordList = res.data.foolRanks
          that.recordList.length <= 0 ? document.getElementById('fools-record').style.height = document.documentElement.clientHeight + 'px' : document.getElementById('fools-record').style.height = 'auto'
          that.ranking = res.data.rank
        })
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-record {
    background: #f89b32;
    width: 100%;
    position: relative;
    padding-bottom: .5rem;
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
  .contents {
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 55px rgba(255,255,255,1);
    position: relative;
    border-radius: .3rem;
    width: 92%;
    height: auto;
    margin: 0 auto;
    z-index: 1;
    top: -1.2rem;
  }
  .recordHeader {
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
  .recordContent {
    padding: 1.3rem 0 .5rem;
  }
  .recordTitle {
    width: 97%;
    height: 1.3rem;
    background: url('../../images/foolsDay/yellow-bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: .26rem;
    color: #440d11;
    line-height: 1.3rem;
    position: relative;
    margin: 0 auto;
    top: -.25rem;
  }
  .recordTitle img {
    width: 13%;
    position: absolute;
    left: 16%;
  }
  .record {
    overflow: hidden;
    clear: both;
    width: 100%;
    height: 1.05rem;
    position: relative;
  }
  .record .portrait {
    float: left;
    position: relative;
    width: 18%;
    height: .85rem;
    background: url('../../images/foolsDay/record-numbox.png') no-repeat center center;
    background-size: 100% 100%;
    margin-right: .2rem;
  }
  .record .portrait1 {
    width: 21%;
    height: 1.2rem;
    background: url('../../images/foolsDay/record-top1.png') no-repeat center center;
    background-size: 100% 100%;
    margin-right: .02rem;
  }
  .record .portrait2 {
    width: 21%;
    height: 1.05rem;
    background: url('../../images/foolsDay/record-top2.png') no-repeat center center;
    background-size: 100% 100%;
    margin-right: .02rem;
  }
  .record .portrait3 {
    width: 21%;
    height: 1.05rem;
    background: url('../../images/foolsDay/record-top3.png') no-repeat center center;
    background-size: 100% 100%;
    margin-right: .02rem;
  }
  .record .portrait img {
    width: 59.1%;
    border-radius: 50%;
    position: absolute;
    right: 9%;
    bottom: 10%;
    height: 73.5%;
    pointer-events: none;
  }
  .record .portrait1 img {
    right: 9%;
    bottom: 11%;
    width: 63%;
    height: 65%;
  }
  .record .portrait2 img {
    right: 9%;
    bottom: 9%;
    width: 63%;
    height: 74%;
  }
  .record .portrait3 img {
    right: 9%;
    bottom: 10%;
    width: 62%;
  }
  .portrait .num {
    width: 17%;
    height: .23rem;
    float: left;
    margin-top: .37rem;
    margin-left: .13rem;
  }
  .portrait .num4 {
    background: url('../../images/foolsDay/record-num4.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num5 {
    background: url('../../images/foolsDay/record-num5.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num6 {
    background: url('../../images/foolsDay/record-num6.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num7 {
    background: url('../../images/foolsDay/record-num7.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num8 {
    background: url('../../images/foolsDay/record-num8.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num9 {
    background: url('../../images/foolsDay/record-num9.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .portrait .num10 {
    background: url('../../images/foolsDay/record-num10.png') no-repeat center center;
    background-size: 100% 100%;
    width: 20%;
    margin-left: .1rem;
  }
  .record .line {
    width: 90%;
    position: absolute;
    left: 5%;
    bottom: 0%;
  }
  .record .title {
    float: left;
    text-align: left;
    font-size: .23rem;
    color: #51171b;
    width: 78%;
    margin-top: .2rem;
  } 
  .record:nth-child(4) .title, .record:nth-child(6) .title, .record:nth-child(7) .title, .record:nth-child(8) .title {
    margin-top: 0
  }
  .record:nth-child(2) .portrait {
    top: -.15rem;
  }
  .record:nth-child(5) .portrait,.record:nth-child(6) .portrait, .record:nth-child(7) .portrait, .record:nth-child(9) .portrait, .record:nth-child(10) .portrait, .record:nth-child(11) .portrait {
    top: .05rem;
  }
  .record-padding {
    padding-top: .1rem;
  }
  .noRecord {
    position: relative;
    margin: .8rem 0 1.92rem;
  }
  .noRecord .txt {
    width: 70%;
    margin-top: 1.3rem;
  }
  .noRecord .maozi {
    width: 30%;
    position: absolute;
    top: 0;
    left: 13%;
  }
</style>
