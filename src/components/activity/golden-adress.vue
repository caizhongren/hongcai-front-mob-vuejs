<template>
  <!-- 收货地址弹窗 -->
  <div class="adressBg" id="AdressMask">
    <!-- 表单填写 -->
    <div class="formAdress" v-show="PreAdress">
      <div class="adress-title">
        <span>收</span><span>货</span><span>地</span><span>址</span>
      </div>
      <form name="addressForm" autocomplete="off">
        <input name="name" type="text" placeholder="请输入您的收件人姓名" v-model="user.name" maxlength="10">
        <input name="mobile" type="text" placeholder="请输入联系电话" v-model="user.mobile" maxlength="15"  v-on:input="oninputHandler">
        <textarea name="address" id="adress" type="text" placeholder="请在此处输入您的详细收货地址\n(建议包含省/市、区级、详细街道名称)" v-model="user.address" maxlength="150"></textarea>
        <div class="btns">
          <div class="mask-btn IKnowBtn fl" @click="closeMask">稍后填写</div>
          <div class="mask-btn toMessage fr" :class="{'disable-btn': !user.name || !user.mobile ||!user.address}" @click="PreAdressForm(user)">确认</div>
        </div>
      </form>
    </div>
    <!-- 表单提交 -->
    <div class="formAdress" v-show="PutAdress">
      <div class="adress-title">
        <span>收</span><span>货</span><span>地</span><span>址</span>
      </div>
      <div class="formContent">
        <div class="account">
          <p>{{user.name}}</p>
          <p>{{user.mobile}}</p>
        </div>
        <div class="adress">{{user.address}}</div>
      </div>
      <div class="adressTips">*设置后将不可自行修改，请准确核实后再提交</div>
      <div class="btns padding">
        <div class="mask-btn IKnowBtn fl" @click="PreAdress = true;PutAdress = false">修改</div>
        <div class="mask-btn toMessage fr" @click="PutAdressForm(user)">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {InputMaskHelper} from '../../service/Utils'
  export default {
    name: 'GoldenAddress',
    data () {
      return {
        PreAdress: true,
        PutAdress: false,
        user: {
          name: '',
          mobile: '',
          address: ''
        },
        busy: false
      }
    },
    props: ['exchange', 'exchangeInfo', 'AdressMask', 'closeMask', 'token', 'isFall', 'getAddress'],
    watch: {
      'AdressMask': function (newVal, oldVal) {
        var that = this
        if (!newVal) {
          that.user.mobile = ''
          that.user.name = ''
          that.user.address = ''
        }
      }
    },
    created: function () {
    },
    mounted () {
      var textAreas = document.getElementsByTagName('textarea')
      Array.prototype.forEach.call(textAreas, function (elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, '\n')
      })
      var handleEle = document.getElementById('AdressMask')
      InputMaskHelper.windowChange(handleEle)
    },
    methods: {
      oninputHandler () {
        this.user.mobile = this.user.mobile.replace(/[^0-9/-]/g, '')
        this.user.mobile = this.user.mobile.length > 15 ? this.user.mobile.slice(0, 15) : this.user.mobile
      },
      PreAdressForm (user) {
        if (!user.name || !user.mobile || !user.address) {
          return
        }
        this.PreAdress = false
        this.PutAdress = true
      },
      PutAdressForm (user) {
        var that = this
        that.PreAdress = false
        that.PutAdress = false
        if (that.busy) { return }
        if (!user.mobile || !user.name || !user.address) {
          return
        }
        that.busy = true
        that.$http.post('/hongcai/rest/addresses', {
          token: that.token,
          name: user.name,
          mobile: user.mobile,
          address: user.address
        })
        .then(function (res) {
          if (res.data && res.data.ret === -1) {
            alert(res.data.msg)
            that.closeMask()
          } else {
            that.closeMask()
            that.isFall ? null : that.getAddress()
            that.isFall ? that.exchange(that.exchangeInfo) : null
          }
          setTimeout(function () {
            that.busy = false
          }, 1000)
        })
      }
    }
  }
</script>
<style scoped>
  @import '../../css/golden-mask.css';
</style>
