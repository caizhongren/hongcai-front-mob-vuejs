<template>
  <div class="report">
    <h2>{{report.title}}</h2>
    <div class="appReport">
      <p class="fl">{{report.createTime | date}}</p>
      <p class="fr">来源：{{report.source}}</p>
    </div>
    <div v-html="report.content" class="contentText"></div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        textId: this.$route.params.id || 567,
        report: {
          title: '',
          source: '', // 来源
          createTime: '', // 发布时间
          content: ''
        }
      }
    },
    created () {
      this.getReportTexts()
    },
    methods: {
      getReportTexts () { // 未领取的特权本金奖励
        var that = this
        that.$http('/hongcai/rest/texts/app/' + that.textId).then(function (res) {
          if (res && res.ret !== -1) {
            that.report = res.data.text
            var isShare = res.data.appText.isShare // 1可分享 2不可分享
            var shareId = res.data.appText.shareId
            isShare === 1 ? that.getShareInfo(shareId) : null
          }
        })
      },
      getShareInfo (shareId) {
        var that = this
        that.$http('/hongcai/rest/shares/' + shareId).then(function (res) {
          if (res && res.ret !== -1) {
            var shareInfo = res.data
            bridgeUtil.webConnectNative('HCNative_MediaShare', 'HCWeb_ShareSuccess', {
              'HC_shareType': shareInfo.type,
              'title': shareInfo.title,
              'subTitle': shareInfo.subTitle,
              'url': shareInfo.link,
              'imageUrl': shareInfo.imgUrl
            }, function (response) {}, function (response) {})
          }
        })
      }
    }
  }
</script>
<style scoped>
  .contentText {
    text-align: justify;
  }
  .report p {
    margin-bottom: 0 !important;
  }
  .report a {
    color: #2c3e50 !important;
  }
  .report img {
    width: 100%;
    display: block;
  }
  .appReport {
    overflow: hidden;
    clear: both;
    margin: .2rem 0;
  }
</style>
