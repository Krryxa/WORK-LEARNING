
## webpack
- 什么是webpack：
   
  WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

- webpack工作方式：

  把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

- 安装webpack
```
//全局安装
npm install -g webpack
//安装到项目目录
npm install webpack --save-dev
```

- 常见的webpack配置文件

```JavaScript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html解析导入
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// __dirname 是 node.js 中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {
        entry: __dirname + "/app/main.js", //唯一入口文件
        output: {
            path: __dirname + "/build", //打包后输出的文件路径
            filename: "bundle-[hash].js" //打包后输出的文件名
        },
        devtool: 'none',
        //在package.json中的scripts对象中添加webpack-dev-server命令可开启本地服务器
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            //在开发单页应用时，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html，也就是不跳转
            historyApiFallback: true,
            inline: true, //当源文件改变时会自动刷新页面
            hot: true //热加载
        },
        //配置loader
        //模块的解析规则
        module: {
            rules: [
              //js 匹配所有的js，用babel-loader转译  排除掉node_modules
              {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
              },
              //css  use时如果多个loader，要从右往左写
              {
                test:/\.css$/,
                use:[
                  {
                      loader: "style-loader"
                  },{
                      loader: "css-loader"
                  }
                ]
              },
              //less
              {
                test:/\.less$/,
                use:[
                  {
                      loader: "style-loader"
                  },{
                      loader: "css-loader"
                  },{
                      loader: "less-loader"
                  }
                ]
              },
               //配置图片  只在10000字节以下转化base64，其他情况下输出原图片
              {
                test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
              }
            ]
        }
    },
    plugins: [
        //通过这个插件打包后会在js文件中增加一段注释：/*! 版权所有，翻版必究 */
        new webpack.BannerPlugin('版权所有，翻版必究'),
        //HtmlWebpackPlugin：依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
        //new 一个这个插件的实例，并传入相关的参数，自动插入到dist目录中
        new HtmlWebpackPlugin({
            //使用的模板
            template: __dirname + "/app/index.tmpl.html" 
        }),
        //Hot Module Replacement（HMR）热加载插件：允许你在修改组件代码后，自动刷新实时预览修改后的效果。
        //在webpack中实现HMR也很简单，只需要做两项配置
        //在webpack配置文件中添加HMR插件；
        //在Webpack 的 devServer中添加“hot”参数为true；
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
};

```

### Loaders
- 通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理
- 比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
- Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：

      test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
      loader：loader的名称（必须）
      include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
      query：为loaders提供额外的设置选项（可选）

### babel
- babel是一种javascript编译器，它能把最新版的javascript编译成当下可以执行的版本，简言之，利用babel就可以让我们在当前的项目中随意的使用这些新最新的es6，甚至es7的语法。说白了就是把各种javascript千奇百怪的语言统统专为浏览器可以认识的语言。
- babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中

### plugins
- 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
- Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说：

      loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个。
      插件并不直接操作单个文件，它直接对整个构建过程其作用。

- Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。
- 插件实例在上述代码讲解