# 数组去重

## 单数组去重

1. filter + indexOf() 推荐
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique (arr) {
  return arr.filter((item, index, array) =>  array.indexOf(item) === index);
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

2. filter + Map()
Map() 对象的 has 方法是：如果映射包含指定元素，则返回 true，检测的是key值
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  const seen = new Map();
  return arr.filter((item) => !seen.has(item) && seen.set(item, 1));
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

3. forEach + indexOf() + 新数组
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  let newArr = [];
  arr.forEach((item, index, array) => {
    if(array.indexOf(item) === index) {
      newArr.push(item);
    }
  });
  return newArr;
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

4. Set() + Array.from 推荐
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  return Array.from(new Set(arr));
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

5. Set() + [...()]
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  return [...(new Set(arr))];
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

6. reduce + includes()
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

7. for循环(一次) + sort()排序 + 新数组
自动排好序
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique(arr){
  arr.sort();
  let newArr = [arr[0]];
  for(let i = 1; i < arr.length; i++){
    if(arr[i] !== newArr[newArr.length - 1]){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique(arr)); // [0, 1, 2, 3, "a", "b", "d", "e"]
```

8. 两次for循环（不推荐）
```js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 2, 2, 3];
function unique (arr) {
  let newArr = [arr[0]];
  for(let i = 1; i < arr.length; i++){
    let flag = false;
    for(var j = 0; j < newArr.length; j++){
      if(arr[i] == newArr[j]){
        flag = true;
        break;
      }
    }
    if(!flag){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique(arr)); // [1, "a", "b", "d", "e", 0, 2, 3]
```

## js 实现两个数组（一个数组包含于另一个数组中）去重的问题
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