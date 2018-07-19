# 嵌套数组的合并

- 对于 [ [], [], [], ...] 数组里嵌套数组，有个需求：将里面的数组元素都放到外层数组，变成 [ , , , ...]

- 例如：let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
- 变成：arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];


倒是有几种方法：
```javascript
// 模拟：执行（内含 10000 子数组 + 子数组有 13 个元素）的数组
let arr = [];

for (let i = 0; i < 10000; i++) {
  arr.push([Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]);
}

// 1. 双重循环 push，（推荐，速度最快）
// 用时：0.018 s
let newArr = [];
let nowTime = new Date();
for (let va of arr) {
  for (let vq of va) {
    newArr.push(vq);
  }
}
console.log(new Date() - nowTime, 'for');

// 2. concat
// 用时：3.4 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  newArr = newArr.concat(va);
}
console.log(new Date() - nowTime, 'concat');

// 3. es6 的深拷贝数组 （速度最慢）
// 用时：34 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  newArr = [...newArr, ...va];
}
console.log(new Date() - nowTime, 'es6');
```

## 数组的深拷贝
```javascript
// Array.from()
var arr1 = [1,2,3];
var arr2 = Array.from(arr1);
// 数组尾部添加
arr2.push(100);
console.log(arr1,arr2); // [1, 2, 3] [1, 2, 3, 100]

// [...arr] 使用这个也可以拼接数组，但是不推荐，效率太低
var arr1 = [1,2,3];
// 超引用拷贝数组
var arr2 = [...arr1];
// 数组尾部添加
arr2.push(1000);
console.log(arr1,arr2); // [1, 2, 3] [1, 2, 3, 1000]

function show(...args){
// 此时这个形式参数就是一个数组，我们可以直接push东西进来，如下
args.push(5);
console.log(args);
}
// 调用
show(1,2,3,4); // [1, 2, 3, 4, 5]
```