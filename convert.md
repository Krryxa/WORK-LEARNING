# 接口转换

```javascript
// switch case 可以匹配多个值：
switch (convertedParam) {
  case 1: case 2:
  // TODO
  break;
}

// 在涉及一下隐藏或展示的元素或字段，都应该使用一个自定义的属性或计算属性来判断，从接口返回的值，放在计算属性里做处理，
// 返回 true or false 作为 html 元素或字段的判断，尽量减少在 html 的耦合


// 从接口返回数据与view层进行对接的时候，大部分数据都是需要转换，才能符合页面所需要的数据：
// 最简单的 if else 写法就不说了，
// 总结一下这种写法：reduce 和 Object.assign() 和 switch case 的写法

// 参数 originParams 是从接口返回的对象
convertParams (state, originParams) {
  let convertedInfos = {};
  // 不用转换的参数 （变量名的转换用 | 标识）
  const normalParams = [
    'name',
    'banner_type|type',
    'application_id|applicationSpaceId',
    'weight',
  ];
  const planParams = [
    'isPlan|is_plan',
    'loopPicFrameId|loop_pic_frame_id',
    'planPersonalId|plan_personal_id',
  ];
  // 从接口返回的数据直接赋值给页面所需变量的方法：
  // 数组 reduce 每个元素，定义第一次遍历的 prev 是{}，一次次叠加 用 Object.assign 合并成一个对象
  const normalValues = normalParams.reduce((prev, cur) =>
    Object.assign(prev, (() => {
      const params = cur.split('|');
      return params.length > 1 ? { [params[1]]: originPageInfos[params[0]] } : { [cur]: originPageInfos[cur] };
    })()), // 函数闭包
  {});
  
  // 从接口返回的数据经过转换再赋值给页面所需变量的方法：
  const planValues = planParams.reduce((prev, cur) =>
    Object.assign(prev, (() => {
      const params = cur.split('|');
      const convertedParam = params[0];
      const originParam = params[1];
      const originValue = originPageInfos[originParam];
      switch (convertedParam) {
        case 'isPlan': case 'loopPicFrameId':
          return { [convertedParam]: +originValue };
        case 'planPersonalId':
          return { [convertedParam]: originValue === '' ? 0 : originValue };
      }
    })()), // 函数闭包
  {});
  state.pageInfos['basic'] = Object.assign(convertedInfos, normalValues, convertedValues, planValues);
},
```