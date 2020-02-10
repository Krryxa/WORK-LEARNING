# eslink

- .eslintrc.js 文件中

```JavaScript
// add your custom rules here
rules: {
// 必须要分号结尾
'semi': ['error', 'always'],
// 多行的对象字面量项尾必须有逗号
'comma-dangle': ['error', 'always-multiline'],
// allow async-await
'generator-star-spacing': 'off',
// allow debugger during development
'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
}
```