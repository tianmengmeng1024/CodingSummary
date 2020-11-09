# vue html2canvas 将页面生成图片

1. 引入 `html2canvas`

- 引入方式：

```js
npm install --save html2canvas
```

2. html2canvas导入到指定的组件中

```js
import html2canvas from "html2canvas"
```

3. 指定生成图片的区域

```html
    <div ref="imageTest" style="font-size:18px;">
       <span>锄禾日当午，</span><br>
       <span>汗滴禾下土。</span><br>
       <span>谁知盘中餐，</span><br>
       <span>粒粒皆辛苦。</span>
    </div>
```

4. 生成图片

```js
    // 创建 canvas 标签
    const canvas = document.createElement("canvas")
    // 获取要生成图片的 DOM 元素
    let canvasDom = this.$refs. imageTest
    // 获取指定的宽高
    const width = parseInt(window.getComputedStyle(canvasDom).width)
    const height = parseInt(window.getComputedStyle(canvasDom).height)
    // 宽高扩大 2 倍 处理图片模糊
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true
    }
    html2canvas(canvasDom,options).then(canvas => {
    // 生成图片地址
    this.imgUrl = canvas.toDataURL("image/png");
    console.log(this.imgUrl)
    });
```
