# vue.js中内联样式

- vue.js中内联样式style三元表达式

```html
<ul :style="{'height':toggleMenu[index] ? 0 : `${item.subMenus.length*45}px`}"></ul>
```
当需要过渡的属性初始值为 auto 时，不会进行过渡。

-------------

***:style 是v-bind:style的简写***

***v-bind指令可以在其名称后面带一个参数，中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute）***

***style三元表达式***

```html
<p :style="{'color': (checkIndex3==m.txt ? '#3d8cff':'#BBBBBB')}">{{m.txt}}</p>
```

***class三元表达式***

```html
<i class="iconfont" :class="[isShow=='password'?'icon-kejian':'icon-bukejian']"></i>
```
