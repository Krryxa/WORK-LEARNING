# 面试 - 未知点(3)

[面试 - 未知点(1)](https://github.com/Krryxa/WORK-LEARNING/issues/26)<br>
[面试 - 未知点(2)](https://github.com/Krryxa/WORK-LEARNING/issues/35)<br>
[面试 - 未知点(3)](https://github.com/Krryxa/WORK-LEARNING/issues/37)


## null、undefined
> undefined：表示一个变量最原始的状态，而非人为操作的结果<br>
> null：表示一个对象被人为的重置为空对象，而非一个变量最原始的状态

- 《JavaScript高级程序设计》一书，书中讲到相等操作符 == 时说，要比较相等性之前，不能将 null 和 undefined 转换成其他任何值，但要记住 null == undefined 会返回 true；

- Undefined 和 Null 是 Javascript 中两种特殊的原始数据类型(Primary Type)，它们都只有一个值，分别对应 undefined 和 null ，这两种不同类型的值，即有着不同的语义和场景，但又表现出较为相似的行为：

### undefined
>> undefined 的字面意思就是未定义的值，这个值的语义是，希望表示一个变量最原始的状态，而非人为操作的结果。这种原始状态会在以下 4 种场景中出现：

【1】声明了一个变量，但没有赋值
```javascript
var foo;
console.log(foo); //undefined
```
访问foo，返回了undefined，表示这个变量自从声明了以后，就从来没有使用过，也没有定义过任何有效的值，即处于一种原始而不可用的状态。

【2】访问对象上不存在的属性
```javascript
console.log(Object.foo); // undefined
```
访问Object对象上的 foo 属性，同样也返回 undefined ， 表示Object 上不存在或者没有定义名为 “foo” 的属性。

【3】函数定义了形参，但没有传递实参
```javascript
//函数定义了形参 a
function fn(a) {
    console.log(a); //undefined
}
fn(); //未传递实参
```
函数 fn 定义了形参a， 但 fn 被调用时没有传递参数，因此，fn 运行时的参数 a 就是一个原始的、未被赋值的变量。

【4】使用 void 对表达式求值
```javascript
void 0 ; // undefined
void false; //undefined
void []; //undefined
void null; //undefined
void function fn(){} ; //undefined
```
ECMAScript 规范 void 操作符 对任何表达式求值都返回 undefined ，这个和函数执行操作后没有返回值的作用是一样的，JavaScript中的函数都有返回值，当没有 return 操作时，就默认返回一个原始的状态值，这个值就是undefined，表明函数的返回值未被定义。

因此，undefined 一般都来自于某个表达式最原始的状态值，不是人为操作的结果。当然，你也可以手动给一个变量赋值 undefined，但这样做没有意义，因为一个变量不赋值就是 undefined

### null
null 的字面意思是 空值 ，这个值的语义是，希望表示 一个对象被人为的重置为空对象，而非一个变量最原始的状态 。 在内存里的表示就是，栈中的变量没有指向堆中的内存对象，即：
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_19.jpg)

null 有属于自己的类型 Null，而不属于Object类型，typeof 之所以会判定为 Object 类型，是因为JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0 ，因此，null 被误判断为 Object 类型。

### 判断 null、undefined 数据类型
- 获取 null 的真实类型：
```javascript
Object.prototype.toString.call(null); // [object Null]
```
- 通过 Object 原型上的 toString() 方法可以获取到JavaScript 中对象的真实数据类型

- 当然 undefined 类型也可以通过这种方式来获取：
```javascript
// 要知道，使用 typeof 就可以鉴别 undefined 类型了
// typeof undefined === 'undefined'
Object.prototype.toString.call(undefined); // [object Undefined]
```
- 除此以外，还有比如 Array 的情况，因为 typeof Array 也会返回 object，检测是否是 Array 的方法：
```javascript
// 以下三种方法，如果是数组，返回 true
arr instanceof Array;
Array.isArray(arr); // ES5方法
Object.prototype.toString.call(arr); // [object Array]
```

### 相似性
虽然 undefined 和 null 的语义和场景不同，但总而言之，它们都表示的是一个无效的值。 因此，在JS中对这类值访问属性时，都会得到异常的结果：
```javascript
Cannot read property 'foo' of null
Cannot read property 'foo' of null
```

ECMAScript 规范认为，既然 null 和  undefined 的行为很相似，并且都表示 一个无效的值，那么它们所表示的内容也具有相似性，即有
```javascript
null == undefined; // true
```
不要试图通过转换数据类型来解释这个结论，因为转换类型后：
```javascript
Number(null); // 0
Number(undefined); // NaN，注意 NaN 不等于任何

// 在比较相等性之前，null 没有被转换为其他类型
null == 0 ; // false
```
但 null 和 undefined 使用 全等 === 会返回 false ，因为全等操作 === 在比较相等性的时候，不会主动转换分项的数据类型，而两者又不属于同一种类型：
```javascript
null === undefined; // false，类型不相同
null !== undefined;  // true, 类型不相同
```
### 总结
用一句话总结两者的区别就是：undefined 表示一个变量自然的、最原始的状态值，而 null 则表示一个变量被人为的设置为空对象，而不是原始状态。所以，在实际使用过程中，为了保证变量所代表的语义，不要对一个变量显式的赋值 undefined，当需要释放一个对象时，直接赋值为 null 即可
