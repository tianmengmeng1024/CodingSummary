### canvas单行文本居中

> canvas有个测量文本长度的api(measureText)

> context.fillText(str, (canvas.width - context.measureText(str).width) / 2, 0)

例如：
```js
var ctx = uni.createCanvasContext('sharePoster', this);
//文字居中
ctx.fillText('单行文本居中单行文本居中', (375 - ctx.measureText('单行文本居中单行文本居中').width)/2, 120);
```
> 多行文本参考：[canvas文字自动换行](./mini-canvas-poster相关)