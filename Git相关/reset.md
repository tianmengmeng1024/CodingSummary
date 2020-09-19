# git命令

```js
// git删除push到远程服务器的commit
# 1.通过找到想要退回到的哪个commit_id
$ git log
# 2.本地代码变成某个提交记录时刻的代码
$ git reset --hard commit_id
# 3.推送到服务器，一定要加 --force 参数 "master":对应的分支即可
$ git push origin HEAD:master --force

// git删除commit记录 还没有push到远程分支上
# 1.通过找到想要退回到的commit_id
$ git log 
# 2.本地代码会变成你想要的那次代码。这次之后提交的代码都没有了
$ git reset --hard id 
# 3.完成撤销，停留在当前版本，之前的代码还是在的。只是本地的提交记录没了
$ git reset id 
```
