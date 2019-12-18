## JS获取当前时间戳的方法

#### JavaScript 获取当前时间戳：
##### 第一种方法：(这种方法只精确到秒)

```js
var timestamp = Date.parse(new Date());
```
结果：1280977330000

##### 第二种方法：

```js
var timestamp = (new Date()).valueOf();
```

结果：1280977330748

##### 第三种方法：

```js
var timestamp=new Date().getTime();
```

结果：1280977330748

##### 第一种：获取的时间戳是把毫秒改成000显示，因为这种方式只精确到秒

##### 第二种和第三种是获取了当前毫秒的时间戳。

添加一个遇到的问题

```js
var a=(new Date()).toLocaleDateString()//获取当前日期
    a =a.replace(/\//g,'-');//替换2017/05/03 为    2017-05-03
var nowdate= (new Date(a))/1000;//把当前日期变成时间戳
var wdate=(new Date(v.wdate))/1000;//把数据库日期变成时间
```

##### js时间戳怎么转成日期格式

```js
//第一种
function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
alert(getLocalTime(1293072805));
//结果是2010年12月23日 10:53

//第二种
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
}
alert(getLocalTime(1293072805));

//第三种  格式为：2010-10-20 10:00:00
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
alert(getLocalTime(1177824835));
```
