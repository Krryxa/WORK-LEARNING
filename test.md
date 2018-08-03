# 题目

![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/test.png)

1. 
```javascript
a.length ? a.shift() : a = [1]
```

2. 
``` javascript 
// 输出6，如果没有对象调用func，此时的 this 就是指向 window
// 函数自执行：
let fn1 = function() {
  console.log('函数立即执行了');
}();

(function(a){
  alert(a); 
})("立即执行函数了");

(function(a){
  alert(a); 
}("立即执行函数了"));

// 注意一下，这个不是自执行函数
function fnc(a) {
  console.log('我没有执行，不是自执行函数');
}(1);
```

3. 
```javascript
function collect(dom) {
  let b_objs = [];
  let len = 0;
  for (let i=0; i < dom.length; i++) {
      let obj = dom[i].tagName;
      if (obj === 'body' || obj === 'BODY') {
          len = i + 1;
          break;
      }
  }
  for (let j=len;j < dom.length;j++) {
      b_objs.push(dom[j]);
  }
  console.log(b_objs);
}
collect(document.all);

console.log(document.body.querySelectorAll('*'));

// let dom = document.all;
```

## querySelector/querySelectorAll 与 getElementsBy 的区别解析
- javascript 中获取元素有两个方法 querySelector/querySelectorAll 与 getElementsBy，但这两种方法却存在这细小的区别, 这个区别有时就会对我们所写的程序造成巨大的影响。

querySelector/querySelectorAll 相比下面这些方法有什么区别？ 
1. getElementsByTagName 
2. getElementsByClassName 
3. getElementsById

### W3C 标准 
- querySelector/querySelectorAll 属于 W3C 中的 Selectors API 规范；
- 而 getElementsBy 系列则属于 W3C 的 DOM 规范。

### 接收参数 
- querySelector/querySelectorAll 方法接收的参数是一个 CSS 选择符，而且必须严格符合 CSS 选择符规范。（className：以 . 前缀，id：以 # 前缀）
- 而 getElementsBy 系列接收的参数只能是单一的 className、tagName 和 id。（不需要 . 或 #）

### 返回值 
- querySelector/querySelectorAll 返回的是一个 Static Node List
- 而 getElementsBy 系列的返回的是一个 Live Node List

### 简言之: 
在通过querySelector/querySelectorAll 或 getElementsBy 获取了元素集合后，插入新的元素，前者是不可以检测出来，元素集合不会添加插入的新元素的；而后者相反，后者是实时反馈的.

### 性能 
根据不同浏览器的不同版本有两者的执行速度也就是性能上有所不同，总体方向上: getElementBy 系列的执行速度比 querySelector/querySelectorAll 的快

## call('Alice').sleep(5).say('hi');
