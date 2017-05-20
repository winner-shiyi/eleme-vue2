<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{sellerCon.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{sellerCon.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="sellerCon.serviceScore"></v-star>
            <span class="score">{{sellerCon.serviceScore}}</span>
          </div> 
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="sellerCon.foodScore"></v-star>
            <span class="score">{{sellerCon.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span><span class="time">{{sellerCon.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect :select-type="selectType" 
        :only-content="onlyContent" :desc="desc" :ratings="ratings"></v-ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'

const ALL = 2
const ERR_OK = 0

export default {
  props: {
    sellerCon: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created () {
    this.$http.get('/api/ratings').then(res => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        // this.$nextTick(() => { // 保证在dom更新以后
        //   this._initScroll()
        //   this._calculateHeight()
        // })
      }
    })
  },
  components: {
    'v-star': star,
    'v-split': split,
    'v-ratingselect': ratingselect
  }
}
</script>

<style lang="stylus">
  .ratings{
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%;
    overflow:hidden
    .overview{
      display:flex
      padding:18px 0
      .overview-left{
        flex:0 0 137px
        width:137px
        padding:6px 0
        border-right:1px solid rgba(7,17,27,.1)
        text-align:center
        @media only screen and (max-width:320px){
          flex:0 0 120px
          width:120px
        }
        .score{
          margin-bottom:6px
          line-height:28px
          font-size:24px
          color:rgb(255,153,0)
        }
        .title{
          margin-bottom:8px
          line-height:12px
          font-size:12px
          color:rgb(7,17,27)
        }
        .rank{
          font-size:10px
          line-height:10px
          color:rgb(147,153,159)
        }
      }
      .overview-right{
        flex:1
        padding: 6px 0 6px 24px
        @media only screen and (max-width:320px){
          padding:6px 0 6px 6px
        }
        .score-wrapper{
          margin-bottom:8px
          line-height:18px
          font-size:0
          .title{
            display:inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
            color:rgb(7,17,27)
          }
          .star{
            display:inline-block
            vertical-align:top
            margin:0 12px
          }
          .score{
            display:inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
            color:rgb(255,153,0)
          }
        }
        .delivery-wrapper{
          .title{
            font-size:12px
            color:rgb(7,17,27)
          }
          .time{
            margin-left:12px
            font-size:12px
            color:rgb(147,153,159)
          }
        }
      }
    }
  }
</style>
