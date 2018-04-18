<template>
  <div class="AuditInformation">
    <!-- 审计报告 -->
    <div class="fund-info">
      <img src="../../images/disclosure/sjbg.png" alt="审计报告" class="fund-title" width="40%">
      <div class="wrapper" @click="preview('https://www.hongcai.com/uploads/png/original/2017-10-19/image/9bcbea8d83f04b289b6b9c2cf8c3af9a-original.png')">
        <!-- <img src="../../images/disclosure/contract1.png"/> -->
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
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'AuditInformation',
    data () {
      return {

      }
    },
    methods: {
      preview (url) {
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': url}, function (response) {
        }, function (data) {
        })
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
    margin-top: .3rem;
  }
  .wrapper {
    margin: 0.35rem auto;
    height: 4rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
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
