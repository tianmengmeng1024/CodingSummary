# 火狐浏览器padding-bottom塌陷问题

例如：

```html
<div id="container">
    <div id="innerBox"></div>
</div>
```
```css
#container {
    padding: 20px; // 失效
    overflow-x: hidden;
    overflow-y: auto;
    width: 300px;
    height: 300px;
    background: red;
}

#innerBox{
    height: 400px;
    background: #000;
}
```

此时设置了 `overflow-y: auto;` 之后，`padding-bottom` 在火狐/IE浏览器出现塌陷问题。

解决办法：

```css
#container {
  padding: 20px;
  padding-bottom: 0;
  overflow: auto;
}

#container::after {
  content: '';
  display: block;
  height: 20px;
  overflow: hidden; // 或 visibility: hidden;
}
```

参考：[https://stackoverflow.com/questions/20624938/padding-bottom-is-ignored-in-firefox-and-ie-on-overflowing-elements-with-no-cont](https://stackoverflow.com/questions/20624938/padding-bottom-is-ignored-in-firefox-and-ie-on-overflowing-elements-with-no-cont)