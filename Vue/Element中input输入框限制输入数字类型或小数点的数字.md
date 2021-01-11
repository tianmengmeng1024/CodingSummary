# element-ui input输入框限制输入数字类型 或小数点的数字

1. 正确的解决方案

```html
<el-input
   style="width:200px;"
   v-model="form.fee"
   oninput="value=value.replace(/[^0-9.]/g,'')"
   placeholder="请输入"
 ></el-input>
```

可以输入数字和小数点

```js
oninput ="value=value.replace(/[^\d]/g, '')" //只能输入数字
oninput ="value=value.replace(/[^0-9.]/g,'')" //只能输入数字和小数,但是如果输入多个小数点需要校验处理
```

2. 错误的解决方案

```html
<el-input
   style="width:200px;"
   v-model.number="form.fee"
   type='number'
   placeholder="请输入"
 ></el-input>
 ```

 这种，是只能输入数字类型 但是 1.05 这种是输入不进去的。

## 推荐使用 `el-input-number` 处理数字

```html
<template>
    <el-form
        :model="form"
        :form="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
    >
        <el-form-item
            label="单价:"
            prop="price"
            style="margin-bottom: 16px"
        >
            <el-input-number
                :min="0"
                :max="10000"
                :precision="2"
                v-model="form.price"
                :controls="false"
                placeholder="请输入"
                @change="handleChange($event,'price')"
            >
            </el-input-number>
            <i class="current">&yen;</i>
        </el-form-item>
    </el-form>
<template>
<script>
export default {
  data() {
      form: {
        price: undefined, // 单价
      },
      rules: {
        price:[{ required: true, message: "请输入单价", trigger: ["change","blur"] }],
      }
  },
  methods: {
    handleChange(val, type) {
        console.log('val', val);
        console.log('type', type);
    }
  }
}
</script>
```

参考链接：

- [element-ui input输入框](https://element.eleme.cn/#/zh-CN/component/input)
- [element-ui input-number](https://element.eleme.cn/#/zh-CN/component/input-number#methods)
- [form表单](https://element.eleme.cn/#/zh-CN/component/form)
