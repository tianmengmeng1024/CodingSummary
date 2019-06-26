> 1. Nuxt页面默认切换过渡效果名称为page

如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 assets/ 目录下创建这个文件：

在全局样式文件 assets/main.css 里添加一下样式：
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```
然后添加到 nuxt.config.js 文件中：
```javascript
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```
> 2. 给指定页面添加特定过渡效果

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 transition 字段即可：

在全局样式 assets/main.css 中添加一下内容：
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```
然后我们将页面组件中的 transition 属性的值设置为 test 即可：
```javascript
export default {
  transition: 'test'
}
```
