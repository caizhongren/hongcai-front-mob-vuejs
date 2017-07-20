<template>
  <div class="feedback">
    <div class="title" @click="postFeesback()">
      <p>尊敬的用户：</p>
      <p>为了给您更好的服务，请详细描述您的问题或建议，我们将及时跟进解决，不断优化产品！</p>
    </div>
    <form action="" name="fadebackForm">
      <textarea name="" id="feedbackInfo" cols="6" rows="5" placeholder="你想吐槽的原因：" required initial="off" v-model="feedbackInfo"></textarea>
      <label for="mobile">
        联系方式
        <input type="mobile" name="mobile" id="contackWay" placeholder="(选填)" initial="off" v-model="contackWay">
        <p type="button" class="btn" @click="postFeesback()">
          提交
        </p>
      </label>
    </form>
  </div>
</template>
<script>
  import $ from 'zepto'
  export default {
    data () {
      return {
        msg: 'hello',
        contackWay: '',
        feedbackInfo: '',
        busy: false
      }
    },
    created () {
      this.contackWay = $('#contackWay').val()
      this.feedbackInfo = $('#feedbackInfo').val()
    },
    watch: {
      contackWay: function (newVal, oldVal) {
        this.contackWay = $('#contackWay').val()
      },
      feedbackInfo: function (newVal, oldVal) {
        this.feedbackInfo = $('#feedbackInfo').val()
      }
    },
    methods: {
      postFeesback: function () {
        if (this.busy) {
          return
        }
        if (!this.feedbackInfo || this.feedbackInfo === '') {
          return
        }
        if (this.contackWay && this.contackWay.toString().length !== 11) {
          return
        }
        this.busy = true
        this.$http({
          method: 'post',
          url: '/hongcai/api/v1/feedback/saveFeedback?feedbackInfo=' + this.feedbackInfo + '&contackWay=' + undefined
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            setTimeout(function () {
              this.busy = false
            }, 1000)
            if (confirm('反馈成功')) {
              this.feedbackInfo = $('#feedbackInfo').val('')
              this.contackWay = $('#contackWay').val('')
              return
            }
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
    padding: .28rem .35rem;
  }
  .title p, label {
    color: #ff6000;
    font-size: .28rem;
  }
  .title p:first-child {
    display: inline-block;
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
    color: #bbb;
    font-size: .28rem;
    text-align: justify;
    border: 1px solid #ccc;
    margin-bottom: 0;
    padding: .2rem;
    margin: .2rem 0 .4rem;
  }
  input {
    height: .85rem;
    line-height: .85rem;
    padding: 0 .28rem;
    margin-bottom: .7rem;
    border: 1px solid #ccc;
    border-radius: .1rem;
    margin-left: .25rem;
    width: 62%;
    font-size: .28rem;
  }
  p.btn {
    height: .9rem;
    line-height: .9rem;
    display: block;
    background: url(../../images/user-center/invite-btn.png) no-repeat;
    background-size: cover;
    font-size: .3rem;
    padding: 0;
    border: none;
    color: #fff;
    text-align: center;
    width: 104%;
    margin-left: -2%;
  }
</style>
