# 在Vue中使用highlight.js

> 通过自定义指令的方式来实现在Vue中实现语法高亮

- 问题
highlight.js如果在Vue中使用，这个问题一直困扰着我，而highlight.js的使用说明太过于简单，完全不知道怎么使用。

```js
// 完全是一脸懵B的，而且不管经过怎么使用都无法实现代码高亮的效果
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

在highlight.js的Usage有这么一个方法我觉得我使用得到的

```js
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```

- 实现

1. 安装
`npm install highlight.js`

2. 编码

Vue自定义指令 文档 [https://cn.vuejs.org/v2/guide/custom-directive.html](https://cn.vuejs.org/v2/guide/custom-directive.html)

```js
// Vue-cli生成的工程文件的src/main.js
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
```

3. 使用

```html
<p v-html="markdownhtml" v-highlight></p>
```
到这里我们就大功告成了。

- 封装成插件

1. 编写插件

```js
// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight
```

2. 使用插件

```js
import Highlight from 'path/to/Highlight.js'
Vue.use(Highlight)
```
