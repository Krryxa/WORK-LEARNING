## var 和 let、const

> js 变量中有 var 定义和无 var 定义的区别以及 es6 中 let 命令和 const 命令

- 可以知道定义的 x 和 y 都被挂载在 window 对象上，变为window 下的属性
```javascript
x = 10;
var y = 20;
console.log(x); // 10
console.log(y); // 20
console.log(window.x); // 10
console.log(window.y); // 20
```
- 但执行 delete 命令时，有问题
```javascript
delete x // true
delete y // false
console.log(window.x); // undefined
console.log(window.y); // 20
```
- 再看看执行上面代码之后 y 属性没有被删除，x 被删除了，这是区别就来了

- 在通过 var 进行定义后的变量不能被 delete 删除，这是什么原因？
- ECMAScript 5标准中，可以通过 Object.getOwnPropertyDescriptor() 来获取对象自身某个 property 的属性信息：
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_18.jpg)

- 当不使用 var 进行定义时，变量默认的 configurable 为 true，可以进行 delete 等命令进行操作
- 而当 var 在定义一个全局变量的时候 configurable 变为了false，即不会被delete删除

- 注意：使用 let 定义，是不会挂载到 window 对象上，更不能 delete

## 变量提升
```javascript
alert(a); // Uncaught ReferenceError: a is not defined
a = 100;

alert(b);// undefined
var b = 200;
```
> 先说第二段代码，var 声明的全局变量 b 在 js 中会进行代码提升，也就是说 var b = 200; 会被分解为 var b; b=200; 代码解析的第时候会将 var b;提升到最前面，并且在内存中开辟一个空间，由于 b 没有被赋值，默认为 undefined
```javascript
// 上面第二段代码等同于：
var b;
alert(b);
b = 200;
```

> 第一段代码中当 js 执行 alert() 函数时候由于没有进行 var 声明，变量没有被提升，不存在内存开辟，所以在 alert 时候直接报错
- 在 ECMAScript6 标准中,一个重要的概念就是“JavaScript严格模式”，需要在最前面加上"use strict";
- 严格模式下不能使用未声明的变量
```javascript
"use strict";
x = 3.14;       // 报错 (x 未定义)
```

## let 注意点
1. let 拥有块级作用域，一个 {} 就是一个作用域

2. let 在其作用域下面不存在变量提升

3. let 在其作用域中不能被重复声明（函数作用域和块级作用域）
``` javascript
alert(a); // Uncaught ReferenceError: a is not defined 变量没有提升
let a = 100;
```

## const
1. const 用来声明常量，一旦声明，其值就不可以更改

2. const 的作用域与 let 相同，只在声明所在的块级作用域内有效，并且也是和 let 一样不可以重复进行声明

注意点：const arr = [1,2]; arr.push(3); 是成功的

## 面试题
```javascript
var funcs = [];
for (var i=0; i<10; i++) {
  funcs.push(function () {console.log(i)});
}
funcs.forEach(function (func) {
  func();
});
```
一看就知道输出 10 个 10，但是如果想要依次输出 0 到 9 呢？

1. 闭包可解决
```javascript
// 函数自执行，闭包解决方案，直接把每次循环的数值代进去了
var funcs = [];
for (var i=0; i<10; i++) {
  funcs.push(
    (function (value) {
      return function() {console.log(value)}
    })(i) // 函数自执行，这里不能加分号
  );
}
funcs.forEach(function (func) {
  func();
});
```

2. es6 语法
```javascript
// 使用 let
const funcs = [];
for (let i=0; i<10; i++) {
  funcs.push( () => console.log(i));
}
funcs.forEach( func => func());
```