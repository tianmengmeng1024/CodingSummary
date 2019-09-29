## js中判断数组中是否包含某元素的方法

### 方法一：array.indexOf(item,start)：元素在数组中的位置,如果没与搜索到则返回 -1。

|参数|描述|
|:----:|:----|
|item|必须。查找的元素。|
|start|可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。|

实际用法：`if(arr.indexOf(某元素) > -1){//则包含该元素}`

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];

var a = fruits.indexOf("Apple"); // 2

//以上输出结果意味着 "Apple" 元素位于数组中的第 3 个位置。
　var fruits=["Banana","Orange","Apple","Mango","Banana","Orange","Apple"];

　var a = fruits.indexOf("Apple",4); //6

 //以上输出结果意味在数组的第四个位置开始检索：
```
　　注：string.indexOf()返回某个指定的字符串值在字符串中首次出现的位置。

1. 该方法将从头到尾地检索字符串 stringObject，看它是否含有子串 searchvalue。开始检索的位置在字符串的 fromindex 处或字符串的开头（没有指定 fromindex 时）。如果找到一个 searchvalue，则返回 searchvalue 的第一次出现的位置。
2. stringObject 中的字符位置是从 0 开始的。
3. 查找字符串最后出现的位置，使用 lastIndexOf() 方法。

 

JavaScript Array filter() 方法有类似的检索功能：

　　filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

　　注意： filter() 不会对空数组进行检测。

　　注意： filter() 不会改变原始数组。

```
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age == 16;
}
function myFunction() {
    ages.filter(checkAdult);
  console.log(ages.filter(checkAdult))
}
myFunction()

//[16]

var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age <= 14;
}
function myFunction() {
    ages.filter(checkAdult);
  console.log(ages.filter(checkAdult))
}
myFunction()

//[]
```
 

### 方法二：array.find()

数组实例的find()用于找出第一个符合条件的数组元素。它的参数是一个回调函数，所有数组元素依次遍历该回调函数，直到找出第一个返回值为true的元素，然后返回该元素，否则返回undefined。

find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。

find() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 undefined
注意: find() 对于空数组，函数是不会执行的。

注意: find() 并没有改变数组的原始值。

```
[1, 5, 10, 15].find(function(value, index, arr) {
return value > 9;
}) 

// 10

//实际用法：

arr.find(function(value) {

if(value === 要查找的值) {

//则包含该元素
}
})
```
 


### 方法三：array.findIndex()

array.findIndex()和array.find()十分类似，返回第一个符合条件的数组元素的位置，如果所有元素都不符合条件，则返回-1。 

findIndex() 方法为数组中的每个元素都调用一次函数执行：

当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。 
如果没有符合条件的元素返回 -1

注意: findIndex() 对于空数组，函数是不会执行的。 
注意: findIndex() 并没有改变数组的原始值

```
var ages = [3, 10, 18, 20];
 
function checkAdult(age) {
    return age >= 18;
}
 
function myFunction() {
    console.log(ages.findIndex(checkAdult)) ;
}
myFunction()

//2
```
方法二和方法三，这两个方法都可以发现NaN，弥补了方法一IndexOf()的不足。
```
[NaN].2.dexOf(NaN) 
//-1

[Na3..findIndex(y => Object.is(NaN, y))
// 0
```

### 方法四：for()循环

```
// 遍历数组，然后 if 判断

var arr = [1, 5, 10, 15];

//传统for

for(let i=0; i<arr.length; i++) {

if(arr[i] === 查找值) {

//则包含该元素
}
}
// for...of

for(v of arr) {

if(v === 查找值) {

//则包含该元素
}
}
//forEach

arr.forEach(v=>{

if(v === 查找值) {

//则包含该元素
}
})
```
 

### 方法五：就是使用jquery的inArray方法，该方法返回元素在数组中的下标，如果不存在与数组中，那么返回－１，代码如下所示：

```
/**
* 使用jquery的inArray方法判断元素是否存在于数组中
* @param {Object} arr 数组
* @param {Object} value 元素值
*/
function isInArray2(arr,value){
var index = $.inArray(value,arr);
if(index >= 0){
return true;
}
return false;
}
```
### 方法六、include()方法：

arr.includes(searchElement)方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。searchElement:必须。需要查找的元素值。

```
let site = ['runoob', 'google', 'taobao'];
 
site.includes('runoob'); 
// true 
 
site.includes('baidu'); 
// false
```

|例子|结果|
|:----|:----|
|[1, 2, 3].includes(2);|//true|
|[1, 2, 3].includes(4);	|// false|
|[1, 2, 3].includes(3, 3);|// false|
|[1, 2, 3].includes(3, -1);|//true|
|[1, 2, NaN].includes(NaN);|//true|
arr.includes(searchElement, fromIndex).fromIndex:可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

```
var arr = ['a', 'b', 'c'];
注意：如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索 
arr.includes('c', 3);   //false
arr.includes('c', 100); // false

注意：如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。
// 数组长度是3
// fromIndex 是 -100
// computed index 是 3 + (-100) = -97
arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
```

### 方法七.Array some() 方法，类似于filter()

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。

some() 方法会依次执行数组的每个元素：

如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
如果没有满足条件的元素，则返回false。
注意： some() 不会对空数组进行检测。

注意： some() 不会改变原始数组。

```
var ages = [3, 10, 18, 20];
function checkAdult(age) {
    return age == 18;
}
function myFunction() {
    console.log(ages.some(checkAdult));
}
myFunction() 

//true
```
 

### 方法八、Jquery的$.each()
each() 方法为每个匹配元素规定要运行的函数。

```
 var anArray = ['one','two','three'];
       $.each(anArray,function(n,value){
           if(value=="one"){
            console.log("one存在于数组中");
        }
    }
 );
//one存在于数组中
```
## 方法九、正则表达式
```
Array.prototype.in_array=function(e){
	var r=new RegExp(','+e+',');
	return r.test(','+this.join(this.S)+',');
};

var arr = [1, 2, 3];
arr.in_array(3);//true
```
注：此函数只对字符和数字有效。