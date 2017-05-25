# 饿了么点餐页面

> vue-cli、vue2.0、vue-router、vue-resource、webpack、eslint、better-scroll

## 演示

<a href="https://simonzhangiter.github.io/VueDemo_Sell_Eleme" target=_blank>在线演示戳我</a>（请使用chrome开发者手机演示模式预览）

## 构建

嘿嘿，这几个页面练练手，弥补一下之前用vue做todolist时候没用到的知识点，这次用vue自己的脚手架构建工具vue-cli搭骨架，使用webpack来集成各种开发便捷工具，比如：

- 代码热更新，修改代码之后网页无刷新改变，对前端开发来说非常的方便
- PostCss，再也不用去管兼容性的问题了，只针对chrome写css代码，会自动编译生成支持多款浏览器的css代码
- Eslint，统一代码风格，规避低级错误，对于有代码洁癖的人来说是绝对的好东西，不过有些地方的代码校验有时候也挺麻烦的-.-
- bable，ES2015出来已经有一段时间了，但是不少浏览器还没有兼容ES6.有了bable，放心使用ES6语法，它会自动转义成ES5语法。
- Stylus，类似于SASS/SCSS，但是可以不写{}和“：”，使用起来还是很方便的
- ...

除此之外，vue-cli已经使用nod.js配置了一套本地服务器和安装命令等，本地运行和打包只需要一个命令就可以，非常的方便

## 组件

- [x] 商品列表页面
- [x] 店铺评价页面
- [x] 商家介绍页面
- [x] 优惠活动页面
- [x] 商品详情页面
- [x] 购物车
- [x] 购买时小球飞入动画
- [x] star星级组件
- [x] 商品增加、减少按钮组件
- [x] 头部组件
- [x] 切换评价内容
- [x] 分隔栏
- [x] 评论的是否满意和内容筛选


### 升级vue2.0变化————获取元素节点

vue2.0废除了v-el指令，所有的节点指令修改为ref，然后通过ref来获取元素节点，如

```html
<div ref="testHook">test</div>
...js code
this.$ref.testHook
```

### 升级vue2.0变化————获取元素节点组件间的通信

一、如果是和子组件通信，则使用ref就可以实现，如：

```html
<test ref="testHook"></test>
...js code
this.$ref.testHook.add() //调用test子组件的add方法
```

二、使用emit来发送广播

vue2提供了一套广播机制，即一边发送广播，一边接收广播来执行相应操作。使用方法如下：

比如想要给test组件发送一个“相加”广播:

```javascript
export default {
  method:{
  	click(){
  	  Vue.$emit('add',{}) //第二个参数可作为传递数据传送到监听端口，不需要则传空对象
  	}
  }
}
```

那么test组件中就需要监听，在created方法里写

```javascript
export default {
  created(){
   Vue.$on('add',this.add)
  },
  method:{
  	add(){
  	  this.count++
  	}
  }
}
```
## 安装步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
