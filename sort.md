## sort 函数

简单的说，sort() 在没有参数时，返回的结果是按升序来排列的。即字符串的Unicode码位点（code point）排序
```js
[5, 2, 4, 1, 3].sort();
// [1, 2, 3, 4, 5]

// 数字字符串也是从小到大
['5', '2', '4', '1', '3'].sort();
// ['1', '2', '3', '4', '5']
```

如果指明了参数：compare(a, b) ，（a, b 是两个要比较的元素，a 在 b 前面）那么数组会按照该函数的返回值排序
- 如果 compare(a, b) 返回值 < 0 ，a 会被排列到 b 之前，即参数a, b的顺序保存原样；
- 如果 compare(a, b) 返回值 = 0 ，a 和 b 的相对位置不变。（ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守）
- 如果 compare(a, b) 返回值 > 0 ，b 会被排列到 a 之前。即交换参数a, b的顺序

> 记：大于 0 交换顺序

## 题目
有如下数据：
```js
[
  {"name":"张三","class":2,"score":64},
  {"name":"李四","class":1,"score":80},
  {"name":"王五","class":1,"score":90},
  {"name":"赵六","class":4,"score":94}
]
```
实现：
 * 按照 class 从小到大排列
 * 如果 class 相同，则按照 score 从大到小排列
 * 如果 class 和 score 都相同，则按照原顺序排列
```js
function compare(name1, name2) {
  // 这里的参数 a, b 是比较的第一个元素 a，第二个元素 b
  return function (a, b) {
    let fir1 = a[name1];
    let sec1 = b[name1];
    if (fir1 === sec1) {
      let fir2 = a[name2];
      let sec2 = b[name2];
      if (fir2 === sec2) {
        return 0; // 表示位置不变
      } else {
        return fir2 > sec2 ? -1 : 1; // 表示从大到小排序 
      }
    } else {
      return fir1 > sec1 ? 1 : -1; // 表示从小到大排序
    }
  }
}


function sortStudents(students) {
	return students.sort(compare('class', 'score'));
}

let _students = JSON.parse(`[
  {"name":"张三","class":2,"score":64},
  {"name":"李四","class":1,"score":80},
  {"name":"王五","class":1,"score":90},
  {"name":"赵六","class":4,"score":94}]`);

let res = sortStudents(_students);
console.log(res);
```