## moment.js的方法总结
总结一个非常实用的日期工具类moment.js，日期获取，格式化等。

#### 引入moment
```js
//require 方式
var moment=require('moment');

//import 方式
import moment from 'moment';
```

#### 设定moment区域为中国

```js
//require 方式
require('moment/locale/zh-cn')
moment.locale('zh-cn');
//import 方式
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
```

#### 格式化时间类型

1. 取当天时间，以YYYY年MM月DD日形式显示

```js
var now=moment().format("YYYY年MM月DD日");
```

2. 任意时间戳格式化，以YYYY-MM-DD HH:mm:ss形式显示

```js
var t1=moment(1411641720000).format('YYYY-MM-DD HH:mm:ss');
```

#### 获取前一天日期，格式以YYYY-MM-DD形式显示

```js
var t2=moment().day(0).format('YYYY-MM-DD');
```

#### 获取本周五日期，格式以YYYY-MM-DD形式显示

```js
var t3=moment().weekday(5).format('YYYY-MM-DD');
```

#### 获取上周五日期，格式以YYYY-MM-DD形式显示

```js
var t4=moment().weekday(-3).format('YYYY-MM-DD');
```

可以简单理解为上周倒数第几天，上周倒数第三天就是上周五了，和当天日期无关

#### 获取当前年份、月份、日期

```js
var t5=moment().year()
var t6=moment().month()//此处月份从0开始，当前月要+1
var t7=moment().date();
```

注意这个地方，日期不是`.day()/days()`

结合t5，t6，t7就可以输出你想要的任何和当前日期、月份相关的日期
例如：我想获取去年今天的完整日期，如：今天是2018-7-23，我要输出的是2017-7-23

```js
console.log(`${t5-1}-${t6+1}-${t7}`)
```

当然这不是获取去年今天日期最好的办法，但你可以拼出很多你想要的组合，下面会介绍更好的获取去年今日的方法。

#### 获取上个月今天的日期，格式以YYYY-MM-DD显示

```js
var t8=moment().subtract(1, 'months').format('YYYY-MM-DD');
```

#### 获取上个月日期，格式以YYYY-MM显示

```js
var t9=moment().subtract(1, 'months').format('YYYY-MM');

```

#### 获取前一天日期，格式以YYYY-MM-DD显示

```js
var t10 = moment().subtract(1, 'days').format('YYYY-MM-DD');
```

#### 获取去年今天的日期，格式以YYYY-MM-DD显示，即简便的获取去年今天日期的方法

```js
var t11= moment().subtract(1, 'year').format('YYYY-MM-DD');
```

#### 获取两个小时之后的时间

```js
var t12=moment().add(2,'hours').format('YYYY-MM-DD HH:mm:ss');
```

这个的应用是获取时间戳过期时间
比较也很简单，只要获取当前时间，一样的format用><=号比较就可以了

#### 获取五天前的日期

例如:今天2018-7-23，获取到的时间是2018-7-18

```js
var t13=moment().subtract(5, 'days').format('YYYY-MM-DD');
```

> 参考官网：[http://momentjs.cn](http://momentjs.cn)
