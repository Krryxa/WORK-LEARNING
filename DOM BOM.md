# DOM 和 BOM 详解

- javascript 组成
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_15.jpg)

1. DOM 是 W3C 的标准； [所有浏览器公共遵守的标准]
2. BOM 是 各个浏览器厂商根据 DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]
3. window 是 BOM 对象，而非 js 对象；javacsript是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)

- ECMAScript扩展知识：

1. ECMAScript是一个标准，JS只是它的一个实现，其他实现包括ActionScript。
2. “ECMAScript可以为不同种类的宿主环境提供核心的脚本编程能力……”，即ECMAScript不与具体的宿主环境相绑定，如JS的宿主环境是浏览器，AS的宿主环境是Flash。
3. ECMAScript描述了以下内容：语法、类型、语句、关键字、保留字、运算符、对象。

## DOM, DOCUMENT, BOM, WINDOW 区别
- DOM 是为了操作文档出现的 API，document 是其的一个对象；
- BOM 是为了操作浏览器出现的 API，window 是其的一个对象。
- BOM 是浏览器对象模型，DOM 是文档对象模型，前者是对浏览器本身进行操作，而后者是对浏览器（可看成容器）内的内容进行操作

- 归DOM管的：
> document，由web开发人员呕心沥血写出来的一个文件夹，里面有index.html，CSS 和 JS ，部署在服务器上，我们可以通过浏览器的地址栏输入URL然后回车将这个document加载到本地，浏览，右键查看源代码等

归BOM管的：
> 浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏、浏览器的右键菜单、document 加载时的状态栏，显示 http 状态码、滚动条 scroll bar


## DOM
- document
1. 当浏览器下载到一个网页，通常是 HTML，这个 HTML 就叫 document（当然，这也是 DOM 树中的一个 node），从上图可以看到，document 通常是整个 DOM 树的根节点。这个 document 包含了标题（document.title）、URL（document.URL）等属性，可以直接在 JS 中访问到。

2. 在一个浏览器窗口中可能有多个 document，例如，通过 iframe 加载的页面，每一个都是一个 document

3. 在 JS 中，可以通过 document 访问其子节点（其实任何节点都可以），如 document.body;document.getElementById('xxx');


## 什么是 BOM
> BOM（Browser Object Model）即浏览器对象模型。
1. BOM 提供了独立于内容 而与浏览器窗口进行交互的对象；
2. 由于 BOM 主要用于管理窗口与窗口之间的通讯，因此其核心对象是window；
3. BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性；
4. BOM 缺乏标准，JavaScript 语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C，BOM 最初是 Netscape 浏览器标准的一部分。
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_14.jpg)

> window 对象是 js 中的顶级对象，所有定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法，在调用的时候可以省略 window
>> Window 对象包含属性：document、location、navigator、screen、history、frames

## BOM 扩展
1. 如果文档包含框架（frame 或 iframe 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。
2. window.frames 返回窗口中所有命名的框架
3. parent是父窗口（如果窗口是顶级窗口，那么parent==self==top）
4. top是最顶级父窗口（有的窗口中套了好几层frameset或者iframe）
5. self是当前窗口（等价window）
6. opener是用open方法打开当前窗口的那个窗口
7. 与消息框有关的方法：alert(String)、confirm(String)、prompt(String)
8. 两种定时器：setTimeout(code,latency) 和 setInterval(code,period)
> 注：setTimeout只执行一次code，如果要多次调用，可以让code自身再次调用setTimeout()；setInteval()会不停地调用code，直到clearInterval()被调用

### History 对象
```javascript
window.history.length // 浏览过的页面数
history.back() // 在浏览历史里后退一步
history.forward() // 在浏览历史里前进一步
history.go(i) // 到历史记录的第i位 i>0 进步，i<0 撤退退却
```

### Screen 对象
> screen 对象：用于获取某些关于用户屏幕的信息，也可用window.screen引用它
```javascript
window.screen.width // 屏幕宽度
window.screen.height // 屏幕高度
window.screen.colorDepth // 屏幕颜色深度
window.screen.availWidth // 可用宽度(除去任务栏的高度)
window.screen.availHeight // 可用高度(除去任务栏的高度)
```

### Navigator 对象
> navigator 对象：包含大量有关 Web 浏览器的信息，在检测浏览器及操作系统上非常有用
```javascript
window.navigator.appCodeName // 浏览器代码名
window.navigator.appName // 浏览器步伐名
window.navigator.appMinorVersion // 浏览器补钉版本
window.navigator.cpuClass // cpu类型 x86
window.navigator.platform // 操作体系类型 win32
window.navigator.plugins
window.navigator.opsProfile
window.navigator.userProfile
window.navigator.systemLanguage // 客户体系语言 zh-cn简体中文
window.navigator.userLanguage // 用户语言,同上
window.navigator.appVersion // 浏览器版本(包括 体系版本)
window.navigator.userAgent// 用户代理头的字符串表示
window.navigator.onLine // 用户否在线
window.navigator.cookieEnabled // 浏览器是否撑持cookie
```

### Location 对象
> location 对象：表示载入窗口的URL，也可用 window.location 引用它
```javascript
location.href // 当前载入页面的完整URL
location.portocol // URL中使用的协议，即双斜杠之前的部分，如http
location.host // 服务器的名字，如www.wrox.com
location.hostname // 通常等于host，有时会省略前面的www
location.port // URL声明的请求的端口，默认情况下，大多数URL没有端口信息，如8080
location.pathname // URL中主机名后的部分，如/pictures/index.htm
location.search // 执行GET请求的URL中的问号后的部分，又称查询字符串，如?param=xxxx
location.hash // 如果URL包含#，返回该符号之后的内容，如#anchor1
location.assign("http:www.baidu.com"); // 同location.href，新地址都会被加到浏览器的历史栈中
location.replace("http:www.baidu.com"); // 同assign()，但新地址不会被加到浏览器的历史栈中，不能通过back和forward访问
location.reload(true | false); // 重新载入当前页面，为false时从浏览器缓存中重载，为true时从服务器端重载，默认为false
document.location.reload(URL) // 打开新的网页
```

### Document 对象
- 详情看 [https://www.cnblogs.com/ainyi/p/8794159.html](https://www.cnblogs.com/ainyi/p/8794159.html)