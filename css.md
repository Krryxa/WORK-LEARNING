# css 的一些小总结

## css3 特殊子元素选择器：
```css
:last-child /* 选择元素最后一个孩子 */
:first-child /* 选择元素第一个孩子 */
:nth-child(1) /* 按照第几个孩子给它设置样式 */
:nth-child(even) /* 按照偶数 */
:nth-child(odd)  /* 按照奇数 */
```

## css3 伪类：
```css
a:link {color: #FF0000} /* 未访问的链接 */
a:visited {color: #00FF00} /* 已访问的链接 */
a:hover {color: #FF00FF} /* 鼠标移动到链接上 */
a:active {color: #0000FF} /* 选定的链接 */
:after{} /* 选择器在被选元素的内容后面插入内容。使用 content 属性来指定要插入的内容。 */
```
## box-sizing
- content-box 是W3C的标准盒模型，元素宽度 = 内容宽度 + padding + border：意思是 padding 和 border 会增加元素的宽度，以至于实际上的 width 大于原始设定的 width。
- border-box 是ie的怪异盒模型，元素宽度 = 设定的宽度，已经将 padding 和 border 包括进去了，比如有时候在元素基础上添加内距 padding 或 border 会将布局撑破，但是使用 border-box 就可以轻松完成
- Inherit：规定应从父元素继承 box-sizing 属性的值

## > 选择器
- 只选择下一层符合的元素（直接子元素），不会往下遍历孙子等等等，与 .box .spab 中间的 空格 不同，在 className 为 box 下会查找所有 className 为 spab 的元素

## + 选择器
- '+' 选择器 相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素

## css 中的单位
- em：相对于父级元素的字体大小：1em（当前字体大小），2em（当前字体大小的两倍）
- rem：相对于 html 根元素的字体大小

## 使元素不可见的方案
- 以下是元素透明方案：（会渲染到html，依然占位）
1. 16 进制中的 #00000000（后两位控制透明度），取值范围 00(完全透明) ~ ff(完全不透明)
2. rgb 控制颜色，三个参数，rgba 控制颜色和透明度，四个参数，最后一个控制透明度
3. opacity，取值 0 ~ 1
4. 完全透明：transparent
5. visibility: hidden
- 以下是元素隐藏方案：（不会渲染到html，不会占位）
1. diaplay: none 

## CSS实现单行、多行文本溢出显示省略号
- 单行
```css
{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
```
- 多行
```css
{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```