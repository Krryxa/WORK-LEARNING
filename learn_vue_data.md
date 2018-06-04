# vue 数据双向绑定原理

- 采用defineProperty的两个方法get、set

## 示例
```html
<!-- 表单 -->
<input type="text" id="input">
<!-- 展示 -->
<p id="desc"></p>
```

```javascript
let obj = {};
let temp = {};//采用临时变量代理obj
Object.defineProperty(obj,'name',{
    //获取obj的name属性会触发
    get(){ 
        return temp['name'];
    },
    //给obj的name属性赋值会触发
    set(val){ 
        temp['name'] = val;//改变temp的结果
        input.value = val;//将值赋值到输入框
        desc.innerText = val; //将值显示到输入框下面
        //obj.name = val; //死循环，不能采取这种方式赋值，采用temp代理方式赋值和取值
    }
});

//设置了id值不需要document.getElementById()
//调用上面的set方法，设置初始值
obj.name = "message";
//调用上面的get方法，获取属性值并放到输入框
input.value = obj.name;

//输入框的变化时执行，这里不能使用箭头函数，因为箭头函数不绑定this，找的是上下文的this
input.addEventListener('input',function(){
    //当值变化时会调用set方法
    obj.name = this.value;
});
```

## defineProperty扩展
```javascript
// Object.defineProperty(obj,'name',{
// 	configurable:false, //是否可删除
// 	writable:false, //是否可重新赋值
// 	enumerable:false,//是否可枚举，false不能for in循环和Object.keys(obj)，
// 	value:1
// });
// Object.keys(obj)返回一个给定对象obj的所有可枚举属性的字符串数组，即obj的属性名数组

// 若有：
let obj2 = {};

// 一方面设置属性和值
obj2.name = 1;
// 等同于：（后三个属性的默认值都是true）
Object.defineProperty(obj2, "name", {
    value : 1,
    writable : true,
    configurable : true,
    enumerable : true
});

// 另一方面设置属性和值
Object.defineProperty(obj2, "name", {
    value : 1 
});
// 等同于：（后三个属性的默认值都是false）
Object.defineProperty(obj2, "name", {
    value : 1,
    writable : false,
    configurable : false,
    enumerable : false
});
```
