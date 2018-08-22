# Vue.mixin

网站后台系统，大部分从接口返回的数据需要 filter，在 Vue 中，一般是在页面上定义 filter 然后在模板文件中使用 | 进行处理：
```html
<td class="pro_line pricess">{{shop.price | toFixed(2)}}</td>
```
```javascript
// 可以有自定义过滤器
filters:{
  // 这里的 this 指向 window
  // 第一个参数 input 是管道符前面的值，往后的参数是调用时的参数
  toFixed(input, param1){
    return '￥'+input.toFixed(param1); //保留两位小数
  }
  // 使用 toFixed 前的 input 必须是 float 类型
},
```

这种方法和以前的遍历数组洗数据是方便了许多，但是，当我发现在许多的页面都有相同的 filter 的时候，每个页面都要复制一遍就显的很蛋疼，决定使用 Vue.mixin() 实现一次代码，无限复用

最后，还可以将所有的 filter 包装成一个 vue 的插件，使用的时候调用 Vue.use() 即可，甚至可以上传 npm 包，开发不同的项目的时候可以直接 install 使用

## Vue.mixin 的定义
学习一个新的框架或者 API 的时候，最好的途径就是上官网，这里附上 [Vue.mixin() 官方说明](https://cn.vuejs.org/v2/guide/mixins.html#%E5%85%A8%E5%B1%80%E6%B7%B7%E5%85%A5)
- 一句话解释，Vue.mixin() 可以把你创建的自定义方法混入所有的 Vue 实例

- 示例代码
```javascript
Vue.mixin({
  created: function(){
    console.log("success")
  }
});
```
run 项目，会发现在控制台输出 success

- 这里的意思是所有的 Vue 组件的 created 方法都被加上了我们自定义的 created 方法（先执行 mixin 的 created 方法，后执行组件实例的 created 方法）

## 使用 Vue.mixin()
- 接下来的思路很简单，我们整合所有的 filter 函数到一个文件，在 main.js 中引入即可。

- 因为我们的自定义方法会在所有的实例中混入，如果按照以前的方法，难免会有覆盖原先的方法的危险，按照官方的建议，混入的自定义方法名增加前缀 $_ 用作区分。

1. 创建一个 config.js 文件，用于保存状态码对应的含义，将其暴露出去
```js
export const typeConfig = {
  1: "type one",
  2: "type two",
  3: "type three"
}
```
2. 再创建一个 filters.js 文件，用于保存所有的自定义函数
```js
import { typeConfig } from "./config"
export default {
  filters: {
    $_filterType: value => {
      return typeConfig[value] || "type undefined"
    }
  }
}
```
3. 最后，在 main.js 中引入我们的 filters 方法集
```js
import filter from "./filters"
Vue.mixin(filter)
```
- 接下来，我们就可以在 .vue 的模板文件中随意使用自定义函数了
```html
<template>
  <div>{{typeStatus | $_filterType}}<div>
</template>
```

## 包装插件
- 接下来简单应用一下 Vue 中插件的制作方法。创建插件之后，就可以 Vue.use(myPlugin) 来使用了。

- 首先附上插件的 [官方文档](https://cn.vuejs.org/v2/guide/plugins.html)

- 一句话解释，包装的插件需要一个 install 的方法将插件装载到 Vue 上

- 关于 Vue.use() 的源码
```js
function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}
```
- 很直观的就看到在最后调用了 plugin.install 的方法，我们要做的就是处理好这个 install 函数即可

### 代码

1. config.js 文件依旧需要，这里保存了所有状态码对应的转义文字

2. 创建一个 myPlugin.js 文件，这个就是我们编写的插件
```js
import { typeConfig } from "./config"

myPlugin.install = (Vue) => {
  Vue.mixin({
    filters: {
      $_filterType: (value) => {
        return typeConfig[value] || "type undefined"
      }
    }
  })
}
export default myPlugin
```
3. 插件的 install 函数的第一个参数为 Vue 的实例，后面还可以传入一些自定义参数

4. 在 main.js 文件中，我们不用 Vue.mixin() 转而使用 Vue.use() 来完成插件的装载
```js
import myPlugin from "./myPlugin"
Vue.use(myPlugin);
```
至此，我们已经完成了一个小小的插件，并将我们的状态码转义过滤器放入了所有的 Vue 实例中，在 .vue 的模板文件中，我们可以使用 {{ typeStatus | $_filterType }} 来进行状态码转义了

## 结语
Vue.mixin() 可以将自定义的方法混入所有的 Vue 实例中
