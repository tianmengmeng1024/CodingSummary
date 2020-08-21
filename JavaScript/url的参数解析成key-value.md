# url的参数解析成key-value

```js
    function urlController(url) {
        var _url = url.split("?")[1];
        if (!_url) {
          return {};
        }
        var windowHref = _url.split("&");
        var obj = {};
        for (var i = 0; i < windowHref.length; i++) {
          var arr = windowHref[i].split("=");
          obj[arr[0]] = arr[1];
        }
        return obj;
      }
```