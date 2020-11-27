# calc() 函数

**实例**
使用 `calc()` 函数计算 `<div>` 元素的宽度:

```css
#div1 {
    position: absolute;
    left: 50px;
    width: calc(100% - 100px);
    border: 1px solid black;
    background-color: yellow;
    padding: 5px;
    text-align: center;
}
```

定义与用法
`calc()` 函数用于动态计算长度值。

- 需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
- 任何长度值都可以使用calc()函数进行计算；
- `calc()` 函数支持 "+", "-", "*", "/" 运算；
- `calc()` 函数使用标准的数学运算优先级规则；

支持版本：CSS3

CSS 语法

```js
calc(expression)
```

|值|描述|
|:-|:--|
|expression|必须，一个数学表达式，结果将采用运算后的返回值。|

---------------------------

## `calc()` 此 `CSS` 函数允许在声明 `CSS` 属性值时执行一些计算。它可以用在如下场合

- `<length>`(长度 `<length>` 是用于表示距离尺寸的 CSS 数据类型。许多 CSS 属性会用到长度，比如 width、margin、padding、font-size、border-width 和 text-shadow。)、
- `<frequency>`(`<frequency>` CSS数据类型表示频率维度，例如语音的音高。目前它未在任何 CSS 属性中被使用。),
- `<angle>`(CSS 数据类型 `<angle>` 用于表示角的大小，单位为度（degrees）、 百分度（gradians）、弧度（radians）或圈数（turns）。在 `<gradient>` 和 `transform` 的某些方法等场景中有所应用。)、
- `<time>`(`<time>` CSS 数据类型 表达了以秒（s）或毫秒（ms）为单位的时间的值。于animation、transition及相关属性中使用。)、
- `<percentage>`(CSS 数据类型 `<percentage>` 表述一个百分比值。许多 CSS 属性 可以取百分比值，经常用以根据父对象来确定大小。百分比值由一个`<number>` 具体数值后跟着%符号构成. 就像其它在css里的单位一样，在%和数值之间是不允许有空格的。)、
- `<number>`(`<数字>` CSS 数据类型代表一个数字，可为整数或小数。它的语法扩展了`<integer>`的数据值。要表示一个小数则加上小数部分 -- “."后跟一或多为十进制数字--到任何`<integer>`数据值。像`<integer>`数据类型一样，`<number>`没有任何单位，并不是一个CSS尺寸。)、
- 或 `<integer>`(`The <integer> CSS data type is a special type of number that represents a whole number, whether positive or negative. Integers can be used in numerous CSS properties, such as column-count, counter-increment, grid-column, grid-row, and z-index.`
 `The <integer>` css数据类型是一种特殊的`<number>`类型，它表示一个整数，无论是正数还是负数。整数可以用于许多css属性，例如column-count, counter-increment, grid-column, grid-row, and z-index.)

---------------------------

##### 参考：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc())
