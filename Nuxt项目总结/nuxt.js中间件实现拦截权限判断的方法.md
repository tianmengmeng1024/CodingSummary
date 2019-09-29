# nuxt.js中间件实现拦截权限判断的方法
最近在把vue的项目改成基于nuxt.js是 ssr渲染，需要进行权限拦截判断，网上查了不少资料。最终看官方手册解决了，贴一下过程

项目环境
```
"element-ui":"^2.3.4",

"flyio":"^0.5.2",

"js-cookie":"^2.2.0",

"nuxt":"^1.4.0",
```
## 一：首先登录页面

在登录页面script中引入

`import Cookie from 'js-cookie' //npm install js-cookie --save`
在script里加上
```
data(){
  return{
   redirectURL:'/'
  }
},
mounted() {
   let rediretUrl = this.$route.query.ref;
   if (rediretUrl){
    this.redirectURL = rediretUrl
   }
  }
```
接着在methods里面编写一个 submitLogin的方法
```
submitLogin(ev) {
    var _this = this;
    this.$refs.ruleForm2.validate((valid) => {
     if (valid) {
      _this.logining = true
      var sendData = {
       username: _this.ruleForm2.account,
       password: _this.ruleForm2.pass,
       is_remember: _this.isRemember
      };
      //登录操作
      _this.$https.post('login/index', sendData).then(res => {
       if (res.status == 1) {
        //将服务端的token存入cookie当中
        Cookie.set('token', res.data.token)
        //返回上一页
        _this.$router.push(_this.redirectURL)
       }else{
        _this.$message.warning(res.msg)
       }
      })
     } else {
      return false;
     }
    });
   },
```
## 二：nuxt中间件middleware编写权限拦截

新建一个userAuth.js，目录结构如下

代码如下
```
import utils from '~/utils/utils'
 
export default function ({route, req, res, redirect}) {
 let isClient = process.client;
 let isServer = process.server;
 let redirectURL = '/login';
 var token, path
 //在服务端
 if (isServer) {
  let cookies = utils.getcookiesInServer(req)
  path = req.originalUrl;
  token = cookies.token ? cookies.token : ''
 }
 //在客户端判读是否需要登陆
 if (isClient) {
  token = utils.getcookiesInClient('token')
  path = route.path;
 }
 if (path) {
  redirectURL = '/login?ref=' + encodeURIComponent(path)
 }
 //需要进行权限判断的页面开头
 if (!token) {
    redirect(redirectURL)
 }
}
```
utils.js里面的方法
```
import Cookie from 'js-cookie'
export default {
 //获取服务端cookie
 getcookiesInServer:function (req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
   let parts = val.split('=');
   service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
 },
 //获取客户端cookie
 getcookiesInClient:function (key) {
  return Cookie.get(key) ? Cookie.get(key) : ''
 }
}
```
到这里，我们的中间件，权限判断依据完成了

## 三：运用到项目中

在项目中。例如，用户信息设置页面，需要进行是否登录判断

`pages/user/setting.vue`

我们在页面中运用刚刚编写的userAuth中间。

`middleware: 'userAuth',`

运用示例图如下：

现在

setting页面就有权限判断了

基于nuxt.js渲染的 ssr 网站可以愉快的运行起来了。