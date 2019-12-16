## 使用antd 的Form组件getFieldDecorator动态设置初始值问题

```jsx
import { Form, Input, Button } from 'antd';

@Form.create()
class IndexNames extends PureComponent {
    submit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {}
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //  密码验证
        const passwordValidator = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('newpwd')) {
            callback('两次输入不一致！')
        }
        // 必须总是返回一个 callback，否则 validateFields 无法响应
        callback();
        }
        return (
            <Form onSubmit={this.submit}>
                <Form.Item>
                    {getFieldDecorator('oldpwd', {
                        initialValue: '可赋值初始值' || '', // 初始值
                        rules: [{ required: true, message: '请输入账号！' }],
                    })(
                        <Input placeholder="账号" />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('oldpwd', {
                        rules: [{ required: true, message: '请输入原密码！' }],
                    })(
                        <Input type="password" placeholder="原密码" />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('newpwd', {
                        rules: [{ required: true, message: '请输入新密码！' }],
                    })(
                        <Input type="password" placeholder="新密码" />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('newpwd2', {
                        rules: [{ required: true, message: '请确认新密码！' },{
                        validator: passwordValidator, // 校验两次输入是否一样
                        }]
                    })(
                        <Input type="password" placeholder="确认新密码" />,
                    )}
                </Form.Item>
                <Button>取消</Button>
                <Button type="primary" htmlType="submit">确定</Button>
            </Form>
        )
    }
}
```

rules数组里面的元素可以是方法，具体参数见下面源码。
验证多重选择框中确保每一个元素都是一个数字：
```jsx
<FormItem {...formItemProps}>
{
    this.props.form.getFieldDecorator("args", {
      initialValue: value || [],
      rules: [
        (rule, value, callback, source, options) => {
          const errors = []
          value.every(v => {
            if (!/^-?[0-9.]+$/.test(v)) {
              errors.push(new Error(v + '不是合法数值', rule.field))
              return false
            }
            return true
          })
          this.props.form.validateFields(['other_value']); // 同步更新其他相关需要同步变化的值
          callback(errors)
        }
      ]
    })(<Select size="default" tags tokenSeparators={[',', ' ', ';']}></Select>)
}
</FormItem>
```

参考antd官网文档：[https://ant.design/components/form-cn/#header](https://ant.design/components/form-cn/#header)