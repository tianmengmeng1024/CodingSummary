# Mac终端下出现bogon的解决办法

Mac终端下出现bogon的解决办法

输入
```
hostname
```
返回 `bogon`

这是因为终端会先向 `DNS` 请求查询当前 `IP` 的反向域名解析的结果，如果查询不

到再显示我们设置的计算机名。而由于我们的 `DNS` 错误地将保留地址反向的 `DNS`

查询结果返回了 `bogon`. 其中 `bogon` 本应该用来指虚假的 `IP` 地址，而非保留 `IP`

地址。因此就出现了会时不时地打印 bogon 这种奇怪名字作为计算机名的现象了。

解决办法：

重置 `hostname`，输入命令：

```
sudo scutil --set HostName yourhostname
```

输入 `hostname` 查看返回结果


### 修改计算机名称（设备名称）巴卟梨的MacBookPro15：
```
sudo scutil --set ComputerName 巴卟梨的MacBook Pro 13
```

### 修改主机名（终端前面的名字）为tmm：
```
sudo scutil --set HostName tmm
```