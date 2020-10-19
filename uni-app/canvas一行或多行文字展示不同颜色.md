# canvas一行或多行文字展示不同颜色

```js
export const textPrewrap = (ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum, textColor) => {
    var drawTxt = ''; // 当前绘制的内容
    var drawLine = 1; // 第几行最先绘制
    var drawIndex = 0; // 当前绘制内容的索引

    // 推断内容是不是能够一行绘制终了
    if (ctx.measureText(content).width <= lineMaxWidth) {
        if (content.indexOf('免费参加') > -1 && content.indexOf('活动') > -1) {
            for (var i = 0; i < content.length; i++) {
                if (i < 4) {
                    // 免费参加
                    ctx.setFillStyle('#FF282A');
                    ctx.fillText(content.substring(drawIndex, 4), drawX, drawY);
                } else if (i > content.length-2) {
                    //活动
                    ctx.setFillStyle('#FF282A');
                    ctx.fillText(content.substring(content.indexOf('活动'), content.length), drawX + ctx.measureText(content.substring(drawIndex, content.indexOf('活动'))).width, drawY);
                } else {
                    // 标题
                    ctx.setFillStyle(textColor);
                    ctx.fillText(content.substring(drawIndex+4, content.length-2), drawX + ctx.measureText('免费参加').width, drawY);
                }
            }
        } else {
            ctx.setFillStyle(textColor);
            ctx.fillText(content.substring(drawIndex, i), drawX, drawY);
        }
    } else {
        for (var i = 0; i < content.length; i++) {
            drawTxt += content[i];
            if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
                if (drawLine >= lineNum) {
                    ctx.fillText(content.substring(drawIndex, i) + '...', drawX, drawY);
                    break;
                } else {
                    if (content.substring(drawIndex, i + 1).indexOf('免费参加') > -1) {
                        const freeText = content.substring(drawIndex, i + 1).indexOf('免费参加');
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex + 4, i + 1), drawX + ctx.measureText('免费参加').width, drawY);
                        ctx.setFillStyle('#FF282A');
                        ctx.fillText(content.substring(drawIndex, 4), drawX, drawY);
                    } else if (content.substring(drawIndex, i + 1).indexOf('活动') > -1) {
                        const actText = content.substring(drawIndex, i + 1).indexOf('活动');
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex, drawIndex + actText), drawX, drawY);
                        ctx.setFillStyle('#FF282A');
                        ctx.fillText(content.substring(drawIndex + actText, i + 1), drawX + ctx.measureText(content.substring(drawIndex, drawIndex + actText)).width, drawY);
                    } else {
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
                    }
                    // ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
                    drawIndex = i + 1;
                    drawLine += 1;
                    drawY += lineHeight;
                    drawTxt = '';
                }
            } else {
                // 内容绘制终了，然则剩下的内容宽度不到lineMaxWidth
                if (i === content.length - 1) {
                    if (content.substring(drawIndex, i + 1).indexOf('免费参加') > -1) {
                        const freeText = content.substring(drawIndex, i + 1).indexOf('免费参加');
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex + 4, i + 1), drawX + ctx.measureText('免费参加').width, drawY);
                        ctx.setFillStyle('#FF282A');
                        ctx.fillText(content.substring(drawIndex, 4), drawX, drawY);
                    } else if (content.substring(drawIndex, i + 1).indexOf('活动') > -1) {
                        const actText = content.substring(drawIndex, i + 1).indexOf('活动');
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex, drawIndex + actText), drawX, drawY);
                        ctx.setFillStyle('#FF282A');
                        ctx.fillText(content.substring(drawIndex + actText, i + 1), drawX + ctx.measureText(content.substring(drawIndex, drawIndex + actText)).width, drawY);
                    } else {
                        ctx.setFillStyle(textColor);
                        ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
                    }
                    // ctx.fillText(content.substring(drawIndex), drawX, drawY);
                }
            }
        }
    }
}
```

## 调用
```js
// 标题 超出换行
ctx.setFillStyle('#333');
ctx.setFontSize(32);
ctx.font = 'normal bolder 36px Arial,sans-serif';
textPrewrap(ctx,`免费参加 ${this.detailData.name} 活动`, 90, 826, 44, 570, 3, '#333');
```

结果为 `免费参加`和`活动`字体呈现颜色为红色