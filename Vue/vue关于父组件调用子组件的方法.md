# vue关于父组件调用子组件的方法

我们都知道通过$ref可以获取到某个DOM，但是它也可以用来获取子组件的实例，调用子组件的方法

例：
子组件：

```html
<template>
  <div></div>
</template>

<script>
  export default {
    methods:{
      childMethod(flag) {
        console.log(flag)
      }
    },
    created(){
    }
  }
</script>
```

父组件： 在子组件中加上ref即可通过this.$refs.ref.method调用

```html
<template>
  <div @click="parentMethod">
    <children ref="child1"></children>
  </div>
</template>

<script>
  import children from 'components/children/children.vue'
  export default {
     data(){
      return {
        flag: true
      }
    },
    components: {      
      'children': children
    },
    methods:{
      parentMethod() {
        console.log(this.$refs.child1) //返回的是一个vue对象，所以可以直接调用其方法
        this.$refs.child1.childMethod(this.flag); 
      }
    }
  }
</script>
```
例子，兄弟组件间传递DOM数据，调用函数
写一个兄弟组件之间传递数据，父组件调用方法的案例：
第一个子组件cartcont，发射数据

```js
this.$emit('cartadd', event.target);
```

父组件接收数据，并将数据，通过调用另一个子组件shopcart 的方法传递给另一个子组件shopcart

```html
<v-cartcont :food="food" @cartadd='_drop'></v-cartcont>
<v-shopcart ref='shopcart'></v-shopcart>

_drop(target){
    console.log('父组件接收数据')
    this.$refs.shopcart.drop(target);
}
```

shopcart子组件的方法

```js
drop(el){
    console.log('调用另一个子组件的方法')
    console.log(el)
}
```