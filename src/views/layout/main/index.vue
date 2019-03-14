<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    }
  }
</script>
<style scoped>
  .app-main {
    position: absolute;
    bottom: 0;
    top: 50px;
    right: 0;
    left: 0;
    padding: 20px;
    overflow-y: auto;
  }
</style>
