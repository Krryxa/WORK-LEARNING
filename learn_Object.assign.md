# Object.assign  const

## const 
```javascript
const arr = [1,2,3];
arr.push(4); // 正确执行，因为引用地址没有改变
arr = []; // 错误，因为地址改变了，重新赋值，报错
```

## Object.assign
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

## 介绍 Object.assign()
- ES6的方法
```javascript
// 将sources拷贝到target中
Object.assign(target, sources);
```
- 官方例子
```javascript
// Cloning an object
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```
```javascript
// Merging objects
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
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
