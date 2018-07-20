/**
 * LBS mCarousel
 * Date: 2016-04-08
 * ===================================================
 * el 包裹容器(一个字符串css3选择器或者元素对象)
 * opts.index 当前居中元素的索引 默认(0)
 * opts.scale 缩放比率 默认(0.8)
 * opts.diff  控制左右位置
 * opts.active 当前居中的类名 默认('active')
 * opts.duration 动画持续时间 默认 400(ms)
 * opts.locked 触摸移动中是否同时变换 默认(false: 不锁定)
 				(当切换元素个数小于4个 锁定同时变换)
 * opts.before 每次切换动画开始执行函数
 * opts.after 每次切换动画完成执行函数
 * ===================================================
 * this.prev 手动调用向上一个
 * this.next 手动调用向下一个
 * ===================================================
 **/
import $ from 'zepto'
var utils = (function() {
  var div = document.createElement('div'),
    style = div.style,
    vendors = ['webkit', 'Moz', 'ms', 'O'],
    i = 0,
    l = vendors.length,
    toHumb = function(str) {
      return str.replace(/-\D/g, function(match) {
        return match.charAt(1).toUpperCase();
      });
    };

  var css = function(el, property) {
      return getComputedStyle(el, null)[toHumb(property)];
    },

    addEvent = function(el, type, fn) {
      return el.addEventListener(type, fn, false);
    },

    on = function(el, type, fn) {
      if (typeof type === 'string') return addEvent(el, type, fn);
      for (var i = 0, l = type.length; i < l; i++) addEvent(el, type[i], fn);
    },

    hasClass = function(el, cls) {
      return -1 < (' ' + el.className + ' ').indexOf(' ' + cls + ' ');
    },

    addClass = function(el, cls) {
      if (!hasClass(el, cls)) el.className += ' ' + cls;
    },

    removeClass = function(el, cls) {
      if (hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, '');
      }
    },

    prefix = function(property) {
      var prop = toHumb(property);
      if (prop in style) return prop;
      for (i = 0; i < l; i++) {
        prop = toHumb(vendors[i] + '-' + property);
        if (prop in style) return prop;
      }
      return null;
    },

    supportCss = function(property) {
      var prop = toHumb(property);
      if (prop in style) return true;
      for (i = 0; i < l; i++) {
        prop = toHumb(vendors[i] + '-' + property);
        if (prop in style) return true;
      }
      return false;
    },

    support3d = function() {
      var has3d, transform,
        body = document.body;
      body.appendChild(div);
      if (supportCss('transform')) {
        transform = prefix('transform');
        div.style[transform] = 'translate3d(1px,1px,1px)';
        has3d = css(div, transform);
      }
      body.removeChild(div);
      return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
    },

    getTime = Date.now || function() {
      return new Date().getTime();
    };

  return {
    css: css,
    on: on,
    addClass: addClass,
    removeClass: removeClass,
    prefix: prefix,
    supportCss: supportCss,
    support3d: support3d,
    getTime: getTime
  };
}());
var Carousel = {
  _init: function(length) {
    this._setup();
    length < 2 ? null : this._bindEvent();
  },
  _setup: function() {
    if (utils.css(this.wrapper, 'position') === 'static') this.wrapper.style.position = 'relative';
    for (var i = 0; i < this.length; i++) {
      if (utils.css(this.elements[i], 'position') === 'static') this.elements[i].style.position = 'absolute';
      this._setDisplay(i, 'none');
    }
    this._setActive(this.index);
  },
  startPos: {},
  endPos: {},
  _bindEvent: function() {
    utils.on(this.wrapper, 'touchstart', this._start.bind(this));
    utils.on(this.wrapper, 'touchmove', this._move.bind(this));
    utils.on(this.wrapper, 'touchend', this._end.bind(this));
  },
  _start: function(e) {
    this.startTime = utils.getTime();
    this._reset();
    let touch = e.targetTouches[0]
    this.startPos = {x: touch.pageX, y: touch.pageY}
  },
  _move: function(e) {
    let touch = e.targetTouches[0]
    this.endPos = {x: touch.pageX - this.startPos.x, y: touch.pageY - this.startPos.y}
    var isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0
    if (isScrolling === 1) {return}
    if (!e.touches) return;
    if (!!this.animated) return;
    e.preventDefault();

    var moveX = e.touches[0].pageX,
      moveY = e.touches[0].pageY,
      deltaX = this.moveX === null ? 0 : moveX - this.moveX,
      deltaY = this.moveY === null ? 0 : moveY - this.moveY,
      timestamp = utils.getTime();

    this.deltaX += deltaX;
    this.deltaY += deltaY;

    if (!this.locked) {
      var rate = Math.abs(this.deltaX / this.spaceX);

      var ix = this.elements[this.index]._x + deltaX;
      var nx = this.elements[this.nIndex]._x + deltaX;
      var ox = this.elements[this.oIndex]._x + deltaX;

      var ir = 1 - this.dRatio * rate;
      var r = this.ratio + this.dRatio * rate;
      if (ir < this.ratio) ir = this.ratio;
      if (r > 1) r = 1;

      this._setTransform(this.index, ix, 0, ir.toFixed(2));

      if (this.deltaX > 0) {
        this._setTransform(this.oIndex, ox, 0, r.toFixed(2));
        this._setTransform(this.nIndex, nx, 0, this.ratio);

        if (!this.moved) {
          this._setFourth(this.oIndex, 'right');
          this._setStacks('right');
          this.moved = true;
        }

        var dx = this.elements[this.dIndex]._x + deltaX * this.rate;
        this._setTransform(this.dIndex, dx, 0, this.ratio);
        if (dx > this.rightPos) {
          this._setDisplay(this.dIndex, 'none');
          this._setFourth(this.oIndex, 'right');
          this._setStacks('right');
        }

        if (ir <= this.ratio) {
          this._setDisplay(this.nIndex, 'none');
          this._setActive(this.oIndex);
          this._reset();
        }
        // console.log('向右滑动')
      } else if (this.deltaX < 0) {
        this._setTransform(this.nIndex, nx, 0, r.toFixed(2));
        this._setTransform(this.oIndex, ox, 0, this.ratio);

        if (!this.moved) {
          this._setFourth(this.nIndex, 'left');
          this._setStacks('left');
          this.moved = true;
        }

        var dx = this.elements[this.dIndex]._x + deltaX * this.rate;
        this._setTransform(this.dIndex, dx, 0, this.ratio);
        if (dx < this.leftPos) {
          this._setDisplay(this.dIndex, 'none');
          this._setFourth(this.nIndex, 'left');
          this._setStacks('left');
        }

        if (ir <= this.ratio) {
          this._setDisplay(this.oIndex, 'none');
          this._setActive(this.nIndex);
          this._reset();
        }
        // console.log('向左滑动')
      }
    }

    this.moveX = moveX;
    this.moveY = moveY;

    if (timestamp - this.startTime >= 200) {
      this.startTime = timestamp;
    }
  },
  _end: function(e) {
    if (!e.changedTouches) return;
    if (!this.locked && !this.moved) return;
    if (!!this.animated) return;

    var duration = utils.getTime() - this.startTime,
      deltaX = Math.abs(this.deltaX);

    if ((duration < 200 && deltaX > 10) || deltaX > this.spaceX / 2) {
      this.deltaX > 0 ? this.prev() : this.next();
    } else {
      !this.locked && this._reStore();
    }
  },
  _setTransition: function(index, time) {
    time = time || 0;
    this.elements[index].style[this._prefixTransition] = 'all ' + time + 'ms';
  },
  _setTransform: function(index, x, y, ratio) {
    if (this._hasTransform3d) {
      this.elements[index].style[this._prefixTransform] = 'translate3d(' + x + 'px,' + y + 'px, 0px) ' + 'scale3d(' + ratio + ',' + ratio + ', 1)';
    } else if (this._hasTransform2d) {
      this.elements[index].style[this._prefixTransform] = 'translate(' + x + 'px,' + y + 'px) ' + 'scale(' + ratio + ',' + ratio + ')';
    } else {
      this.elements[index].style.left = x + 'px';
      this.elements[index].style.top = y + 'px';
    }
    this.elements[index]._x = x;
    this.elements[index]._y = y;
    this.elements[index]._ratio = ratio;
  },
  _setTransitionEnd: function() {
    this.animated = false;
    this._setTransition(this.index, 0);
    this._setTransition(this.oIndex, 0);
    this._setTransition(this.nIndex, 0);
    this._setTransition(this.dIndex, 0);
    this.after && this.after.call(this, this.index, this.elements[this.index]);
  },
  _setTransitionStart: function(duration) {
    this._setTransition(this.index, duration);
    this._setTransition(this.oIndex, duration);
    this._setTransition(this.nIndex, duration);
    this._setTransition(this.dIndex, duration);
    this.before && this.before.call(this, this.index, this.elements[this.index]);
  },
  _setIndex: function(index) {
    this.index = index;
    if (this.index > this.length - 1) this.index = 0;
    if (this.index < 0) this.index = this.length - 1;
    this.nIndex = index + 1;
    if (this.nIndex > this.length - 1) this.nIndex = 0;
    this.oIndex = index - 1;
    if (this.oIndex < 0) this.oIndex = this.length - 1;
  },
  _setStack: function(index, value) {
    this.elements[index].style.zIndex = value;
  },
  _setStacks: function(dir) {
    this._setStack(this.index, 2);
    if (dir === 'left') {
      this._setStack(this.oIndex, 1);
      this._setStack(this.nIndex, 3);
    } else if (dir === 'right') {
      this._setStack(this.oIndex, 3);
      this._setStack(this.nIndex, 1);
    } else if (dir === 'center') {
      this._setStack(this.oIndex, 1);
      this._setStack(this.nIndex, 1);
    }
  },
  _setDisplay: function(index, value) {
    if (utils.css(this.elements[index], 'display') === value) return;
    this.elements[index].style.display = value;
  },
  _setActive: function(index) {
    var cur = document.getElementsByClassName('management-introduction')[index]
    $('.management-introduction').hide()
    $(cur).show()
    this._setIndex(index);
    // console.log('当前index值：' + this.index)
    this._setDisplay(this.nIndex, 'block');
    this._setDisplay(this.index, 'block');
    this._setDisplay(this.oIndex, 'block');
    this._setTransform(this.oIndex, this.leftX, 0, this.ratio);
    this._setTransform(this.nIndex, this.rightX, 0, this.ratio);
    this._setTransform(this.index, this.centerX, 0, 1);
    this._setStacks('center');
    utils.removeClass(this.elements[this.oIndex], this.active);
    utils.removeClass(this.elements[this.nIndex], this.active);
    utils.addClass(this.elements[this.index], this.active);
  },
  _setFourth: function(index, dir) {
    var dx = 0;
    if (dir === 'right') {
      this.dIndex = index - 1;
      dx = this.leftPos;
    } else if (dir === 'left') {
      this.dIndex = index + 1;
      dx = this.rightPos;
    }
    if (this.dIndex > this.length - 1) this.dIndex = 0;
    if (this.dIndex < 0) this.dIndex = this.length - 1;
    if (utils.css(this.elements[this.dIndex], 'display') === 'block') return; //#2
    this._setDisplay(this.dIndex, 'block');
    this._setTransform(this.dIndex, dx-10, 0, this.ratio);
  },
  _reset: function() {
    this.deltaX = this.deltaY = 0;
    this.moveX = this.moveY = null;
    this.moved = false;
  },
  _reStore: function() {
    this._setTransitionStart(this.duration);
    this._setTransform(this.index, this.centerX, 0, 1);
    this._setTransform(this.oIndex, this.leftX, 0, this.ratio);
    this._setTransform(this.nIndex, this.rightX, 0, this.ratio);
    if (this.deltaX > 0) {
      this._setTransform(this.dIndex, this.leftPos, 0, this.ratio);
      this._setStacks('center');
    } else {
      this._setTransform(this.dIndex, this.rightPos, 0, this.ratio);
      this._setStacks('center');
    }
    setTimeout(function() {
      this._setTransitionEnd();
      this._setDisplay(this.dIndex, 'none');
    }.bind(this), this.duration);
  },
  prev: function() {
    if (!!this.animated) return;
    this.animated = true;
    this._setFourth(this.oIndex, 'right');
    this._setStacks('right');
    setTimeout(function() {
      this._setTransform(this.index, this.rightX, 0, this.ratio);
      this._setTransform(this.oIndex, this.centerX, 0, 1);
      this._setTransform(this.nIndex, this.rightPos, 0, this.ratio);
      this._setTransform(this.dIndex, this.leftX, 0, this.ratio);
      this._setTransitionStart(this.duration);
    }.bind(this), 0);
    setTimeout(function() {
      this._setTransitionEnd();
      this._setDisplay(this.nIndex, 'none');
      this._setActive(this.oIndex);
    }.bind(this), this.duration);
  },
  next: function() {
    if (!!this.animated) return;
    this.animated = true;
    this._setFourth(this.nIndex, 'left');
    this._setStacks('left');
    setTimeout(function() {
      this._setTransform(this.index, this.leftX, 0, this.ratio);
      this._setTransform(this.oIndex, this.leftPos, 0, this.ratio);
      this._setTransform(this.nIndex, this.centerX, 0, 1);
      this._setTransform(this.dIndex, this.rightX, 0, this.ratio);
      this._setTransitionStart(this.duration);
    }.bind(this), 0);
    setTimeout(function() {
      this._setTransitionEnd();
      this._setDisplay(this.oIndex, 'none');
      this._setActive(this.nIndex);
    }.bind(this), this.duration);
  }
};
Carousel.mCarousel = function(el, opts) {
  // this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  this.wrapper = el
  this.scroller = this.wrapper.children[0];
  this.elements = this.scroller.children;
  this.length = this.elements.length;
  // if (this.length < 3) return;

  this._hasTransform3d = utils.support3d();
  this._hasTransform2d = utils.supportCss('transform');
  this._hasTransition = utils.supportCss('transition');
  this._prefixTransition = utils.prefix('transition');
  this._prefixTransform = utils.prefix('transform');
  // this._prefixTransformOrigin = utils.prefix('transform-origin');

  this.index = opts.index || 0;
  this.ratio = opts.scale || 0.8;
  this.active = opts.active || 'active';
  this.duration = opts.duration || 400;
  this.before = opts.before || function() {};
  this.after = opts.after || function() {};
  this.locked = opts.locked || false;
  this.diff = opts.diff || 2
  if (this.length < 4) this.locked = true;

  this.viewW = this.wrapper.offsetWidth || window.innerWidth - 80;
  // this.viewH = this.wrapper.offsetHeight;
  this.singleW = opts.width || this.elements[this.index].offsetWidth || this.viewW - 100;
  // this.singleW = 230;
  // this.singleH = opts.height || this.elements[this.index].offsetHeight;
  this.centerX = (this.viewW - this.singleW) / 2;
  // this.centerY = (this.viewH - this.singleH) / 2;
  this.diffX = (this.singleW - this.singleW * this.ratio) / this.diff; //计算(transformOrigin = 'center center')的偏移
  this.leftX = this._hasTransform2d ? -this.diffX : 0;
  this.rightX = this._hasTransform2d ? this.viewW - this.singleW + this.diffX : this.viewW - this.singleW;
  this.spaceX = this.centerX - this.leftX;
  this.leftPos = this.leftX - this.singleW * this.ratio;
  this.rightPos = this.rightX + this.singleW * this.ratio;
  this.rate = Math.abs((this.singleW * this.ratio) / this.spaceX);
  this.dRatio = 1 - this.ratio;
  // this.overlap = !!(this.singleW + 2 * this.singleW * this.ratio > this.viewW);

  this._init(this.length);
};
if (typeof define === 'function' && (define.amd || define.cmd)) {
  define('mCarousel', [], function() {
    return mCarousel;
  });
} else {
  window.mCarousel = Carousel.mCarousel;
}
export {Carousel}