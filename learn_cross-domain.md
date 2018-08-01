# 跨域

## 了解同源政策：所谓"同源"指的是"三个相同"。

- 协议相同
- 域名相同
- 端口相同

## 解决跨域
1. jsonp 缺点：只能get请求 ，需要修改B网站的代码
2. cors 这个方案缺点 是 ie6 7 兼容不好（倒是不见得要兼容）。需要B网站在响应中加头
3. postMessage 缺点也是 ie6 7 兼容不好（倒是不见得要兼容）。需要修改B网站的代码
4. iframe window.name 传值得方式很巧妙，兼容性也很好。但是也是需要你能修改B网站代码
5. 服务端主动请求B网站，兼容性好而且你客户端的代码还是原来的ajax，缺点是感觉不好。（服务器端是不存在跨域安全限制的）
6. 类似5 用nginx把B网站的数据url反向代理。

## jsonp 解决跨域
- 使用JSONP 模式来请求数据的整个流程：
> 客户端发送一个请求，规定一个可执行的函数名（这里就是 jQuery做了封装的处理，自动帮你生成回调函数并把数据取出来供 success 属性方法来调用，而不是传递的一个回调句柄），服务器端接受了这个 backfunc 函数名，然后把数据通过实参的形式发送出去
- 使用 JSONP 模式来请求数据的时候服务端返回的是一段可执行的 JavaScript 代码。
- jsonp 跨域的原理：
> 因为 script、img、link 等标签是可以跨域的。所以可以利用 script 标签（动态创建）来向服务器发送请求，服务器端接收到请求后返回一段可执行的 js 代码，调用客户端写好的方法，并把 JSON 数据传入该方法中，客户端即可拿到数据。所以 jsonp 只支持 get 请求（通过 script 的 url 请求）

## node， express 解决跨域
- 加上请求头：
```javascript
app.all('*', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
```

## 重点说一下vue-cli处理跨域
- 前后端分离的项目，常常开发的时候，请求的接口地址存在跨域问题
- webpack 前后端分离开发接口调试解决方案，proxyTable解决方案
- 首先要在项目目录中找到根目录下config文件夹下的index.js文件。由于我们是在开发环境下使用，自然而然是要配置在dev里面：
```javascript
port: 8080,
proxyTable: {
  '/api': {
    target: 'http://www.ainyi.com',  // 目标接口域名
    changeOrigin: true,  // 是否跨域
    // secure: false,  // 如果是https接口，需要配置这个参数
    pathRewrite: {
      '^/api': ''   // 重写接口，一般不更改
    }
  },
},
```
- '/api' 为匹配项，target 为被请求的地址
- 以上代码表示：只要是http://www.ainyi.com/api的接口，都将被本地8080端口的请求代理：
    > http://localhost:8080/api ===> http://www.ainyi.com/api
- 也就是说，想请求接口http://www.ainyi.com/api，就是通过http://localhost:8080/api代理访问，就不会产生跨域。
- 这样就不需要在axios配置axios.defaults.baseURL，所有接口都由本地代理了