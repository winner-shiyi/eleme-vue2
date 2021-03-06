<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)" :key="index">
          <span class="text border-1px-bottom">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, listIndex) in goods" class="food-list" ref="foodList" :key="listIndex">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li 
                @click="selectFood(food,$event)" v-for="(food, foodIndex) in item.foods"
                :key="foodIndex"
                class="food-item border-1px-bottom" >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old"
                      v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'

  // const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      // this.$http.get('/api/goods').then((response) => {
      //   response = response.body
      //   if (response.errno === ERR_OK) {
      //     this.goods = response.data
      //     this.$nextTick(() => { // 保证在dom更新以后
      //       this._initScroll()
      //       this._calculateHeight()
      //     })
      //   }
      // })

      axios.get('static/data.json').then((res) => {
        this.goods = res.data.goods
        // 在￥nextTick的回调里面才会执行dom更新，这样计算的初始化高度才正确
        // 因为数据填充的过程是一个异步的，就有可能_initScroll的时候没有高度
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        // console.log(index)
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      addFood (target) {
        this._drop(target)
      },
      _drop (target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      // new BScroll(接收一个dom， 一个options)
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // api表示在滚动的时候能实时的告诉当前位置，y坐标
        })

        // 利用这个api监听scroll，得到y坐标
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 是小数，需要转换整数，并且要是正数
        })
      },
      _calculateHeight () { // 获取右侧商品 每一组的高度
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .goods{
    display:flex
    position:absolute
    top:174px
    bottom:46px
    width:100%
    overflow:hidden
    .menu-wrapper{
      flex:0 0 80px
      width:80px
      background:#f3f5f7
      .menu-item{
        display:table
        width:56px
        height:54px
        padding:0 12px
        line-height:14px
        &.current{
          position:relative
          z-index:10
          margin-top:-1px
          background:#Fff
          .text{
            font-weight:700
            border-none() 
          }
        }
        .icon{
          display:inline-block
          vertical-align:top
          width:12px
          height:12px
          margin-right:2px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease{
            bg-image('decrease_3')
          }
          &.discount{
            bg-image('discount_3')
          }
          &.guarantee{
            bg-image('guarantee_3')
          }
          &.invoice{
            bg-image('invoice_3')
          }
          &.special{
            bg-image('special_3')
          }
        }
        .text{
          display:table-cell
          width:56px
          vertical-align:middle
          font-size:12px
          border-1px-bottom(rgba(7,17,27,.1))
        }
      }
    }
    .foods-wrapper{
      flex:1  
      .title{
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      }
      .food-item{
        display:flex
        margin:18px 18px 0
        padding-bottom:18px
        border-1px-bottom(rgba(7,17,27,.1))
        &:last-child{
          border-none()
        }
        .icon{
          flex:0 0 57px
          width:57px
          margin-right:10px
        }
        .content{
          flex:1
          .name{
            margin:2px 0 8px
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          }
          .desc,.extra{
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          }
          .desc{
            margin-bottom:8px
            line-height:12px
          }
          .extra{
            .count{
              margin-right:12px
            }
          }
          .price{
            font-weight:700
            line-height:24px
            .now{
              margin-right:8px
              font-size:14px
              color:rgb(240,20,20)
            }
            .old{
              text-decoration:line-through
              font-size:10px
              color:rgb(147,153,159)
            }
          }
          .cartcontrol-wrapper{
            position:absolute
            right:0
            bottom:10px
          }
        }
      }
    }
  }
</style>
