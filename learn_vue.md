# vue知识总结

> 这里通过我之前做的电商小项目 krry_shop 作为例子讲解
        
    版本：vue 2.x

## vue ?
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

![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/l_1.jpg)

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

## vuex
[内容过多，点击观看](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_vuex.md)

## vue-resource
