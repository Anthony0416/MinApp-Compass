## 小程序 -- 指南针

有这个想法是因为最近入了一加的坑，感叹氢OS简洁的同时发现系统也缺少了很多小工具。下第三方App又嫌麻烦，占空间不说，每次都要从大堆的软件列表里找App，着实不方便。遂谋生了用小程序自己做，一些有用，但是不常用的小工具。这里开始做第一个小工具 -- 指南针。

### V1.0

第一版设想是用两个页面，第一个页面用于提示校准电子罗盘，页面跳转主页面时使用redirectTo销毁提示页面。

先是用PS和cdr做提示图和指南针的表盘，这里略过。

用微信开发者工具创建项目。

项目结构如下：

```
├───app.js				    // 小程序逻辑
├───app.json				// 小程序公共设置
├───app.wxss				// 小程序公共样式
├───images					// 用来放置图片文件
└───pages					// 项目页面开发目录，里面的每个子目录代表一个独立页面
    ├───index				// index 页面目录
    │   ├───index.js	    // index 页面逻辑
    │  	├───index.wxml	    // index 页面结构
    │  	└───index.wxss	    // index 页面样式表
    └───compass				// logs 页面目录
    	├───compass.js			// logs 页面逻辑
    	├───compass.json		// logs 页面设置
    	├───compass.wxml		// logs 页面结构
    	└───compass.wxss		// logs 页面样式表
```

app.js在这里用不到，app.json声明页面，定义下小程序顶栏的样式，app.wxss定义了所有页面的背景。

index页面从上到下依次是提示文字，提示图，按钮；

js使用redirectTo({})销毁当前页面，跳转到下级页面。同时使用wx.getSystemInfoSync()接口获取机器型号，和屏幕可用高度，对安卓和ios做了兼容处理：

```
var res = wx.getSystemInfoSync()
var h
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
```

compass页面从上到下依次为方向，角度，罗盘；

js除了使用了上面的高度处理之外，使用wx.onCompassChange() 调取电子罗盘Api获取数据，给页面赋值。

```
    // 罗盘Api
    var that = this;
    wx.onCompassChange(function (res) {
      var directions = res.direction.toFixed(2);
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
```

页面的指南针旋转得益于小程序的数据驱动，使用style的内联样式放在页面中。

```
<image src="../../images/compass.png" style="transform: rotate({{rotate}}deg);"></image>
```



### V1.1

1，在使用自己的设备调试页面高度是刚刚好铺满屏幕的，但是后来发现安卓的碎片化真的太严重，有些机型下面依然会有难看的白条。遂找到另外一种方法：

平时我们在处理浏览器页面常用height: 100%; 来让页面铺满屏幕，其实小程序也是可以使用的，虽然小程序宣称没有Dom，不能直接操作Dom，但是切到调试页面的Wxml选项卡查看页面结构会发现小程序的页面包裹在<page>标签中。这里倒是和HTML的<body>很像嘛。尝试在app.wxss中添加page{height: 100%}，页面成功铺满屏幕。这样还不用区分机型了，简单省事。

2，虽然电子罗盘在手机上基本得到了普及，但是在一些老旧机型上依然没有，这样小程序就不能用了，所以这里对没有电子罗盘的机型做了处理，当获取到的罗盘数据为undefined时弹窗提醒用户。

