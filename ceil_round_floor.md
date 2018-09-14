## 关于取整

- 向上取整 ceil() 不管负数正数，就是变大
```js
Math.ceil(-11.46) == -11
Math.ceil(11.56) == 12
```
- 向下取整 floor() 不管负数正数，就是变小
```js
Math.floor(-11.5) == -12
Math.floor(12.5) == 12
```
- 四舍五入 round() 四舍五入，负数五入更小，四舍变大 | 正数五入变大，四舍变小
```js
Math.round(11.46) == 11
Math.round(-11.46) == -11
Math.round(-11.68) == -12
```
- 取绝对值 abs()
