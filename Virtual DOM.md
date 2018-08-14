# virtual DOM、npm run dev/build 

- Vue 通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。请仔细看这行代码：
```javascript
return createElement('h1', this.blogTitle)
```
- createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。我们把这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

- 关于 createElement 方法，他是通过 render 函数的参数传递进来的，这个方法有三个参数: 
1. 第一个参数主要用于提供 dom 的 html 内容，类型可以是字符串、对象或函数。比如 “div” 就是创建一个  div 标签 
2. 第二个参数（类型是对象）主要用于设置这个 dom 的一些样式、属性、传的组件的参数、绑定事件之类，具体可以参考 官方文档 里这一小节的说明 
3. 第三个参数（类型是数组，数组元素类型是 VNode）主要用于说是该结点下有其他结点的话，就放在这里


- virtual DOM 分为三个步骤：

1. createElement(): 用 JavaScript 对象(虚拟树) 描述 真实 DOM 对象(真实树)
2. diff(oldNode, newNode) : 对比新旧两个虚拟树的区别，收集差异
3. patch() : 将差异应用到真实DOM树
> 有的时候 第二步 可能与 第三步 合并成一步（Vue 中的 patch 就是这样）

## render 函数
- 总结： 
1. render方法的实质就是生成template模板； 
2. 通过调用一个方法来生成，而这个方法是通过render方法的参数传递给它的； 
3. 这个方法有三个参数，分别提供标签名，标签相关属性，标签内部的 html 内容 
4. 通过这三个参数，可以生成一个完整的木模板

- 备注：
```
render方法可以使用 JSX（react） 语法，但需要 Babel plugin 插件；
render方法里的第三个参数可以使用函数来生成多个组件（特别是如果他们相同的话），只要生成结果是一个数组，且数组元素都是VNode即可；
```
- vue 推荐在绝大多数情况下使用template来创建我们的HTML。然而在一些场景中，我们真的需要JavaScript的完全编程的能力，这就是render函数，它比template更接近编译器。

- 例子：
实现如下的 template 效果
```
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```
在HTML层，我们决定这样定义组件接口：
``` html
<anchored-heading :level="1">Hello world!</anchored-heading>
```
```JavaScript
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```
- 在这种场景中使用 template 并不是最好的选择：首先代码冗长，为了在不同级别的标题中插入锚点元素，我们需要重复地使用 slot

- 虽然模板在大多数组件中都非常好用，但是在这里它就不是很简洁的了。那么，我们来尝试使用 render 函数重写上面的例子：
```javascript
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
- 简单来说，这样代码精简很多，但是需要非常熟悉 Vue 的实例属性。在这个例子中，你需要知道当你不使用 slot 属性向组件中传递内容时，比如 anchored-heading 中的 Hello world!, 这些子元素被存储在组件实例中的 $slots.default中。如果你还不了解， 在深入 render 函数之前推荐阅读实例属性 API

## 关于 vue 的 npm run dev 和 npm run build
```
├─build
│   ├─build.js
│   ├─check-versions.js
│   ├─dev-client.js
│   ├─dev-server.js
│   ├─utils.js
│   ├─vue-loader.conf.js
│   ├─webpack.base.conf.js
│   ├─webpack.dev.conf.js
│   ├─webpack.prod.conf.js
│   └─webpack.test.conf.js
├─config
│   ├─dev.env.js
│   ├─index.js
│   ├─prod.env.js
│   └─test.env.js
├─...
└─package.json
```

- 以上是关于 bulid 与 run 的所有文件
- 指令分析
package.json里面
```json
"dev": "node build/dev-server.js",
"build": "node build/build.js",
```
 
- 意思：运行“npm run dev”的时候执行的是 build/dev-server.js 文件，运行“npm run build”的时候执行的是 build/build.js 文件。

### build 文件夹分析
1. npm run dev 发生的事情
> build/dev-server.js
>> npm run dev 执行的文件 build/dev-server.js 文件，执行了：
```
检查 node 和 npm 的版本
引入相关插件和配置
创建 express 服务器和 webpack 编译器
配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
挂载代理服务和中间件
配置静态资源
启动服务器监听特定端口（8080）
自动打开浏览器并打开特定网址（localhost:8080）

说明： express 服务器提供静态文件服务，不过它还使用了 http-proxy-middleware，
一个 http 请求代理的中间件。前端开发过程中需要使用到后台的API的话，
可以通过配置 proxyTable 来将相应的后台请求代理到专用的API服务器
```

2. npm run build 发生的事情
> build/build.js 构建环境下的配置

>> build.js主要完成下面几件事：
```
loading 动画
删除创建目标文件夹
webpack 编译
输出信息
```

---

> build/webpack.base.conf.js
>> dev-server 依赖的 webpack 配置是 webpack.dev.conf.js 文件，测试环境下使用的是webpack.prod.conf.js <br>
>> webpack.dev.conf.js 中又引用了 webpack.base.conf.js
>>> webpack.base.conf.js 主要完成了下面这些事情：
```
配置 webpack 编译入口
配置 webpack 输出路径和命名规则
配置模块 resolve 规则
配置不同类型模块的处理规则
这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在 module.rules 里面配置
```

> build/webpack.dev.conf.js
>> 在 webpack.base.conf 的基础上增加完善了开发环境下面的配置，主要包括下面几件事情：
```
将 hot-reload 相关的代码添加到 entry chunks
合并基础的 webpack 配置
使用 styleLoaders
配置 Source Maps
配置 webpack 插件
```

> build/check-versions.js 和 build/dev-client.js
>> 最后是 build 文件夹下面两个比较简单的文件，
```
dev-client.js 似乎没有使用到，代码也比较简单，这里不多讲。
check-version.js 完成对 node 和 npm 的版本检测
```

> build/utils.js 和 build/vue-loader.conf.js
>> webpack 配置文件中使用到了 utils.js 和 vue-loader.conf.js 这两个文件，utils 主要完成下面3件事：
```
配置静态资源路径
生成 cssLoaders 用于加载 .vue 文件中的样式
生成 styleLoaders 用于加载不在 .vue 文件中的单独存在的样式文件
```
> vue-loader.conf 则只配置了 css 加载器以及编译 css 之后自动添加前缀

> build/webpack.prod.conf.js
>> 构建的时候用到的 webpack 配置来自 webpack.prod.conf.js，该配置同样是在 webpack.base.conf 基础上的进一步完善。主要完成下面几件事情：
```
合并基础的 webpack 配置
使用 styleLoaders
配置 webpack 的输出
配置 webpack 插件
gzip 模式下的 webpack 插件配置
webpack-bundle 分析
说明： webpack 插件里面多了丑化压缩代码以及抽离 css 文件等插件。
```

> config 文件夹分析
>> config/index.js
```
config 文件夹下最主要的文件就是 index.js 了
在这里面描述了开发和构建两种环境下的配置，前面的 build 文件夹下也有不少文件引用了 index.js 里面的配置
```

> config/dev.env.js、config/prod.env.js和config/test.env.js
：这三个文件就简单设置了环境变量而已，没什么特别的
