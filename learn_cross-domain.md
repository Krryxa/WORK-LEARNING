## 所谓"同源"

- 协议相同
- 域名相同
- 端口相同

## 解决跨域
1. jsonp：缺点，只能 get 请求，还有修改要跨域网站的后端代码
2. CORS：缺点是 ie6、7 兼容不好（那就不兼容啦），需要在跨域网站加响应头
3. postMessage：缺点也是 ie6、7 兼容不好（那就不兼容啦），需要修改要跨域网站的后端代码
4. iframe window.name：传值得方式很巧妙，兼容性也很好，但是也是修改要跨域网站的后端代码
5. 自己写服务端主动请求要跨域的网站，兼容性好而且你客户端的代码还是原来的 ajax，缺点是感觉不好。（服务器端是不存在跨域安全限制的）
6. 类似5 用 nginx 把要跨域网站的数据 url 反向代理

## jsonp 解决跨域
jsonp 跨域的原理：
> 因为 script、img、link 等标签是可以跨域的。所以可以利用 script 标签（动态创建）来向服务器发送请求，服务器端接收到请求后返回一段可执行的 js 代码，调用客户端写好的方法，并把 JSON 数据传入该方法中，客户端即可拿到数据。所以 jsonp 只支持 get 请求（通过 script 的 url 请求）


使用JSONP 模式来请求数据的整个流程：
> 客户端发送一个请求，规定一个可执行的函数名（这里就是 jQuery做了封装的处理，自动帮你生成回调函数并把数据取出来供 success 属性方法来调用，而不是传递的一个回调句柄），服务器端接受了这个 backfunc 函数名，然后把数据通过实参的形式发送出去
使用 JSONP 模式来请求数据的时候服务端返回的是一段可执行的 JavaScript 代码。
```js
// 服务端返回的 jsonp 格式，一段可执行 JavaScript 代码，调用 callback 函数
callback({"id" : "1","name" : "知道创宇"});
```

### 简单使用 jsonp 解决跨域
当点击 "跨域获取数据" 的按钮时，添加一个 script 标签，用于发起跨域请求；注意看请求地址后面带了一个 callback=showData 的参数；

showData 即是回调函数名称，传到后台，用于包裹数据。数据返回到前端后，就是showData(result) 的形式，因为是 script 脚本，所以自动调用showData函数，而 result 就是 showData 的参数。

```js
//回调函数
function showData (result) {
  var data = JSON.stringify(result); //json对象转成字符串
  $("#text").val(data);
}
 
$(document).ready(function () {

  $("#btn").click(function () {
    // 向头部输入一个脚本，该脚本发起一个跨域请求
    $("head").append("<script src='http://localhost:9090/student?callback=showData'><\/script>");
  });
});
```

服务端
```java
// 获取前端传过来的回调函数名称
String callback = request.getParameter("callback");
// 用回调函数名称包裹返回数据，这样返回的数据就作为回调函数的参数传回去了
String result = callback + "(" + result + ")";
```

### jquery 的 jsonp 方式
服务端代码不变，js代码如下：最简单的方式，只需配置一个dataType:'jsonp'，就可以发起一个跨域请求。jsonp 指定服务器返回的数据类型为 jsonp 格式，可以看发起的请求路径，自动带了一个callback=xxx，xxx是jquery随机生成的一个回调函数名称。

这里的 success 就跟上面的 showData 一样，如果有 success 函数则默认 success() 作为回调函数
```js
$(document).ready(function () {
  $("#btn").click(function () {
    $.ajax({
       url: "http://localhost:9090/student",
       type: "GET",
       dataType: "jsonp", // 指定服务器返回的数据类型
       success: function (data) {
          var result = JSON.stringify(data); // json对象转成字符串
          $("#text").val(result);
       }
   });
  });
});
```

jQuery ajax 方式以 jsonp 类型发起跨域请求，其原理跟 script 脚本请求一样，因此使用 jsonp 时也只能使用 GET 方式发起跨域请求。跨域请求需要服务端配合，设置callback，才能完成跨域请求

### jsonp 安全问题
有关于 jsonp 跨域安全问题：[jsonp 跨域安全问题](https://ainyi.com/43)

## CORS
之前在 nodejs 设置后端请求头的就是 CORS 跨域
### 两种请求
浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求。

1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

2) HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值 application/x-www-form-urlencoded
- multipart/form-data、text/plain

凡是不同时满足上面两个条件，就属于非简单请求
浏览器对这两种请求的处理，是不一样的

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 Content-Type 字段的类型是 application/json，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）

### CORS 简介
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。
只要服务器实现了CORS接口，就可以跨源通信

### 服务器设置
Access-Control-Allow-Origin（必含） – 允许的域名，只能填通配符或者单域名
Access-Control-Allow-Methods（必含） – 这允许跨域请求的http方法（常见有POST、GET、OPTIONS）
Access-Control-Allow-Headers（当预请求中包含Access-Control-Request-Headers时必须包含） – 这是对预请求当中Access-Control-Request-Headers 的回复，和上面一样是以逗号分隔的列表，可以返回所有支持的头部。
Access-Control-Allow-Credentials（可选） – 该项标志着请求当中是否包含cookies信息，只有一个可选值：true（必为小写）。如果不包含cookies，请略去该项，而不是填写false。这一项与XmlHttpRequest2对象当中的withCredentials属性应保持一致，即withCredentials为true时该项也为true；withCredentials为false时，省略该项不写。反之则导致请求失败。
Access-Control-Max-Age（可选） – 以秒为单位的缓存时间。预请求的的发送并非免费午餐，允许时应当尽可能缓存。

### CORS的优势
CORS与JSONP的使用目的相同，但是比JSONP更强大
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据


## postMessage (可解决 localStorage 跨域)
window.postMessage(message, targetOrigin) 方法是 html5 新引进的特性，可以使用它来向其它的 window 对象发送消息，无论这个 window 对象是属于同源或不同源，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法

目前广泛采用的是 postMessage 和 iframe 相结合的方法。postMessage(data,origin) 方法允许来自不同源的脚本采用异步方式进行通信，可以实现跨文本档、多窗口、跨域消息传递。接受两个参数：

- data：要传递的数据，HTML5 规范中提到该参数可以是 JavaScript 的任意基本类型或可复制的对象，然而并不是所有浏览器支持任意类型的参数，部分浏览器只能处理字符串参数，所以在传递参数时需要使用 JSON.stringify() 方法对对象参数序列化。
- origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，只是为了安全考虑，postMessage() 方法只会将 message 传递给指定窗口，当然也可以将参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"

otherWindow.postMessage(message, targetOrigin);


## window.name
a 和 b 是同域的 http://localhost:3000, c 是独立的 http://localhost:4000
a 通过 iframe 引入 c，c 把值放到 window.name，再把它的 src 指向和 a 同域的 b，然后在 iframe 所在的窗口中即可取出 name 的值

## node， express 解决跨域
加上请求头：
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

## vue-cli 处理跨域
前后端分离的项目，常常开发的时候，请求的接口地址存在跨域问题

webpack 前后端分离开发接口调试解决方案，proxyTable 解决方案

首先要在项目目录中找到根目录下 config 文件夹下的 index.js 文件。由于我们是在开发环境下使用（上线不存在跨域，使用同一个服务），自然而然是要配置在 dev 里面：
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
'/api' 为匹配项，target 为被请求的地址

以上代码表示：只要是http://www.ainyi.com/api的接口，都将被本地8080端口的请求代理：
> http://localhost:8080/api ===> http://www.ainyi.com/api

也就是说，想请求接口http://www.ainyi.com/api，就是通过http://localhost:8080/api代理访问，就不会产生跨域。

这样就不需要在axios配置axios.defaults.baseURL，所有接口都由本地代理了