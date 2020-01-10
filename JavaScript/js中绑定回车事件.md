# js中绑定回车事件

1. js中绑定回车事件
```js
document.onkeydown = function(e){
    if (!e) {
        e = window.event;
    }
    if ((e.keyCode || e.which) == 13) {
        fun(); // 自定义触发的函数事件
   `}
}
```

- jquery中：

```js
//回车事件
$(function(){
    //绑定输入框，这里只能 是ID
    $("#userName").keydown(function(event){
        event = document.all ? window.event : event;
        if ((event.keyCode || event.which)==13) {
            alert(111);
        }
    });
    //这样也行
    $("#userName").bind('keyup',function(event){
        event=document.all?window.event:event;
        if ((event.keyCode || event.which)==13) {
            alert(222);
        }
    });
    //全局
    document.onkeydown = function(event){
        if(!event){
            event = window.event;//火狐浏览器
        }
        //也可用下面的代替上面的if语句
        //document.all可以判断浏览器是否是IE
        //var event=document.all?window.event:event;
        if((event.keyCode || event.which) == 13){
            alert(333);
        }
    }
 });
```

2. `enter`键触发

```js
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        fun();
    }
};
```
