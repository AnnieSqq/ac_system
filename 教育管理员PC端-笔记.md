# 一 功能与实现

## 1 模拟后端数据

使用mock.js：创建@/mock/index,js：

```js
// 引入mockjs
import Mock from 'mockjs'
// 使用mockjs模拟数据
Mock.mock(RegExp('/api/test.*'), 'get', {
  ret: 0,
  data: {
    mtime: '@datetime', // 随机生成日期时间
    'score|1-800': 800, // 随机生成1-800的数字
    'rank|1-100': 100, // 随机生成1-100的数字
    'stars|1-5': 5, // 随机生成1-5的数字
    nickname: '@cname' // 随机生成中文名字
  }
  // 其他数据的写法在官网有详细的案例
})
// 延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600'
})
```

然后在main.js引入：import ‘@/mock’

然后在mock/index.js中模拟请求的响应数据就行，根本不用更改原有的axio配置

注：

> 1. 要保留跨域处理的vue.config.js，否则请求还是会被跨域拦截
> 2. mock中的url可以传字符串，也可以传正则。因此，如果get请求带参数时可以使用正则匹配

## 2 监听页面滚动

```js
window.onscroll = function() {
  //为了保证兼容性，这里取两个值，哪个有值取哪一个
  //scrollTop就是触发滚轮事件时滚轮的高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //还有scrollLeft横向滚动距离等
  console.log("滚动距离" + scrollTop);
}
```



# 二 问题与解决

## 1 ant design vue 有两个问题：

1. 按需导入的样式问题：使用插件一键导入之后，无法显示样式。要重启一下网页

2. 主题定制无效的问题：

   - 使用vue.config.js的modifyVars来修改时，要注意less-loader的版本。vue-cli创建的版本默认是4.x，用6.x比较好。现在已经有8.x了，但是版本太高也不好适配。
   - 使用自定义less文件来定制主主题。注意它引入是在自己的less文件爱你中，使用@import引入。路径要加~。然后将自己的那个less在js中引入到main.js或者按需导入的js文件中都可以。然后less-loader如果是6.x，就必须使用vue.config.js。所以如果不用modifyVars的话，可以就用4.x的版本

   > 注：体验下来还是使用自定义less的方式更好用。因为modifyVars的方式修改的时候不能热更新，连刷新也没有，必须重启网页的服务器。但是自定义less的更新就比较灵敏

## 2 vue cli中css的背景图片引入问题

使用import，然后动态绑定style。

```js
data() {
  return {
    backgroundImg: require('@/assets/images/background_login.jpg')
  }
}
```

```html
<div :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"></div>
```

## 3 使用栅格布局时设置间距问题

描述：要设置间距可以使用space组件。但由于是在栅格系统中，为了不破坏原有的布局，因此不用space。但是用gutter时也有一个问题：最左边的第一个col的左边也会有一个边距，就会导致跟下一行不对齐的问题。

解决：可以使用flex布局的justify设置为space-between。在右边添加col来占位，就可以不破坏整体性的通知书，也不破坏它的两端对齐。

## 4 跨域请求被拦截问题

在配置文件vue.config.js中配置：

```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://192.168.1.101:8081',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

然后baseURL也不要设置了，然后每次访问时用：/api 来代替前面的target，比如：http://192.168.1.101:8081/blockchain/getxxx

就可以写成：/api/blockchain/getxxx

## 5 异步请求的顺序问题

一开始都是在mounted或者created中顺序调用各个获取xx的函数，但是就遇到一个问题：如果后执行的参数依赖于前面获取的内容，就有可能是还没获取到就已经发出了，导致参数不正确。

解决方式：

1. 使用watch监听依赖的那个信息获取到了再进行下一步获取
2. 在那个依赖信息的获取函数中，等获取完了之后，再获取下一个

以前都用第一种方式，竟然没想到第二种！！！