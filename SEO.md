# SEO 搜索引擎优化

1. 域名：尽量简短，利于用户更方便的记忆和判断网页的内容，也有利于搜索引擎更有效的抓取
2. 百度通过 Baiduspider 的程序抓取互联网上的网页，只能抓取文本内容，把重要内容写在 HTML 上，不使用 flash、图片、JavaScript 等来显示重要的内容或链接，百度蜘蛛不会抓取这些
3. ajax 是不能识别的，只用在需要与用户交互的地方
4. 不建议使用frame和iframe框架结构，通过iframe显示的内容可能会被百度丢弃
> 使用robots.txt禁止Baiduspider抓取您不想向用户展现的形式
5. 每个页面尽可能做导航，使用面包屑导航，能在当前页面找到上一级页面链接和下一级页面链接
6. 不同形式的url，301永久跳转到正常形式(永久重定向)
7. 网页的标题 title、描述 description、关键词 keywords (meta标签设置)
8. 图片 img 标签的 alt 说明，还有尽量定义 width 和 height，易于解析
9. 经常更新网页内容，尽量不返回304状态码(从缓存读取)，尽量让百度蜘蛛抓取最新内容，也要做 404 找不到页面的情况
10. b 标签和 strong 标签（都是粗体标签，后者利于SEO优化）
11. html5 的语义化标签利于解析和抓取（header、nav、aside、article、footer）

- 详情可看：[百度搜索引擎优化指南2.0[官方版]](https://wenku.baidu.com/view/f576c31d650e52ea5518983f.html)