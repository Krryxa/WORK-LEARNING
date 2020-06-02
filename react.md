## React 生命周期
React 16之后有三个生命周期被废弃(但并未删除)
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
 
官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们。
 
目前React 16.8 +的生命周期分为三个阶段，分别是挂载阶段、更新阶段、卸载阶段
 
- 挂载阶段:

1. constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
2. getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
3. render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
4. componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅
 
- 更新阶段:

1. getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
2. shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
3. render: 更新阶段也会触发此生命周期
4. getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
5. componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
 
- 卸载阶段:

1. componentWillUnmount: 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除定时器，取消网络请求或清除在 componentDidMount() 中创建的订阅，清理无效的DOM元素等垃圾清理工作。
 

- 异常处理：

1. static getDerivedStateFromError: 此生命周期会在渲染阶段后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

2. componentDidCatch：此生命周期在后代组件抛出错误后被调用。 它接收两个参数：1. error —— 抛出的错误。2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。componentDidCatch 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况。





## componentWillReceiveProps(nextProps) 生命周期使用详解

该方法当 props 发生变化时执行，初始化 render 时不执行。在这个回调函数里面，你可以根据 props 属性的变化，通过调用 this.setState() 来更新你的组件状态，旧的属性还是可以通过 this.props 来获取，这里调用更新状态是安全的，并不会触发额外的 render 调用

**使用好处**：在这个生命周期中，可以在子组件的 render 函数执行前获取新的 props，从而更新子组件自己的 state。 可以将数据请求放在这里进行执行，需要传的参数则从 componentWillReceiveProps(nextProps) 中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担

componentWillReceiveProps 在初始化 render 的时候不会执行，它会在Component接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染

举个例子：
比如 tab 标签，每次点击一个 tab，传递一个 tabCode 值到子组件，子组件可以通过 componentWillReceiveProps(nextProps) 获取得到新的值，然后可以在子组件请求数据

```js
componentWillReceiveProps(nextProps) {
  // 旧属性仍然可以使用 this.props.xxx 来获取，新变化的数据通过 nextProps.xxx 获取
  if(this.props.activeKey !== nextProps.activeKey){
    // TODO
    this.setState({
      startDate: nextProps.startDate,
      endDate: nextProps.endDate,
      activeKey: nextProps.activeKey
    },() => {
      this.getData()
    })
  }
}
```