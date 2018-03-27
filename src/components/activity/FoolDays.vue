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
      console.log('sss')
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
        var that = this
        that.axios({
          method: 'get',
          url: '/hongcai/rest/users/checkSession'
        }).then((response) => {
          // 已登录，直接返回
          if (response.data && response.data.ret !== -1) {
            return
          }
          // 未登录，则检查路由中是否存在 code，不存在，则跳转到微信授权
          if (!that.$route.query.code) {
            Utils.redirectToWechatAuth(window.location.href)
          } else {
            // 存在code，则调用登录接口
            that.axios({
              method: 'get',
              url: '/hongcai/rest/users/' + that.$route.query.code + '/openid'
            }).then((response) => {
              if (response.data && response.data.ret !== -1) {
                console.log('sssaa')
              } else {
                Utils.redirectToWechatAuth(window.location.href)
              }
            })
          }
        })
        if (!Utils.isWeixin()) {
          // Utils.redirectToWechatAuth(window.location.href)
        }
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
