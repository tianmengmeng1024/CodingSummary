# vue路由跳转的方式

vue路由跳转有四种方式

1. router-link

2. this.$router.push() (函数里面调用)

3. this.$router.replace() (用法同push)

4. this.$router.go(n)

一、不带参

1.1 `router-link`

```html
<router-link :to="{name:'home'}">
<router-link :to="{path:'/home'}"> //name,path都行, 建议用name  
// 注意：router-link中链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始。
```

1.2 `this.$router.push()`

```js
this.$router.push('/home')
this.$router.push({name:'home'})
this.$router.push({path:'/home'})
```

1.3 `this.$router.replace()` (用法同 `push` )

二、带参

2.1 `router-link`

```html
<router-link :to="{name:'home', params: {id:1}}">
// params传参数 (类似post)
// 路由配置 path: "/home/:id" 或者 path: "/home:id"
// 不配置path ,第一次可请求,刷新页面id会消失
// 配置path,刷新页面id会保留

// html 取参  $route.params.id
// script 取参  this.$route.params.id

<router-link :to="{name:'home', query: {id:1}}">

// query传参数 (类似get,url后面会显示参数)
// 路由可不配置

// html 取参  $route.query.id
// script 取参  this.$route.query.id
```

2.2 `this.$router.push` ( `query` 传参)

```js
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})

// html 取参  $route.query.id
// script 取参  this.$route.query.id

params传参

this.$router.push({name:'home',params: {id:'1'}})  // 只能用 name

// 路由配置 path: "/home/:id" 或者 path: "/home:id" ,
// 不配置path ,第一次可请求,刷新页面id会消失
// 配置path,刷新页面id会保留

// html 取参  $route.params.id
// script 取参  this.$route.params.id
```

2.3 `this.$router.replace()` (用法同 `push` )

`this.$router.go(n)`

`this.router.go(n)` 向前或者向后跳转n个页面，n可为正整数或负整数

区别：

- `this.$router.push` 跳转到指定 `url` 路径，并向 `history` 栈中添加一个记录，点击后退会返回到上一个页面

- `this.$router.replace` 跳转到指定 `url` 路径，但是 `history` 栈中不会有记录，点击返回会跳转到上上个页面 (就是直接替换了当前页面)

- `this.$router.go(n)` 向前或者向后跳转 `n` 个页面，`n` 可为正整数或负整数
