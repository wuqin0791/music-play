
<!--
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-05-23 21:56:09
-->
<template>
  <div class="recommend" ref="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div :index="index" v-for="(item, index) in recommends" :key="index">
              <a :href="'https://y.qq.com/n/yqq/album/'+ item.subid +'.html'">
                <img @load="loadImg" :src="item.cover" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-if="discList.length" v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import { getRecommend, getDescList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    loading
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.focus.data.shelf.v_niche[0].v_card
        }
      })
    },
    _getDiscList() {
      getDescList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
          this.discList = res.data.list
        }
      })
    },
    loadImg() {
      if (!this.checkLoading) {
        this.$refs.scroll.refresh()
        this.checkLoading = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>