## 弹框纵向滚动真机失效

```css
    .div {
		display: -webkit-box;
		max-height: 390px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
```
#### 以上设置都未生效。以下`<scroll-view>`组件可解决移动端局部滚动问题

***<scroll-view>***

可滚动视图区域。用于区域滚动。
需注意在webview渲染的页面中，区域滚动的性能不及页面滚动。

> 使用竖向滚动时，需要给 `<scroll-view>` 一个固定高度，通过 css 设置 height。

<!-- 示例代码 -->

```html
<scroll-view style="height: 200px;" scroll-y="true">
    <div>11111</div>
    <div>2222</div>
	<div>....</div>
</scroll-view>
```

链接：[scroll-view](https://uniapp.dcloud.io/component/scroll-view?id=scroll-view)