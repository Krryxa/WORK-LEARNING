# for 循环 和 Array 数组对象方法


## for for-in for-of forEach效率比较

- 四种循环，遍历长度为 1000000 的数组叠加，得到的时间差：

        for 3
        for-in 250
        for-of 7
        forEach 44

- 效率速度：for > for-of > forEach > for-in

- for循环本身比较稳定，是for循环的i是Number类型，开销较小

- for-of 循环的是val，且只能循环数组，不能循环对象

- forEach 不支持 return 和 break，一定会把所有数据遍历完毕

- for-in 需要穷举对象的所有属性，包括自定义的添加的属性也会遍历，for...in的key是String类型，有转换过程，开销比较大

```javascript
// 面试： for, forEach, for-in, for-of（es6）

let arr = [1,2,3,4,5];
arr.b = '100'; // 自定义私有属性

// for循环 速度最快
for (let i = 0; len = arr.length, i < len; i++) { // 编程式
  console.log("for循环"+arr[i]);
}


// forEach 不支持return和break，无论如何都会遍历完，
arr.forEach(function(item){
  console.log("forEach循环"+item);
});


// for-in 遍历的是 key 值，且 key 会变成字符串类型，包括数组的私有属性也会打印输出
for(let key in arr){
  console.log("for in循环"+key);
  console.log(typeof key);
}


// for-of 遍历的是值 val，只能遍历数组/字符串 （不能遍历对象）
for(let val of arr){
  console.log("for of循环"+val);
}
// for of 可以遍历字符串，并将字符串分解为单独的字符串
let a='lang';
for (item of a){
  console.log(item); // l a n g
} 

// Object.keys 将对象的 key 作为新的数组，这样 for-of 循环的就是原数组的 key 值
let obj = {school:'haida',age:20};
// 变成 ['school','age']
for(let val of Object.keys(obj)){
  console.log(obj[val]);
}
```

## JavaScript Array 数组对象方法

- 不改变原数组：concat、every、filter、find、includes、indexOf、isArray、join、lastIndexOf、map、reduce、slice、some、toString、valueOf

- 改变原数组：pop、push、reverse、shift、sort、splice、unshift

### 重点难点解析
- filter、map、find、includes、some、every、reduce、slice
- 数组变异：pop、shift、splice、unshift
```javascript
// filter 过滤：可用于删除数组元素
// 不改变原数组，过滤后返回新数组
// 回调函数的返回值：若 true：表示这一项放到新数组中
let newArr = [1,2,3,4,5].filter(item => item>2 && item <5);
//数组元素>2且<5的元素返回true，就会放到新数组
console.log("新数组："+newArr);



// map 映射，将原有的数组映射成一个新数组 [1,2,3]，用于更新数组元素
// 不改变原数组，返回新数组
// 回调函数中返回什么这一项就是什么
// 若要拼接 <li>1</li><li>2</li><li>3</li>
let arr2 = [1,2,3].map(item => `<li>${item}</li>`);
// join方法用于把数组中的所有元素放入一个字符串。每个元素通过指定的分隔符进行分隔。
// 这里使用''空字符分割
console.log(arr2.join('')); 

// 若只要 name 的 val 值，不要 key 值
let arrJson = [{'name':'krry'},{'name':'lily'},{'name':'xiaoyue'},{'name':'krry'}];
let newArrJson = arrJson.map( val => val.name);
console.log(`newArrJson：${newArrJson}`);



// find：返回找到的那一项
// 不改变原数组
// 找到后停止循环，找不到返回的是 undefined
let arrFind = [1,2,3,4,55,555];
let result = arrFind.find((item,index) => {
    return item.toString().indexOf(5) > -1;// 找数组元素中有5的第一项
});
console.log(result); // 输出 55



// includes 数组中是否包含某个元素，返回 true or false
let arr3 = [1,2,3,4,55,555];
console.log(arr3.includes(5));



// some：如果有一个元素满足条件，则表达式返回 true, 剩余的元素不会再执行检测。
// 如果没有满足条件的元素，则返回 false
let arrSF = [1,2,3,4,555];
let result = arrSF.some((item,index)=>{
    return item > 3;
});
console.log(result); // 输出true



// every：如果有一个元素不满足，则表达式返回 false，剩余的元素不会再进行检测。
// 如果所有元素都满足条件，则返回 true
let arrSE = [1,2,3,4,555];
let result = arrSE.every((item,index)=>{
    return item > 3;
});
console.log(result); // 输出 false



// reduce 收敛函数, 4个参数 返回的是叠加后的结果 
// 不改变原数组
// 回调函数返回的结果： 
// prev：数组的第一项，next是数组的第二项（下一项）
// 当前 return 的值是下一次的 prev
let sum = [1,2,3,4,5].reduce((prev,next,index,item)=>{
    // console.log(arguments);
    // 1 2
    // 3 3
    // 6 4
    // 10 5
    console.log(prev,next);
    return prev+next; // 返回值会作为下一次的 prev
});
console.log(sum);

// reduce 可以默认指定第一轮的 prev，那么 next 将会是数组第一项（下一项）
// 例子：算出总金额：
let sum2 = [{price:30,count:2},{price:30,count:3},{price:30,count:4}];
let allSum = sum2.reduce((prev,next)=>{
    // 0+60
    // 60+90
    // 150+120
    console.log(prev,next);
    return prev+next.price*next.count;
},0); // 默认指定第一次的 prev 为 0
console.log(allSum);

// 利用reduce把二维数组变成一维数组
let flat = [[1,2,3],[4,5,6],[7,8,9]].reduce((prev,next)=>{
    return prev.concat(next); // 拼接数组
});
console.log(flat);



// slice 从已有的数组中返回选定的元素
// 不改变原数组
array.slice(start, end);
// 使用 start（包含此下标） 和 end（不包含此下标） 参数来指定数组提取的部分
start   必须，要提取数组元素的起始下标。如果该参数是负数，则从数组尾部开始算起的位置
        （-1：倒数第一个元素，-2：倒数第二个元素）
end     可选，规定从何处结束选取。该参数是数组片断结束处的数组下标（不包含此下标）。
        如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。
        如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素
let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits.slice(0)); // 输出数组全部元素
console.log(fruits.slice(1, 3)); // 输出 Orange, Lemon
console.log(fruits.slice(-2)); // 输出 Apple, Mango


// pop 用于删除数组的最后一个元素并返回删除的元素
// 改变原数组
let fur = ["Banana", "Orange", "Apple", "Mango"];
fur.pop();
console.log(fur); // 输出 Banana,Orange,Apple



// shift 用于把数组的第一个元素从其中删除，并返回第一个元素的值
// 改变原数组
let fts = ["Banana", "Orange", "Apple", "Mango"];
fts.shift();
console.log(fts);// 输出 Orange,Apple,Mango


// unshift 向数组的开头添加一个或更多元素，并返回新的长度
// 改变原数组
let fse = ["Banana", "Orange", "Apple", "Mango"];
fse.unshift("Lemon","Pineapple");
console.log(fse); // 输出 Lemon,Pineapple,Banana,Orange,Apple,Mango



// splice 用于插入、删除或替换数组的元素
// 改变原数组
let myArrs = ["Banana", "Orange", "Apple", "Mango"];
myArrs.splice(2,1); // 从数组下标为 2 开始删除，删除 1 个元素
console.log(myArrs); // 输出 Banana,Orange,Mango
// splice(index, howmany, item1, item2, ..., itemX);
// index: 必须，表示添加 / 删除元素的下标，（包括此下标）
// howmany：必须，表示要删除的元素数量，如果设置为0，则不删除
// 从第三个参数开始，代表向数组添加的新元素
// 在有第三个参数的时候，如果设置 howmany 大于0，则就可以又删除该下标元素，又可以新增元素在这个下标，也就是替换
```

## 额外谈一下arguments
```JavaScript
// arguments 是一个对应于传递给函数的参数的类数组对象
// 此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。
// 例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：
// arguments[0]
// arguments[1]
// arguments[2]
let xx = sumAll(1, 123, 500, 115, 44, 88);
 
function sumAll() {
    let i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    console.log(sum); // 返回总和 871
}
```



## for 效率测试代码
```javascript
let arr = new Array();  
for(let i = 0, len = 1000000;i < len; i++){  
    arr.push(i);  
}  
  
function foradd(my_arr){  
    let sum = 0;  
    for(let i = 0; i < my_arr.length; i++){  
        sum += my_arr[i];  
    }  
}  
  
function forinadd(my_arr){  
    let sum = 0;  
    for(let key in my_arr){  
        sum += my_arr[key];  
    }  
}  
  
function forofadd(my_arr){  
    let sum = 0;  
    for(let val of my_arr){  
        sum += val;  
    }  
}

function forEachadd(my_arr){  
    let sum = 0;  
    my_arr.forEach(val => {
       sum += val;
    });
}  
  
function timeTest(func,my_arr,str) {  
    var start_time = null;  
    var end_time = null;  
    start_time = new Date().getTime();  
    func(my_arr);  
    end_time = new Date().getTime();  
    console.log(str,(end_time - start_time).toString());  
}  
  
timeTest(foradd,arr,'for');  
timeTest(forinadd,arr,'for-in');  
timeTest(forofadd,arr,'for-of'); 
timeTest(forEachadd,arr,'forEach');   
```