1. 新浪微博：
```
http://service.weibo.com/share/share.php?url=

  count=表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
  &url=将页面地址转成短域名，并显示在内容文字后面。(可选，允许为空)
  &appkey=用于发布微博的来源显示，为空则分享的内容来源会显示来自互联网。(可选，允许为空)
  &title=分享时所示的文字内容，为空则自动抓取分享页面的title值(可选，允许为空)
  &pic=自定义图片地址，作为微博配图(可选，允许为空)
  &ralateUid=转发时会@相关的微博账号(可选，允许为空)  例如本人微博的uid为5322994217
  &language=语言设置(zh_cn|zh_tw)(可选)
```
2. 腾讯微博：
```
http://share.v.t.qq.com/index.php?c=share&a=index

&title=默认的文本内容或RICH化转播时的消息体标题，RICH化时最多15个全角字符的长度
&url=转播页的url
& pic=需要转播的图片url，多张以|连接
&appkey=填写正确的appkey，转播后将显示该key的来源
&line1=消息体第一行的文字，最多15个全角字符的长度
&line2=消息体第二行的文字，最多15个全角字符的长度
&line3=消息体第三行的文字，最多15个全角字符的长度
```
API文档：[http://dev.t.qq.com/websites/useshare?explain=1](http://dev.t.qq.com/websites/useshare?explain=1)

 

3. 人人网：
```
http://widget.renren.com/dialog/share?

resourceUrl=分享的资源Url
& srcUrl=分享的资源来源Url,默认为header中的Referer,如果分享失败可以调整此值为resourceUrl试试
&pic=分享的主题图片Url
& title=分享的标题
&description=分享的详细描述
```
API文档：[http://dev.renren.com/website/?widget=rrshare&content=use](http://dev.renren.com/website/?widget=rrshare&content=use)

4. QQ空间：
```
http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?

url=分享的网址
&desc=默认分享理由(可选)
&summary=分享摘要(可选)
&title=分享标题(可选)
&site=分享来源 如：腾讯网(可选)
&pics=分享图片的路径(可选)
```
API文档：[http://connect.qq.com/intro/share/](http://connect.qq.com/intro/share/)

比如：
```
<a href="javascript:void(0);" οnclick="window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href));return false;" title="分享到QQ空间">
    <img src="http://qzonestyle.gtimg.cn/ac/qzone_v5/app/app_share/qz_logo.png" alt="分享到QQ空间" />
</a>
```

5. 分享到豆瓣：
```
http://shuo.douban.com/!service/share?

image=分享图片
&href=分享网址
&name=分享标题
&text=分享内容
```
API文档：[http://open.weixin.qq.com/document/api/timeline/?lang=zh_CN](http://open.weixin.qq.com/document/api/timeline/?lang=zh_CN)

6. 分享到QQ群、QQ好友
```
<a class="lqq" target="_blank" href="javascript:void(0);" οnclick="window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(document.location.href) + '

&desc=邀请详情
&title=标题
&summary=简介
&pics=
&flash=
&site=邀请人或网站
&callback="
title="QQ登录">qq</a>
```