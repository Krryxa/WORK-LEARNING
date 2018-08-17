# 面试 - 未知点(1)

## css3
1. 动画 animation
2. transform 有scale（0.5）、rotate（旋转，单位deg）
3. :after{} /* 选择器在被选元素的内容后面插入内容。使用 content 属性来指定要插入的内容。 */
4. '+' 选择器 相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素
6. '>' 选择器 直接子级
7. ::selection 选中的时候

## javascript
> js 数据类型：String Number Boolean Array undefined null Object
- 对于复杂数据类型 object，其实 typeof null 返回的也是 object，因为本质上 null 就是一个占位用的对象。另一方面，数组 Array 也不能用 typeof 检测数据类型，因为同样会返回 object

- 因此，如果想要检测bar是不是object，可以这样子：
```javascript
console.log((bar !== null) && (tiopnuiop[yuiop[]\\]poi456/ypeof bar ==='object'))
// 当然，如果认为 function 也是 object，可以用下面的语句
console.log((bar !== nul)&& (typeof bar ==='object')||(typeof bar ==='function'))
```
- 除此以外，还有比如 Array 的情况，因为 Array 也会返回 object，检测是否是 Array 的方法：
```javascript
// 以下三种方法，如果是数组，返回 true
console.log(bar instanceof Array);
console.log(Array.isArray(bar)); // ES5方法
console.log(Object.prototype.toString.call(arr) === '[object Array]');
```
---

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

---
2. 字符串转数组 split
---
3. 数组转字符串 join
---
4. 获取字符串后三位（提取字符串的方法）str.slice(-3)
- 字符串方法易忘点：[https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_string.md)
---
5. promise 以及为什么要使用它
> promise 可解决的问题：<br>
> 可以支持多个并发的请求，获取并发请求返回的数据<br>
> 解决回调地狱的问题
- 详看：[https://github.com/Krryxa/WORK-LEARNING/blob/master/promise.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/promise.md)

---
6. 循环一个对象，如何区分是自己的属性还是继承来的属性 （涉及到原型和原型链）
```javascript
function Obj () {
    this.z = 3;//自有属性
}
// 对象会继承原型里的属性
Obj.prototype.x = 1;
Obj.prototype.y = 2;

var oo = new Obj();
console.log(oo); // oo的打印结果如下图，可以看到其自有属性和继承自原型的属性
```
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_13.jpg)
- obj.hasOwnProperty(‘属性名’) 用于检查给定的属性是否存在于当前实例对象中，（而不是实例原型中）（解释来至：javascript高级程序设计第三版第三章Object）。如果是返回true，如果不是返回 false
- in 操作符用来判断某个属性属于某个对象，可以是对象的直接属性，也可以是通过 prototype 继承的属性。如：(属性名 in 对象) ，不管属性是原型的还是实例的，只要存在就会返回ture；否则返回false
```javascript
for (let key in oo) {
  if (oo.hasOwnProperty(key)) {
    console.log(key + '是自己的属性');
    console.log(key in oo);
  } else {
    console.log(key + '是从实例原型继承的属性');
    console.log(key in oo);
  }
}
```
---
7. 介绍一下闭包和闭包常用场景
- 详见：[https://github.com/Krryxa/WORK-LEARNING/blob/master/closure.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/closure.md)
> 背景例子：计数器的困境：<br><br>
设想下如果你设置一个计数器，且该计数器在所有函数中都是可用的。<br>
你可以使用全局变量定义计数器，再定义函数 add() 设置计数器递增<br>
但问题来了，页面上的任何脚本都能改变计数器，即便没有调用 add() 函数<br><br>
如果我在 add() 内部声明计数器，如果没有调用函数将无法修改计数器的值<br>
但又有一个问题，函数内部定义的计数器，那每次调用都会重新定义一个计数器，相当于每次初始化了计数器，还是不行。<br><br>
所以闭包就出现了

> 变量声明时如果不使用 var/let/const 关键字，那么它就是一个全局变量，即便它在函数内定义

```
闭包是指有权访问“另一个函数作用域中的局部变量”的函数

应用场景 设置私有变量和方法

创建闭包常见方式：就是在一个函数内部创建另一个函数.

闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露

为什么会出现闭包这种东西，解决了什么问题？
受JavaScript链式作用域结构的影响，父级变量中无法访问到子级的变量值，为了解决这个问题，才使用闭包这个概念。
```

- 用闭包解决计数器困境
```javascript
let add = ( () => {
  let counter = 0;
  return () => {return counter += 1;}
})();
// 函数自执行，一开始定义的时候，自我调用了一次，初始化 counter = 0，
// 并且返回一个函数() => {return counter += 1;} 给 add 变量，可调用

add(); // 执行的是 () => {return counter += 1;}
add();
add();
// 计数器为 3

// 变量 add 指定了函数自我调用的返回字值
// 自我调用函数只执行一次。设置计数器为 0。并返回函数表达式。
// add 变量可以作为一个函数使用。非常棒的部分是它可以访问函数上一层作用域的计数器。
// 这个叫作 JavaScript 闭包。它使得函数拥有私有变量变成可能。
// 计数器受匿名函数的作用域保护，只能通过 add 方法修改。
```

## vue
1. 路由懒加载
> 也叫延迟加载，即在需要的时候进行加载，随用随载，打开当前页面只加载当前页面的 js

- 为什么需要懒加载？
> 像vue这种单页面应用，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出啊先长时间的白屏，即使做了loading也是不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时

- 简单的说就是：进入首页不用一次加载过多资源造成用时过长
- 实现方式，就是我一直以来的做法：
- 路由配置中，按需导入，配置每一个路由，就 import 需要的组件
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  	{
      path:'/',
      redirect:'/home'
    },
    {
      path:'/login',
      component: () => import('../components/Login.vue'),
      meta:{title:'登录'}
    },
    {
      path:'/register',
      component: () => import('../components/Register.vue'),
      meta:{title:'注册'}
    },
  	{
      path:'/home',
      component: () => import('../components/Home.vue'),
      name:"home",
      meta:{title:'首页'}
    },
  ]
})

```

## 改变 this 指针
- new、call、apply、bind、let _this = this、=>
- 详情请看：[https://www.cnblogs.com/ainyi/p/8931238.html](https://www.cnblogs.com/ainyi/p/8931238.html)


## 问题：为什么不能直接调用 mutation 方法或者直接修改 state 属性，而是必须得通过 commit 来提交 mutation 才能改变 state 的状态呢？
> 改变 Vuex 的 store 中的状态的唯一方法是 commit mutation。<br>
数据响应式是vue的核心概念，在 vue 上衍生出的 vuex 自然也遵循了这个概念，所以直接调用 mutation 方法和直接改变 store.state 都是一样的，vuex 跟踪不到数据的变化，无法做到响应式。<br>
所以只能通过 commit mutation 来改变 state 的状态，将所有 state 的变化封装在 mutation，统一的页面状态管理以及操作处理，这样在阅读代码的时候也能更容易地解读应用内部的状态改变，可以让复杂的组件交互变得简单清晰，同时可在调试模式下进行时光机般的倒退前进操作，查看数据改变过程，使 code debug 更加方便