## javascript 简单实现 EventEmitter

EventEmitter 基于观察者模式

1. 当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）
比如，当一个对象被修改时，则会自动通知它的依赖对象。观察者模式属于行为型模式

实现一个EventEmitter类，作为被观察的对象：

```js
class EventEmitter {  
  constructor () {
    this.listeners = new Map();
  }
  addListener (label, callback) { }
  removeListener (label, callback) { }
  emit (label, ...args) {  }
}
```

- this.listeners 使用 Map 类型保存不同事件对应的监听者的处理函数。 
- addListener 和 removeListener 分别是添加和移除监听函数。 
- emit 出发某类事件，并用 args 传递数据。 

- 下面是具体实现：
```js
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }
  removeListener(label, callback) {
    let listeners = this.listeners.get(label);
    let index;
    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback) ? i = index : i;
      }, -1);
    }
    if (index > -1) {

      listeners.splice(index, 1);
      this.listeners.set(label, listeners);
      return true;
    }

    return false;
  }
  emit(label, ...args) {
    let listeners = this.listeners.get(label);
    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      })
      return true;
    }

    return false;
  }
}
```

- 再实现一个观察者：
```js
class Observer {
  constructor(id, subject) {
    this.id = id;
    this.subject = subject;
  }
  on(label, callback) {
    this.subject.addListener(label, callback);
  }
}
```
观察者类使用subject保存被观察的对象，也就上述的EventEmitter对象

通过on给被观察者对象绑定事件以及事件处理函数。

好了，基本工作基本完成，下面开始做：
```js
let observable = new EventEmitter();

let [observer1, observer2] = [
    new Observer(1, observable),
    new Observer(2, observable)
]

observer1.on('change', (data) => {
    console.log(`${observer1.id} observered data:`, data);
})

observer2.on('haha', (data) => {
    console.log(`${observer2.id} observered data:`, data);
})

observable.emit('change', {a: 1}); // 1 observered data: { a: 1 }
observable.emit('haha', [1, 2, 3]); // 2 observered data: [ 1, 2, 3 ]
```