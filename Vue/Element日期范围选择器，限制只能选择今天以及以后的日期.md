# Element日期范围选择器，限制只能选择今天以及以后的日期

```js
<template>
    <el-form :model="search" label-width="100px">
        <el-form-item label="日期：" label-width="100px">
            <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                :picker-options="pickerOptions"
            />
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7 // 设置选择今天以及今天之后的日期
                        // return time.getTime() > Date.now(); //设置选择今天以及今天以前的日期
                        // return time.getTime() < Date.now();//设置选择今天之后的日期（不能选择当天时间）
                        // return time.getTime() > Date.now() - 8.64e7 //设置选择今天之前的日期（不能选择当天）
                        // 设置当天23：59：59可选
                        // let currentTime = this.getNowMonthDay() + ` 23:59:59`
                        // return time.getTime() > new Date(currentTime).getTime()
                    }
                }
        }
    }
}
</script>
```

参考：
[DateTimePicker 日期时间选择器](https://element.eleme.cn/#/zh-CN/component/datetime-picker#methods)
