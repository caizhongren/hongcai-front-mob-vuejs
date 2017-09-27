<template>
  <div class="GoldenDetail" v-auto-height>
    <div class="detail-header">
      <img src="../../images/golden-fall/header-bg3.jpg" alt="" width="100%" class="display-bl">
    </div>
    <div class="detail-wrapper">
      <div class="fall-detail position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="crab position-ab">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="crab1 position-ab">
        <p class="title">积分明细</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <td>项目类型</td>
                <td>累计投资金额</td>
                <td>累计获得积分</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="../../images/summer-plan/select.png" alt="" width="40%" class="display-bl margin-auto">
                  <span>
                    宏财精选
                  </span>
                </td> 
                <td>
                  {{userGoldenScoresDetail.selectionTotalAmount || 0}}元
                </td>
                <td>{{userGoldenScoresDetail.selectionScore || 0}}分</td>
              </tr>
              <tr>
                <td>
                  <img src="../../images/summer-plan/honor.png" alt="" width="40%" class="display-bl margin-auto">
                  <span>
                    宏财尊贵
                  </span>
                </td>
                <td>
                  {{userGoldenScoresDetail.honorTotalAmount || 0}}元
                </td>
                <td>{{userGoldenScoresDetail.honorScore || 0}}分</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="dataTips">*积分数据更新可能存在网络延迟现象，稍等一会就好了哟～</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'goldenDetail',
    data () {
      return {
        userGoldenScoresDetail: {
          selectionTotalAmount: 0,
          selectionScore: 0,
          honorTotalAmount: 0,
          honorScore: 0
        }
      }
    },
    props: ['token'],
    created () {
      this.getGoldenScore()
    },
    methods: {
      getGoldenScore () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/summer/scores/0/detail?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.userGoldenScoresDetail = res.data
          } else {
            alert(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .GoldenDetail {
    font-family: PingFang-SC;
    overflow: hidden;
    position: fixed;
    width: 100%;
    background: #e98c28;
  }
  .detail-header {
    height: 3.9rem;
  }
  .detail-wrapper {
    background: #e98c28;
    height: 10.4rem;
  }
  .fall-detail {
    width: 88%;
    margin-left: 2%;
    margin: -1.2rem auto 0;
    height: 6.51rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/list-box.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .fall-detail .crab {
    top: 16%;
    right: 28%;
  }
  .fall-detail .crab1 {
    top: 21%;
    left: 3%;
  }
  .fall-detail .title {
    height: 1.82rem;
    font-size: .31rem;
    font-weight: bold;
    line-height: 7.5;
    letter-spacing: -0.5px;
    color: #ec812c;
  }
  .fall-detail .table-wrap {
    width: 89.1%;
    height: 4.3rem;
    margin: 0 auto;
  }
  .table-wrap {
    position: relative;
    height: 50%;
    border-radius: .1rem;
    padding: 1.5% 0;
  }
  .table-wrap table {
    height: 100%;
    width: 100%;
  }
  thead td{
    height: 1.2rem;
    line-height: 1.2rem;
  }
  thead tr, tbody tr:first-child {
    border-bottom: 1px solid #e78827;
  }
  thead tr td:first-child, thead tr td:first-child + td, tbody tr td:first-child, tbody tr td:first-child + td{
    border-right: 1px solid #e78827;
  }
  tbody td {
    height: 1rem;
    line-height: 1rem;
    color: #666;
    font-size: .28rem;
  }
  tbody td:first-child {
    padding: .25rem 0 .15rem;
    line-height: 0.6rem;
  }
  tbody tr td:first-child span {
    color: #ff4030;
  }
  thead td:last-child, thead td:first-child + td, tbody tr td:first-child + td, tbody tr td:last-child {
    width: 30%;
  }
  thead td:first-child, tbody tr td:first-child {
    width: 25%;
  }
  thead td {
    height: 1rem;
    line-height: 1rem;
    color: #ff4030;
    font-size: .28rem;
    font-weight: bold;
    text-align: center;
  }
  .dataTips {
    font-size: .2rem;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    margin: .5rem auto;
  }
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) 
    and (orientation : portrait) { 
    .fall-detail {
      height: 7.33rem;
    }
    .fall-detail .title {
      height: 2.1rem;
    }
    .fall-detail .table-wrap {
      height: 4.75rem;
    }
    .GoldenDetail {
      overflow: scroll;
    }
  }
</style>
