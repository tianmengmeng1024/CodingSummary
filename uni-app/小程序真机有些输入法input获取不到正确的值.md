# 小程序真机有些输入法input获取不到正确的值

解决办法：自动收起键盘 `uni.hideKeyboard()`

```html
<template>
    <form>
        <input
            type="text"
            key="plateNumber1"
            confirm-type="done"
            :value="form1.plateNumber"
            @focus="inputfocus = 1"
            @input="changeUpper('input', $event)"
            @confirm="changeUpper('confirm', $event)"
            @blur="changeUpper('blur', $event)"
            :focus="true"
            placeholder="请输入"
            placeholder-class="placeHolder-class"
            class="color000 font16 lineh22 car-num"
            :disabled="false"
            :maxlength="7"
        />
    </form>
</template>
```
```js
<script>
	export default {
        data() {
            return {
                inputfocus: 1,
                form1: {
                    plateNumber: '',
                    index: 0,
                    ownerNumber: '',
                    cheAreaName: '京',
                    cityId: 1,
                },
                isWindows: false,
            }
        },
        onLoad(options) {
            // 区分 `windows` 或者 `真机`，windows上隐藏键盘 `uni.hideKeyboard()` 报错
            const _this = this;
            uni.getSystemInfo({
                success(res) {
                    console.log('区分PC和移动端', res)
                    if (res.platform == 'windows' || res.platform == "devtools") {
                        _this.isWindows = true
                    } else {
                        _this.isWindows = false
                    }
                }
            });
        },
        methods: {
            // 获取值，同时改变 `data` 中的值 `this.form1.plateNumber`
            changeUpper(flag, e) {
                if (!this.isWindows && flag != 'input') {
                    uni.hideKeyboard()
                }
                console.log('flag', flag);
                let val = e ? e.detail.value : '';
                console.log('e.detail.value', val);
                //将小写变成大写
                this.form1.plateNumber = val.toUpperCase()
                console.log('this.form1.plateNumber', this.form1.plateNumber);

                uni.setStorage({
                    key: 'licenseNoCarIn',
                    data: this.form1.cheAreaName + this.form1.plateNumber,
                });

                if (flag != 'input') {
                    // this.submitSureLater();
                }
            }
        },
    }
</script>
```

> 参考：[input 输入框](https://uniapp.dcloud.io/component/input?id=input) [https://uniapp.dcloud.io/component/input?id=input](https://uniapp.dcloud.io/component/input?id=input)