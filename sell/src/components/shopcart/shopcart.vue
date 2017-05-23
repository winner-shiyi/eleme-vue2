<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
         <div class="logo-wrapper">
           <div class="logo" :class="{'highlight':totalCount>0}">
             <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
           <div class="num" v-show="totalCount>0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
         <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>  
    </div>
    <div class="ball-container">
      <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <div class="title">购物车</div>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="list-mask" v-show="listShow" transition="fade" @click="hideList"></div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
export default {
  props: {
    selectFoods: { // 保存的是foods，并每个food增加一个count属性
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [], // 保存已经下落的小球
      fold: true // 购物车弹窗是否折叠
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    drop (element) {
     // console.log(element)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = element
          this.dropBalls.push(ball)
          return
        }
      }
    },
    toggleList () {
      if (!this.totalCount) { return }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) { return }
      window.alert(`需要支付${this.totalPrice}元`)
    }
  },
  transitions: {
    drop: {
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webKitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webKitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) { // 动画完成 小球进入的时候
        // 主动触发一次浏览器重绘 这个rf变量不会使用
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webKitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webKitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter (el) { // 动画做完之后
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  },
  components: {
    'v-cartcontrol': cartcontrol
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart{
    position:fixed
    bottom:0
    left:0
    z-index:50
    width:100%
    height:48px
    .content{
      display:flex
      background: #141d27
      color:rgba(255,255,255,.4)
    }
    .content-left{
      flex:1
      font-size:0 
      .logo-wrapper{
        display:inline-block
        vertical-align:top
        position:relative
        top:-10px
        margin:0 12px
        padding:6px
        width:56px
        height:56px
        box-sizing:border-box
        border-radius:50%
        background:#141d27
        .logo{
          width:100%
          height:100%
          border-radius:50%
          background:#2b343c
          text-align:center
          &.highlight{
            background:rgb(0,160,220)
          }
        }
        .icon-shopping_cart{
          line-height:44px
          font-size:24px
          color:#80858a 
          &.highlight{
            color:#fff
          }
        }
         .num{
          position:absolute
          top:0
          right:0
          width:24px
          height:16px
          line-height:16px
          text-align:center
          border-radius:12px
          font-size:9px
          font-weight:700
          color:#fff
          background:rgb(240,20,20)
          box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
        }
      }
      .price{
        display:inline-block
        vertical-align:top
        line-height:24px
        margin-top:12px
        padding-right:12px
        box-sizing:border-box
        border-1px-right(rgba(255,255,255,.1))
        font-size:16px
        font-weight:700
        &.highlight{
          color:#fff
        }
      }
      .desc{
        display:inline-block
        vertical-align:top
        margin:12px 0 0 12px
        line-height:24px
        font-size:10px
      }
    }
    .content-right{
      flex:0 0 105px
      width:105px
      .pay{
        width:100%
        height:48px
        line-height:48px
        text-align:center
        font-size:12px
        font-weight:700
        &.not-enough{
          background: #2b333b
        }
        &.enough{
          background: #00b43c
          color:#fff
        }
      }
    }
    .ball-container{
      .ball{
         position:fixed
         left:32px
         bottom:22px
         z-index:200
         &.drop-transition{
           transition:all .4s cubic-bezier(.49, -.29, .75, .41)
           .inner{
             width:16px
             height:16px
             border-radius:50%
             background:rgb(0,160,220)
             transition:all .4s linear
           }
         }
      }
    }
    .shopcart-list{
      position:absolute
      top:0
      left:0
      z-index:-1
      width:100%
      &.fold-transition{
        transition:all .5s 
        transform: translate3d(0,-100%,0)
      }
      &.fold-enter,&.fold-leave{
        transform:translate3d(0,0,0)
      }
      .list-header{
        height:40px
        line-height:40px
        padding:0 18px
        background:#f3f5f7
        border-bottom:1px solid rgba(7,17,27,.1)
        .title{
          float:left
          font-size:14px
          color:rgb(7,17,27)
        }
        .empty{
          float:right
          font-size:12px
          color:rgb(0,160,220)
        }
      }
      .list-content{
        padding:0 18px
        max-height:217px
        overflow:hidden
        background:#fff
        .food{
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px-bottom(rgba(7,17,27,.1))
          .name{
            lin-height:24px
            font-size:14px
            color:rgb(7,17,27)
          }
          .price{
            position:absolute
            bottom:12px
            right:90px
            font-size:10px
            font-weight:700
            line-height:24px
            color:rgb(240,20,20)
          }
          .cartcontrol-wrapper{
            position:absolute
            bottom:6px
            right:0
          }
        }
        
      }
    }
  }
  .list-mask{
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:40
    backdrop-filter:blur(10px)
    &.fade-transition{
      opacity:1
      background:rgba(7,17,27,.6)
      transition:all .5s
    }
    &.fade-enter,&.fade-leave{
      opacity:0
      background:rgba(7,17,27,0)
    }
  }
</style>
