<template>
  <div class="goods">
    <!--左侧-->
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--右侧-->
    <div class="foods-wrapper">

    </div>
  </div>
</template>

<script>
const ERR_OK = 0

export default {
  props: {
    sellerCon: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.$http.get('/api/goods').then(res => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.goods = res.data
      }
    })

    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }

}
</script>

<style lang="stylus">
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
      .foods-wrapper{
        flex:1
      }
    }
  }
</style>

