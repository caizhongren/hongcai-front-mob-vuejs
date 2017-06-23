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
export {Utils}
