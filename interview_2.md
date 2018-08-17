# 面试 - 未知点(2)

## js 相关
1. 以下两个函数是否等价
```javascript
function foo1()
{
  return {
    bar: "hello"
  };
}

function foo2()
{
  return
  {
    bar: "hello"
  };
}
```
- 答案： 不等价 注意，第二个函数返回的是 undefined
```javascript
console.log(foo1()); // {bar: "hello"}
console.log(foo2()); // undefined
```
- 这也是为什么函数返回对象时，或写大括号时，把 { 写在一边，因为第二个函数 js 会默认 return 后面返回的是空，等价于
```javascript
return undefined
{xxx}
// 后面当然是写了也白写
```
---

2. js 中 ==、=== 和 Object.is() 的区别
- ==：等同，比较运算符，两边值类型不同的时候，先进行类型转换，再比较；
- ===：恒等，严格比较运算符，不做类型转换，类型或值不同就是不等；
- Object.is() 是 ES6 新增的用来比较两个值是否严格相等的方法，与 === 的行为基本一致
---
- === 注意点：
> 如果两个值中出现一个是 NaN，那么不相等（判断一个值是否是 NaN，可以用 isNaN() 或 Object.is() 来判断）
```javascript
NaN === 任何 // false
NaN === NaN // false
```
>> 如果两个值都是 null，或者都是 undefined，那么相等
- Object.is() 注意点：
> 其行为与 === 基本一致，不过有两处不同：
>> +0 不等于 -0，NaN 等于自身

---

3. NaN 是什么？它是什么类型？如何检测一个变量是不是NaN？
- 答案： NaN 即Not A Number，但实际上它是 Number 类型 typeof NaN 将会返回 Number。
- 这个东西比较厉害，因为
```javascript
NaN === NaN  // false
```
你会发现，它自己都不等于它自己，因此判断变量是否是它，不能使用 ===， 可以使用 isNaN 方法或 Object.is()
```javascript
// 检查变量是否是 NaN
isNaN(bar);
Object.is(bar,NaN); // ES6方法，这个方法会修正 js 中的一些小 bug
```
- Object.is()方法，要求严格相等，且 Object.is(NaN,NaN) 会返回 true

---

4. let arr = [1, 2, 3]; arr[10] = 10;
```javascript
let arr = [1, 2, 3];
arr[10] = 10;
console.log(arr); // [1, 2, 3, empty x 7, 10];

arr.filter((item)=> {
  return item === undefined
}); // 返回 []
// 但是：
console.log(arr[5]); // undefined
// 中间未定义的(显示为 empty 的是 undefined)。那么，filter 之后，不是应该返回为undefined的数据吗？
// 但是，当数组中都是 undefined 时，数组就是空，或者说[empty x 7] === []
```
---
5. 0.1 + 0.2 !== 0.3
- 因为：JS 采用 IEEE 754 双精度版本（64位）
- 参考内容：[https://segmentfault.com/a/1190000015051329?utm_source=index-hottest](https://segmentfault.com/a/1190000015051329?utm_source=index-hottest)
```javascript
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
// 答案: 0.30000000000000004
// false

// 解决办法，让 0.1 + 0.2 === 0.3 
parseFloat((0.1+0.2).toFixed(10));
```

## 算法相关
1. 讨论实现判断变量是否是整数的函数 isInter(x) 的实现
- 答案： 在 ES6 中，是有现成的方法 Number.isInteger 可以使用的。如果自己实现，思路是什么呢
```javascript
// 1 异或运算
function isInter(x) {
    return x ^ 0 === x;
}

// 2 取整
return Math.round(x) === x;  // 同样可以用 floor ceil

// 3 取余
return (typeof x === 'number')&&(x % 1 === 0);
```
---
2. 写一个 sum 方法，可以实现以下两种调用方式
```javascript
console.log(sum(2,3)) //5
console.log(sum(2)(3)) //5
```
- 答案：
```javascript
// 方法1
let sum = (x, y) => {
  if (y === undefined) {
    return y => x + y;
  } else {
    return x + y;
  }
}
// 简便写法
let sum = (x, y) => y === undefined ? y => x + y : x + y;

// 方法2，箭头函数不能使用 arguments
var sum = function (x) {
  if (arguments.length === 1) {
    return function (y) {
      return x + y;
    }
  } else {
    return arguments[0] + arguments[1];
  }
}
```
---
3. 回文判断
```javascript
function check (str) {
  str = str.replace(/\W/g,'').toLowerCase();
  return str === str.split('').reverse().join('');
}
```
---
4. 下面程序的输出结果是？
```JavaScript
var length = 10;
function fn () {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function (fn) {
    fn(); // 执行的时候，没有谁.fu()，所以 fn() 里面的 this 指向 window
    arguments[0]();
  }
};

obj.method(fn, 1);
// 输出
10
2
```
- 虽然在程序执行时，使用了 obj.method 方法，让 this 指向了 obj，但是真正的函数执行在函数体内部，也即当 fn() 执行的时候，this 是指向 window 的，所以第一次执行结果是 10

- 那么这里第二次执行 arguments[0] 为什么结果是 2？
- 分析下在 method(fn, 1) 执行时，经历了什么： 
> 首先两个参数 fn 和 1 会被放入arguments 中，在 arguments 中第一个参数就是我们传入的函数；接下来 fn 执行，此时 this 没有绑定因此指向 window，输出10。 然而到了 arguments[0]() 这一句，相当于把 arguments[0] 中的第一个参数 fn 拿来执行, 效果如下:
```javascript
arguments[0]()  // 执行 fn 方法，里面的 this 指向 arguments
```
arguments.length 就是它本身的长度（arguments 是一个类数组，具有length属性），因此输出 2

---
5. 下面程序的输出
```javascript
var x = 21;
var girl = function () {
  console.log(x);
  var x = 20;
};
girl ();

// 输出：
undefined
```
- 函数内部变量的提升
- 上面的代码相当于：
```javascript
var x = 21;
var girl = function () {
  var x;
  console.log(x); // undefined
  x = 20;
}
```
---

6. 运算符
```javascript
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
// 输出:
true
false
```
- 第一个输出结果是好理解的，主要看下第二个为什么是 false
- 核心在于 js 怎么去解析 < 和 > 运算符。 在 js 中，这种运算符是从左向右运算的，所以 3>2>1 就被转换成了 true>1，而 true 的值是 1，接着比较 1>1 就返回 false

```javascript
console.log(typeof typeof 1); // 输出 string


console.log(typeof undefined == typeof NULL) // true
typeof undefined // 输出是 undefined
typeof null // 输出是 object
// 但是，另一方面，因为 js 对大小写敏感，null ≠ NULL，所以 typeof NULL 返回 undefined，所以输出 true
```

7. 递归设计，实现一个函数，给该函数一个 DOM 节点，函数访问其所有子元素(所有子元素，不仅仅是直接子元素)，每次访问子元素的时候，并为其传一个 callback
- 访问一个DOM tree，是一个经典的深度优先搜索的算法
```javascript
function Traverse(DOM, callback) {
  callback(DOM);
  var list = DOM.children;
  Array.prototype.forEach.apply(list, (item) => {
    Traverse(item,callback); //递归
  });
}
```

