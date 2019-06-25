1. 在文件夹下直接新建shell文件，例如：
文件名：git.sh
```
#!/bin/bash
# author:tianmengmeng
git add .
git commit -m "备注描述"
git push
```
> 注：#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序
  #! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell
2. .gitignore文件中忽略上传
```
# git shell
git.sh
```
3. 在cmd窗口打开该项目，输入
```
./git.sh
```
执行后，你会发现，unbelievable！！！git操作一步到位了
每次更新的时候，只需要修改git.sh的文件中的描述即可，或者进行自定义操作