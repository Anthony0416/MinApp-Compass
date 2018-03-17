//app.js
App({
  onLaunch: function () {
    var verson = wx.getStorageSync('verson');
    if (verson == '1.4') {
    } else {
      wx.setStorageSync('verson', '1.4')
      wx.showModal({
        title: 'V1.4 更新说明',
        content: '加入明暗两大主题，白天晚上切换自如，妈妈再也不担心我看不清楚方向啦！',
      })
    }
  }
})