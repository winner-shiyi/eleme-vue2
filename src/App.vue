<template>
  <div>
    <v-header :seller-con="seller"></v-header>
    <div class="tab border-1px-bottom">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller-con="seller" keep-alive></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header'
  import {urlParse} from 'common/js/util'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            // console.log(queryParam)
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id' + this.seller.id).then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          // this.seller = res.data 使用下面的代替
          this.seller = Object.assign({}, this.seller, res.data)
          // console.log(this.seller.id) 保证id不会被丢弃
        }
      }, err => {
        console.log(err)
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus">
  @import "./common/stylus/mixin.styl"

  .tab{
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px-bottom(rgba(7,17,27,0.1)) 
    .tab-item{
      flex:1
      text-align:center
      a{
        display:block
        font-size:14px
        color:rgb(77,85,93)
        &.active{
          color:rgb(240,20,20)
        }
       }
     }
       
  }
    
    
      
  
</style>
