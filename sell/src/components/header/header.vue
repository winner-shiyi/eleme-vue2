<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellerCon.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerCon.name
            }}</span>
        </div>
        <div class="description">
          {{sellerCon.description}}/{{sellerCon.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="sellerCon.supports">
          <span class="icon" :class="classMap[sellerCon.supports[0].type]"></span>
          <span class="text">{{sellerCon.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="sellerCon.supports" class="support-count">
        <span class="count">{{sellerCon.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
export default {
  props: {
    sellerCon: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus">
   @import "../../common/stylus/mixin.styl"


  .header{
    color:#fff
    background:#999
    .content-wrapper{
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
     .avatar{
       display:inline-block
       vertical-align:top
       img{
         border-radius:2px
       }
     } 
     .content{
       display:inline-block 
       margin-left:16px
       .title{
          margin:2px 0 8px
          .name{
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
          }
          .brand{
            display:inline-block
            vertical-align:top
            width:30px
            height:18px
            bd-image('brand')
            background-size:30px 18px 
            background-repeat:no-repeat 
          }
       }
       .description{
         margin-bottom:10px
         line-height:12px
         font-size:12px
       }
       .support{
         .icon{
           display:inline-block
           vertical-align:top
           width:12px
           height:12px
           margin-right:4px
           background-size:12px 12px
           background-repeat:no-repeat
           &.decrease{
             bd-image('decrease_1')
           }
           &.discount{
             bd-image('discount_1')
           }
           &.guarantee{
             bd-image('guarantee_1')
           }
           &.invoice{
             bd-image('invoice_1')
           }
           &.special{
             bd-image('special_1')
           }
         }
         .text{
           line-height:12px
           font-size:10px  
         }
       }
     }
     .support-count{
       position:absolute
       right:12px
       bottom:14px
       padding:0 8px
       height:24px
       line-height:24px
       border-radius:7px
       background:rgba(0,0,0,.2)
       text-align:center
       .count{
         vertical-align:top
         font-size:10px
       }
       .icon-keyboard_arrow_right{
         margin-left:2px
         line-height:24px
         font-size:10px
       }
     }
    }
  }
</style>



