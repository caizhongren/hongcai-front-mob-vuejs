<template>
  <div class="integral-details" v-auto-height>
    <div>
      <img src="../../images/summer-plan/detail-top.png" alt="" class="display-bl margin-auto" width="100%">
    </div>
    <div class="detail-list">
      <img src="../../images/summer-plan/integral-detail.png" alt="" class="display-bl margin-b-0p2" width="95%">
      <div class="table-wrap">
        <img src="../../images/summer-plan/list-line.png" alt="" class="top-line">
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
                {{userCoolScoresDetail.selectionTotalAmount || 0}}元
              </td>
              <td>{{userCoolScoresDetail.selectionScore || 0}}分</td>
            </tr>
            <tr>
              <td>
                <img src="../../images/summer-plan/honor.png" alt="" width="40%" class="display-bl margin-auto">
                <span>
                  宏财尊贵
                </span>
              </td>
              <td>
                {{userCoolScoresDetail.honorTotalAmount || 0}}元
              </td>
              <td>{{userCoolScoresDetail.honorScore || 0}}分</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="statement">*数据每5分钟更新一次，如出现积分相同情况时，根据投资时间先后进行排名</p>
  </div>
</template>
<script>
  export default {
    name: 'integralDetail',
    data () {
      return {
        userCoolScoresDetail: {
        }
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '') {
          this.getUserCoolScores(val)
        }
      }
    },
    created () {
      if (this.token) {
        this.getUserCoolScores(this.token)
      }
    },
    methods: {
      getUserCoolScores: function (token) {
        var that = this
        that.$http({
          url: '/hongcai/rest/activitys/summer/scores/0/detail?token=' + token
        })
        .then(function (res) {
          that.userCoolScoresDetail = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .integral-details {
    width: 100%;
    overflow-x: hidden;
    background: url(../../images/summer-plan/bg-02-1.png) repeat-y center center;
  }
  .margin-b-0p2 {
    margin: -.25rem auto .4rem;
  }
  p.statement {
    text-align: justify;
    color: #023532;
    padding: .55rem 9%;
    font-size: .22rem;
  }
  .detail-list {
    padding: 0 .45rem;
  }
  .table-wrap {
    position: relative;
    height: 50%;
    background-color: #fff;
    border-radius: .1rem;
    padding: 0 1.5%;
    box-shadow: 0 10px 10px #eee inset;
  }
  .table-wrap .top-line {
    position: absolute;
    width: 106%;
    top: -.2rem;
    left: -.15rem;
  }
  thead td{
    height: 1.2rem;
    line-height: 1.2rem;
  }
  thead tr, tbody tr:first-child {
    border-bottom: 1px solid #eee;
  }
  thead tr td:first-child, thead tr td:first-child + td, tbody tr td:first-child, tbody tr td:first-child + td{
    border-right: 1px solid #eee;
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
  thead td:last-child, thead td:first-child + td, tbody tr td:first-child + td, tbody tr td:last-child {
    width: 30%;
  }
  thead td:first-child, tbody tr td:first-child {
    width: 25%;
  }
  thead td {
    height: 1rem;
    line-height: 1rem;
    color: #2aafa0;
    font-size: .28rem;
    font-weight: 500;
    text-align: center;
  }
</style>
