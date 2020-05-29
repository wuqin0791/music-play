
<template>
  <div id="app">
    <m-headers></m-headers>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeaders from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeaders,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
