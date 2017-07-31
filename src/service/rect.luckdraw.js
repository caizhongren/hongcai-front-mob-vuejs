/*!
 * 方形抽奖
 * @author wd<githiwd@163.com>
 * @GitHub https://github.com/hiwd/luckdraw
 */
import $ from 'zepto'
var LuckDraw = {
  locked: false,
  RectLuckDraw: function (selector, prizeObj, options) {
    // var this = LuckDraw
    this.$selector = null
    this.prizeObj = prizeObj
    this.seqLis = []
    // 是否锁定
    this.locked = false
    this.options = $.extend(true, {
      itemClass: 'js-item', // 奖品
      startBtnClass: 'js-start-btn', // 开始按钮
      selectedClass: 'selecting', // 奖品选中添加类
      itemSortAttr: 'data-sort', // 奖品排序 1开始
      prizeIdAttr: 'data-prize-id', // 奖品ID
      defaultAnimateDelay: 200, // 默认延迟
      turnAroundCount: 3,
      minAnimateDelay: 50,
      maxAnimateDelay: 1000,
      calcAniDelay: false, // 当为function且有返回值时 function(当前延迟， 当前圈数， 当前项序号){return 新的延迟时间}
      turnStartCallback: function () {},
      turnEndCallback: function (prizeId, prizeObj) {},
      startBtnClick: function ($btn) {},
      onLock: function () {},
      onUnlock: function () {}
    }, options)
    this._init(selector)
    // this._bindEvents(selector)
  },
  start: function (prizeId) {
    var _this = this
    var options
    var $li
    if (this.isLocked() || this.seqLis.length === 0) {
      return
    }

    this.lock()

    this._initParams()

    options = this.options

    // 要不要改为记录最后数据取消
    for (var i = 0; i < this.seqLis.length; i++) {
      $li = this.seqLis[i]
      if ($li.hasClass(options.selectedClass)) {
        $li.removeClass(options.selectedClass)
        break
      }
    }

    this.seqLis[0].addClass(options.selectedClass)
    // 函数是否写到里面
    setTimeout(function () {
      _this._turning(prizeId)
    }, this.aniDelay)
    if (typeof options.turnStartCallback === 'function') {
      options.turnStartCallback.apply(this, [])
    }
  },
  _init: function (selector) {
    var $selector = $(selector)
    var options = this.options
    var $lis = $('.' + options.itemClass)
    this.$selector = $selector
    this.$lis = $lis
    this._sortLis($lis)
    this._initParams()
  },
  _initParams: function () {
    this.aniIndex = 0 // 当前动画播放位置
    this.aniDelay = this.options.defaultAnimateDelay // 当前动画的延迟
    this.currCircle = 0 // 当前第几圈
  },
  _bindEvents: function (selector) {
    var _this = this
    $(selector).on('click', '.' + this.options.startBtnClass, function () {
      var $this = $(this)
      console.log(222)
      if (typeof _this.options.startBtnClick === 'function') {
        _this.options.startBtnClick.apply(_this, [$this])
      }
    })
  },
  _sortLis: function ($lis) {
    var _this = this
    var options = this.options
    $lis.each(function (i) {
      _this.seqLis.push($lis.filter('[' + options.itemSortAttr + '="' + (i + 1) + '"]'))
    })
  },
  _turning: function (prizeId) {
    var _this = this
    var options = this.options
    var selectedClass = options.selectedClass
    var seqLis = this.seqLis
    var seqLen = seqLis.length
    this.seqLis[0].removeClass(options.selectedClass)
    seqLis[this.aniIndex].removeClass(selectedClass)
    this.aniIndex++
    if (this.aniIndex >= seqLen) {
      this.aniIndex = 0
      this.currCircle++
    }
    seqLis[this.aniIndex].addClass(selectedClass)

    // this._calcAniDelay()

    if (parseInt(seqLis[this.aniIndex].attr(options.prizeIdAttr)) === prizeId && this.currCircle === options.turnAroundCount) {
      setTimeout(function () {
        _this._turnEnd(prizeId)
      }, 300)
    } else {
      setTimeout(function () {
        _this._turning(prizeId)
      }, this.aniDelay)
    }
  },
  _turnEnd: function (prizeId) {
    this.unlock()
    if (typeof this.options.turnEndCallback === 'function') {
      this.options.turnEndCallback.apply(this, [prizeId, this.prizeObj[prizeId]])
    }
  },
  _calcAniDelay: function () {
    // alert('delay')
    var options = this.options
    var delay
    if (typeof options.calcAniDelay === 'function') {
      delay = options.calcAniDelay.apply(this, [this.aniDelay, this.currCircle, this.aniIndex])
    }
    if (delay) {
      this.aniDelay = delay
      return
    }

    if (this.currCircle < Math.max(Math.floor(options.turnAroundCount * 4 / 5), options.turnAroundCount - 2)) {
      this.aniDelay = Math.max(this.aniDelay - 5, options.minAnimateDelay)
    } else {
      this.aniDelay = Math.min(this.aniDelay + this.aniIndex * 5 * 3, options.maxAnimateDelay)
    }
  },
  lock: function () {
    this.locked = true

    // if (typeof this.options.onLock === 'function') {
    //   this.options.onLock.apply(this, [])
    // }
  },
  unlock: function () {
    this.locked = false

    // if (typeof this.options.onLock === 'function') {
    //   this.options.onUnlock.apply(this, [])
    // }
  },
  isLocked: function () {
    return this.locked
  }
}
export {LuckDraw}
