<template>
  <!-- 活动主页面 -->
  <router-view :userInfo="userInfo"></router-view>
</template>
<script>
  import {Utils} from '../../service/Utils.js'
  export default {
    data () {
      return {
        wechat_code: this.$route.query.code,
        userInfo: {
          nickName: '',
          headImgUrl: ''
        }
      }
    },
    props: ['showErrMsg'],
    watch: {
      wechat_code: function (val) {
        val !== '' ? this.getUserInfo() : null
      }
    },
    mounted () {},
    created: function () {
      this.checkLogin()
      this.wechat_code !== '' ? this.getUserInfo() : null
    },
    methods: {
      getUserInfo () {
        var that = this
        that.$http('/hongcai/rest/users/' + that.wechat_code + '/openid').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.userInfo.headImgUrl = res.data.headImgUrl || 'http://test321.hongcai.com/uploads/jpeg/original/2018-03-22/image/73177830c21f4bc682c358cdaaba2ef3-original.jpeg'
            that.userInfo.nickName = res.data.nickName || 'yy'
          }
        })
      },
      checkLogin () {
        if (Utils.isWeixin()) {
          Utils.redirectToWechatAuth(window.location.path)
        } else {
          console.log('waha')
        }
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
