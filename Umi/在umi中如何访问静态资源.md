# 在umi中如何访问静态资源

在umi框架中，图片等静态资源主要放到三个地方：

1. 在`/pulbic`目录下，一般放共享资源。
2. 在`/src/assets/`目录下，一般放全局静态资源。
3. 在`/src/pages/`里的各个页面目录下，放在这里的好处是更符合组件化开发的思想，便于拷贝复用。

如何访问静态图片：
1. 如果在`/public`目录下的静态图片，可以直接输入绝对路径，假设`/public/yay.jpg`,访问方式如下：
```js
<img src="/yay.jpg" />
```
注意：以上必须构建后在dist中才能看到。

2. 在`/src/assets` 和 `/src/pages/` 目录下的图片，不能通过输入绝对路径访问，必须先`import`导入，才能访问。或者`require`导入。
比如 `/src/assets/yay.jpg`
需：
```js
import yayImg from '/src/assets/yay.jpg';
<img src={yayImg} />

<img src={require('/src/assets/yay.jpg')}
```

为什么会这样呢？主要是因为构建时，`/public`目录下的文件会原样复制到`/dist/`目录下，而`/src/assets/`  和  `/src/pages/`目录下的文件会被改名并复制到`/dist/`下。