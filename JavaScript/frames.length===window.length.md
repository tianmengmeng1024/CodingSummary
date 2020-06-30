# `frames.length === window.length`

## `window.frames`,`window.length`

`window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。`window.frames[0]`表示页面中第一个框架窗口。

如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。比如`<iframe name="myIFrame">`可以用`frames['myIFrame']`或者`frames.myIFrame`来引用。

frames属性实际上是window对象的别名。

```js
frames === window // true
```
> window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。

--------

```js
window.frames.length === window.length // true
```
> 上面代码表示，window.frames.length与window.length应该是相等的。

参考：

[https://www.dazhuanlan.com/2020/04/01/5e84806a87386/](https://www.dazhuanlan.com/2020/04/01/5e84806a87386/)
[https://www.w3cschool.cn/fetch_api/fetch_api-yqoj2nsu.html](https://www.w3cschool.cn/fetch_api/fetch_api-yqoj2nsu.html)