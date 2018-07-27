# 原型与原型链

## 普通对象与函数对象
- javascript 中的对象分为普通对象和函数对象，Object、Function 是 js 自带的函数对象
```javascript
let o1 = {}; 
let o2 =new Object();
let o3 = new f1();

function f1(){}; 
let f2 = function(){};
let f3 = new Function('str','console.log(str)');

console.log(typeof Object); //function 
console.log(typeof Function); //function  

console.log(typeof f1); //function 
console.log(typeof f2); //function 
console.log(typeof f3); //function   

console.log(typeof o1); //object 
console.log(typeof o2); //object 
console.log(typeof o3); //object
```
> 在上面的例子中 o1 o2 o3 为普通对象，f1 f2 f3 为函数对象。凡是通过 new Function() 创建的对象都是函数对象，其他的都是普通对象。f1,f2,归根结底都是通过 new Function()的方式进行创建的。Function、Object 也都是通过 New Function() 创建的

## 构造函数
```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() { alert(this.name) } 
}
let person1 = new Person('krry', 28, 'Software Engineer');
let person2 = new Person('Mick', 23, 'Doctor');

console.log(person1.constructor == Person); //true
console.log(person2.constructor == Person); //true
```
> 上面的例子中 person1 和 person2 都是 Person 的实例。这两个实例都继承了 Person 的原型对象 prototype 的 constructor 属性，该属性（是一个指针）指向 Person （相等）

## 原型对象
- 在 JavaScript 中，每当定义一个对象（函数也是对象）时候，对象（Person）中都会包含一些预定义的属性。其中每个函数对象都有一个 prototype 属性，这个属性就是函数的原型对象：Person.prototype
- 在默认情况下，所有的原型对象都有一个 constructor（构造函数）属性，这个属性（是一个指针）指向 prototype 属性所在的函数（Person）即：Person.prototype.constructor == Person
- 可以在原型对象里定义一些属性：
```javascript
Person.prototype = {
  name:  'krry',
  age: 28,
  job: 'Software Engineer',
  sayName: function() {
    alert(this.name);
  }
}
```
- 在上面我们谈到实例的构造函数属性（constructor）指向构造函数：person1.constructor == Person
```javascript
person1.constructor == Person
Person.prototype.constructor == Person
```

## __ proto __
- JS 在创建对象的实例（不论是普通对象还是函数对象）的时候，都有一个叫做__proto__ 的内置属性，用于指向创建它的构造函数的原型对象 prototype
```javascript
Person.prototype.constructor == Person;
person1.__proto__ == Person.prototype;
person1.constructor == Person;
```
### 区分一下
```javascript
// 实例的__proto__ === 对象的prototype
// 而对象Person也是Function(函数对象)的实例
// 所以：Person.__proto__ === Function.prototype
```

## 构造器
```JavaScript
let obj = {}
// 它等同于下面这样：
let obj = new Object()

// obj 是构造函数（Object）的一个实例。所以：
obj.constructor === Object
obj.__proto__ === Object.prototype

// 同理，可以创建对象的构造器不仅仅有 Object，也可以是 Array，Date，Function等
// 所以我们也可以构造函数来创建 Array、 Date、Function

let b = new Array();
b.constructor === Array;
b.__proto__ === Array.prototype;

let c = new Date(); 
c.constructor === Date;
c.__proto__ === Date.prototype;

let d = new Function();
d.constructor === Function;
d.__proto__ === Function.prototype;
```
- 如下构造器都是函数对象：
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/p_6.jpg)

## 小总结
- 普通对象的__proto__ === Object.prototype
- 函数对象的__proto__ === Function.prototype
- 如：
```JavaScript
// 普通对象newObj 和 Object
// 因为 newObj.__proto__ === newObj.constructor.prototype
// 因为 newObj.constructor === Object
// 所以 newObj.__proto__ === Object.prototype

// 函数对象Person 和 Function
// 因为 Person.__proto__ === Person.constructor.prototype
// 因为 Person.constructor === Function
// 所以 Person.__proto__ === Function.prototype
```

- 实例对象的__proto__ === 对象的prototype
```javascript
// 实例对象 person 和 对象 Person
// 因为：person1.__proto__ === person1.constructor.prototype
// 因为：person1.constructor === Person
// 所以：person1.__proto__ === Person.prototype
```

- 有关于 Person.prototype.__ proto __
```javascript
// Person.prototype 是一个普通对象，我们无需关注它有哪些属性，只要记住它是一个普通对象
// 因为一个普通对象的构造函数 === Object （obj.constructor === object）
// 所以 Person.prototype.__proto__ === Object.prototype （普通对象的__proto__ === Object.prototype）
// 小总结第一点也可以得出 Person.prototype.__ proto __ === Object.prototype
```

- Object.prototype.__proto __
```javascript
// Object.prototype 对象也有proto属性，但它比较特殊，为 null，因为 null 处于原型链的顶端，这个只能记住
// Object.prototype.__proto__ === null
```

## Prototype
> 在 ECMAScript 核心所定义的全部属性中，最耐人寻味的就要数 prototype 属性了。对于 ECMAScript 中的引用类型而言，prototype 是保存着它们所有实例方法的真正所在。换句话所说，诸如 toString()和 valuseOf() 等方法实际上都保存在 prototype 名下，只不过是通过各自对象的实例访问罢了。

```javascript
let obj = new Object()
```
- obj 是 Object 的实例，所以 obj 继承了Object 的原型对象Object.prototype 上所有的方法：<br>
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/p_7.jpg)
- Object 的每个实例都具有以上的属性和方法。
- 所以我可以用 Person.constructor 也可以用 Person.hasOwnProperty

## 原型链
- 在使用 new 初始化函数的时候得到的新对象的__proto__属性会指向函数对象的原型对象，而函数对象的原型对象又继承至原始对象。所以呈现以下结构：
```javascript
person1.__proto__ === Person.prototype ->
Person.prototype.__proto__ === Object.prototype ->
Object.prototype.__proto__ === null
```
> 把这个有__proto__串起来的直到 Object.prototype.__proto __ 为 null 的链叫做原型链，原型链实际上就是 js 中数据继承的继承链。

## 总结
- 原型和原型链是JS实现继承的一种模型。
- 原型链的形成是真正是靠__proto__ 而非prototype
```javascript
let animal = function(){};
let dog = function(){};

animal.price = 2000;
dog.prototype = animal;
let tidy = new dog();
console.log(dog.price) // undefined
console.log(tidy.price) // 2000


// 相当于
let dog = function(){};
dog.prototype.price = 2000;
let tidy = new dog();
console.log(dog.price); //undefined
console.log(tidy.price); // 2000
```
> 实例（tidy）和 原型对象（dog.prototype）存在一个连接。不过，要明确的真正重要的一点就是，这个连接是存在于实例（tidy）与构造函数的原型对象（dog.prototype）之间，而不是存在于实例（tidy）与构造函数（dog）之间
