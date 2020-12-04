# 解决github图片不显示的问题

1. `windows` 修改 `hosts`

    `C:\Windows\System32\drivers\etc\hosts`

2. `mac` 配置 `hosts`

    `sudo vim /etc/hosts`

    ```js
    i（插入）
    esc（退出）
    :wq（写入并退出）
    ```

在文件末尾添加：

```js
# GitHub Start
192.30.253.112    Build software better, together
192.30.253.119    gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
# GitHub End
```

## 如果以上代码无效，可进行如下操作

1. 查看 `github ip` 地址，可以 `ping` 一下 `ping www.github.com`

2. 拿到IP替换上面的地址 `192.30.253.112`、`192.30.253.119`、`151.101.184.133`

```js
# GitHub Start
192.30.255.112    Build software better, together
192.30.255.112    gist.github.com
192.30.255.112    assets-cdn.github.com
192.30.255.112    raw.githubusercontent.com
192.30.255.112    gist.githubusercontent.com
192.30.255.112    cloud.githubusercontent.com
192.30.255.112    camo.githubusercontent.com
192.30.255.112    avatars0.githubusercontent.com
192.30.255.112    avatars1.githubusercontent.com
192.30.255.112    avatars2.githubusercontent.com
192.30.255.112    avatars3.githubusercontent.com
192.30.255.112    avatars4.githubusercontent.com
192.30.255.112    avatars5.githubusercontent.com
192.30.255.112    avatars6.githubusercontent.com
192.30.255.112    avatars7.githubusercontent.com
192.30.255.112    avatars8.githubusercontent.com
# GitHub End
```
