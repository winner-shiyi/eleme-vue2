<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{sellerCon.name}}</h1>
        <div class="desc border-1px-bottom">
          <v-star :size="36" :score="sellerCon.score"></v-star>
          <span class="text">({{sellerCon.ratingCount}}份)</span>
          <span class="text">月售{{sellerCon.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h1>起送价</h1>
            <div class="content">
              <span class="stress">{{sellerCon.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h1>商家配送</h1>
            <div class="content">
              <span class="stress">{{sellerCon.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h1>平均配送时间</h1>
            <div class="content">
              <span class="stress">{{sellerCon.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star'

export default {
  props: {
    sellerCon: {
      type: Object
    }
  },
  components: {
    'v-star': star
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .seller{
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .overview{
      padding:18px
      .title{
        margin-bottom:8px
        line-height:14px
        color:rgb(7,17,27)
        font-size:14px
      }
      .desc{
        padding-bottom:18px
        line-height:18px
        font-size:0
        border-1px-bottom(rgba(7,17,27,1))
        .star{
          display:inline-block
          vertical-align:top
          margin-right:8px
        }
        .text{
          display:inline-block
          vertical-align:top
          margin-right:12px
          font-size:10px
          color:rgb(77,85,93)
        }
      }
      .remark{
        display:flex
        padding-top:18px
        .block{ 
          flex:1
          text-align:center
          border-right:1px solid rgba(7,17,27,.1)
          &:last-child{
            border:none
          }
          h2{
            margin-bottom:4px
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          }
          .content{
            line-height:24px
            font-size:10px
            color:rgb(7,17,27)
            .stress{
              font-size:24px
            }
          }
        }
      }
    }
  }
</style>
