# 页面性能优化

> 在chrome浏览器，对于同一域名，最多支持6个请求的并发，其他请求会推入到队列中等待或停滞不前，直到6个请求之一完成后，队列中新的请求才会放出。

![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_5.jpg)
- 可以看到，六个绿色条并发请求，四个灰色条等待请求，最下面三个绿色条3.4s后才触发请求

1. html、css、js 代码压缩
2. 公共文件（js/css）合并、请求合并
3. 浏览器缓存（强缓存、弱缓存）
4. CDN（Content Delivery Network，内容分发网络）加速。通过将静态资源(例如javascript，css，图片等等）缓存到离用户很近的相同网络运营商的CDN节点上，不但能提升用户的访问速度，还能节省服务器的带宽消耗，降低负载（因此，一个地区内只要有一个用户先加载资源，在 CDN 中建立了缓存，该地区的其他后续用户都能因此而受益）
5. loading 动画
7. 页面骨架屏
6. 减少操作 dom 方法
8. 优化图片加载
9. 懒加载和预加载

## 减少操作 dom 方法
1. 插入大量dom元素时，可以使用innerHTML替代逐个构建元素
2. 处理列表子元素的事件时，可以使用事件委托

## 优化图片的加载

1. 图片懒加载，优先加载浏览器可视区域的图片
2. 小图片或图标，可用SVG、Iconfont、Base64等技术，多个图标也可以制作成雪碧图（CssSprites）
3. 加载时预先加载一张特别小的通用略缩图，正式图片加载完成后替换略缩图
4. 服务端根据业务需要可以对图片进行压缩 （不影响用户体验的情况下）
5. 为项目添加骨架屏

- Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。可查看RFC2045～RFC2049，上面有MIME的详细规范。

### 懒加载原理
首先将页面上的图片的 src 属性设为空字符串或者一个加载中的图片，而图片的真实路径则设置在 data-original 属性中，
当页面滚动的时候需要去监听 scroll 事件，在 scroll 事件的回调中，判断我们的懒加载的图片是否进入可视区域，
如果图片在可视区内，将图片的 src 属性设置为 data-original 的值，这样就可以实现延迟加载

## 预加载
1. 纯 css 实现预加载
```
不在浏览器可视范围内加载图片，直接 css 加载，
但图片会随文档一起加载，此时可能会降低文档的加载速度
```
2. 纯 js 实现预加载
```
js 脚本提前加载图片 src 或使用 image 对象提前加载图片
```
3. css 和 js 实现预加载
```
如 img 标签最初设置为 display: none，要加载的时候显示
或者滚动条到达可视范围内，js 为目标 div 加上这个已经加载好的 css 属性
```
4. ajax 预加载
```
提前 ajax 请求获取数据
场景有个 tab 标签页，当鼠标放到某个 tab，立刻 ajax 加载该 tab 的数据
当点击这个 tab 标签页的时候，就可以立刻加载出来，再将数据缓存起来或加入全局变量，下一次使用直接从缓存读取
```

### 图片转为base64
1. 图片的 base64 编码就是可以将一幅图片的二进制编码成一串字符串，使用该字符串代替图像地址
2. 可以减少http请求，base64可以随着html的下载同时下载
3. 适用于小图片和简单图片

## 节点
- element.parentNode	返回元素的父节点
- element.childNodes    返回元素的一个子节点的数组
- element.nodeName	返回元素的标记名（大写），用的时候转换小写（element.nodeName.toLowerCase()）
- event.target：返回触发此事件的元素（事件的目标节点）
- 详看：[https://www.cnblogs.com/ainyi/p/8794159.html](https://www.cnblogs.com/ainyi/p/8794159.html)
- HTML DOM 元素对象：[http://www.runoob.com/jsref/dom-obj-all.html](http://www.runoob.com/jsref/dom-obj-all.html)
- HTML DOM 事件对象：[http://www.runoob.com/jsref/dom-obj-event.html](http://www.runoob.com/jsref/dom-obj-event.html)