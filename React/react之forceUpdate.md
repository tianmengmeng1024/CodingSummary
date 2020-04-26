# react之forceUpdate

`forceUpdate()`

```js
component.forceUpdate(callback)
```

默认情况下，当组件的 `state` 或 `props` 发生变化时，组件将重新渲染。如果 `render()` 方法依赖于其他数据，则可以调用 `forceUpdate()` 强制让组件重新渲染。

调用 `forceUpdate()` 将致使组件调用 `render()` 方法，此操作会跳过该组件的 `shouldComponentUpdate()`。但其子组件会触发正常的生命周期方法，包括 `shouldComponentUpdate()` 方法。如果标记发生变化，`React` 仍将只更新 `DOM`。

通常你应该避免使用 `forceUpdate()`，尽量在 `render()` 中使用 `this.props` 和 `this.state`。

例子：

```js
Sub.js
class Sub extends React.Component{
    construcotor(){
        super();
        this.name = "zhangsan";
    }
    refChangeName(name){
        this.name = name;
        this.forceUpdate();
    }
    render(){
        return (<div>{this.name}</div>);
    }
}

App.js
class App extends React.Component{

    handleClick(){
        this.subRef.refChangeName("lisi");
    }
    render(){
        return (<div>
            <Sub ref={(sub)=>{this.subRef = sub;}} />
            <button onClick={this.handleClick}>click</button>
        </div>);
    }
}
```

> 在react中，state和props数据更新，就会重新render，但是当层级过深时，可能就不会触发渲染，这时候就要用到：

```js
this.forceUpdate();
```
