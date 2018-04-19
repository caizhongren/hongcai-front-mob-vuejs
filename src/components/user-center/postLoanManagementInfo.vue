<template>
  <div class="postLoanManagementInfo">
  	<table class="info">
      <div>
        <tr v-for="(info, index) in postLoanMsg" v-bind:class="{'border-none': index === postLoanMsg.length-1}">
          <td v-bind:class="{'line-h': index===postLoanMsg.length-1}">{{info.name}}</td> 
          <td>{{info.content}}</td>
        </tr>
      </div>
	</table>
	<div data-v-49b8d080="" class="creatTime">最近披露时间：{{disclosureTime | date}}</div>
  </div>
</template>
<script>
  export default {
    name: 'postLoanManagementInfo',
    data () {
      return {
        postLoanMsg: {
        },
        disclosureTime: ''
      }
    },
    methods: {
      getAssignmentOrder: function (limit) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/disclosureInfo/loanInfo/' + that.$route.params.projectId
        }).then(function (res) {
          console.log(res)
          var dataMsg = res.data.objContent
          that.disclosureTime = res.data.createTime
          that.postLoanMsg = [
            {
              name: '借款资金使用情况',
              content: dataMsg.loanUsedInfo
            },
            {
              name: '经营情况',
              content: dataMsg.manageInfo
            },
            {
              name: '财务情况',
              content: dataMsg.financeInfo
            },
            {
              name: '还款能力变化情况',
              content: dataMsg.repaymentInfo
            },
            {
              name: '逾期情况',
              content: dataMsg.overdueInfo
            },
            {
              name: '涉诉情况',
              content: dataMsg.lawsuitInfo
            },
            {
              name: '受行政处罚情况',
              content: dataMsg.penaltyInfo
            },
            {
              name: '其他可能影响借款人还款的重大事件',
              content: dataMsg.eventInfo
            }
          ]
        })
      }
    },
    created () {
      this.getAssignmentOrder()
    }
  }
</script>
<style scoped>
  table.info {
    background: #fff;
    border-radius: .2rem;
    width: 90%;
    margin: 0 auto;
    margin-top: .3rem;
    font-size: .2rem;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  table.info div {
    padding: .1rem .15rem;
  }
  table.info tr {
    height: .6rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }
  table.info td:nth-child(1) {
    width: 30%;
    text-align: left;
    border-right: 1px solid #eee;
    line-height: .7rem;
    padding-left: .1rem;
  }
  table.info td:nth-child(2) {
    width: 57%;
    text-align: left;
    line-height: 1.6;
    padding-left: .2rem;
    text-align: center !important;
  }
  .line-h{
  	line-height: 1.5 !important;
    padding: .12rem 0;
  }
  .creatTime{
	margin-top: .35rem;
  	color: #666;
    font-size: .2rem;
    text-align: center;
  }
</style>
