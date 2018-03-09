import $ from 'zepto'
let Utils = {
  isWeixin: function () {
    var ua = navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) === 'micromessenger'
  },
  isAndroid: function () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /android/i.test(userAgent) && !/windows phone/i.test(userAgent)
  },
  isIos: function () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
  },
  isWinPhone: function () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /windows phone/i.test(userAgent)
  },
  deviceCode: function () {
    var deviceCode = 0
    if (Utils.isAndroid()) {
      deviceCode = 2
    }
    if (this.isWeixin() && Utils.isAndroid()) {
      deviceCode = 3
    }
    if (Utils.isIos()) {
      deviceCode = 5
    }
    if (this.isWeixin() && Utils.isIos()) {
      deviceCode = 6
    }
    console.log(deviceCode)
    return deviceCode
  },
  guestId: function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }
}
let InviteShareUtils = {
  share: function (inviteCode) {
    var title = this.shareTitle()
    var subTitle = this.shareSubtitle()
    var linkUrl = this.shareLink(inviteCode)
    var imageUrl = this.shareImageUrl()
    var shareItem = {
      title: title,
      subTitle: subTitle,
      linkUrl: linkUrl,
      imageUrl: imageUrl
    }
    return shareItem
  },
  shareTitle: function () {
    var titleArray = []
    titleArray.push('加入“宏财合伙人计划” ，一起发宏财！')
    titleArray.push('朋友！收下这份大礼，你就是我的人了！')
    titleArray.push('这四海八荒的财运，我都攒到一起送给你啦！')
    titleArray.push('一个好汉三个帮，投资就上宏财网！')
    return titleArray[Math.floor(Math.random() * titleArray.length)]
  },
  shareSubtitle: function () {
    var subTitle = '新手立享966元现金红包！'
    return subTitle
  },
  shareLink: function (inviteCode) {
    var shareLink = process.env.domain + '/activity/invite-sharing'
    if (inviteCode) {
      shareLink = shareLink + '/' + inviteCode
    }
    shareLink = shareLink + '?act=22&f=officeweb'
    return shareLink
  },
  shareImageUrl: function () {
    var imageUrl = 'https://mmbiz.qlogo.cn/mmbiz_jpg/8MZDOEkib8Akr3KNzVxtZ95xUPndUzXu3CvoSK2iap7RdeDEU69hTG8tSSL0no6uV9T75FqVsJXj54hVicu40KMicw/0?wx_fmt=jpeg'
    return imageUrl
  }
}
let bridgeUtil = {
  setupWebViewJavascriptBridge: function (callback) {
    if (Utils.isIos()) {
      if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge)
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
      return
    }
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          try {
            window.WebViewJavascriptBridge.init(function (message, responseCallback) {
              var data = {
                'Javascript Responds': 'Wee!'
              }
              responseCallback(data)
            })
          } catch (e) {}
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
  },
  webConnectNative: function (callHandlerName, registerHandlerName, nativeNeedDatas, callHandlerCallback, registerHandlerCallback) {
    // callHandlerName 要调用的native方法名并传出数据，registerHandlerName web注册的方法接收native数据，nativeNeedDatas 是native端需要的数据，
    // callHandlerCallback web to native成功回调  registerHandlerCallback 接受native成功回调
    if (window.WebViewJavascriptBridge) {
      if (callHandlerName) {
        window.WebViewJavascriptBridge.callHandler(callHandlerName, nativeNeedDatas, callHandlerCallback)
      }
      if (registerHandlerName) {
        window.WebViewJavascriptBridge.registerHandler(registerHandlerName, registerHandlerCallback)
      }
      return
    }
    this.setupWebViewJavascriptBridge(function (bridge) {
      // 调用native方法
      if (callHandlerName) {
        bridge.callHandler(callHandlerName, nativeNeedDatas, callHandlerCallback)
      }
      // 注册方法，以便native调用
      if (registerHandlerName) {
        bridge.registerHandler(registerHandlerName, registerHandlerCallback)
      }
    })
  }
}
/**
 * 滚动穿透问题
 */
let ModalHelper = (function (bodyCls) {
  return {
    scrollTop: document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop,
    afterOpen: function () {
      ModalHelper.scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -ModalHelper.scrollTop + 'px'
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls)
      document.body.removeAttribute('style')
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = ModalHelper.scrollTop
      } else {
        document.body.scrollTop = ModalHelper.scrollTop
      }
    }
  }
})('modal-open')
/**
 * 两个日期相差天数
 */
let dateUtil = {
  intervalDays: function (timeInMills1, timeInMills2) {
    var t1 = new Date(timeInMills1)
    var t2 = new Date(timeInMills2)
    t1.setHours(0)
    t1.setMinutes(0)
    t1.setSeconds(0)
    t1.setMilliseconds(0)
    t2.setHours(0)
    t2.setMinutes(0)
    t2.setSeconds(0)
    t2.setMilliseconds(0)
    var DAY_TIME_IN_MILLS = 24 * 60 * 60 * 1000
    return Math.abs((t1.getTime() - t2.getTime()) / DAY_TIME_IN_MILLS)
  }
}
/**
 * 发送验证码动画
 */
let sendMobCaptcha = {
  second: 60,
  canGetMobileCapcha: true,
  timmer: null,
  resetGetMobileCapcha: function () {
    clearTimeout(this.timmer)
    this.canGetMobileCapcha = true
    this.second = 60
    this.timmer = null
  },
  countDown: function ($mobilecode) {
    // 如果秒数还是大于0，则表示倒计时还没结束
    if (sendMobCaptcha.second > 0) {
      // 倒计时不结束按钮不可点
      sendMobCaptcha.canGetMobileCapcha = false
      $mobilecode.innerHTML = null
      $mobilecode.innerHTML = sendMobCaptcha.second + 's'
      $mobilecode.className = ''
      // 时间减一
      sendMobCaptcha.second -= 1
      // 一秒后重复执行
      sendMobCaptcha.timmer = setTimeout(function () {
        sendMobCaptcha.countDown($mobilecode)
      }, 1000)
      // 否则，按钮重置为初始状态,可点击
    } else {
      sendMobCaptcha.canGetMobileCapcha = true
      $mobilecode.className += ' send'
      $mobilecode.innerHTML = '重新获取'
      sendMobCaptcha.second = 60
    }
  }
}
/**
 * 安卓键盘弹出挡住输入框解决方法
 */
let InputMaskHelper = (function (eleCls) {
  return {
    focus: function (ele) {
      if (Utils.isAndroid()) {
        ele.classList.add(eleCls)
      }
    },
    blur: function (ele) {
      if (Utils.isAndroid()) {
        ele.classList.remove(eleCls)
      }
    },
    windowChange: function (ele) {
      var winHeight = $(window).height()
      window.addEventListener('resize', function () {
        if ($(window).height() < winHeight) {
          setTimeout(InputMaskHelper.focus(ele), 0)
        } else {
          InputMaskHelper.blur(ele)
        }
      })
    }
  }
})('input-focus')
/**
 * 添加音效
 */
let audioPlayUtil = {
  // isPlay 默认不传是播放，传值是静音
  playOrPaused: function (ele, isPlay) {
    if (isPlay === 'true') {
      ele = document.getElementById(ele)
      ele.currentTime = 0
      ele.play()
    }
  }
}
/**
 * 公共动画特效
 */
let commonAnimation = {
  // 数字动画、递增特效 elem（数字元素）, endVal（截止数字值）, startVal（起始数字值）, duration（动画时长）, decimal（保留小数点位数）
  countToNumber: function (elem, endVal, startVal, duration, decimal) {
    var startTime = 0
    var dec = Math.pow(10, decimal)
    var progress, value
    function startCount (timestamp) {
      if (!startTime) startTime = timestamp
      progress = timestamp - startTime
      value = startVal + (endVal - startVal) * (progress / duration)
      value = (value > endVal) ? endVal : value
      value = Math.floor(value * dec) / dec
      elem.html(value.toFixed(decimal))
      progress < duration && requestAnimationFrame(startCount)
    }
    requestAnimationFrame(startCount)
  }
}
export {Utils}
export {InviteShareUtils}
export {bridgeUtil}
export {ModalHelper}
export {dateUtil}
export {sendMobCaptcha}
export {InputMaskHelper}
export {audioPlayUtil}
export {commonAnimation}
