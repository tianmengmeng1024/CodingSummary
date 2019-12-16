如下代码使用方式：
```js
var btnType = Object.keys(obj).map((key,i) => {  
    var item = obj[key].map((s,index)=>{  
      return (  
        <button className={styles.btnType} key={index}>{obj[key][index]}</button>  
      )  
    })  
    return(  
      <Card title={key} key={i}>
        {item}  
      </Card>
    )  
})
```