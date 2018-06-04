
# vuex
- 数据状态的统一管理
- 在Vue中，多组件的开发给我们带来了很多的方便，但同时当项目规模变大的时候，多个组件间的数据通信和状态管理就显得难以维护。而Vuex就此应运而生。将状态管理单独拎出来，应用统一的方式进行处理，在后期维护的过程中数据的修改和维护就变得简单而清晰了。
- Vuex采用和Redux类似的单向数据流的方式来管理数据。用户界面负责触发动作（Action)进而改变对应状态（State），从而反映到视图（View）上。

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
  mutationName(state) {
    //在这里改变state中的数据
  }
}
```
- 在组件中触发：
```javascript
methods: {
    handleClick() {
      this.$store.commit('mutationName')
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
  actionName({ commit }) {
    //dosomething
    commit('mutationName')
  }
}
```
- 在组件中触发：
```javascript
methods: {
    handleClick() {
      this.$store.dispatch(actionName)
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
//全部导出
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
    [Types.SETUSERNAME](state,username){ //state是自动放入的，默认指的是当前的state
        state.username = username;
    },
};
export default mutations;
```