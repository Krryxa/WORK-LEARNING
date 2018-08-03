# 前端页面的架构

## 架构方案
> 架构的目的是管理复杂度，将复杂问题分而治之、有效管理，具体方法如下：
### 首先通过路由切割“页面级”粒度的功能模块
> 这里的“页面级”粒度指一个路由映射的组件（路由和页面(组件)对应）<br>
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/l_1.jpg)

### 同一“页面”内的模块再划分
> 如图划分原则：
- 纵向：通过业务功能（可根据视图模块判断）划分
- 横向：通过Model-View-Controller三种不同职能划分<br>
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/p_8.jpg)
- 如上，将每个页面划分为 MVC 结构，在介绍前端在哪实现 MC 两层之前，先说一下 MVC 的概念：
1. 模型 Model：模型代表着一种企业规范，就是业务流程/状态的处理以及业务规则的规定。业务流程的处理过程对其他层来说是不透明的，模型接受视图的请求，并从接口返回结果。业务模型的设计可以说是MVC的核心

2. 视图 View：视图即是用户看到并与之交互的界面，比如HTML（静态资源），JSP（动态资源）等等，并且视图层仅做展示界面，不做与接口数据的相关处理逻辑

3. 控制器 Controller：控制器即是控制请求的处理逻辑，对请求进行处理，负责请求转发

- 联想起 Java web 经典三层结构：控制层(表现层)、持久层(dao层)、业务层(service层) （MVC 是一种设计模式，java web 三层架构是一种架构思想）
- 从上面可知，在页面中实现 MVC 模式，对于vue项目中，MC 两层又有两种写法：

1. 多个组件通用数据的大项目：<br>
> 写在vuex中，页面 dispatch action，在 action 内部做异步请求调用接口返回数据，随 commit mutation 传递接口数据，并在 mutation 内部对数据做逻辑处理，写入 state，在页面调用 state 或 getters 直接使用<br>
数据流动：view -> vuex(action) -> dao -> vuex(mutation) -> state -> (getters) -> view

2. 没有太多通用数据的项目：<br>
> 页面调用接口返回的数据，单独将这一部分数据处理抽出来作为 service，就变成页面调用 service 层，在 service 层做异步请求调用接口返回数据，并对数据做逻辑处理返回到页面直接使用<br>
数据流动：view -> service -> dao -> service -> view

### 合并同类项
> 继续细分粒度，然后将可复用模块或组件抽离到公共区域

1. 数据模型
- 数据模型根据职责分成两类：
> Domain Model 领域模型 <br>
> App State Modal 应用状态模型
```
领域模型

领域模型是业务数据，往往要持久化到数据库或localStorage中，属于可跨模块复用的公共数据，如：

    Users 用户信息
    Datasets 数据集信息
    Reports 报表信息

领域模型作为公共数据，建议统一存放在一个叫做Domain Model Layer的架构独立分层中（前端业界一般对这层的命名为ORM层，在vuex中实现）。
    
下沉到Domain Model Layer（领域模型层）有诸多利处：
跨模块数据同步问题不复存在，例如：之前Users对象在A和B两个业务模块中单独存储，A模块变更Users对象后，需将Users变更同步到B模块中，如不同步，A、B模块在界面上呈现的User信息不一致，下沉到领域模型层统一管理后，问题不复存在；
除领域模型复用外，还可复用领域模型相关的CRUD Reducer，例如：之前Users对象对应的Create Read Update Delete方法可能在A和B两个业务模块各维护一套，下沉到领域模型层统一管理后，减少了代码重复问题；
自然承担了部分跨模块通信职责，之前数据同步相关的跨模块通信代码没有了存在的必要性；
```
```
应用状态模型

应用状态模型是与视图相关的状态数据，如：

当前页面选中了列表的第n行  currentSelectedRow: someId
窗口是否处于打开状态  isModalShow: false
某种视图元素是否在拖拽中  isDragging: true

这些数据与具体的视图模块或业务功能强相关，建议存放在业务模块的Model中
```

2. 视图层组件
- 组件根据职责划分为两类：
> Container Component 容器型组件 <br>
> Presentational Component  展示型组件
```
容器型组件

容器型组件是与store直连的组件，为展示型组件或其它容器组件提供数据和行为，尽量避免在其中做一些界面渲染相关的事情。
```
```
展示型组件

展示型组件独立于应用的其它部分内容，不关心数据的加载和变更，保持职责单一，仅做视图呈现和最基本交互行为，通过props接收数据和回调函数输出结果，保证接收的数据为组件数据依赖的最小集。
一个有成百上千展示型组件的复杂系统，如果展示型组件粒度切分能很好的遵循高内聚低耦合和职责单一原则的话，可以沉淀出很多可复用的通用业务组件。
```

3. 公共服务

- 所有的HTTP请求放在一起统一管理；
- 日志服务、本地存储服务、错误监控、Mock服务等统一存放在公共服务层；

> 按照上面三点合并同类项后，业务架构图变更为：<br>
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/p_10.jpg)

### 跨模块通信
> 模块粒度逐渐细化，会带来更多的跨模块通信诉求，为避免模块间相互耦合、确保架构长期干净可维护，我们规定：

1. 不允许在一个模块内部直接调用其他模块的Dispatch方法（写操作、变更其他模块的state）
2. 不允许在一个模块内部直接读取其他模块的state方法（读操作）

- 我们建议将跨模块通信的逻辑代码放在父模块中，或者在一个叫做Mediator层中单独维护。
- 最终得到完整的业务逻辑架构图：<br>
![](https://github.com/Krryxa/WORK-LEARNING/blob/master/images/p_11.jpg)

## 参考文章地址
[https://juejin.im/post/59cb0d0b5188257e876a2d27](https://juejin.im/post/59cb0d0b5188257e876a2d27)