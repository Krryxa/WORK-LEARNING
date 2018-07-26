# 原型与原型链

## 普通对象与函数对象
- javascript 中的对象分为普通对象和函数对象，Object、Function 是 js 自带的函数对象
```javascript
var o1 = {}; 
var o2 =new Object();
var o3 = new f1();

function f1(){}; 
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

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
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');

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
  name:  'Zaxlct',
  age: 28,
  job: 'Software Engineer',
  sayName: function() {
    alert(this.name);
  }
}
```
- 在上面我们谈到实例的构造函数属性（constructor）指向构造函数：person1.constructor == Person
- 看看这两个「公式」：
```javascript
person1.constructor == Person
Person.prototype.constructor == Person
```