<template>
  <div class="dashboard-container">
    <div class="info-container">
      <span class="display_name">{{name}}</span>
      <span style=''>欢迎使用 vue-element-admin</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'desktop',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    mounted() {
      console.log(mapGetters(['roles']))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .dashboard-container {
    padding: 60px 60px 0px;

    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }

    .info-container {
      position: relative;
      height: 150px;
      line-height: 200px;

      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }

      .display_info {
        display: inline-block;
        padding-top: 20px;
        font-size: 20px;
      }
    }
  }
</style>

