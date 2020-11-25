# vue如何动态绑定多个class

## 给一个dom绑定多个class，而且是动态绑定，代码如下

```html
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">
  // classA 是固定不变的，classB与classC 是根据条件来判断是否加入
```

## 对象写法如下

```html
  <a :class="{ 'active': hash==='finish','nav-link':true}" href="#/finish">已完成</a>
```

## style 动态绑定

```html
<div id="container" :style="{ width: '100%', height: showStatus ? '100px' : '0px'}"></div>
```
