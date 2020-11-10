# Vue将文件、图片批量打包下载

## 安装插件
```js
npm install jszip
npm install file-saver
```

1. 在vue文件中使用

    ```js
    import JSZip from'jszip'
    import FileSaver from'file-saver'
    ```

2. 调用方法

    ```js
    //通过url 转为blob格式的数据
    getImgArrayBuffer(url){
        let _this=this;
        return new Promise((resolve, reject) => {
            //通过请求获取文件blob格式
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url, true);
            xmlhttp.responseType = "blob";
            xmlhttp.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    reject(this.status);
                }
            }
            xmlhttp.send();
        });
    },
    ```

3. 打包

    ```js
    // imgDataUrl 数据的url数组
    BatchDownload(){
        let _this = this;
        let zip = new JSZip();
        let cache = {};
        let promises = [];
        _this.title = '正在加载压缩文件';

        for (let item of this.imgDataUrl) {
          const promise= _this.getImgArrayBuffer(item.path).then(data => {
            // 下载文件, 并存成ArrayBuffer对象(blob)
            zip.file(item.name + '.png', data, { binary: true }); // 逐个添加文件
            cache[item.name + '.png'] = data;
          });
          promises.push(promise);
        }

        Promise.all(promises).then(() => {
          zip.generateAsync({ type: "blob" }).then(content => {
            _this.title = '正在压缩';
            // 生成二进制流
            FileSaver.saveAs(content, '数据包'); // 利用file-saver保存文件  自定义文件名
            _this.title = '压缩完成';
          });
        }).catch(res=>{
          _this.$message.error('文件压缩失败');
        });
    },
    ```
