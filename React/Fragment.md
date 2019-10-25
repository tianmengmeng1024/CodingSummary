## React.Fragment
React.Fragment 组件能够在不额外创建 DOM 元素的情况下，用于减少不必要嵌套的组件,让 render() 方法中返回多个元素。
```js
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
```js
const Fragment = React.Fragment;

<Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</Fragment>

// This also works
<React.Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</React.Fragment>
```
你也可以使用其简写语法 <></>。
请注意，该<></>语法**不接受包括键在内的属性**。
如果需要keyed fragment，可以<Fragment />直接使用`<Fragment />`。为此，用例是将集合映射到片段数组，例如，创建描述列表：
```js
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```
key是唯一可以传递给的属性Fragment。将来，React可能会增加对其他属性（例如事件处理程序）的支持。