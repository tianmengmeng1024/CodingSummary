1.方法一
 ```
{
    title: '头像',
    key: 'avatar',
    columns: {
        'width':'50px'
    },
    render: (h, params) => {
        return h('div', [
            h('img', {
                attrs: {
                    src: params.row.avatar
                },
                style: {
                    width: '30px',
                    height: '30px'
                }
            }),
        ]);
    }
}
```
2. 方法二
```
{
    title: '头像',
    key: 'avatar',
    columns: {
        'width':'50px'
    },
    render: (h, params) => {
      return h('div', [
          h('img', {
            domProps: {
            'src': params.row.avatar
          },
          style: {
            width: '30px',
            height: '30px'
          },
      })
    ])
    }
}
```