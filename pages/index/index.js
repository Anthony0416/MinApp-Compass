//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    item: {name: 'check', value: '不再提醒', checked: false},
  },
  //事件处理函数
  jump: function() {
    wx.redirectTo({
      url: '../compass/compass'
    })
  },
  checkBox: function (e) {
    if(e.detail.value[0]) {
      wx.setStorageSync('check', 1)
    } else {
      wx.setStorageSync('check', 0)
    }
  },
  onLoad: function () {
    var check = wx.getStorageSync('check')
    if(check == 1) {
      wx.redirectTo({
        url: '../compass/compass'
      })
    }
  }
})
