
# vuex
- 数据状态的统一管理
- 在Vue中，多组件的开发给我们带来了很多的方便，但同时当项目规模变大的时候，多个组件间的数据通信和状态管理就显得难以维护。而Vuex就此应运而生。将状态管理单独拎出来，应用统一的方式进行处理，在后期维护的过程中数据的修改和维护就变得简单而清晰了。
- Vuex采用和Redux类似的单向数据流的方式来管理数据。用户界面负责触发动作（Action)进而改变对应状态（State），从而反映到视图（View）上。

## 问题：为什么不能直接调用 mutation 方法或者直接修改 state 属性，而是必须得通过 commit 来提交 mutation 才能改变 state 的状态呢？
> 改变 Vuex 的 store 中的状态的唯一方法是 commit mutation。<br>
数据响应式是vue的核心概念，在 vue 上衍生出的 vuex 自然也遵循了这个概念，所以直接调用 mutation 方法和直接改变 store.state 都是一样的，vuex 跟踪不到数据的变化，无法做到响应式。<br>
所以只能通过 commit mutation 来改变 state 的状态，将所有 state 的变化封装在 mutation，统一的页面状态管理以及操作处理，这样在阅读代码的时候也能更容易地解读应用内部的状态改变，可以让复杂的组件交互变得简单清晰，同时可在调试模式下进行时光机般的倒退前进操作，查看数据改变过程，使 code debug 更加方便。

- 使用
1. State
2. store
3. Mutations
4. Actions
5. Getters
6. Plugins

## State
- 负责存储整个应用的状态数据，在main.js注入store对象（import store from './store';），后期就可以使用this.$store.state.xxx直接获取状态
## store
- 可以理解为一个容器，包含着应用中的state等。实例化生成store的过程是：
```javascript
const mutations = {...};
const actions = {...};
const state = {...};

Vuex.Store({
  state,
  actions,
  mutations
});
```
## Mutations
- 数据状态的变化，利用它可以更改状态，本质就是用来处理数据的函数，其接收唯一参数值state。store.commit(mutationName)是用来触发一个mutation的方法

- 定义mutations
```javascript
const mutations = {
  mutationName(state, newVal) {
    //在这里改变state中的数据
    state.newVal = newVal;
  }
}
```
- 在组件中触发：(有命名空间的modules就加上命名空间)
```javascript
methods: {
    handleClick() {
      this.$store.commit('mutationName', newVal)
    }
}
```
- 可以使用辅助函数mapMutations直接将触发函数映射到methods上，这样就能在元素事件绑定上直接使用了
```javascript
import {mapMutations} from 'vuex'

//组件
export default {
  methods: mapMutations([
    'mutationName'
  ])
}
```

## Actions
- 也可以用于改变状态，不过是通过触发mutation实现的，重要的是可以包含异步操作。如果选择直接触发的话，使用this.$store.dispatch(actionName)方法

- 定义Actions
```javascript
const actions = {
  actionName({ commit }, newVal) {
    //dosomething
    commit('mutationName', newVal)
  }
}
```
- 在组件中触发：
```javascript
methods: {
  handleClick() {
    this.$store.dispatch('actionName', newVal);
  }
}
```
- 其辅助函数是mapActions，与mapMutations类似，也是绑定在组件的methods上的。
```javascript
import {mapActions} from 'vuex'

//组件
export default {
  methods: mapActions([
    'actionName',
  ])
}
```

## Getters
有些状态需要做二次处理，就可以使用getters。通过this.$store.getters.valueName对派生出来的状态进行访问。或者直接使用辅助函数mapGetters将其映射到本地计算属性中去
```javascript
//计算属性
const getters = {
	val: state => state.count % 2 ? '奇数':'偶数',
};
```
- 可在html中{{$store.getters.val}}直接使用
- 也可映射到本地计算属性
```javascript
import {mapGetters} from 'vuex'

//组件
export default {
  computed: mapGetters([
    'val'
  ])
}
```
## Plugins
- 插件就是一个钩子函数，在初始化store的时候引入即可。比较常用的是内置的logger插件，用于作为调试使用
```javascript
import logger from 'vuex/dist/logger'
const store = Vuex.Store({
  //配置其他的
  plugins:[logger()] //导入日志插件
})
```

## 仔细看看vuex要配置的内容可能挺多，但是一般开发中把一些配置单独放到一个文件中，都放到store文件夹中，便于管理和维护
- 项目划分得更细，vuex中越来越庞大的数据，就应该考虑 modules 和命名空间的问题
- 具体可看官方文档：[链接地址](https://vuex.vuejs.org/zh/guide/modules.html)
1. index.js --> vuex的主要配置文件
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger'; //logger是一个日志插件

Vue.use(Vuex);
//这里定义的属性都是全局属性，管理全局的数据状态
//状态，存放数据
const state = {username:false};
//计算属性
//返回已登录的用户名
const getters = {
	val:state => state.username,
};

import mutations from './mutations.js'

// 容器是唯一的
export default new Vuex.Store({
    state,
    mutations,
    plugins:[logger()], //导入日志插件
    strict:true,  //只能通过mutation(管理员)来更改状态，mutation不支持异步
});
```
2. mutations-type.js --> mutations的name也要分开管理
```javascript
//设置用户名的mutations name
export const SETUSERNAME = 'SETUSERNAME';
```
3. mutations.js --> mutations方法
```javascript
//全部导入
import * as Types from './mutations-type.js';
/**
 * 这种取值方式[]
 * 例如：
 * let a = 'b';
 * let b = {a:1};
 * 这样子是会把a当做key值，取出来直接就是a:1
 * 想要在b中引用a的值，就要用[]
 * let c = {[a]:1}
 * 这样取出c来才是b:1
 */
const mutations = {
    [Types.SETUSERNAME](state, username){ //state是自动放入的，默认指的是当前的state
        state.username = username;
    },
};
export default mutations;
```

## Module
- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

- 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
- 每个模块也可以定义 namespaced: true

## 页面监听vuex中state的变化：
- 将vuex中的某个state作为计算属性，在watch中监听即可
``` javascript
watch: {
  order (newVal, oldVal) {
    console.log(newVal, oldVal);
  },
},
computed: {
  order () {
    return this.$store.state.order;
  },
},
```