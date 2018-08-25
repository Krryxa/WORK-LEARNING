# 面试 - 未知点(4)

[面试 - 未知点(1)](https://github.com/Krryxa/WORK-LEARNING/issues/26)<br>
[面试 - 未知点(2)](https://github.com/Krryxa/WORK-LEARNING/issues/35)<br>
[面试 - 未知点(3)](https://github.com/Krryxa/WORK-LEARNING/issues/37)<br>
[面试 - 未知点(4)](https://github.com/Krryxa/WORK-LEARNING/issues/39)


## 题目
1. 程序输出结果
```js
let i = 0;
var k = 0;
var j = 0;

for(;i<10,j<6;i++,j++){
  setTimeout(()=>{
    k = i+j;
  },0);
}

setTimeout(()=>{
  console.log(k);
},200);

// 输出结果 12
```
分析：明显最后的 setTimeout 最后执行，首先执行 for 循环里的代码，由于设置于了定时器为 0 ，里面的代码延迟执行，所以会等到 j++ 到 6 的时候，for 循环结束退出后执行 k = i+j; 所以是 12