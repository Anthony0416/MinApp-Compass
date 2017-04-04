//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    height: '',
    text: '',
    pic: '',
    btn: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.onCompassChange(function (res) {
      console.log(res.direction)
    })
    var res = wx.getSystemInfoSync()
    var h = res.screenHeight - 71;
    this.setData({
      height: h + "px",
      text: h/4 - 60 + "px",
      pic: h/2 - 100 + "px",
      btn: h - 60 + "px"
    })
  }
})
