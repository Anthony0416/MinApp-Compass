//app.js
App({
  onLaunch: function () {
    //调用指南针Api
    wx.onCompassChange(function (res) {
      wx.setStorageSync('compass', res.direction)
      if (1) {

      }else {

      }
    })
  }
})