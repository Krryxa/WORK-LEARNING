# for循环

```javascript
let arr = [1,2,3,4,5];
arr.b = '100'; //私有属性

/* 循环 */
for (let i = 0; i < arr.length; i++) { //编程式
    console.log("for循环"+arr[i]);
}

//面试：forEach, for in, for, for of
// forEach 不支持return ，无论如何都会遍历完
arr.forEach(function(item){
    console.log("forEach循环"+item);
});


//for in 的key会变成字符串类型，包括数组的私有属性也会打印输出
for(let key in arr){
    console.log("for in循环"+key);
    console.log(typeof key);
}


//for of 支持return  并且循环的是值，只能数组 （不能遍历对象）
for(let val of arr){
    console.log("for of循环"+val);
}


let obj = {school:'haida',age:20}; //Object.keys 将对象的key作为新的数组
// 变成 ['school','age']
for(let val of Object.keys(obj)){
    console.log(obj[val]);
}


/* 过滤：可用于删除数组元素 */  
//filter 不是操作原数组，过滤后返回新数组，
//回调函数的返回结果，true：表示这一项放到新数组中
let newArr = [1,2,3,4,5].filter(function(item) {
    return item<5 && item >2; //数组元素>2且<5的元素返回true，就会放到新数组
});
console.log("新数组："+newArr);



/* 映射 用于更新数组元素 */
//map 映射 将原有的数组映射成一个新数组 [1,2,3]
//不操作原数组，返回新数组  回调函数中返回什么这一项就是什么
// 若要拼接 <li>1</li><li>2</li><li>3</li>
let arr2 = [1,2,3].map(item => {
    return `<li>${item}</li>`;
});
//join方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。这里使用''空字符分割
console.log(arr2.join('')); 

let arrJson = [{'name':'krry'},{'name':'lily'},{'name':'xiaoyue'},{'name':'krry'}];
let newArrJson = arrJson.map( val => val.name);
console.log(`newArrJson：${newArrJson}`);



/* 数组中是否包含某个元素  includes */
let arr3 = [1,2,3,4,55,555];
console.log(arr3.includes(5));



/* find：返回找到的那一项 不会改变原数组 回调函数中返回true表示找到了，
    找到后停止循环 
    找不到返回的是undefined
*/
let result = arr3.find(function(item,index){
    return item.toString().indexOf(5)>-1;
});
console.log(result);

/* some：如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        如果没有满足条件的元素，则返回false。*/
/* every：如果数组中检测到有一个元素不满足，则整个表达式返回 false ，
        且剩余的元素不会再进行检测。如果所有元素都满足条件，则返回 true。  */



//arguments 是一个对应于传递给函数的参数的类数组对象
//此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。
//例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：
// arguments[0]
// arguments[1]
// arguments[2]

/* reduce 收敛函数, 4个参数 返回的是叠加后的结果 原数组不变，回调函数返回的结果： */
//prev：数组的第一项，next是数组的第二项
//第二次prev是undefined，next是数组的第三项
let sum = [1,2,3,4,5].reduce(function(prev,next,idnex,item){
    // console.log(arguments);
    console.log(prev,next);
    return prev+next; //本次的返回值会作为下一次的prev
});
console.log(sum);

//reduce 例子
let sum2 = [{price:30,count:2},{price:30,count:3},{price:30,count:4}].reduce(function(prev,next){
    //0+60
    //60+90
    //150+120
    return prev+next.price*next.count;
},0); //默认指定第一次的prev
console.log(sum2);

//利用reduce把二维数组变成一维数组
let flat = [[1,2,3],[4,5,6],[7,8,9]].reduce(function(prev,next){
    return prev.concat(next); //拼接数组
});
console.log(flat);
```