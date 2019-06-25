render：自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。
- 语法
以下分别定义了：标签名称，（样式，事件等综合内容），显示内容
```
render: (h, params) => {
    return h('span', {
                style: {
                    color: '#000'
                },
                on: {
                    click: () => {
                        console.log(params)
                    }
                }
            }, '点击');
}
```
- 例子
```
render: (h, params) => {
    return h('span', '自定义内容');
}
```
- 同时显示多个内容
```
render: (h, params) => {
    return h('div', [
        h('span', params.row.name),
        h('span', ' ('+params.row.age+')')
    ]);
}
```
- 对数据进行处理
在数据返回之前可以进行任何数据处理
> 1. 时间格式转换
<script></script>标签中引入：```import moment from "moment";```
```
render: (h, params) => {
    let time = moment(params.row.timestamp*1000).format("YYYY-MM-DD HH:mm:ss")
    return h('span', time);
}
```
> 2. 数据处理：数组拼接字符串等
```
render: (h, params) => {
    let str = ''
    for (let i = 0, len = params.row.arr.length; i < len; i++) {
        str += `${params.row.arr[i].name}-${params.row.arr[i].age} | `
    }
    return h('span', str);
}
```
> 3. 多情况判断
```
render: (h, params) => {
    if (params.row.sex == 0) {
        return h('span', '女');
    }else {
        return h('span', '男');
    }
}
```
```
render: (h, params) => {
    switch (params.row.num) {
        case 1:
            return h('span', '罗');
            break;
        case 2:
            return h('span', '小');
            break;
        case 3:
            return h('span', '黑');
            break;
    }
}
```
> 4. 点击事件
```
render: (h, params) => {
    return h('span', {               
                on: {
                    click: () => {
                        // 这里通常做路由跳转，弹窗显示，发送请求等
                    }
                }
            }, '点击');
}
```
> 5. 样式处理：文本溢出以省略号显示
```
render: (h, params) => {
    return h('span', {
                style: {
                    display: 'inline-block',
                    width: params.column._width*0.9+'px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }
            }, params.row.name);
}
```
> 6. 悬浮以气泡显示内容
```
render: (h, params) => {
    return h('div', [
        h('Tooltip', {
                props: {
                    placement: 'top',
                }        
            }, [
                params.row.content, // 表格显示文字
                h('div', {
                        slot: 'content',
                        style: {
                            whiteSpace: 'normal'
                        }
                    }, params.row.content // 气泡内的文字
                )
            ])
    ]);
}
```
> 7. 悬浮以气泡显示内容并添加表格显示图片
```
render: (h, params) => {
    return h('div', [
        h('Tooltip', {
                props: {
                    placement: 'top',
                }        
            }, [
                h('div',[
                    h('span', params.row.content),
                    h('img', {
                        attrs: {
                            // 图片需放在static文件夹下
                            src: '../../../static/img/calibration-tip.svg'
                        },
                        style: {
                            marginBottom: '3px'
                        }
                    })
                ]), // 表格列显示文字和图片
                h('div', {
                        slot: 'content',
                        style: {
                            whiteSpace: 'normal'
                        }
                    }, params.row.content // 气泡内的文字
                )
            ])
    ]);
}
```
> 8. 显示图片
```
render: (h, params) => {
  return h('div', [
    h('img', {
      domProps: {
        'src': params.row.img
      },
      style: {
        width: '30px',
        height: '30px'
      },
    })
  ])
}
```
或者
```
render: (h, params) => {
  return h('div', [
    h('img', {
      attrs: {
        'src': params.row.img
      },
      style: {
        width: '30px',
        height: '30px'
      },
    })
  ])
}
```
