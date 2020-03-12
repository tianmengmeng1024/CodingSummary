# 使用Ant Design

## Form表单验证validator不生效

```js
// 1. 注意是validator,而不是validate
// 2. validator总需要返回一个callback,有问题返回callback（错误提醒文字），验证没有问题也要执行callback(),
// 3. 一个FormItem 中，getFieldDecorator一个选项，例如：
<Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
    <FormItem>
        { getFieldDecorator('wakeup_prompt', {
            rules: [{
                required: true,
                message: 'This field is required'
            }],
            initialValue: 'defalut'
        })(
            <Select>
                {
                    fileList.map(function(item) {
                        return <Option
                                key={ item.text }
                                value={ item.val }
                            >
                                { item.text }
                            </Option>
                        }
                    )
                }
            </Select>
             <a className="prompt_setting" style={{ marginLeft: '10px' }} onClick={ this._showUploadModal } >Click Me</a>
        ) }
    </FormItem>
</Form>
    // 此时，getFieldDecorator中同时有Select 和 a 元素， require: true验证不生效，需要把a标签元素移除FormItem
```

> Form表单Select中设置initialValue 无效（AntD 2.9.1)

```js
// 1. initialValue值属性为字符串，与Option中的value 值对应
// 2. 同个FormItem 中不能包含多个getFieldDecorator，但是可以里面可以包含多个FormItem
// 3. Select 外面不要多加元素，否则有异常
<Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
    <FormItem
        { ...formItemLayout }
        label={(
            <Tooltip title={ <FormattedHTMLMessage id="LANG2230" /> }>
                <span>{ formatMessage({id: "LANG2230"}) }</span>
            </Tooltip>
        )}
    >
        <FormItem
            style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
        { getFieldDecorator('end_time', {
            getValueFromEvent: (e) => {
                return UCMGUI.toggleErrorMessage(e)
            },
            rules: [{
                required: true,
                message: formatMessage({id: "LANG2150"})
            }],
            initialValue: '0'
        })(
            <Select>
                <Option value='0'>0</Option>
                <Option value='1'>1</Option>
            </Select>
        ) }
        </FormItem>
        <FormItem
            style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
            { getFieldDecorator('day_min', {
                initialValue: '15'
            })(
                <div>
                    <Select style={{ width: 128, marginRight: 10 }}>
                        <Option value="0">0</Option>
                        <Option value="15">15</Option>
                    </Select>
                    分钟
                </div>
            )}
        </FormItem>
    </FormItem>
</Form>
```

> 其中因为Select 外面加了div 导致initialValue 设置无效

```js
<Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
     <FormItem
            style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
            { getFieldDecorator('day_min', {
                initialValue: '15'
            })(
                <!--<div>-->
                    <Select style={{ width: 128, marginRight: 10 }}>
                        <Option value="0">0</Option>
                        <Option value="15">15</Option>
                    </Select>
                <!--</div>-->
            )}
    </FormItem>
</Form>
```

> Form 布局问题
> 外formitem添加formLayout样式，内部加Col 控制显示

```js
<Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
    <FormItem
        { ...formItemDnLayout }
        label={ formatMessage({id: "LANG2016"}) }
    >
        <Col span={ 8 }>
            <FormItem>
                { getFieldDecorator('pbxdn', {
                    getValueFromEvent: (e) => {
                        return UCMGUI.toggleErrorMessage(e)
                    },
                    rules: [{
                        required: true,
                        message: formatMessage({id: "LANG2150"})
                    }, {
                        validator: (data, value, callback) => {
                            let basedn = this.state.basedn
                            this._validLdapChars(data, value + basedn, callback, formatMessage, formatMessage({id: "LANG2016"}))
                        }
                    }, {
                        validator: (data, value, callback) => {
                            let basedn = this.state.basedn
                            this._validDn(data, value + basedn, callback, formatMessage)
                        }
                    }, {
                        validator: (data, value, callback) => {
                            let basedn = this.state.basedn
                            this._validAttr(data, value + basedn, callback, formatMessage)
                        }
                    }, {
                        validator: (data, value, callback) => {
                            let basedn = this.state.basedn
                            this._isUnderBasedn(data, value + basedn, callback, formatMessage)
                        }
                    }, {
                        validator: (data, value, callback) => {
                            let basedn = this.state.basedn
                            this._isPrefixExist(data, value + basedn, callback, formatMessage)
                        }
                    }],
                    initialValue: pbxdn
                })(
                    <Input />
                )}
            </FormItem>
        </Col>
        <Col span={ 6 }>
            <span style={{ paddingLeft: '10px' }}>{ this.state.basedn }</span>
        </Col>
    </FormItem>
</Form>
```
