
<!--
 * @Description: This is a rank file
 * @Author: JeanneWu
 * @Date: 2020-05-23 21:53:01
-->
<template>
    <div class="wrapper">
    {{name}}
    <temp v-model="name"></temp>
    <ul ref='ul1'>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
    </div>
</template>
<script type="text/ecmascript-6">
import Temp from './tem'
export default {
  components: {
    Temp
  },
  data() {
    return {
      name: '测试',
      list: ['list1', 'list2']
    }
  },
  mounted() {
    let arr = ['blue', 'white', 'yellow']
    this.$nextTick(() => {
      arr.map((item, index, arr) => {
        this.$refs.ul1.style.color = item
      })
    })
  },
  methods: {

  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
