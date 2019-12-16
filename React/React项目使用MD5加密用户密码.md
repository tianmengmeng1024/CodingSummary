# React项目使用MD5加密用户密码

## 为了用户的安全，我们在开发时需要给用户密码加密，在此我们介绍使用 MD5 加密的方法。
## 安装 
使用 npm 命令安装：
```js
npm install md5 --save
```
## 引入 
在使用之前先引入 md5 包 
```js
let md5 = require("md5");
```
或者
```js
import md5 from "md5";
```
## 基本用法 
### 方法 1. 在用户输入时加密
- 不允许密码为空时：
> 如果 password 不为空字符串则加密，否则为空  
```html
<input
    type=" password"
    placeholder="请输入密码”
    name=" pas sword"
    onChange={ e => this . setState({
    password: e. target.value . trim() !== ””? md5(e. target.value) : "") // 此处判断密码不为空则加密
    })}
    required
/>
```
- 允许密码为空时:
```html
<input
    type=" password"
    placeholder-"请输入密码"
    name=" password"
    onChange={ e => this. setState({
    password: e. target.value) // 此处无需判断密码是否为空
    }}
    required
/>
```

### 方法 2. 在发送登录或注册请求时加密
> 如果不允许密码为空，发送请求之前判断 password 是否为空，避免传递空字符串的加密结果，否则无需提前判断
```js
axios.post(URL + "/login", {
    user,
    password: md5(password) // 提前判断此处传入的password是否为空
    })
    .then(res => {
        console.log(res);
    });
```
### 方法 3. 多重加密
> 自定义一个方法,让密码加入随机字符并加密 2 次
```js
function md5Pwd(pwd) {
    //salt为任意乱序字符串，目的在于使加密后的密码不容易被破解
    const salt = "fndjvrfewewq9eu!";
    return md5(md5(pwd + salt));
}
```
> 如果不允许密码为空，调用函数前判断 password 是否为空，如果不为空则调用函数 md5Pwd，传入不为空的 password，否则无需判断
使用时用这个自定义的方法替代原始的 md5 方法:
```js
password: md5Pwd(password); // 调用函数前判断密码是否为空
```
以上 3 种方法可使用一种也可组合使用。
