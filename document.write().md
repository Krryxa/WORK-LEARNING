## document.write()

1. 如果在文档加载时调用document.write()，不会覆盖前面的文档

```js
<body>
  hello world!<br>
  <script>
    document.write('啦啦啦啦');
  </script>
</body>
```

页面显示

```
hello world!
啦啦啦啦
```

2. 如果在文档加载完成后调用document.write()，就会覆盖该文档

```js
<body> 
  <p>helloworld</p> 
  <a onclick='javascript:myFunction()'>hello</a>
  <script> 
    function myFunction(){ 
      document.write('覆盖整个文档'); 
    } 
  </script> 
</body> 
```
点击hello，页面显示

```
覆盖整个文档
```
