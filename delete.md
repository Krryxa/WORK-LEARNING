# delete 操作符

> 用来删除一个对象的属性

> delete expresson

- express 是一个对象的引用，例如

```javascript
delete object.property
delete object['property']
```

- 如果 expression 不是一个对象的引用，那么 delete 则不会起任何作用

## 返回值
在严格模式下，如果属性是一个不可配置的属性，删除是会抛出异常，非严格模式下返回 false，其他情况返回 true

## 作用
1. 可以删除隐式全局变量，但不可删除显示全局变量，隐式全局变量其实是 global 对象 window 的属性

```javascript
x = 10; // 未加关键字，属于全局变量 Window 的属性
let y = 20; // 只是定义的变量，没有挂载到 window
var z = 30; // 使用 var 关键字，有挂载到 Window 上，但是也无法 delete（configurable: false）

delete x; // true 删除成功
delete y; // false 不能删除
delete z; // false 不能删除
```

2. 内置对象的内置属性不能被删除，用户自定义的属性可以被删除

```JavaScript
obj = { // 未加关键字，属于全局变量 Window 的属性
  h: 10
}

let obj1 = {
  h: 10
}

delete Math.PI; // false
delete obj.h; // true
delete obj; // ture，obj 是全局变量的属性，而不是变量

delete obj1.h; // true
delete obj1; // false 全局显示的变量，不能被删除


function fn(){
  var z = 10;
  delete z; // false
  // z 是局部变量，不能被删除，delete只能删除对象的属性
}

delete fn; //false
// fn 相当于是一个匿名变量，所以也不能被删除。
```

3. 不能删除一个对象从原型继承而来的属性，但是可以直接从原型上删掉它

```javascript
function foo(){}
foo.prototype.name = 'zhangsan';

var f = new foo();

// delete 只能删除自己的属性，不能删除继承来的属性
delete f.name; // false 

console.log(f.name); // zhangsan

// 要删除 prototype 的属性，就这样删除
delete foo.prototype.anme; // true

console.log(f.name); // undefined
```

4. 删除数组元素
- 当删除数组元素时，数组的长度并不会变小

```javascript
var arr = [1,3,4,6,73,2];
console.log(arr.length); // 6

delete arr[2];

console.log(arr.length); // 6
console.log(arr[2]); // undefiend
consoel.log(arr); // [ 1, 3, , 6, 73, 2 ]

// 在forEach 循环中删除元素，不会影响循环结果
let arr = [1,3,5,21,3,4,53,21,5,2];

arr.forEach((val, index) => {
  if(val < 10){
    delete arr[index];
  }
});

console.log(arr); // [ , , , 21, , , 53, 21, ,  ]

// 可以使用 filter 过滤掉空值 [ 21, 53, 21 ]
arr = arr.filter(val => val);

// 与 Array.splice 对比
arr.forEach((val,index) => {
  if(val < 10){
    arr.splice(index, 1);
  }
});
// 答案没有我们预想的结果，因为 splice 删除元素会改变数组的长度
// 所以说删除一个值后，其后的那个值占据了它的位置，在判断的时候就会漏掉。
console.log(arr); // [ 3, 21, 4, 53, 21, 2 ]
```
