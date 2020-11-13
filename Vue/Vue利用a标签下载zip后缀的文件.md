
# Vue利用a标签下载zip后缀的文件

```js
function oneTouchDownZip(url, fileName) {
    // 方法一：(推荐)各浏览器下载文件名有差异，谷歌下载文件名为fileName，火狐为默认文件名
    var XHR = new XMLHttpRequest();
    XHR.open("GET", url, true);
    XHR.responseType = 'blob';
    XHR.onload = function(e) {
        var url = window.URL.createObjectURL(XHR.response);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }
    XHR.send();
    /*
    // 方法二：(不推荐)谷歌下载文件名为fileName，火狐不兼容无后缀名
    return fetch(url).then((res) => {
    res.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    });
    });
    */
}
let url = 'http://xxxxxxx.zip';
url = url.split(":")[1]
oneTouchDownZip(url,'重新命名的名字');
```
