<template>
  <!-- 收货地址弹窗 -->
  <div class="adressBg" id="AdressMask">
    <!-- 表单填写 -->
    <div class="formAdress" v-show="PreAdress">
      <div class="adress-title">
        <span>收</span><span>货</span><span>地</span><span>址</span>
      </div>
      <form action="">
        <input type="text" placeholder="请输入您的收件人姓名" v-model="user.name">
        <input type="number" placeholder="请输入联系电话" v-model="user.mobile">
        <textarea id="adress" type="text" placeholder="请在此处输入您的详细收货地址\n(建议包含省/市、区级、详细街道名称)" v-model="user.address"></textarea>
        <div class="btns">
          <div class="mask-btn IKnowBtn fl" @click="closeMask">稍后填写</div>
          <div class="mask-btn toMessage fr" @click="PreAdressForm(user)">确认</div>
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
  import {ModalHelper, InputMaskHelper} from '../../service/Utils'
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
    props: ['showExchangeSuccess', 'exchangeInfo', 'AdressMask', 'closeMask', 'token', 'isFall', 'getAddress'],
    watch: {
      'AdressMask': function (newVal, oldVal) {
        var that = this
        if (newVal) {
          ModalHelper.afterOpen()
        } else {
          ModalHelper.beforeClose()
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
      PreAdressForm (user) {
        if (!user.name || !user.mobile || !user.address) {
          return
        }
        this.PreAdress = false
        this.PutAdress = true
      },
      PutAdressForm (user) {
        this.PreAdress = false
        this.PutAdress = false
        this.isFall ? this.showExchangeSuccess(this.exchangeInfo) : null
        if (this.busy) { return }
        if (!user.mobile || !user.name || !user.address) {
          return
        }
        var that = this
        that.busy = true
        that.$http.post('/hongcai/rest/addresses', {
          token: that.token,
          name: user.name,
          mobile: user.mobile,
          address: user.address
        })
        .then(function (res) {
          that.closeMask()
          if (res.data && res.data.ret === -1) {
            alert(res.data.msg)
          } else {
            that.isFall ? null : that.getAddress()
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '../../css/golden-mask.css';
</style>
