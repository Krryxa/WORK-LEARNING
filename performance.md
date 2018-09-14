# 页面性能优化

> 在chrome浏览器，对于同一域名，最多支持6个请求的并发，其他请求会推入到队列中等待或停滞不前，直到6个请求之一完成后，队列中新的请求才会放出。

![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_5.jpg)
- 可以看到，六个绿色条并发请求，四个灰色条等待请求，最下面三个绿色条3.4s后才触发请求

## 减少操作dom方法
1. 插入大量dom元素时，可以使用innerHTML替代逐个构建元素
2. 处理列表子元素的事件时，可以使用事件委托

## 优化图片的加载

1. 图片懒加载，优先加载浏览器可视区域的图片
2. 小图片或图标，可用SVG、Iconfont、Base64等技术，多个图标也可以制作成雪碧图（CssSprites）
3. 加载时预先加载一张特别小的通用略缩图，正式图片加载完成后替换略缩图
4. 服务端根据业务需要可以对图片进行压缩 （不影响用户体验的情况下）
5. 为项目添加骨架屏

- Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。可查看RFC2045～RFC2049，上面有MIME的详细规范。

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