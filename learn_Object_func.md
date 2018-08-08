# const、Object.assign、Object.keys、Object.values、Object.entries

## const 
```javascript
const arr = [1,2,3];
arr.push(4); // 正确执行，因为引用地址没有改变
arr = []; // 错误，因为地址改变了，重新赋值，报错
```

## 深拷贝、浅拷贝
- 这里也涉及到一个深拷贝和浅拷贝的概念。
- javascript中存储对象都是存地址的.
- 浅拷贝是都指向同一块内存区块，地址相同
- 深拷贝则是另外开辟了一块区域，地址不同
- 下面实例也可以看出这一点：

```javascript
// 浅拷贝
const a = {t: 1, p: 'gg'};
const b = a;
b.t = 3;
console.log(a); // {t: 3, p: 'gg'}
console.log(b); // {t: 3, p: 'gg'}

//深拷贝
const c = {t: 1, p: 'gg'};
const d = deepCopy(c);
d.t = 3;
console.log(c); // {t: 1, p: 'gg'}
console.log(d); // {t: 3, p: 'gg'}
```
- 可以明显看出，浅拷贝在改变其中一个值时，会导致其他也一起改变，而深拷贝不会

## Object.assign()
- ES6的方法
```javascript
// 将sources拷贝到target中
Object.assign(target, sources);
```
- 官方例子
```javascript
// Cloning an object
let obj = { a: 1 };
let copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```
```javascript
// Merging objects
let o1 = { a: 1 };
let o2 = { b: 2 };
let o3 = { c: 3 };

let obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
```
- 发现问题
```javascript
const defaultOpt = {
    title: {
        text: 'hello world',
        subtext: 'It\'s my world.'
    }
};

const opt = Object.assign({}, defaultOpt, {
    title: {
        subtext: 'Yes, your world.'
    }
});

console.log(opt);

// 预期结果
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}
// 实际结果
{
    title: {
        subtext: 'Yes, your world.'
    }
}
```
- 原本想的是它只会覆盖subtext ，然而其实它直接覆盖了整个title ，这个让我比较郁闷，相当于它只merge根属性

- 再看一个例子
```javascript
const defaultOpt = {
    title: {
        text: 'hello world',
        subtext: 'It\'s my world.'
    } 
};

const opt1 = Object.assign({}, defaultOpt);
const opt2 = Object.assign({}, defaultOpt);
// 修改opt2的title
opt2.title.subtext = 'Yes, your world.';

console.log('opt1:');
console.log(opt1);
console.log('opt2:');
console.log(opt2);

// 结果
opt1:
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}
opt2:
{
    title: {
        text: 'hello world',
        subtext: 'Yes, your world.'
    }
}
```
- 上面结果发现两个配置变得一模一样，而其实我们并没有去更改 opt1 的 subtext ，只是改了opt2 的
- 这说明一点：在title 这一层只是简单的浅拷贝 ，而没有继续深入的深拷贝

- 它只对顶层属性做了赋值，完全没有继续做递归之类的把所有下一层的属性做深拷贝
- 总结：Object.assign() 只是一级属性复制，比浅拷贝多深拷贝了一层而已，若是该属性 title 还有值，且可枚举，就不会对里面的值进行拷贝而是直接将地址复制，也就是浅拷贝


## Object.keys()
- ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名
```javascript
let obj = { foo: "bar", baz: 42 };
Object.keys(obj); // ["foo", "baz"]
```
目前，ES7 有一个提案，引入了跟 Object.keys 配套的 Object.values 和 Object.entries
```javascript
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```


## Object.values()
- Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值
```javascript
let obj = { foo: "bar", baz: 42 };
Object.values(obj); // ["bar", 42]
```
- 属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是 b、c、a
```javascript
let obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj); // ["b", "c", "a"]
```

- Object.values 只返回对象自身的可遍历属性
- Object.create 方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，Object.values 不会返回这个属性
```javascript
let obj = Object.create({}, {p: {value: 42}});
Object.values(obj); // [] 为空
```

- Object.values 会过滤属性名为 Symbol 值的属性
```javascript
Object.values({ [Symbol()]: 123, foo: 'abc' }); // ['abc']
```

- 如果 Object.values 方法的参数是一个字符串，会返回各个字符组成的一个数组
```javascript
Object.values('foo'); // ['f', 'o', 'o']
```
- 上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values 返回每个属性的键值，就是各个字符组成的一个数组
- 如果参数不是对象，Object.values 会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values 会返回空数组
```javascript
Object.values(42); // []
Object.values(true); // []
```

## Object.entries()
- Object.entries 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组
```javascript
let obj = { foo: 'bar', baz: 42 };
Object.entries(obj); // [ ["foo", "bar"], ["baz", 42] ]
```

- 除了返回值不一样，该方法的行为与 Object.values 基本一致

- 如果原对象的属性名是一个 Symbol 值，该属性会被省略
```javascript
Object.entries({ [Symbol()]: 123, foo: 'abc' }); // [ [ 'foo', 'abc' ] ]
```

- Object.entries 的基本用途是遍历对象的属性
```javascript
for (let [k, v] of Object.entries(obj)) {
	console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
}
// "one": 1
// "two": 2
```

- Object.entries 方法的一个用处是，将对象转为真正的Map结构。
```javascript
let obj = { foo: 'bar', baz: 42 };
let map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

