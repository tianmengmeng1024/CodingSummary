# math.js  使用解决 js  精度计算问题

> 平常写后台都知道目前很多编程语言，直接计算会不精确，同样的使用JS运算也一样，是因为在计算机语言计算时会把十进制转为二进制，再计算。但是由于一些小数在换成二进制的时候出现了无限循环，又由于位数有限，就会截取一部分，导致十进制数不精确。
> 但是各大编程语言也都封装了自己的精确计算库，JS选择使用math.js
### 安装方式
1. 包管理器安装math.js(官网：[https://mathjs.org/](https://mathjs.org/))
```js
npm install mathjs
```
或者：[https://mathjs.org/download.html#download](https://mathjs.org/download.html#download)

2. cdn
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/4.0.1/math.min.js"></script>
```

### 示例
```js
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
 
// functions and constants
round(e, 3)                    // 2.718
atan2(3, -3) / pi              // 0.75
log(10000, 10)                 // 4
sqrt(-4)                       // 2i
pow([[-1, 2], [3, 1]], 2)      // [[7, 0], [0, 7]]
derivative('x^2 + x', 'x')     // 2 * x + 1
 
// expressions
evaluate('12 / (2.3 + 0.7)')   // 4
evaluate('12.7 cm to inch')    // 5 inch
evaluate('sin(45 deg) ^ 2')    // 0.5
evaluate('9 / 3 + 2i')         // 3 + 2i
evaluate('det([-1, 2; 3, 1])') // -7
 
// chaining
chain(3)
    .add(4)
    .multiply(2)
    .done()  // 14
```

```js
0.1＋0.2
math.format(math.chain(math.bignumber(0.1)).add(math.bignumber(0.2)).done());
 
0.2-0.1
math.format(math.chain(math.bignumber(0.2)).subtract(math.bignumber(0.1)).done());
 
0.1*0.2
math.format(math.chain(math.bignumber(0.1)).multiply(math.bignumber(0.2)).done());
 
0.1/0.2
math.format(math.chain(math.bignumber(0.1)).divide(math.bignumber(0.2)).done());
```

### 封装使用

```js
/**
 * math.js解决精度问题
 * @param {*} type   加减乘除种类
 * @param {*} param1 参数数据1
 * @param {*} param2 参数数据2
 * @param {*} rate 精度
 *
 * type:
 * math.add( ) 加
 * math.subtract( )减
 * math.multiply( )乘
 * math.divide( ) 除
*/
import * as math from 'mathjs';
const mathjsConfig = (type, param1, param2, rate) => {
  let result = 0;
  if (param1 != 0 && param2 != 0) {
    result = Number(
      math.format(
        math[type](
          math.bignumber(Number(param1)),
          math.bignumber(Number(param2))
        )
      )
    ).toFixed(rate || 0);
  }
  return result;
}

// 调用：
mathjsConfig('add', 0.1, 0.2, 0);       // 0.1 + 0.2 = 0.3
mathjsConfig('subtract', 0.1, 0.2, 1);  // 0.1 - 0.2 = -0.1
mathjsConfig('multiply', 0.1, 0.2, 2);  // 0.1 * 0.2 = 0.02
mathjsConfig('divide', 0.1, 0.2, 0);    // 0.1 / 0.2 = 0.5
```