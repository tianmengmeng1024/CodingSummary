1. 汇率转换（不用跨域）
[https://exchangeratesapi.io/](https://exchangeratesapi.io/)
例如：
> get方式请求接口 美元兑换人民币
`https://api.exchangeratesapi.io/latest?base=USD&symbols=CNY`
返回值：
```json
{
    "rates": {
        "CNY": 7.143091207
    },
    "base": "USD",
    "date": "2019-10-08"
}
```
即：1美元 = 7.143091207 元 人民币

2. 关于怎么让div宽度自适应文字内容？
```html
<div class="divbotuser" >
    <h2 style="text-align: center;width:fit-content;width:-webkit-fit-content;width:-moz-fit-content;" >
        我有一个小秘密，就不告诉你~
    </h2>
</div>
```
直接用css3的fit-content：
```css
width:fit-content;
width:-webkit-fit-content;
width:-moz-fit-content;
```
> 参考：
> [https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/](https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/)
3. jQuery分页插件 [http://www.jq22.com/jquery-info21445](http://www.jq22.com/jquery-info21445)

4. 口红色彩可视化 [https://www.f2td.com/projects/Lipstick/](https://www.f2td.com/projects/Lipstick/)

5. javascript中的require、import与export [https://www.jb51.net/article/124442.htm](https://www.jb51.net/article/124442.htm)

6. 代码高亮
highlightjs [https://highlightjs.org/](https://highlightjs.org/)
使用 highlight.js 高亮代码[https://segmentfault.com/a/1190000005840034](https://segmentfault.com/a/1190000005840034)
代码高亮美化插件——SyntaxHighlighter [https://www.cnblogs.com/yuanbo88/p/6065554.html](https://www.cnblogs.com/yuanbo88/p/6065554.html)

7. ionic图标
icon(图标) [https://www.runoob.com/ionic/ionic-icon.html](https://www.runoob.com/ionic/ionic-icon.html)
icomoon [https://icomoon.io/#preview-free](https://icomoon.io/#preview-free)
icomoon生成字体图标的方法并应用 [https://www.cnblogs.com/Fooo/p/9297616.html](https://www.cnblogs.com/Fooo/p/9297616.html)
阿里巴巴矢量图标库 [https://www.iconfont.cn/](https://www.iconfont.cn/)

8. 轻量级的的视差引擎Parallax.js [http://matthew.wagerfield.com/parallax/](http://matthew.wagerfield.com/parallax/)