# vue知识总结

> 这里通过我之前做的电商小项目 krry_shop 作为例子讲解
        
    版本：vue 2.x

## vue ？
- Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。

## Vue核心思想
- 组件化和数据驱动，组件化就是将一个整体合理拆分为一个一个小块（组件），组件可重复使用，数据驱动是前端的未来发展方向，释放了对DOM的操作，让DOM随着数据的变化自然而然的变化，不必过多的关注DOM，只需要将数据组织好即可。

## vue全家桶
- vue-cli
- vue-router
- vuex
- vue-resource
- axios

## vue-cli
- 是快速构建单页应用的脚手架
- vue-cli 大大降低了webpack 的使用难度，支持热更新，有webpack-dev-server的支持，相当于启动了一个请求服务器，给你搭建了一个测试环境，只关注开发
- 热更新：是检测文件的变化并用websocket通知客户端做出相应的更新（webpack里配置）

```
//安装vue-cli
npm install -g vue-cli

//利用脚手架初始化项目
vue init webpack vue_project
```

## vue-router
- vue-router 是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。
- 传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是应该是路径之间的切换，也就是组件的切换
1. 是路由和页面(组件)对应

![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/l_1.jpg)

2. 通过router-link进行跳转
```html
<router-link 
    :to="{
        path: 'yourPath', 
        params: { 
            id: id, 
            dataObj: data
        },
        query: {
            id: id, 
            dataObj: data
        }
    }">
</router-link>
```
- 这里涉及到三个参数
```    
path -> 是要跳转的路由路径，也可以是路由文件里面配置的 name 值，命名路由，两者都可以进行路由导航
params -> 是要传送的参数，参数可以直接key:value形式传递（类似post）
query -> 是通过 url 来传递参数的同样是key:value形式传递（类似get）
接收参数：
this.$route.query.id
this.$route.params.id
路由的配置
{
  path:'/admin/:username', // :冒号后面是参数
  component:() => import('../components/Admin.vue'),
  name:"admin",
  meta:{title:'个人中心'},
},
```
> 关于path路径加不加 / 的问题，加了/就是在根路径下跳转，不加就是在当前路径后面跳转，子页面，使用命名路由就不用管加不加 / 的问题了

3. 复用组件时，想对路由参数的变化作出响应的话，可以 watch（监测变化） $route 对象
```javascript
watch:{
    //监听相同路由下参数变化的时候，从而实现异步刷新
    '$route'(to,from){
        //做一些路由变化的响应
        this.loading = true;//打开加载动画
        this.getCateShop();//重新获取数据
    },
},
```
4. 全局钩子，在main.js配置，可用作用户拦截
```javascript
//在进入路由之前， 每一次都会执行此方法  全局钩子
router.beforeEach(function(to,from,next){
  //设置网页标题
  document.title = to.meta.title;
  //检查是否已登录
  let userObj = JSON.parse(sessionStorage.getItem('user'));
  if(userObj){
    //执行方法，将用户名设置进全局参数  vuex
    //提交mutation的Types.SETUSERNAME方法
    //第二个参数是携带的参数
    //main.js使用vuex的提交方法，不需要this.$store.commit()，直接就store.commit()
    store.commit(Types.SETUSERNAME,userObj.username);
  }else{
    //如果未登录，想要进入admin目录，则自动跳回首页
    if(to.path.indexOf('admin') != -1){
    //   alert("进了");
      router.push({name:'home'});
    }
  }
  next(); //继续往下走
});
```
5. 路由懒加载
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

## vuex
[内容过多，点击观看](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_vuex.md)

## vue-resource (不推荐使用)
- vue-resource？
        
    >Vue.js的一款插件，它可以通过XMLHttpRequest或JSONP发起请求并处理响应。也就是说，$.ajax能做的事情，vue-resource插件一样也能做到，而且vue-resource的API更为简洁。另外，vue-resource还提供了非常有用的inteceptor功能，使用inteceptor可以在请求前和请求后附加一些行为，比如使用inteceptor在ajax请求时显示loading界面。

- vue-resource特点
1. 体积小
    >vue-resource非常小巧，在压缩以后只有大约12KB，服务端启用gzip压缩后只有4.5KB大小，这远比jQuery的体积要小得多。
2. 支持主流的浏览器
    >和Vue.js一样，vue-resource除了不支持IE 9以下的浏览器，其他主流的浏览器都支持。
3. 支持Promise API和URI Templates
    >Promise是ES6的特性，Promise的中文含义为“先知”，Promise对象用于异步计算。
URI Templates表示URI模板，有些类似于ASP.NET MVC的路由模板。
4. 支持拦截器
    >拦截器是全局的，拦截器可以在请求发送前和发送请求后做一些处理。拦截器在一些场景下会非常有用，比如请求发送前在headers中设置access_token，或者在请求失败时，提供共通的处理方式。

```JavaScript
// 基于全局Vue对象使用http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
 
// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```
- vue-resource的请求API是按照REST风格设计的，它提供了7种请求API：
```javascript
get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options])
```
- options对象
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/l_2.jpg)

```JavaScript
this.$http.get('/someUrl', [options]).then((response) => {
  // 响应成功回调
}, (response) => {
  // 响应错误回调
});
```
- inteceptor
    > 拦截器可以在请求发送前和发送请求后做一些处理，比如加载动画
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/l_3.jpg)
```JavaScript
Vue.http.interceptors.push((request, next) => {
  // ...
  // 请求发送前的处理逻辑，比如加载动画
  // ...
  next((response) => {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
})
```

## axios
- 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 Node.js 中使用
- vue2.0之后，就不再对vue-resource更新，而是推荐使用axios，本项目也是使用axios

- 功能特性
1. 在浏览器中发送 XMLHttpRequests 请求
2. 在 node.js 中发送 http请求
3. 支持 Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 取消请求
7. 自动转换 JSON 数据
8. 客户端支持保护安全免受 CSRF/XSRF（跨站请求伪造） 攻击
- 安装 axios
```
$ npm install axios
```
- 在要使用的文件中引入axios
```
import axios from 'axios'
```
- get请求
```JavaScript
// 向具有指定ID的用户发出请求
axios.get('/user?ID=12345').then( (response)=> {
    console.log(response);
}).catch( (error)=> {
    console.log(error);
});
```
- post请求
```JavaScript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
}).then( (response)=> {
    console.log(response);
}).catch( (error)=> {
    console.log(error);
});
```
- 执行多个并发请求
```JavaScript
// 根据id获取某一条商品数据
let getDetail = (id)=>{
    return axios.get(`/detail?bid=${id}`);
}

//检测登录的用户是否将此商品加入购物车
let detectCar = (shopId,userId)=>{
    return axios.get(`/detectCar?shopId=${shopId}&userId=${userId}`);
}

// 获取一条商品数据、并且检测是否加入购物车
let getDeAll = (shopId,userId)=>{
    axios.all([
        getDetail(shopId),
        detectCar(shopId,userId)
    ]).then(axios.spread((resDetail, resCar)=>{
        //两个请求现已完成
        //打印两个请求的响应值
        console.log(resDetail);
        console.log(resCar);
    }));
}
```
- 实例的方法
```javascript
axios#request(config)
axios#get(url [,config])
axios#delete(url [,config])
axios#head(url [,config])
axios#post(url [,data [,config]])
axios#put(url [,data [,config]])
axios#patch(url [,data [,config]])
```
- 请求配置：只有url是必需的，如果未指定方法，请求将默认为GET

- 可配置全局axios默认值
```javascript
//默认的请求路径
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

- 拦截器
    > 在请求或响应被 then 或 catch 处理前拦截
```javascript
// 添加请求拦截器
axios.interceptors.request.use( (config)=> {
    // 在发送请求之前做些什么
    return config;
  }, (error)=> {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use( (response)=> {
    // 对响应数据做点什么
    return response;
  }, (error)=> {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

## axios的 post 请求 相关问题
- 如果遇到 post 请求跨域问题，在 webpack 配置文件可以设置 proxyTable 处理跨域问题
- 传送门：[https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_cross-domain.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_cross-domain.md)
- post 请求携带参数，可能需要做一次序列化：qs.stringify(reqData)
```javascript
saveNormalAds (reqData) {
  return Ax.post('/index.php?krry', qs.stringify(reqData));
},
```

## 如何判断所有请求加载完毕
```javascript
let reqNum = 0
axios.interceptors.request.use(function (config) {  //  在请求发出之前进行一些操作，每次发出请求就reqNum++
  reqNum++
  _bus.$emit('showloading')
  return config
}

axios.interceptors.response.use(response => {        // 接受请求后reqNum--，判断请求所有请求是否完成
  reqNum--
  if (reqNum <= 0) {
    _bus.$emit('closeLoading')
  } else {
    _bus.$emit('showloading')
  }
})
```

## vue.use() 使用插件（执行的是插件的 install 方法）
1. 添加全局方法或者属性，如: vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
3. 通过全局 mixin 方法添加一些组件选项，如: vue-router
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router
- 插件必须要有 install 方法，执行就是 install 方法


## 页面级 MVC 结构
> 如图划分原则：
- 纵向：通过业务功能（可根据视图模块判断）划分
- 横向：通过Model-View-Controller三种不同职能划分<br>
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_8.jpg)
- 如上，将每个页面划分为 MVC 结构，在介绍前端在哪实现 MC 两层之前，先说一下 MVC 的概念：
1. 模型 Model：模型代表着一种企业规范，就是业务流程/状态的处理以及业务规则的规定。业务流程的处理过程对其他层来说是不透明的，模型接受视图的请求，并从接口返回结果。业务模型的设计可以说是MVC的核心

2. 视图 View：视图即是用户看到并与之交互的界面，比如HTML（静态资源），JSP（动态资源）等等，并且视图层仅做展示界面，不做与接口数据的相关处理逻辑

3. 控制器 Controller：控制器即是控制请求的处理逻辑，对请求进行处理，负责请求转发

- 联想起 Java web 经典三层结构：控制层(表现层)、持久层(dao层)、业务层(service层) （MVC 是一种设计模式，java web 三层架构是一种架构思想）
- 从上面可知，在页面中实现 MVC 模式，对于vue项目中，MC 两层又有两种写法：

1. 多个组件通用数据的大项目：<br>
> 写在vuex中，页面 dispatch action，在 action 内部做异步请求调用接口返回数据，随 commit mutation 传递接口数据，并在 mutation 内部对数据做逻辑处理，写入 state，在页面调用 state 或 getters 直接使用<br>
数据流动：view -> vuex(action) -> dao -> vuex(mutation) -> state -> (getters) -> view

2. 没有太多通用数据的项目：<br>
> 页面调用接口返回的数据，单独将这一部分数据处理抽出来作为 service，就变成页面调用 service 层，在 service 层做异步请求调用接口返回数据，并对数据做逻辑处理返回到页面直接使用<br>
数据流动：view -> service -> dao -> service -> view

- 参考另一个地址：[https://github.com/Krryxa/WORK-LEARNING/blob/master/page_mvc.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/page_mvc.md)

## is 操作符
- 就是有些元素内部不能使用自定义标签或者自定义标签内也不能放某些特殊的标签，这时候就要用 is 代替一下，让 html 语法符合规则验证。is 属于指定要在内部使用的标签
在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
```html
<table>
  <my-row>...</my-row>
</table>
```
- 自定义组件 ```<my-row>``` 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的 is 特性：
is 的值为：已注册组件的名字，或一个组件的选项对象
```html
<table>
  <tr is="my-row"></tr>
</table>
```
这两种写法表达的意思是一样的，但是第一种写法是不符合 html 语法验证的，所以采用第二种写法

## 路由切换回到顶部的问题
1. 可在路由配置文件中，提供一个 scrollBehavior 方法（还可以设置“滚动到锚点”的行为）
2. 可在路由导航守卫 router.beforeEach 设置滚动条置顶
