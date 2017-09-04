<template>
  <div class="feedback">
    <div class="title">
      <p>尊敬的用户：</p>
      <p>为了给您更好的服务，请详细描述您的问题或建议，我们将及时跟进解决，不断优化产品！</p>
    </div>
    <form action="" name="fadebackForm">
      <textarea name="" id="feedbackInfo" cols="6" rows="5" placeholder="您想吐槽的原因：" v-model="feedbackInfo" required></textarea>
      <p class="btn" :disabled="busy || !feedbackInfo" :class="{'disabled-btn': busy || !feedbackInfo}" @click="postFeesback()">
        提交
      </p>
    </form>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        feedbackInfo: '',
        busy: false
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        this.feedbackInfo = document.getElementById('feedbackInfo').value
      }
    },
    methods: {
      postFeesback: function () {
        var that = this
        if (that.busy || !that.feedbackInfo) {
          return
        }
        if (!that.token || that.token === '') {
          bridgeUtil.webConnectNative('HCNative_Login', null, {}, function () {}, null)
          return
        }
        that.busy = true
        that.$http({
          method: 'post',
          url: '/hongcai/api/v1/feedback/saveFeedback?feedbackInfo=' + that.feedbackInfo
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            bridgeUtil.webConnectNative('HCNative_BackToPrePage', null, {
              successMsg: '反馈成功！'
            }, function (response) {}, null)
            that.feedbackInfo = ''
            setTimeout(function () {
              that.busy = false
            }, 1000)
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
  .feedback {
    background-color: #fff;
    padding: 0.28rem .33rem;
  }
  .title p, label {
    color: #ff6000;
    font-size: .28rem;
  }
  .title p:first-child {
    width: 30%;
    float: left;
    text-align: left;
  }
  .title p:last-child {
    display: inline-block;
    width: 69%;
    text-align: justify;
  }
  textarea {
    width: 92%;
    height: 3rem;
    outline: 0;
    resize: none;
    box-shadow: none;
    border-radius: .1rem;
    -webkit-appearance: none;
    background: #fdfdfd;
    color: #666;
    font-size: .28rem;
    text-align: justify;
    border: 1px solid #ccc;
    margin-bottom: 0;
    padding: .2rem;
    margin: .3rem auto; 
  }
  textarea::-webkit-input-placeholder {
    color: #bbb;
  }
  textarea:-moz-placeholder {
    color: #bbb;
  }
  input {
    padding: .2rem .28rem;
    outline: none;
    margin-bottom: .4rem;
    border: 0.01rem solid #ccc;
    border-radius: .1rem;
    margin-left: .25rem;
    width: 62%;
    font-size: .28rem;
    background-color: #fff; 
  }
  p.btn {
    height: 1.1rem;
    line-height: 1rem;
    display: block;
    background: url(../../images/user-center/invite-btn.png) no-repeat;
    background-size: cover;
    font-size: .28rem;
    border: none;
    color: #fff;
    text-align: center;
    width: 104%;
    margin-left: -2%;
  }
  p.btn.disabled-btn {
    height: 1.1rem;
    line-height: 1rem;
    display: block;
    background: url(../../images/user-center/disabled-btn.png) no-repeat;
    background-size: cover;
    font-size: .28rem;
    border: none;
    color: #fff;
    text-align: center;
    width: 104%;
    margin-left: -2%;
  }
</style>
