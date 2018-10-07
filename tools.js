var Tools = {


//谷歌/火狐/ie9及他以后的浏览器,不支持currentStyle,用他获取到的是undefined.
  /**
   * 获取元素的样式的封装函数.
   * @param ele
   * @param attr
   * @returns {*}
   */
  getStyle: function (ele, attr) {
    //能力检测(判断当前浏览器是否支持某个方法或者属性.)
    if (ele.currentStyle) {
      //如果进到了这里,说明当前浏览器是ie8及他之前的浏览器.
      return ele.currentStyle[attr];
    } else {
      //如果进到了这里,说明当前浏览器是谷歌/火狐/ie9及以后.
      return window.getComputedStyle(ele, null)[attr];
    }
  },


  /**
   * 不同的浏览器,获取页面的scrollTop的方式不一样,所以要做兼容.
   * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}
   */
  getPageScroll: function () {
    return {
      scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
  },


//2.获取页面的clientWidth和clientHeight,不同的浏览器获取的方式不一样,所以要做兼容处理.
  /**
   * 获取页面的可视区的宽高.
   * @returns {{clientWidth: (Number|number), clientHeight: (Number|number)}}
   */
  getPageClient: function () {
    return {
      clientWidth: window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth
      || 0,
      clientHeight: window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
      || 0
    }
  },


//不同的浏览器,获取事件对象e的pageX/pageY的方式不一样,
//谷歌和火狐,ie9及以后的浏览器支持这个pageX和pageY.
//ie8及以前浏览器,要通过计算获取.
//兼容函数.
  getEventPage: function (e) {
    e = e || window.event;
    return {
      pageX: e.pageX || document.documentElement.scrollLeft + e.clientX,
      pageY: e.pageY || document.documentElement.scrollTop + e.clientY
    }
  },


//注意:因为attachEvent(),ie8及以前的浏览器支持,输出他的函数体有内容,而谷歌不支持,输出他的内容是undefined.
//console.log(btn.attachEvent);
//你懂的,不同的浏览器,给元素注册多个同样的事件,有不同的方式,所以要做兼容处理.
  /**
   * @param obj 要设置事件的元素
   * @param type string  事件名
   * @param listener  事件处理程序
   */
  setEventListener: function (obj, type, listener) {
    //能力检测.
    if (obj.attachEvent) {
      //如果进到这里来了,说明当前浏览器是ie8及以前的浏览器.
      obj.attachEvent("on" + type, listener);
    } else if (obj.attachEvent == undefined) {
      //如果进到这里来了,说明当前浏览器是谷歌/火狐/ie9及以后的浏览器.
      obj.addEventListener(type, listener, false);
    } else {
      //如果上面都不满足,就用on+"事件名称"的方式.
      obj["on" + type] = listener;
    }
  },


  /**
   * //移除事件兼容处理
   * @param obj 元素
   * @param type string 事件名称
   * @param listener 事件处理程序
   */
  removeEvent: function (obj, type, listener) {
    //能力检测
    if (obj.detachEvent) {
      //ie8及之前
      obj.detachEvent("on" + type, listener);
    } else if (obj.detachEvent == undefined) {
      //谷歌/火狐/ie9及以后
      obj.removeEventListener(type, listener, false);
    } else {
      obj["on" + type] = null;
    }
  },


//注意: ie8及以前的浏览器不支持e.stopPropagation(),输出函数体e.stopPropagation得到undefined
// console.log(e.stopPropagation);
//不同的浏览器,处理阻止冒泡有不同的方式,所以要做兼容处理
  stopBubble: function (e) {
    e = e || window.event;
    //能力检测
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      //如果进到这里来了,说明当前浏览器是ie8及以前的.
      e.cancelBubble = true;
    }
  }


}