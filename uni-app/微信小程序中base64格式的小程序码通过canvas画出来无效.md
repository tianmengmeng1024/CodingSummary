使用场景

小程序中的文章详情页面有一个分享功能：用户点击分享按钮，生成一张分享图片（包括封面图，简介以及带有文章ID的小程序码），方便用户保存在本地。

问题说明

小程序码通过后台接口获取，格式如下：`'data:image/jpg;base64,/9j/4AAQSkZJRgAB...'`（只截取了前面一部分）

通过canvas画出来之后，在微信开发者工具上有效，在真机上无效。

解决方法

先把小程序码通过小程序API中的 `FileSystemManager.writeFile()` 接口写入本地并获取到一个临时URL。

关键代码
```js
// 把小程序码写入本地
export const writeFile = (base64Str => {
  return new Promise((resolve,reject)=>{
    // 后台返回的base64格式数据的回车换行换为空字符''
    let base64Image =  base64Str.split(',')[1].replace(/[\r\n]/g, '');
    // 文件管理器
    const fsm = wx.getFileSystemManager();
    // 文件名
    const FILE_BASE_NAME = 'tmp_base64src';
    // 文件后缀
    const format = 'png';
    // 获取当前时间戳用于区分小程序码，防止多次写进的小程序码图片都一样，建议通过不同的列表ID来区分不同的小程序码
    const timestamp = (new Date()).getTime();
    // base转二进制
    const buffer = wx.base64ToArrayBuffer(base64Image),
    // 文件名
    filePath = `${wx.env.USER_DATA_PATH}/${timestamp}share.${format}`;
    // 写文件
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success(res) {
        // 读取图片
        wx.getImageInfo({
          src: filePath,
          success: function(res) {
            let img = res.path;
            // 把需要画出来的图片的临时url暴露出去
            resolve(img);
            reject();
          },
          fail(e){
            console.log('读取图片报错');
            console.log(e);
          },
          error(res) {
            console.log(res)
          }
        })
      },
      fail(e){
        console.log(e);
      }
    })
  }).catch((e) => {
    console.log(e);
  })
});
```
```js
// 在页面调用方法
import { writeFile } from '../../utils/wxFunc'
 
getUseCode () {
   writeFile(codeUrl).then(img => { // // codeUrl为base64格式的小程序码
     console.log('可使用的小程序码：' + img); // img格式：http://usr/1599468897794share.png
     this.createCanvas(img);
   }).catch(e => {
     console.log(e);
   })
}
```
进一步完善

这样每调用一次写一个文件，文件会越写越多，当文件管理器中文件总大小超过最大限制则会报错。解决方法：在写入文件之前先做一次删除操作，关键代码如下：
```js
// 删除存储的垃圾数据
export const removeSave = () =>{
  return new Promise((resolve)=>{
    // 文件管理器
    const fsm = wx.getFileSystemManager();
    // 获取文件列表
    fsm.readdir({
      dirPath: wx.env.USER_DATA_PATH, // 当时写入的文件夹
      success(res){
        res.files.forEach((el) => { // 遍历文件列表里的数据
          // 删除存储的垃圾数据
          if (el !== 'miniprogramLog') { // 过滤掉miniprogramLog
            fsm.unlink({
              filePath: `${wx.env.USER_DATA_PATH}/${el}`, // 文件夹也要加上，如果直接文件名会无法找到这个文件
              fail(e){
                console.log('readdir文件删除失败：', e)
              }
            });
          }
        })
        resolve()
      }
    })
  })
}
```
```js
// 在页面调用方法
import { writeFile } from '../../utils/wxFunc'
 
removeBeforeFiles () {
  removeSave().then(() => {
    this.getUseCode();
  }).catch(e => {
    console.log(e);
  })
},
 
getUseCode () {
  writeFile(codeUrl).then(img => { // codeUrl为base64格式的小程序码
    this.createCanvas(img);
  }).catch(e => {
    console.log(e);
  })
},
 
createCanvas (img) {
  // 操作
}
```
完成！