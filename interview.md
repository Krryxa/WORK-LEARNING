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
event 必须。字符串，指定事件名。
      注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 
function 必须。指定要事件触发时执行的函数

useCapture 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
true - 事件句柄在捕获阶段执行
false- 默认。事件句柄在冒泡阶段执行
第三个参数的作用：捕获先于冒泡，所以第三个参数的作用是可以设置事件的优先级，还有事件委托的，就必须要冒泡

使用 removeEventListener() 移除事件
```
- 事件委托：[https://github.com/Krryxa/WORK-LEARNING/blob/master/event_entrustment.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/event_entrustment.md)


2. 字符串转数组 split
3. 数组转字符串 join
4. 获取字符串后三位（提取字符串的方法）str.slice(-3)
- 字符串方法易忘点：[https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md)

5. promise 以及为什么要使用它
> promise 可解决的问题：<br>
> 可以支持多个并发的请求，获取并发请求返回的数据<br>
> 解决回调地狱的问题
- 详看：[https://github.com/Krryxa/WORK-LEARNING/blob/master/promise.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/promise.md)
