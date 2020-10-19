# canvas裁剪图片为圆形

```js
ctx.save(); // 保存当前ctx的状态
ctx.arc(xxx,xxx,xxx,xxx); // 画出圆
ctx.clip(); // 裁剪上面的圆形
ctx.drawImage(img, 0, 0, width, height); // 在刚刚裁剪的圆上画图
ctx.restore(); // 还原状态
```

<!-- 例如 -->
```js
// 用户头像
// ctx.drawImage(this.relativeHeadImgUrl, 90, 72, 100, 100); // 正常绘制
ctx.save(); // 保存当前ctx的状态
ctx.arc(90+50, 72+50, 50, 0, 2*Math.PI); // 画出圆 arc(圆心x,圆心y, 半径r, 起始角, 结束角)
ctx.clip(); // 裁剪上面的圆形
ctx.drawImage(this.relativeHeadImgUrl, 90, 72, 100, 100); // 在刚刚裁剪的圆上画图 drawImage(url, x, y, w, h)
ctx.restore(); // 还原状态
```