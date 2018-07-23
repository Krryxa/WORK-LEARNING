# 嵌套数组的合并

- 对于 [ [], [], [], ...] 数组里嵌套数组，有个需求：将里面的数组元素都放到外层数组，变成 [ , , , ...]

- 例如：let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
- 变成：arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];


倒是有几种方法：
```javascript
// 模拟：执行内含 10000 子数组 + 子数组有 13 个元素的数组
let arr = [];

for (let i = 0; i < 10000; i++) {
  arr.push([Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]);
}

// 1. reduce + concat，（数组元素较短时推荐，写法最简便）
// 用时：3.4s
let newArr = [];
let nowTime = new Date();
// 默认指定第一次的prev为[]
let arrs = arr.reduce((arr, cur) => arr.concat(cur), []);
console.log(new Date() - nowTime, 'reduce');


// 2. 双重循环push，（数组元素较长时推荐，速度最快）
// 用时：0.018 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  for (let vq of va) {
    newArr.push(vq);
  }
}
console.log(new Date() - nowTime, 'for');

// 3. concat
// 用时：3.4 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  newArr = newArr.concat(va);
}
console.log(new Date() - nowTime, 'concat');

// 4. es6 的深拷贝数组 （速度最慢）
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