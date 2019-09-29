# nuxt使用QRCode.js 生成二维码

QRCode.js 是一个用于生成二维码图片的插件， [官方文档](http://code.ciaoca.com/javascript/qrcode/) 。

在nuxt.js（vue官方的服务端渲染方式）项目里使用的QRCode.js；

**第一步**：看[官方文档](http://code.ciaoca.com/javascript/qrcode/)；

**第二步**：下载QRCode.js：[http://code.ciaoca.com/javascript/qrcode/version/qrcodejs.zip](http://code.ciaoca.com/javascript/qrcode/version/qrcodejs.zip)，

解压并将qrcode.min.js文件放到项目的static目录下（static目录下的文件不会被编译），

比如你的服务器地址：https://www.aaa.com，最终打包到服务器上时，https://www.aaa.com/qrcode.min.js就是你刚才下载的qrcode.min.js

**第三步**：在nuxt.config.js配置文件里配置head里的script对象：

```
head:{
  script: 
    [
      {
        src: 'https://www.aaa.com/qrcode.min.js'  
      }
    ]  
}
```
**第四步**：在你需要显示二维码的位置加一个有id名的标签，比如：
```
<div id="qrcode"></div> /*id可自定义*/
```
**第五步**：data里自己随意定义一个变量，用于配置二维码：

```
export default {
  data() {
    return {
      qrcodeObj: {}, // 二维码配置
    }
  }
}
```
为什么要在data数据里添加这个变量呢，因为业务需求，这个二维码的内容可能会变化，要用到QRCode的API：makeCode，这个在第七步会讲到。

**第六步**：在mounted里实例化QRCode（nuxt是服务端渲染，尽量少用created，created时，DOM还未生成）：

```
this.qrcodeObj = new QRCode('qrcode', {
      text: '你是一只小毛驴',
      width: 200,
      height: 200,
      colorDark : '#000', // 黑色
      colorLight : '#fff',
      correctLevel : QRCode.CorrectLevel.H
});
```

**第七步**：替换二维码内容，使用makeCode方法：
```
this.qrcodeObj.makeCode("你是一只小可爱");
```

如想了解更多，请移步官方文档，根据自身业务灵活运用：[http://code.ciaoca.com/javascript/qrcode/](http://code.ciaoca.com/javascript/qrcode/)