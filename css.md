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
::before {} /* 选择器在被选元素的前面插入内容和定义css，使用 content 属性来指定要插入的内容。 */
::after {} /* 选择器在被选元素的后面插入内容和定义css，使用 content 属性来指定要插入的内容。 */
```
> 若 background 来装载图片，使用 filter: blur(3px); 使背景图片虚化，当准备做图片懒加载的时候，使用了 ::before{} 在被选元素的前面插入内容，且设置 z-index: -1，使用 content 属性定义插入内容的文本信息，这样子来做图片懒加载，当背景图片加载完成，会自动覆盖 ::before{} 的内容
## box-sizing
- content-box 是W3C的标准盒模型，元素宽度 = 内容宽度 + padding + border：意思是 padding 和 border 会增加元素的宽度，以至于实际上的 width 大于原始设定的 width。
- border-box 是ie的怪异盒模型，元素宽度 = 设定的宽度，已经将 padding 和 border 包括进去了，比如有时候在元素基础上添加内距 padding 或 border 会将布局撑破，但是使用 border-box 就可以轻松完成
- Inherit：规定应从父元素继承 box-sizing 属性的值

## > 选择器
- 只选择下一层符合的元素（直接子元素），不会往下遍历孙子等等等，与 .box .spab 中间的 空格 不同，在 className 为 box 下会查找所有 className 为 spab 的元素

## + 选择器
- '+' 选择器 相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素
- 可用于某元素的 hover 的时候，需要控制兄弟元素，就需要用到 + 选择器

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

## css盒子模型
包括：
1. margin(外边距) - 清除边框外的区域，外边距是透明的。
2. border(边框) - 围绕在内边距和内容外的边框。
3. padding(内边距) - 清除内容周围的区域，内边距是透明的。
4. content(内容) - 盒子的内容，显示文本和图像。

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

## 画一个三角形
```css
.san {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;  
  border-right: 50px solid transparent;
  border-bottom: 100px solid #ff0066;
}
```

## fixed、absolute 定位如何垂直水平居中
fixed 是根据浏览器窗口定位的，并非父级，要想根据父级定位，可用 margin
```css
position: fixed; /* absolute */
margin: auto;
left: 0;
right: 0;
top: 0;
bottom: 0;
```

## css 设置垂直居中
元素的垂直居中也是我们日常网页布局中经常会遇到的问题,所以我在此提供一些解决方法,希望可以给予有需要的人一些借鉴和参考.

html代码:
```html
<div class="parent">
  <div class="child">Text here</div>
</div>
```

(1) 行内文本垂直居中

css 代码：
```css
.parent {
  height: 100px;
  border: 1px solid #ccc; /* 设置border是为了方便查看效果 */
}
.child {
  line-height: 100px;
}
```

(2) 行内非文本垂直居中（以 img 为例）

html代码:
```html
<div class="parent">
    <img src="image.png" alt="" />
</div>
```
css代码
```css
.parent {
  height: 100px;
  border: 1px solid #ccc; /* 设置border是为了方便查看效果 */
}
.parent img {
  /* 注意此时应该保证图片自身的高度或者你设置的高度小于父元素的200px的行高,不然你看不出来居中的效果 */
  line-height: 100px;
}
```
(3) 未知高度的块级元素垂直居中
html代码:
```html
<div class="parent">
  <div class="child">
    <!--.child的高度未知,父元素要有高度-->
    sddvsds dfvsdvds
  </div>
</div>
```
第一种方法(不需要加padding):
css代码:
```css
.parent {
  width: 100%;
  height: 100%;
  position: relative;
  /*display: table;*/
}
.child {
  width: 500px;
  border: 1px solid #ccc; /*设置border是为了方便查看效果*/
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```
第二种方法(不使用transform):
css代码:
```css
.parent {
    position: relative;
    width: 100%;
    height: 100%;
}
.child {
  width: 500px;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  margin: auto;
}
```
第三种方法(需要加padding):
css代码:
```css
#parent {
  padding: 5% 0;
}
#child {
  padding: 10% 0;
}
```
第四种方法:
（使用 display: table 此种方法也适用于行内文本元素的居中）:
css代码:
```css
.parent {
  width: 100%;
  height: 100%;
  display: table;
}
.child {
  display: table-cell;
  vertical-align: middle;
}
```
第五种方法（flex 布局，这里需要考虑兼容性）
css 代码:
```css
.parent {
  width: 100%;
  height: 100%; /*这里一定要写高度奥!*/
  display: flex;
  align-items: center;
  justify-content: center;
}
```
(4) 已知高度的块级元素垂直居中
html代码:
```html
<div class="parent">
  <div class="child">
    <!--.child的高度已知,父元素高度已知-->
    sddvsds dfvsdvds
  </div>
</div>
```
css代码:
```css
#parent {
  height: 300px;
}
#child {
  height: 40px;
  margin-top: 130px; /* 这个只为父元素的高度减去这个元素的高度除以二计算得到的 */
  border: 1px solid #ccc;
}
```