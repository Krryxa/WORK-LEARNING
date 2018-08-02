# 面试 - 落下的点

## css3
1. 动画 animation
2. transform 有scale（0.5）、rotate（旋转，单位deg）
3. :after{} /* 选择器在被选元素的内容后面插入内容。使用 content 属性来指定要插入的内容。 */
4. '+' 选择器 相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素
6. '>' 选择器 直接子级
7. ::selection 选中的时候

## javascript
1. addEventListener(event, function, useCapture) 参数详解
```
event	必须。字符串，指定事件名。
        注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 
function 必须。指定要事件触发时执行的函数。 

useCapture 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
true - 事件句柄在捕获阶段执行
false- 默认。事件句柄在冒泡阶段执行
```
2. 字符串转数组 split
3. 获取字符串后三位（提取字符串的方法）str.slice(-3)
- 字符串方法易忘点：[https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md)
3. 数组转字符串 join

4. promise 以及为什么要使用它
> promise 可解决的问题：<br>
> 可以支持多个并发的请求，获取并发请求返回的数据<br>
> 解决回调地狱的问题
```JavaScript
回调地狱：做异步请求的时候，在请求成功的回调函数里继续写函数，或者继续发送异步，继续回调，回调函数里又回调，一层一层，嵌套越来越多，就会形成回调地狱。这会使我们的代码可读性变差，不好维护，性能也下降。

promise 就是可以解决回调地狱的问题：

  // 按照then来执行成功和失败的回调函数
  function load() {
    return new Promise((resovel, reject) => {
        $.ajax({
            url: 'xxx.com',
            data: 'jsonp',
            success: function(res) {
                resolve(res);
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

// then 方法有两个参数，第一个是成功 resolve 的回调，第二个是失败 reject 的回调
// 调用一下
load().then(data => {
    console.log(data);  // 请求到的数据
    console.log('请求数据成功');
}, err => {
    // 这是 then 的第二个参数，请求失败 reject 的回调
    console.log('请求失败');
});

// catch() 相当于 then 的第二个参数，失败 reject 的回调
load().then(data => {
    console.log(data);  // 请求到的数据
    console.log('请求数据成功');
}).catch(err => {
    // 这是 catch，请求失败 reject 的回调
    console.log('请求失败');
});

```
- 还有 all 和 race 方法，详见
[http://www.cnblogs.com/ainyi/p/8665272.html](http://www.cnblogs.com/ainyi/p/8665272.html)

```
- Promise对象有三种状态：
1. 异步操作"未完成"（pending）
2. 异步操作"已完成" (resolved)
3. 异步操作"失败" (rejected)

- 这三种状态的变化途径只有2种：
1. 异步操作从"未完成"到"已完成"
2. 异步操作从"未完成“到"失败"

- 所以Promise对象的最终结果只有两种：
1. 异步操作成功 Promise对象传回一个值，状态变为resolved
2. 异步操作失败 Promise对象抛出一个错误，状态变为rejected
```