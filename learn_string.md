# 字符串

## 字符串属性
```
constructor	返回创建字符串属性的函数
length	    返回字符串的长度
prototype   允许您向对象添加属性和方法
```

## 字符串方法
- 不改变原字符串：
```javascript
str.charAt(index) // 返回指定位置的字符
str.charCodeAt(index) // 返回指定位置的字符的 Unicode 编码
str.concat(string1, string2, ..., stringX) // 链接两个或多个字符串
// 以下两个方法第二个参数都可选，若指定start，则从该位置开始向后或向前检索
str.indexOf(value, start) // 返回某个指定的字符串值在字符串中首次出现的位置（区分大小写）
str.lastIndexOf(value, start) // 返回一个指定的字符串值最后出现的位置
str.match(regexp) // 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
str.replace(searchvalue, newvalue) // 在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
str.search(searchvalue) // 检索指定的子字符串，或检索与正则表达式相匹配的子字符串，返回匹配到字符串的起始下标
str.slice(start, end) // 提取字符串的某个部分，并返回被提取的部分（新字符串）end 可选，下面有详解
str.substring(from, to) // 提取字符串中介于两个指定下标之间的字符，不包括下标 to（若未指定第二个参数，则会一直提取到字符串末尾）
str.substr(start, length) // 在字符串中提取从下标开始的指定数目的字符，可代替 substring() 和 slice() 来使用，下面有详解
str.split(separator, limit) // 把一个字符串分割成字符串数组 (limit：可选，指定返回的数组的最大长度，返回的数组不会大于这个长度)
str.toLowerCase() // 把字符串转换为小写
str.toUpperCase() // 把字符串转换为大写
str.includes() // 判断字符串是否包含某个子串
str.trim() // 去除字符串两边的空白
str.valueOf() // 返回 String 对象的原始值
str.repeat(n) // 返回 str 重复 n 次的新字符串
```

- 创建字符串：
```javascript
String.fromCharCode(n1, n2, ..., nX) // 可接受一个或多个指定的 Unicode 值，然后返回一个字符串
```

- 删除指定子串
```javascript
// 可以使用 replace 来删除
```

## 讲一下 slice 方法 （面试）
- str.slice(start, end)
```javascript
// 两个参数
// 使用 start（包含此下标） 和 end（不包含此下标） 参数来指定字符串提取的部分
start   必须，要提取字符串片断的起始下标。第一个字符下标为 0，如果该参数是负数，则从字符串尾部开始算起的位置
        （-1：倒数第一个字符，-2：倒数第二个字符）
end     可选，紧接着要截取的片段结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。
        如果该参数是负数，则从字符串尾部开始算起的位置（-1：倒数第一个字符，-2：倒数第二个字符）

// 提取所有字符串 参数为0
let str = 'hello world!';
let n = str.slice(0); // 全部打印原字符串

// 从字符串的起始下标 3 开始提取字符串片段
let str = 'Hello world!';
let n = str.slice(3); // 打印：lo world!

// 从字符串的起始下标 3 提取到下标为 8（不包括 8）的字符串片段
let str = 'Hello world!';
let n = str.slice(3,8); // 打印：lo wo

// 只提取第1个字符
let str = 'Hello world!';
let n = str.slice(0,1); // 打印： H

// 提取最后一个字符
let str = 'Hello world!';
let n = str.slice(-1); // 打印：!

// 提取最后三个字符
let str = 'Hello world!';
let n = str.slice(-3); // 打印：ld!
```

## 讲一下 substr 方法 （面试）
- str.substr(start, length)
```javascript
// 两个参数
// 使用 start（包含此下标） 和 length（提取的字符数） 参数来指定字符串提取的部分
start   必须，要提取字符串片断的起始下标。第一个字符下标为 0，如果该参数是负数，则从字符串尾部开始算起的位置
        （-1：倒数第一个字符，-2：倒数第二个字符）
length  可选，子串中的字符数，必须是数值。如果省略了该参数，那么返回的是从 start（第一个参数） 位置到结尾的字串

// 提取所有字符串 参数为0
let str = 'hello world!';
let n = str.substr(0); // 全部打印原字符串

// 从字符串的起始下标 3 开始提取字符串片段
let str = 'Hello world!';
let n = str.substr(3); // 打印：lo world!

// 从字符串的起始下标 3 开始提取 5 个字符
let str = 'Hello world!';
let n = str.substr(3,5); // 打印：lo wo

// 只提取第1个字符
let str = 'Hello world!';
let n = str.substr(0,1); // 打印： H

// 提取最后一个字符
let str = 'Hello world!';
let n = str.substr(-1); // 打印：!

// 提取最后三个字符
let str = 'Hello world!';
let n = str.substr(-3); // 打印：ld!
```

## java 中：replace 与 replaceAll 的区别 （JavaScript 没有 replaceAll）
```
1. 相同点：都是全部替换，即把源字符串中的某一字符或字符串全部换成指定的字符或字符串；
2. 不同点：replaceAll支持正则表达式，因此会对参数进行解析（两个参数均是）
   如通过 replaceAll("\\d", "*") 把一个字符串所有的数字字符都换成星号；
   而 replace 则不会，replace("\\d","*") 就是替换"\\d"的字符串，而不会解析为正则。
3. 还有一个不同点：“\”在java中是一个转义字符，所以需要用两个代表一个。
   例如 System.out.println( "\\" ) ;只打印出一个"\"。但是“\”也是正则表达式中的转义字符，需要用两个代表一个。
   所以：\\\\被java转换成\\，\\又被正则表达式转换成\
   因此用 replaceAll 替换“\”为"\\"，就要用 replaceAll("\\\\","\\\\\\\\")，而 replace 则replace("\\","\\\\")
```


## ASCII、Unicode 和 UTF-8 编码的区别
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/p_12.jpg)

## JS判断字符串长度（英文占1个字符，中文汉字占2个字符）
```javascript
// 方法一：
// Unicode 编码
String.prototype.gblen = () => {    
  let len = 0;    
  for (let i=0; i<this.length; i++) {    
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {    
      len += 2;    
    } else {    
      len++;    
    }    
  }    
  return len;    
}

// 方法二：
// Unicode 编码
let strlen = str => {
  let len = 0;  
  for (let i=0; i<str.length; i++) {   
    let c = str.charCodeAt(i);   
    // 单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {   
      len++;   
    }   
    else {   
      len += 2;   
    }   
  }   
  return len;  
}  

// 方法三：
// Unicode 编码
let jmz = {};  
jmz.GetLength = str => {
  let realLength = 0, len = str.length, charCode = -1;  
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);  
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }  
  return realLength;  
};  

// 方法四：
// Unicode 编码
let l = str.length;   
let blen = 0;   
for (i = 0; i < l; i++) {   
  if ((str.charCodeAt(i) & 0xff00) != 0) {   
    blen++;   
  }   
  blen++;   
}

// 方法五：
// 把双字节的替换成两个单字节的然后再获得长度
getBLen = str => {  
  if (str != null) {
    if (typeof str != "string") {  
      str += "";  
    }  
    return str.replace(/[^\x00-\xff]/g,"01").length;  
  } else {
    // TODO
    return 0;
  } 
}  
```

## 问题
1. 去掉字符串中所有空格（正则表达式）
> 去掉字符串首尾空格用 trim()
```javascript
handleLinkBlur() {
  this.link = this.link.replace(/\s*/g, '');
},
```
