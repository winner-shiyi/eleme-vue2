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
      <div v-if="sellerCon.supports" class="support-count" @click="showDetail">
        <span class="count">{{sellerCon.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{sellerCon.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    
    <div class="background">
      <img :src="sellerCon.avatar" alt="" width="100%" height="100%">
    </div>

    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
         <h1 class="name">{{sellerCon.name}}</h1>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sellerCon: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
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
    position:relative
    color:#fff
    background:rgba(7,17,27,.5)
    overflow:hidden
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
            bg-image('brand')
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
             bg-image('decrease_1')
           }
           &.discount{
             bg-image('discount_1')
           }
           &.guarantee{
             bg-image('guarantee_1')
           }
           &.invoice{
             bg-image('invoice_1')
           }
           &.special{
             bg-image('special_1')
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
    .bulletin-wrapper{
      position:relative
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      background:rgba(7,17,27,.2)
      .bulletin-title{
        display:inline-block
        vertical-align:middle
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
      }
      .bulletin-text{
        margin:0 4px
        font-size:10px
      }
      .icon-keyboard_arrow_right{
         position:absolute
         right:12px
         top:9px
         font-size:10px
       }
    }
    .background{
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    }
    .detail{
      position:fixed
      top:0
      left:0
      z-index:100
      width:100%
      height:100%
      overflow:auto
      background:rgba(7,17,27,.8)
      .detail-wrapper{
        min-height:100%
        width:100%
        .detail-main{
          margin-top:64px
          padding-bottom:64px
        }
        .name{
          line-height:16px
          text-align:center
          font-size:16px
          font-weight:700
        }
      }
      .detail-close{
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0
        clear:both
        font-size:32px
      }
    }
  }
</style>



