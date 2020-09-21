# uni-app之Class与样式的绑定

1. uni-app样式的导入：

全局导入：即在App.vue中的Style标签中导入外联样式，如下：

```vue
<style>
    @import url("common/common.css");
</style>
```
这样导入每个界面都可以使用此样式

单独导入：即在单个页面中的`<Style>`标签中使用@import的方式导入，如上图，或直接将样式写在标签中， 一个页面支持多个style标签。

2. 样式的绑定方式：
下面列举了uni-app中可用的几种class绑定方式：
```html
        <!-- 常规形式 -->
        <view class="red"> 我是一个红色的字体</view>
        <view class="red font-big"> 我是一个大红色的字体</view>
        <view style="color: #00FF00;"> 我是一个绿色的内联样式字体</view>
        
        <!--style 内联样式 绑定的形式 其中fontSize是一个变量，改变这个变量，字体也会随之改变-->
        <view :style="{fontSize:fontSize + 'px'}"> 我是一个动态的内联样式字体</view>
     
        <!-- 绑定的形式导入，接收的是一个数组，元素之间用逗号分割 -->
         <view :class="['red', 'font-big','font-bold' ]" > 我是一个大红色粗体的字体 </view>
        <!-- 动态绑定 -->
        <view :class="[isBig ? 'font-big' : 'font-small' ]" >我不是大字体就是小字体 </view>
            
        <view :class="{'font-big': isBig }">我不一定是一个大的字体</view>
        
        <view :class="[{'red': isRed },'blue']">我不一定是一个蓝色字体</view>

        <view class="btns" :class="[isIPhoneX ? 'safe' : '']">按钮</view>
```

为了节约性能,我们将Class与Style的表达式通过compiler硬编码到uni-app中

支持语法和转换效果如下:

Class支持语法:
```html
<view :class="{ active: isActive }">111</view>
<view class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">222</view
<view class="static" :class="[activeClass, errorClass]">333</view>
<view class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">444</view>
<view class="static" v-bind:class="[{ active: isActive }, errorClass]">555</view>
```
Style支持语法:

```html
<view v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">666</view>
<view v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">777</view>
```
***不支持Vue官方文档:   Class与Style绑定中的classObject和styleObject语法.***

此外还可以用`computed`方法生成`class`或`style`字符串,插入到页面中,

```html
<template>
    <!-- 支持 -->
    <view class="container" :class="computedClassStr"></view>
    <view class="container" :class="{active: isActive}"></view>
    <!-- 不支持 -->
    <view class="container" :class="computedClassObject"></view>
</template>
```