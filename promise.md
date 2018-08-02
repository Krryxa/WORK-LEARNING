# promise

> promise 可解决的问题：<br>
> 1. 可以支持多个并发的请求，获取并发请求返回的数据<br>
> 2. 解决回调地狱的问题
- 回调地狱：做异步请求的时候，在请求成功的回调函数里继续写函数，或者继续发送异步，继续回调，回调函数里又回调，一层一层，嵌套越来越多，就会形成回调地狱。这会使我们的代码可读性变差，不好维护，性能也下降。

- promise 就是可以解决回调地狱的问题

- 使用 promise
```
- Promise对象有三种状态：
1. 异步操作"未完成"（pending）
2. 异步操作"已完成" (resolved)
3. 异步操作"失败" (rejected)

- 这三种状态的变化途径只有2种：
1. 异步操作从"未完成"到"已完成"
2. 异步操作从"未完成“到"失败"

- 状态一旦改变，就无法再次改变状态，这也是它名字 promise-承诺的由来

- 所以Promise对象的最终结果只有两种：
1. 异步操作成功 Promise对象传回一个值，状态变为resolved
2. 异步操作失败 Promise对象抛出一个错误，状态变为rejected
```
```JavaScript
// 按照 then 来执行成功和失败的回调函数
function load () {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        resolve(res); // 成功
      },
      error: err => {
        reject(err); // 失败
      }
    });
  });
}

// then 方法有两个参数，第一个是成功 resolve 的回调，第二个是失败 reject 的回调
// 调用一下
load().then(data => {
  console.log(data);  // 请求到的数据
  console.log('请求数据成功');
}, err => {
  // 这是 then 的第二个参数，请求失败 reject 的回调
  console.log('请求失败');
});

// catch() 相当于 then 的第二个参数，失败 reject 的回调
load().then(data => {
  console.log(data);  // 请求到的数据
  console.log('请求数据成功');
}).catch(err => {
  // 这是 catch，请求失败 reject 的回调
  console.log('请求失败');
});
```


- 上面说的异步请求的回调函数又有多层嵌套形成回调地狱，如果是 promise 就会这样解决回调地狱
- Promise 就是用同步的方式写异步的代码，用来解决回调问题

## resolve、reject、then、catch
```javascript
// 从 买笔 -> 写作业 -> 交作业 三个异步状态，都需要依赖上一步的结果才能执行
// 如果单纯在 ajax 异步回调里又做异步，就会形成回调地狱，看看 promise 是如何解决回调地狱的问题

// 买笔
function buy(){
  console.log("开始买笔");
  return new Promise( (resolve,reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        console.log('买了笔芯');
        resolve(res); // 成功
      },
      error: (err) => {
        reject(err); // 失败
      }
    });
  });
}

// 写作业
function work(data){
  console.log("开始写作业：" + data);
  return new Promise( (resolve,reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        console.log('写完搞定');
        resolve(res); // 成功
      },
      error: (err) => {
        reject(err); // 失败
      }
    });
  });
}

// 交作业
function out(data){
  console.log("开始上交：" + data);
  return new Promise( (resolve,reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        console.log('上交完成');
        resolve(res); // 成功
      },
      error: (err) => {
        reject(err); // 失败
      }
    });
  });
}

// 调用异步的时候，如此简单，优雅地解决了回调地狱的问题
// 调用每一个方法的时候自动将参数放进去了
// 这里调用的是成功的回调
buy().then(work).then(out).then( data => {
  console.log(data);
});

// 上面的写法等同于这种写法：还是没有上面的简洁，推荐上面写法
buy().then(res => work(res)).then(res => out(res)).then( data => {
  console.log(data);
});

// 考虑失败的回调
buy().then( work, err => {
  console.log('买笔失败啦' + err);
}).then( out, err => {
  console.log('作业太难，写不了')
}).then( data => {
  console.log(data);
});

1. 注意：如果执行 buy() 异步失败，就会找 then() 有没有第二个参数或者有没有 catch() 方法
   有则进入这个的失败的回调（此时 promise 状态为 pending）
2. 当这个失败的回调执行成功后（没有发生 rejected 的情况下），就会继续找后面有没有 then()，
   没有则 promise 的状态就会置为 resolved 状态，有则继续是 pending 状态，继续执行 then() 第一个参数的回调函数
3. 如果继续执行的 then() 回调函数异步失败，且又找不到下一个 then() 的第二个参数或 catch() 方法，
   此时 promise 的状态置为 rejected
4. 跟着第一点，如果执行 buy() 异步失败，并且没有失败的回调，promise 的状态就只能 rejected，就不会再往下执行 then()

总结一点：成功，就继续执行 then() 第一个参数的回调，
         失败，就继续执行 then() 第二个参数或 catch() 的回调，
         依次这样执行，promise 的状态都是 pending

         一旦成功时找不到 then() 第一个参数的回调，promise 的状态就置为 resolved
         或
         一旦失败时找不到 then() 第二个参数或 catch() 的回调，promise 的状态就置为 rejected

         且 promise 状态一旦改变，就无法再次改变状态
```

## all、race
```javascript
//买作业本
function cutUp(){
  console.log('挑作业本');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        console.log('挑好购买作业本');
        resolve('新的作业本' + res);
      },
      error: (err) => {
        reject(err); // 失败
      }
    });
  });
  return p;
}

//买笔
function boil(){
  console.log('挑笔芯');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'xxx.com',
      data: {name:'krry'},
      success: res => {
        console.log('挑好购买笔芯');
        resolve('新的笔芯' + res);
      },
      error: (err) => {
        reject(err); // 失败
      }
    });
  });
  return p;
}

// 当 cutUp、boil的状态都变成 resolved 时，promise 才会变成 resolved，并调用 then() 完成回调
// 但只要有一个变成 rejected 状态，promise 就会立刻变成 rejected 状态
Promise.all([cutUp(),boil()]).then(res => {
  console.log("写作业的工具都买好了");
  this.results = res;
  console.log(res); // 返回的是数组形式
});
// 使用解构赋值方式获取 all 返回的多个请求的数据
let [cutUpData, boilData] = this.results;
// 开发中使用 axios，封装了 promise
let [cutUpData, boilData] = await getAll();

Promise.race([cutUp(), boil()]).then((res) => {
  console.log("哈哈，我先买好啦");
  console.log(res);
});
```