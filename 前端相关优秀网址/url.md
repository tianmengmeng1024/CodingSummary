1. 汇率转换（不用跨域）
[https://exchangeratesapi.io/](https://exchangeratesapi.io/)
例如：
> get方式请求接口 美元兑换人民币
`https://api.exchangeratesapi.io/latest?base=USD&symbols=CNY`
返回值：
```
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
```
<div class="divbotuser" >
    <h2 style="text-align: center;width:fit-content;width:-webkit-fit-content;width:-moz-fit-content;" >
        我有一个小秘密，就不告诉你~
    </h2>
</div>
```
直接用css3的fit-content：
```
width:fit-content;
width:-webkit-fit-content;
width:-moz-fit-content;
```
> 参考：
> [https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/](https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/)