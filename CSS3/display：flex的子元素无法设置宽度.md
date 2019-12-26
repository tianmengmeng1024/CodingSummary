## display:flex的子元素无法设置宽度

使用display:flex制作轮播图的时候，想让每张轮播图的宽度width="100%",即屏幕的宽度，但是设置了没有用，是因为dispaly:flex是流式布局，子元素有flex-shrink属性，表示在父元素宽度不够的情况下是自动收缩，0表示不自动收缩，1表示自动收缩；所以将子元素（图片）添加属性：flex-shrink:0;即可

### flex-shrink属性
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

参考：[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)