# 事件委托

## 背景
一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件

## javascript 中，操作dom对页面开销很大的原因

- 在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器reflow回流和repaint重绘的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；

### reflow回流

1. 页面第一次渲染（初始化）
2. DOM树变化（如：增删节点）
3. Render树变化（如：padding改变）
4. 浏览器窗口resize
5. 获取元素的某些属性：
6. 浏览器为了获得正确的值也会提前触发回流，这样就使得浏览器的优化失效了，这些属性包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle


### repaint重绘

1. reflow回流必定引起repaint重绘，重绘也可以单独触发
2. 背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）



- 每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了，比如100个li，就要占用100个内存空间，如果是1000个，10000个呢，如果用事件委托，那么我们就可以只对它的父级（如果只有一个父级）这一个对象进行操作，这样我们就需要一个内存空间就够了，是不是省了很多，自然性能就会更好。

- 如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

## 事件委托的原理
- 事件委托是利用事件的冒泡原理来实现的，就是事件从最深的节点开始，然后逐步向上传播事件，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件

- 利用Event对象的target可指定的点击元素li才执行下面的代码，点击父元素不执行，用nodeName来获取具体是什么标签名，再做判断

> 新增加的子元素，也会自动被父级委托执行
```javascript
window.onload = function(){
  let oUl = document.getElementById("ul1");
　oUl.onclick = function(ev){
　　let ev = ev || window.event;
  　let target = ev.target || ev.srcElement;
　  if (target.nodeName.toLowerCase() == 'li'){
　   console.log(111);
　　 alert(target.innerHTML);
　　}
　}
}
```
>> Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但不是真的操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较

>> 当用事件委托的时候，根本就不需要去遍历元素的子节点，即使后面有新增加的子元素，也不需要遍历，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，这才是事件委托的精髓所在

## 事件委托处理特定的元素的执行事件的不同
- 使用 switch 分支语句区分不同的 id
```javascript
window.onload = function(){
  let oBox = document.getElementById("box");
  oBox.onclick = function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLocaleLowerCase() == 'input'){
      switch(target.id){
        case 'add' :
          alert('添加');
          break;
        case 'remove' :
          alert('删除');
          break;
        case 'move' :
          alert('移动');
          break;
        case 'select' :
          alert('选择');
          break;
        default:
          console.log('lalala');
      }
    }
  }
}
```

### 当前如果每个li的内容都有子元素或不一样，此时点击的内容，event.target肯定不是li了，此时就做一个循环
- 如有以下场景
```html
<ul id="test">
  <li>
    <p>11111111111</p>
  </li>
  <li>
    <div>22222222222</div>
  </li>
  <li>
    <span>3333333333</span>
  </li>
  <li>4444444</li>
</ul>
```
- 有4个li，里面的内容各不相同，点击li，event对象肯定是当前点击的对象，怎么指定到li上，利用循环，不是li，就指向上一级target = target.parentNode，直到找到li为止，找到就break循环。

```javascript
var oUl = document.getElementById('test')
oUl.addEventListener('click', function(ev) {
  var target = ev.target
  while(target !== oUl ) {
    if(target.tagName.toLowerCase() === 'li') {
      console.log('li click~');
      break
    }
    target = target.parentNode
  }
})
```
