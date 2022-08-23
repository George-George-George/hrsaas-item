<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="screenfull"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'fullscreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    screenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
