//logs.js
Page({
  data: {
    direction: '北',
    angle: '0',
    rotate: ''
  },
  //事件处理函数
  onLoad: function () {
    // 罗盘Api
    var that = this;
    wx.startCompass({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
    wx.onCompassChange(function (res) {
      // 保留两位小数
      var directions = res.direction.toFixed(2);
      console.log(directions == undefined);
      if(directions == '') {
        wx.showToast({
          title: '您的手机没有电子罗盘或被禁用',
          icon: 'warn',
          duration: 2000
        })
      }
      that.setData({
        angle: directions,
        rotate: 360 - directions,
        direction: check(directions)
      })
    })
    // 判断文字
    function check(i){
      if(22.5<i && i<67.5){
        return '东北'
      }else if(67.5<i && i<112.5){
        return '正东'
      }else if(112.5<i && i<157.5){
        return '东南'
      }else if(157.5<i && i<202.5){
        return '正南'
      }else if(202.5<i && i<247.5){
        return '西南'
      }else if(247.5<i && i<292.5){
        return '正西'
      }else if(292.5<i && i<337.5){
        return '西北'
      }else{
        return '正北'
      }
    } 
  }
})
