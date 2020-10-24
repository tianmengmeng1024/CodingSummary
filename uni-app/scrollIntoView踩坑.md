# scrollIntoView踩坑

1. `document.getElementById('telFocus') // 一定要用id，用calss或者this.$refs无效`
2. 定时时间100ms无效，要大于100ms，如500ms可生效
3. 页面一定要可以<b>垂直滚动</b>，如滚动高度大于屏幕高度(例如：屏幕高度为100vh，则可滚动高度可设置为110vh)


### iphone端h5页面底部输入框被键盘遮挡问题
在ios端会出现输入框获取焦点后，中文输入法上横条完全挡住输入框问题，搜索解决方法，在input获取焦点时执行函数，主要scrollIntoView方法
```js
setTimeout(() => {
    el.scrollIntoView(true); //el为input元素
},100);
```
在定时100ms后执行，然而在真机测试出现，有时挡住有时不会挡住的情况。
分析原因可能是在100ms的时间设置问题，在100ms时间软键盘还未完全弹出就已经执行方法，没有使元素完全适应软键盘位置。将定时时间改为500ms后解决该问题

`uniapp input` 文档：[https://uniapp.dcloud.io/component/input?id=input](https://uniapp.dcloud.io/component/input?id=input)

### （uniapp）最终代码：
```js
<input class="uni-input" type="number" placeholder="请输入您的手机号" maxlength="11" v-model="telphone" @input="telChange" :adjust-position="true" @focus="telFocus" @keyboardheightchange="telFocus" id="telFocus"/>

methods: {
    telChange() {
        this.telFocus();
        if (reg_check_phone(this.telphone)) {
            this.SaveWechatInfo(this.telphone);// 保存用户信息
            return;
        }
    },
    telFocus() {
        //使用定时器让输入框上滑时更加自然
        setTimeout(function() {
            document.getElementById('telFocus').scrollIntoView(true);
        },500);
    },
}
```

> 缺点：真机有时失效
可参考：[pageScrollTo滚动到页面某处](./pageScrollTo滚动到页面某处.md)
