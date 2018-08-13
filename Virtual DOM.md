# virtual DOM、npm run/build 

- virtual DOM 分为三个步骤：

1. createElement(): 用 JavaScript对象(虚拟树) 描述 真实DOM对象(真实树)
2. diff(oldNode, newNode) : 对比新旧两个虚拟树的区别，收集差异
3. patch() : 将差异应用到真实DOM树
> 有的时候 第二步 可能与 第三步 合并成一步（Vue 中的patch就是这样）

- 关于 vue 的 npm run dev 和 npm run build
- 关于 vue 的 npm run dev 和 npm run build
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
 
- 意思：运行”npm run dev”的时候执行的是 build/dev-server.js 文件，运行”npm run build”的时候执行的是 build/build.js 文件。

- build文件夹分析
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

说明： express 服务器提供静态文件服务，不过它还使用了 http-proxy-middleware，一个 http 请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置 proxyTable 来将相应的后台请求代理到专用的API服务器
```

> build/webpack.base.conf.js
>> dev-server 依赖的 webpack 配置是 webpack.dev.conf.js 文件，测试环境下使用的是webpack.prod.conf.js <br>
>> webpack.dev.conf.js 中又引用了 webpack.base.conf.js
>>> webpack.base.conf.js 主要完成了下面这些事情：
```
配置 webpack 编译入口
配置 webpack 输出路径和命名规则
配置模块 resolve 规则
配置不同类型模块的处理规则
这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在 module.rules 里面配置。
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


> build/build.js 构建环境下的配置，

>> build.js主要完成下面几件事：
```
loading 动画
删除创建目标文件夹
webpack 编译
输出信息
```

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
在这里面描述了开发和构建两种环境下的配置，前面的 build 文件夹下也有不少文件引用了 index.js 里面的配置。
```

> config/dev.env.js、config/prod.env.js和config/test.env.js
：这三个文件就简单设置了环境变量而已，没什么特别的
