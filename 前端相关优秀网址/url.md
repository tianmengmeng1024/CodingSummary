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