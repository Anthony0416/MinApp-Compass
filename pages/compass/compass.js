//logs.js
Page({
  data: {
    direction: '--',
    angle: '--',
    rotate: '',
    backgroundColor: '#011b28',
    color: '#fff',
    bulb: '../../images/light.png',
    compass: '../../images/compass-dark.png'
  },
  //事件处理函数
  onLoad: function () {
    // 从缓存获取主题颜色，渲染主题
    var theme = wx.getStorageSync('theme');
    console.log(theme === 0)
    if (theme === 0) {
      this.setData({
        backgroundColor: '#fff',
        color: '#000',
        bulb: '../../images/tip.png',
        compass: '../../images/compass-light.png'
      })
    } else {
      this.setData({
        backgroundColor: '#011b28',
        color: '#fff',
        bulb: '../../images/light.png',
        compass: '../../images/compass-dark.png'
      })
    }
    // 罗盘Api
    var that = this;
    wx.onCompassChange(function (res) {
      // 罗盘数据保留两位小数
      var directions = res.direction.toFixed(2);
      var radios = res.direction.toFixed(0);
      that.setData({
        angle: directions,
        rotate: 360 - radios,
        direction: check(radios)
      })
    });
    // 判断手机是否有陀旋仪
    // 外部检测，如果没有陀旋仪数据，代码不会进入wx.onCompassChange
    // 必须使用setsetTimeout包裹代码，否则代码立即执行弹窗
    setTimeout(function(){
      if(that.data.direction == '--' && that.data.angle == '--'){
        wx.showToast({
          title: '您的手机没有电子罗盘或被禁用',
          icon: 'loading',
          duration: 5000,
          mask: true
        })
      }
    },3000);
    // 判断文字
    function check(i){
      if(15<=i && i<=75){
        return '东北'
      }else if(75<i && i<105){
        return '正东'
      }else if(105<=i && i<=165){
        return '东南'
      }else if(165<i && i<195){
        return '正南'
      }else if(195<=i && i<=255){
        return '西南'
      }else if(255<i && i<285){
        return '正西'
      }else if(285<=i && i<=345){
        return '西北'
      }else{
        return '正北'
      }
    } 
  },
  theme: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['亮色主题', '暗色主题'],
      success: function(res) {
        // res.tapIndex 亮色主题为0，暗色主题为1
        wx.setStorageSync('theme', res.tapIndex)
        if (res.tapIndex === 0) {
          that.setData({
            backgroundColor: '#fff',
            color: '#000',
            bulb: '../../images/tip.png',
            compass: '../../images/compass-light.png'
          })
        } else {
          that.setData({
            backgroundColor: '#011b28',
            color: '#fff',
            bulb: '../../images/light.png',
            compass: '../../images/compass-dark.png'
          })
        }
      }
    })
  },
  // 设置页面分享
  onShareAppMessage: function () {
      return {
          title: '我现在面向 ' + this.data.direction + ' 方向 , 点我使用迷你指南针为您指引方向！',
          path: '/pages/compass/compass'
      }
  }
})
