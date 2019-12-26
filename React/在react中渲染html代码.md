## 在react中渲染html代码

有时候需要动态渲染后台传过来的html代码文本，但是react的JSX 防注入攻击使得大括号里的html代码全部变成字符串进行渲染，而不是html代码
例子：
```html
<div dangerouslySetInnerHTML={{__html: code}}></div>
```

更多方式：

```js
function createMarkup() {
  return {__html: 'First &nbsp;&nbsp;&nbsp; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()}></div>;
}
```

格式：
```js
<div dangerouslySetInnerHTML = {{__html:返回的html代码片段}} ></div>
```
原理：

1. dangerouslySetInnerHTMl 是React标签的一个属性，类似于angular的ng-bind；

2. 有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;

3. 既可以插入DOM，又可以插入字符串；