//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    height: '',
    text: '',
    pic: '',
    btn: '',
  },
  //事件处理函数
  jump: function() {
    wx.redirectTo({
      url: '../compass/compass'
    })
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync()
    var h
    console.log(res.model.substring(0,6) == 'iPhone')
    if (res.model.substring(0,6) == 'iPhone') {
      h = res.screenHeight - 64;
    } else {
      h = res.screenHeight - 71;
    }
    this.setData({
      height: h + "px",
      text: h/4 - 60 + "px",
      pic: h/2 - 100 + "px",
      btn: h - 60 + "px"
    })
  }
})
