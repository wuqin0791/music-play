
<!--
 * @Description: 一个滚动插件
 * @Author: JeanneWu
 * @Date: 2020-05-26 18:31:27
-->
<template>
    <div ref="wrapper" class="wrapper">
      <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: { // 要不要监听滚动，默认滚动
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      // 防止初始化找不到dom
      if (!this.$refs.wrapper) {
        return
      }
      console.log(this.probeType)
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        // 组件内暴露方法给父组件
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watcher: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
