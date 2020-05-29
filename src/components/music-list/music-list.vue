
<!--
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-05-28 18:32:32
-->
<template>
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
          <div class="play" v-show="songs.length>0" ref="playBtn">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
          <div class="filter" ref="filter"></div>
      </div>
      <div ref="layer" class="bg-layer"></div>
      <scroll @scroll="scroll" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="scroll">
        <div class="song-list-wrapper">
          <song-list :songs="songs" ></song-list>
        </div>
        <div class="loading-container" v-show="!songs.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'components/song-list/song-list'
import loading from 'base/loading/loading'
import { prefixStyle } from 'common/js/dom'

const RESERVE = 40
const TRANSFORM = prefixStyle('transform')
const BACKDROP = prefixStyle('backdrop-filter')
export default {
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Scroll,
    SongList,
    loading
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  mounted() {
    this.imgHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imgHeight + RESERVE
    this.$refs.scroll.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.push({
        path: '/singer'
      })
    }
  },
  watch: {
    scrollY(newY) {
      // 主要是因为newY是负值
      let translateY = Math.max(this.minTranslateY, newY)
      this.$refs.layer.style[TRANSFORM] = `translate3d(0, ${translateY}px, 0)`

      let zIndex = 0
      let blur = 0
      let scale = 1
      let percentage = Math.abs(newY / this.imgHeight)
      console.log(newY, 'newY')
      // if (newY > 0) {
      //   this.$refs.bgImage.style['transform'] = `scale(${scale + percentage})`
      // } else {
      //   this.$refs.bgImage.style['transform'] = `scale(${scale})`
      // }

      // 如果按照下面的方式写少写很多代码
      if (newY > 0) {
        scale = 1 + percentage
        zIndex = 10
      } else {
        blur = 0 - percentage
      }
      // 一定要留心newY是负值，这里说的是滚出视窗的情况
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVE}px`
        this.$refs.playBtn.style.display = `none`
      } else {
        this.$refs.bgImage.style.paddingTop = `70%`
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ``
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[TRANSFORM] = `scale(${scale})`

      this.$refs.filter.style[BACKDROP] = `blur(${blur})px`
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>