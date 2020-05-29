<!--
 * @Description: 电话通讯录组件
 * @Author: JeanneWu
 * @Date: 2020-05-27 14:02:48
-->
<template>
  <scroll class="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
    ref="listview"
  >
    <ul>
      <li v-for="(items,indexs) in data" :key="indexs" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{items.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,index) in items.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :key="index"
            :data-index="index"
            class="item"
            :class="{'current': currentIndex === index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <!-- <slot></slot> -->
  </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
const HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList() {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) return ''
      let index = this.data[this.currentIndex]
      return index ? index.title : ''
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  mounted() {

  },
  methods: {
    onShortcutTouchStart(e) {
      // console.log(e.touches, '--')
      let anchorIndex = getData(e.target, 'index')
      console.log(anchorIndex, 'anchorIndex')
      this._scrollTo(anchorIndex)

      // 获取初始位置然后存下来
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY

      // 记录开始的anchorIndex
      this.touch.anchorIndex = anchorIndex
    },
    onShortcutTouchMove(e) {
      // 记录移动到的位置pageY 也就是clientY
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = this.touch.y2 - this.touch.y1
      let index = +this.touch.anchorIndex + ((delta / HEIGHT) | 0)
      this._scrollTo(index)
    },
    scroll(pos) {
      // console.log(pos)
      // 判断scrollY落到哪个位置，通过左侧group的高度
      this.scrollY = pos.y
    },
    selectItem(item) {
      // 不要在这里跳转是因为组件不要写业务逻辑
      this.$emit('select', item)
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      // console.log(index, '--', this.listHeight[index])

      // let tempIndex = this.$refs.listGroup[index]
      // console.log(tempIndex, 'tempIndex')
      // // 第二个参数是动画时间
      // // {Number} time 滚动动画执行的时长（单位 ms）
      // this.$refs.listview.scrollToElement(tempIndex, 1000)

      // // this.scrollY = -this.listHeight[index]
    },
    _calculateHeight() {
      // 计算左侧元素总高度
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight = []

      this.listHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      // 这里要加强理解 TODO
      // newY滚动的时候是负值
      const LISTHEIGHT = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        console.log(this.currentIndex, 10000)
        return
      }
      for (let i = 0; i < LISTHEIGHT.length - 1; i++) {
        let heightFirst = LISTHEIGHT[i]
        let heightLast = LISTHEIGHT[i + 1] // 所以这里的length要减一
        if (-newY >= heightFirst && -newY < heightLast) {
          this.currentIndex = i
          this.diff = heightLast + newY
          console.log(this.currentIndex, 1111)
          return
        }
      }
      console.log(this.currentIndex, 3333)
      this.currentIndex = LISTHEIGHT.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>