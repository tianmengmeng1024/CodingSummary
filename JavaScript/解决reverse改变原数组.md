## 解决reverse改变原数组

### `reverse()` 该方法用于颠倒数组中元素的顺序，并且改变原来的数组，而不会创建新的数组

```js
let arrObj = [1,2,3]
arrObj.reverse() // [3,2,1]
```

```js
let arr =[1,2,3,4]
console.log(arr)
// [1,2,3,4]
let arr2 = arr.reverse();
console.log(arr2)
// [4,3,2,1]
console.log(arr)
// [4,3,2,1]
```

#### reverse()：该方法会改变原来的数组，而不会创建新的数组。`arrayObject.reverse()`
 
解决办法：

```js
let arr =[1,2,3,4]
console.log(arr)
// [1,2,3,4]
let arr2 = [...arr].reverse();   //es6浅拷贝
console.log(arr2)
// [4,3,2,1]
console.log(arr)
// [1,2,3,4]
```
