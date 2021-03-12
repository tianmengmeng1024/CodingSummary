# Mac-关于升级macOS Catalina后，终端使用问题

## 1. Mac 使用git出现xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools)

Mac 使用git出现
```js
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

解决方法
终端输入
```js
xcode-select --install
```

按提示安装

![./xcrun.png](xcrun.png)

之后git就能正常使用了
（无效请尝试重新打开console）

------------

## 2. shell 脚本问题
如果每次打开终端都提示：
```js
The default interactive shell is now zsh.

To update your account to use zsh, please run `chsh -s /bin/zsh`.

```

原因是原本使用的是bash风格，提示语告知现在新系统的shell已经更换为zsh，请用此 `chsh -s /bin/zsh` 命令切换。

解决办法：

(1) 不使用bash，切换zsh，`chsh -s /bin/zsh`命令切换即可。

(2) 继续使用bash，但又不想出现提示语，则打开文件：

```
vim ~/.bash_profile
```

`.bash_profile` 文件最下方加上 `i（插入）`：
```
# macOS Catalina
export BASH_SILENCE_DEPRECATION_WARNING=1
```
然后 `esc（退出）`  `:wq（写入并退出）` 保存退出，重新打开命令行警示语消失。
