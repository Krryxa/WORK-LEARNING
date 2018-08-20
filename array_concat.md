# 嵌套数组的合并，扁平化数组

## 请写一个 flat 方法，实现扁平化嵌套数组
- 对于 [ [], [], [], ...] 数组里嵌套数组，有个需求：将里面的数组元素都放到外层数组，变成 [ , , , ...]

- 例如：let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
- 变成：arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];


- 倒是有几种方法：
```javascript
// 模拟：执行内含 10000 子数组 + 子数组有 13 个元素的数组
let arr = [];

for (let i = 0; i < 10000; i++) {
  arr.push([Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]);
}

// 1. toString、split、map （支持多维数组~~~写法简便，速度又快）
// 全部是数字类型，重新映射 map，不是字符串类型就不用 map
// 用时：0.246s
let newArr = [];
let nowTime = new Date();
newArr = arr.toString().split(',').map(item => +item);
console.log(new Date() - nowTime, 'toString、split、map');

// 全部数字类型的：arr.toString().split(',').map(Number); 
// 全部字符串类型的：arr.toString().split(','); 



// 2. reduce + concat，（数组元素较短时推荐，写法简便）
// 用时：5.7s
newArr = [];
nowTime = new Date();
// 默认指定第一次的prev为[]
newArr = arr.reduce((arr, cur) => arr.concat(cur), []);
console.log(new Date() - nowTime, 'reduce');


// 3. 双重循环push，（数组元素较长时推荐，速度最快）
// 数组里面每个元素都必须是数组才行
// 诸如这样 [[],[],[],[]] 才行，如果这样 [1,[],2,[]] 不行，因为 for of 不能循环数字
// 用时：0.018 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  for (let vq of va) {
    newArr.push(vq);
  }
}
console.log(new Date() - nowTime, 'for');


// 4. concat
// 用时：3.4 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  newArr = newArr.concat(va);
}
console.log(new Date() - nowTime, 'concat');

// 5. es6 的深拷贝数组 （速度最慢）
// 数组里面每个元素都必须是数组才行
// 诸如这样 [[],[],[],[]] 才行，如果这样 [1,[],2,[]] 不行，因为 ...后接不能是数字
// 用时：34 s
newArr = [];
nowTime = new Date();
for (let va of arr) {
  newArr = [...newArr, ...va];
}
console.log(new Date() - nowTime, 'es6');
```

## 多维数组
```javascript
let arr = [1, [[2], [3, [4]], 5], [11, [21, [22, 22.1, 22.3], 31], 33, 40]];
let newArr = [];

// toString、split、map （写法简便）
// 注意：数组元素非数字的时候不需要 map
newArr = arr.toString().split(',').map(item => +item);
console.log(newArr);

// reduce 递归写法
let flattenDeep = (arr) => Array.isArray(arr) ? arr.reduce( (a, b) => [...flattenDeep(a), ...flattenDeep(b)] , []) : [arr];
newArr = flattenDeep(arr);
console.log(newArr);
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