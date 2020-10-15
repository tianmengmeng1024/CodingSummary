### 实时获取dom高度

> 通过 `nodesRef.boundingClientRect(callback)` 获取

```
    <!-- dom -->
    <view id="allRights"></view>
```
> 该函数要在dom渲染之后获取
```js
    onReady() {
        setTimeout(() => {
            this.getDomHeight('allRights');
        }, 500);
    },
    methods: {
        // 获取dom高度
        getDomHeight(ref) {
            let view = uni.createSelectorQuery().in(this).select(`#${ref}`);
            const _this = this;
            view.boundingClientRect(res => {
                console.log(ref + 'height', res);
                _this.isShowRightsBtn = res.height >= 360 ? true : false;
            }).exec();
        }
    }
```

链接：[nodesRef.boundingClientRect(callback)](https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect)