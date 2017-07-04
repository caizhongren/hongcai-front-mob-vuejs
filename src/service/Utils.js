let Utils = {
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
    titleArray.push('有一张10%的加息券正向你飞来，快接住！')
    titleArray.push('朋友！收下这份大礼，你就是我的人了！')
    titleArray.push('这四海八荒的财运，我都攒到一起送给你啦！')
    titleArray.push('10%新人加息券来了，手快有手慢无！')
    titleArray.push('一个好汉三个帮，投资就上宏财网！')
    return titleArray[Math.floor(Math.random() * titleArray.length)]
  },
  shareSubtitle: function () {
    var subTitle = '新手立享10%加息特权，再送炫目大礼包！国资背景+银行存管，上宏财，财运来！'
    return subTitle
  },
  shareLink: function (inviteCode) {
    var shareLink = 'http://m.hongcai.com' + '/activity/invite-sharing'
    if (inviteCode) {
      console.log(inviteCode)
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
let ruleBox = {
  showRuleBox: function (el, vue, showRules) {
    vue.showRules = !vue.showRules
    vue.showRules ? el.className = 'position-fix' : el.className = ' '
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
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
    if (Utils.isAndroid()) {
      if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady'
          , function () {
            callback(window.WebViewJavascriptBridge)
          },
          false
        )
      }
    }
  },
  connectWebViewJavascriptBridge: function (callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
  },
  webConnectNative: function (callHandlerName, registerHandlerName, nativeNeedDatas, callHandlerCallback, registerHandlerCallback) {
    // callHandlerName 要调用的native方法名并传出数据，registerHandlerName web注册的方法接收native数据，nativeNeedDatas 是native端需要的数据，
    // callHandlerCallback web to native成功回调  registerHandlerCallback 接受native成功回调
    if (Utils.isIos()) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        if (callHandlerName) {
          bridge.callHandler(callHandlerName, nativeNeedDatas, callHandlerCallback)
        }
        if (registerHandlerName) {
          bridge.registerHandler(registerHandlerName, registerHandlerCallback)
        }
      })
    }
    // android
    if (Utils.isAndroid()) {
      if (callHandlerName) {
        this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler(callHandlerName, nativeNeedDatas, callHandlerCallback)
        })
      }
      if (registerHandlerName) {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.init(function (message, responseCallback) {
            console.log('JS got a message', message)
            var data = {
              'Javascript Responds': '测试中文!'
            }
            console.log('JS responding with', data)
            responseCallback(data)
          })
          bridge.registerHandler(registerHandlerName, registerHandlerCallback)
        })
      }
    }
  }
}
export {Utils}
export {InviteShareUtils}
export {ruleBox}
export {bridgeUtil}
