# 数组去重

- js 实现两个数组（一个数组包含于另一个数组中）去重的问题
> a = [1,2,3,4,5,6,7,8];  b = [2,5,8];<br>
> 需要在数组 a 中过滤掉 b 中出现的元素
- 该问题在实际项目中经常出现
- 解决方案有很多，可以是两个 for 循环，或者一个 for 和 一个 filter，一个 filter 和 一个 every，接下来介绍这几种方法：
```javascript
let originArr = [1,2,3,4,5,6,7,8,9];
let filterArr = [2,4,6,7];

// 推荐，filter + every
let result = originArr.filter( item1 => {
  return filterArr.every( item2 => item2 !== item1);
}); // 1 3 5 8 9

// for + filter
let result = originArr;
for (let val of filterArr) {
  result = result.filter(item => item !== val);
} // 1 3 5 8 9
```

- 有关数组的操作方法见：[https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_for%20array.md](https://github.com/Krryxa/WORK-LEARNING/blob/master/learn_for%20array.md)