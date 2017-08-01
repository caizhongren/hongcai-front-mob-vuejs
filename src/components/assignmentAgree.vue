<template>
  <div class="agreement">
    <div>
      <section class="header">
        <p><small>甲方（转让人）：{{contracts.assignorRealName }}</small> </p>
        <p><small>身份证号：{{contracts.assignorIdNo}}</small></p>
        <p><small>宏财网用户名：{{contracts.assignorName}}</small></p>
        <p><small>乙方（受让人）：{{contracts.assigneeRealName}}</small></p>
        <p><small>身份证号：{{contracts.assigneeIdNo}}</small></p>
        <p><small>宏财网用户名：{{contracts.assigneeName}}</small></p>
        <p><small>就甲方通过北京竞财投资管理有限公司（以下简称“竞财”）运营管理的www.hongcai.com 网站（以下称“宏财网”）向乙方转让债权事宜，双方经协商一致，达成如下协议：</small></p>
      </section>
      <section>
        <p>一、债权转让 </p>
        <p><small>1.1 标的债权信息及转让</small> </p>
        <p><small>甲方同意将其通过宏财网的居间协助而形成的有关债权（下称“标的债权”）转让给乙方，乙方同意受让该等债权。标的债权具体信息如下：</small> </p>
        <ul class="border-grey clearfix">
          <li><small>借款项目名称</small></li>
          <li><small>{{contracts.projectName}}</small></li>
          <li><small>借款项目编号</small></li>
          <li><small>{{contracts.projectNumber}}</small></li>
          <li><small>借款项目金额</small></li>
          <li><small>{{contracts.projectTotal}}<span v-show="contracts.projectTotal">元</span></small></li>
          <li><small>借款项目年均回报率</small></li>
          <li><small>{{contracts.projectAnnualEarnings}}<span v-show="contracts.projectTotal">%</span></small></li>
          <li><small>借款项目期限</small></li>
          <li><small>{{contracts.projectDays}}<span v-show="contracts.projectTotal">天</span></small></li>
          <li><small>还款方式</small></li>
          <li><small>{{contracts.repaymentType}}</small></li>
          <li><small>甲方转让债权编号</small></li>
          <li><small>{{contracts.oldCreditId}}</small></li>
          <li><small>甲方转让本金</small></li>
          <li><small>{{contracts.assignAmount}}<span v-show="contracts.projectTotal">元</span></small></li>
          <li><small>甲方转让利率</small></li>
          <li><small>{{contracts.assignAnnualEarnings}}<span v-show="contracts.projectTotal">%</span></small></li>
          <li><small>乙方受让债权编号</small></li>
          <li><small>{{contracts.inCreditId}}</small></li>
          <li><small>乙方实际支付金额</small></li>
          <li><small>{{contracts.payAmount}}<span v-show="contracts.projectTotal">元</span></small></li>
          <li><small>乙方支付确认日期</small></li>
          <li><small>{{contracts.payTime}}</small></li>
        </ul>
      </section>
      <section>
        <p><small>1.2. 债权转让流程</small> </p>
        <p><small>1.2.1 双方同意并确认，双方通过自行或授权有关方根据宏财网有关规则和说明，在宏财网进行债权转让和受让购买操作等方式确认签署本协议。</small> </p>
        <p><small>1.2.2 双方接受本协议且宏财网审核通过时，本协议立即成立,并待转让价款支付完成时生效。协议成立的同时甲方不可撤销地授权与宏财网合作的银行资金存管机构，将转让价款在扣除甲方应支付给竞财的转让管理费及等比例退还拟转让债权已经获得宏财网的投资奖励费用之后划转、支付给甲方，上述转让价款划转完成即视为本协议生效且标的债权转让成功。</small> </p>
        <p><small>1.2.3 本协议生效且标的债权转让成功后，双方特此委托竞财将标的债权的转让事项及有关信息通过包括但不限于公告、站内信等形式通知与标的债权对应的借款人、担保人等相关各方。</small> </p>
        <p><small>1.3 自标的债权转让成功之日起，标的债权的原始借款人与甲方就该笔债权的债权债务关系即刻解除，乙方成为标的债权的债权人，承继《宏财网服务协议》项下出借人的权利并承担出借人的义务。标的债权转移之前的相应收益归甲方所有，标的债权转移之后的收益等全部权益由乙方享有。</small> </p>
      </section>
      <section>
        <p>二、保证与承诺 </p>
        <p><small>2.1 甲方保证其转让的债权系其合法、有效的债权，不存在转让的限制。甲方同意并承诺按有关协议及宏财网的相关规则和说明向竞财支付债权转让管理费。</small>  </p>
        <p><small>2.2 乙方保证其所用于受让标的债权的资金来源合法，乙方是该资金的合法所有人。如果第三方对资金归属、合法性问题发生争议，乙方应自行负责解决并承担相关责任。</small>  </p>
      </section>
      <section>
        <p>三、违约 </p>
        <p><small>3.1 双方同意，如果一方违反其在本协议中所作的保证、承诺或任何其他义务，致使其他方遭受或发生损害、损失等责任，违约方须向守约方赔偿守约方因此遭受的一切经济损失。</small>  </p>
        <p><small>3.2 双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。</small>  </p>
      </section>
      <section>
        <p>四、适用法律和争议解决 </p>
        <p><small> 4.1 本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中国的法律。</small>  </p>
        <p><small> 4.2 本协议在订立、履行、解释等过程中，如发生任何争执或纠纷，双方应友好协商解决；若协商不成，任何一方均有权向有管辖权的人民法院提起诉讼。</small>  </p>
      </section>
      <section>
        <p>五、其他 </p>
        <p><small> 5.1 双方可以书面协议方式对本协议作出修改和补充。经过双方签署的有关本协议的修改协议和补充协议是本协议组成部分，具有与本协议同等的法律效力。</small> </p>
        <p><small> 5.2 本协议及其修改或补充均通过宏财网以电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力；同时双方委托竞财代为保管在竞财为此设立的专用服务器上备查。双方均认可该形式的协议效力。</small> </p>
        <p><small> 5.3 甲乙双方均确认，本协议的签订、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</small> </p>
        <p><small> 5.4 除本协议上下文另有定义外，本协议项下的用语和定义应具有宏财网服务协议及其有关规则中定义的含义。若有冲突，则以本协议为准。</small> </p>
      </section>
      <section>
        <p>各方签章：</p>
        <p>甲方：{{contracts.assignorRealName}}</p>
        <p>乙方：{{contracts.assigneeRealName}}</p>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AssignmentAgree',
    data () {
      return {
        creditRightNum: '',
        projectNumber: '',
        preRepaymentList: [],
        contracts: {},
        LenderNames: Array,
        status: String
      }
    },
    created: function () {
      this.creditRightNum = this.$route.query.creditRightNum
      this.creditRightNum && this.token !== '' ? this.getContracts() : null
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '' && this.creditRightNum) {
          this.getContracts()
        }
      }
    },
    methods: {
      getContracts: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/contracts/' + that.creditRightNum + '/credit/?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.contracts = res.data
            that.contracts.projectName.length > 12 ? that.contracts.projectName = that.contracts.projectName.substr(0, 12).concat('...') : that.contracts.projectName = that.contracts.projectName
          }
        })
      }
    }
  }
</script>

<style scoped>
  .agreement {
    text-align: left;
    padding: .5rem;
    color: #222;
    font-weight: 400;
    font-size: .26rem;
  }
  .agreement ul {
    border: 1px solid #ddd;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .agreement ul li:nth-child(odd) {
    width: 45.6%;
  }
  .agreement ul li:nth-child(even) {
    width: 54%;
  }
  .agreement ul li {
    border-bottom: 1px solid #ddd;
    float: left;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    margin-bottom: 0;
  }
  .agreement ul li:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
  .agreement p {
    margin-bottom: .2rem;
  }
  .header p {
    margin-bottom: .05rem;
  }
  .agreement i {
    padding-top: .3rem;
  }
  table {
    width: 100%;
    font-size: .22rem;
    margin-top: .3rem;
    text-align: center;
  }
  td {
    width: 20%;
  }
  table thead {
    margin-bottom: .2rem;
  }
</style>
