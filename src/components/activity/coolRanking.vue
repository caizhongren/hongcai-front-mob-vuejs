<template>
  <div class="runking" v-auto-height>
    <div class="runking-list">
       <img src="../../images/summer-plan/list-line.png" alt="" class="top-line">
       <div class="list-herder-wrap">
        <table class="header">
          <thead>
            <tr>
              <td>名次</td>
              <td>用户</td>
              <td>积分</td>
            </tr>
          </thead>
        </table>
       </div>
      <div class="table-wrap">
        <table>
          <tbody>
            <tr v-for="(item, index) in runkingList">
              <td v-if="index === 0"><img src="../../images/summer-plan/no.1.png" alt="" width="35%"></td>
              <td v-if="index !== 0">{{index + 1}}</td> 
              <td>{{item.userMobile}}</td>
              <td>{{item.score || 0}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>*数据每5分钟更新一次，如出现积分相同情况时，根据投资时间先后进行排名</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'coolRunking',
    data () {
      return {
        runkingList: []
      }
    },
    created () {
      this.getRunkingList()
    },
    methods: {
      getRunkingList () {
        var that = this
        that.$http({
          url: '/hongcai/rest/activitys/summer/scores/top'
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.runkingList = res.data.data
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .runking {
    padding-top: 11%;
    width: 100%;
    overflow-x: hidden;
    background: url(../../images/summer-plan/bg-02-1.png) repeat-y center center;
  }
  .runking-list {
    padding: 0 .45rem;
    position: relative;
    height: 81%;
  }
  .table-wrap {
    /* height: 80%; */
    padding: 0 2%;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 0 0 .1rem .1rem;
    -webkit-overflow-scrolling: touch;
  }
  .list-herder-wrap {
    padding: 0 1.5%;
    background-color: #fff;
  }
  table {
    background-color: #fff;
    width: 100%;
  }
  .runking-list .top-line {
    position: absolute;
    width: 91%;
    top: -.2rem;
    left: .3rem;
  }
  table tr {
    border-bottom: 1px solid #eee;
  }
  thead td {
    height: .7rem;
    line-height: .6rem;
    padding-top: .1rem;
    color: #2aafa0;
    font-size: .33rem;
    font-weight: 500;
    text-align: center;
  }
  tbody img {
    vertical-align: middle;
  }
  tbody tr td {
    height: .76rem;
    line-height: .76rem;
    text-align: center;
  }
  tbody tr td:first-child {
    color: #999;
    font-size: .50rem;
    font-weight: 500;
    width: 20%;
    border-right: 1px solid #eee;
  }
  table td:first-child, table td:first-child + td {
    border-right: 1px solid #eee;
  }
  tbody tr td:first-child + td, tbody tr td:last-child{
    font-size: .28rem;
    color: #666;
  }
  tbody tr td:first-child + td, thead td:first-child + td {
    width: 30%;
  }
  thead td:last-child, thead td:first-child, tbody tr td:last-child {
    width: 20%;
  }
  tbody tr:first-child td:last-child {
    color: #e3b71b;
  }
  .runking p {
    text-align: justify;
    color: #023532;
    font-size: .22rem;
    padding: .28rem 3% .1rem;
  }

</style>
