<template>
  <transition name="rotate-fall">
    <div id="app">
      <router-view class="app-router-view"></router-view>
    </div>
  </transition>
</template>

<script>
import 'vue-transition.css'

export default {
  name: 'App',
  data() {
    return {
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #app {
    .app-router-view {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: auto;
      backface-visibility: hidden;
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
      visibility: visible;
    }
  }
</style>
