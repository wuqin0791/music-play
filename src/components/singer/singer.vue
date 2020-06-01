
<!--
 * @Description: This is a singer file
 * @Author: JeanneWu
 * @Date: 2020-05-23 21:58:47
-->
<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listView/listView'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
const OTHER = '#'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  mounted() {

  },
  methods: {
    selectSinger(item) {
      console.log(item)
      this.$router.push({
        path: `/singer/${item.id}`
      })
      // 这里是对mutation的提交
      this.setSinger(item)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    // 处理数据
    _normalizeSinger(list) {
      // 思路
      // 先聚合成对象，再根据字母排序
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      // 简单粗暴前十个是热门
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 处理十个热门数据以外的
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })]
          }
        } else {
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
      })

      // 下面开始做排序的事情
      // 重点是sort函数的使用
      let res = []
      let other = [] // a-z之外的#
      let hot = []
      for (let item in map) {
        let val = map[item]
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title.match(/[0-9]/)) {
          // 对于#其他的处理
          other.push({
            title: OTHER,
            items: val.items
          })
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // console.log(res)
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res, other)
    },
    ...mapMutations({
      // value 等于mutation-types里的常量
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
