# vue tab滚动到一定高度,固定在顶部,点击tab切换不同的内容

template里面:
```
    <!-- tab切换star -->
      <ul class="tab-list" :class="{fixTitle:whether}">
        <li @click="curId=0" :class="{'cur':curId===0}">产品特点</li>
        <li @click="curId=1" :class="{'cur':curId===1}">投保须知</li>
        <li @click="curId=2" :class="{'cur':curId===2}">理赔流程</li>
      </ul>
    <!-- 切换内容star -->
```
设置fixTitle的样式,固定在顶部,cur是当前tab点击的颜色
```
<div class="tab-con">
	<div v-show="curId===0">
        第一部分内容
    </div>
	<div v-show="curId===1">
        第二部分内容
    </div>
	<div v-show="curId===2">
        第三部分内容
    </div>
</div>
```
当点击第一个产品特点的时候,对应下面的第一部分内容,点击投保须知对应第二部分内容,点击理赔流程对应第三部分内容

data里面:
```
data(){
    return:{
        whether:false,
        curId:0
    }
}
```
curId默认为0,展示的是产品特点的内容,也就是第一部分内容

methods里面:

设置滚动效果:
```
    handleScroll() {
      var scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop)
      if(scrollTop>329){
        this.whether = true;
      }else{
        this.whether = false;
      }
    },
```
在mounted里面:
```
window.addEventListener("scroll", this.handleScroll);
```