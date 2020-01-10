# input触发事件

四个事件：

- 获得焦点onfocus;
- 失去焦点onblur;
- 输入一次触发一次oninput;
- 输入并失去焦点onchange.

代码如下:

```html
<body>
    <input type="text" oninput="myFunction(this)" onchange="myFunction(this)" onblur="myFunction(this)" onfocus="myFunction(this)">
    <script>
        $("input").bind('input',function () {
            // console.log(this);
            console.log(1)
        });
        document.querySelector("input").oninput = function (ev) {
            console.log(2);
        };
        $(document).on("input","input",function () {
            // console.log(this);
            console.log(3)
        });

        $("input").bind('change',function () {
            // console.log(this);
            console.log(4)
        });
        document.querySelector("input").onchange = function (ev) {
            console.log(5);
        };
        $(document).on("change","input",function () {
            // console.log(this);
            console.log(6)
        });

        function myFunction(e) {
            // console.log(e);
            console.log("输入框的值",e.value)
        }
    </script>
</body>
```
