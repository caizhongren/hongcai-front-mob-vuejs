<template>
  <div class="website-notice-detail">
    <div class="notice-title">
      <p class="title text-center">{{noticeDetail.title || ''}}</p>
      <!-- <p class="createTime">{{noticeDetail.createTime | dateTime}}</p> -->
      <div class="content" v-html="noticeDetail.content">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoticeDetail',
    data () {
      return {
        noticeDetail: {
          title: '',
          createTime: new Date().getTime()
        },
        textId: 719
      }
    },
    created: function () {
      this.textId = this.$route.params.id
      this.getTextDetail()
    },
    methods: {
      getTextDetail: function () {
        this.$http({
          mothod: 'get',
          url: '/hongcai/api/v1/siteText/getTextDetail?textId=' + this.textId
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.noticeDetail = response.data.data.text
          }
        })
      }
    }
  }
</script>

<style>
  .website-notice-detail {
    padding: 0 .5rem;
  }
  .website-notice-detail .notice-title .title {
    font-size: .32rem;
    color: #666;
    margin: .5rem 0;
    font-weight: bold;
  }
  .website-notice-detail .notice-title .createTime {
    color: #999;
    font-size: .24rem;
    margin-bottom: .5rem;
    font-weight: 500;
  }
  .website-notice-detail .content {
    color: #999;
    text-align: justify;
    font-size: .26rem;
    font-weight: 500;
  }
  .website-notice-detail p {
    margin-bottom: .3rem;
  }
</style>
