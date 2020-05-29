
<!--
 * @Description: 歌手详情页面
 * @Author: JeanneWu
 * @Date: 2020-05-28 10:51:44
-->
<template>
  <transition name="slide">
     <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    this._getDetail()
  },
  mounted() {

  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        // 这里因为是获取vuex的数据，没办法刷新后拿不到
        // let hash = window.location.hash
        // let arr = hash.split('/')
        // this.singer.id = arr[arr.length - 1]
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (+res.code === ERR_OK) {
          this.songs = this._normalized(res.data.list)
        }
      })
    },
    // 数据处理
    _normalized(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   bottom: 0
  //   right: 0
  //   background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all .5s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>