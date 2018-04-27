<template>
  <div class="AuditInformation">
    <!-- 审计报告 -->
    <div class="fund-info">
      <img src="../../images/disclosure/sjbg.png" alt="审计报告" class="fund-title" width="40%">
      <div class="wrapper" @click="openPDF">
        <img src="../../images/disclosure/audit.png" width="100%"/>
      </div>
    </div>
    <ul class="audit-info">
      <li>
        <p>经营合规重点环节审计报告</p>
        <p>--</p>
      </li>
      <li>
        <p>合规性审查报告</p>
        <p>--</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'AuditInformation',
    data () {
      return {

      }
    },
    methods: {
      openPDF () {
        this.$router.push({name: 'AuditPDF'})
      }
    }
  }
</script>
<style scoped>
  ::-webkit-scrollbar {display:none}
  .display-inbl {
    display: inline-block;
  }
  .AuditInformation {
    background-color: #f9f4f3;
    padding-bottom: .5rem;
  }
  .wrapper {
    margin: 0.35rem auto;
    height: auto;
    min-height: 3rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
  }
  .wrapper img {
    display: block;
  }
  .audit-info {
    overflow: hidden;
    clear: both;
  }
  .audit-info li:nth-child(odd) {
    background: #ffefe8;
  }
  .audit-info li:nth-child(even) {
    background: #fff;
  }
  .fund-info>img {
    margin-top: .5rem;
  }
  .audit-info li {
    width: 100%;
    overflow: hidden;
    clear: both;
    padding: 0 .35rem;
    height: 1rem;
    line-height: 1rem;
  }
  .audit-info li p {
    float: left;
    font-size: .25rem;
    color: #666;
    width: 50%;
    text-align: left;
  }
  .audit-info li p:nth-child(2) {
    text-align: right;
    width: 38%;
    font-size: .5rem;
  }
</style>
