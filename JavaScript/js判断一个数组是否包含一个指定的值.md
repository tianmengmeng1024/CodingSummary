### js判断一个数组是否包含一个指定的值

1. `array.indexOf`此方法判断数组中是否存在某个值，如果存在返回数组元素的下标，否则返回-1

```js
let arr = ['something', 'anything', 'nothing', 'anything'];
let index = arr.indexOf('nothing');
console.log(index) //结果是2
```

2. `array.includes(searchElement[, fromIndex])`此方法判断数组中是否存在某个值，如果存在返回 true，否则返回false。

```js
function test(fruit) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
    if (redFruits.includes(fruit)) {
        console.log('red');
    }else{
        console.log('blue');
    }
}
test('aple')//结果是red
```

3. `array.find(callback[, thisArg])`返回数组中满足条件的第一个元素的值，如果没有，返回undefined

```js
// ---------- 元素是普通字面值 ----------
let numbers = [12, 5, 8, 130, 44];
let result = numbers.find(item => {
    return item > 8;
});
console.log(result); // 结果： 12

// ---------- 元素是对象 ----------
let items = [
    {id: 1, name: 'something'},
    {id: 2, name: 'anything'},
    {id: 3, name: 'nothing'},
    {id: 4, name: 'anything'}
];
let item = items.find(item => {
    return item.id == 3;
});
console.log(item); // 结果： Object { id: 3, name: "nothing" }
```

4. `array.findIndex(callback[, thisArg])`返回数组中满足条件的第一个元素的索引（下标）, 如果没有找到，返回-1。同第3种方法类似。
