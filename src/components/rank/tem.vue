
<template>
    <div class="wrapper">
      <input type="text" :value="text1" @input="$emit('change', $event.target.value)">
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  model: {
    prop: 'text1',
    event: 'change'
  },
  props: {
    text1: String,
    default: ''
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>